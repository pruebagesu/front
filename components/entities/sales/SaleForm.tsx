import { useToast } from "@chakra-ui/react"
import axios, { AxiosResponse } from "axios"
import { env } from "~/env.mjs"
import "react-datepicker/dist/react-datepicker.css"
import getDateForInput from "helpers/getDateForInput"
import { SaleFormProps, Sale, SaleFromDB, saleSchema } from "schemas/SaleSchema"
import MyForm from "components/ui/forms/MyForm"
import ProductAdder from "../products/ProductAdder"
import PaymentMethodAdder from "../payment_methods/PaymentMethodAdder"
import { ApiResponse } from "schemas/ApiSchema"
import ProductsSubtotal from "../products/ProductsSubtotal"
import MyInput from "components/ui/inputs/MyInput"
import SaleFormUpdater from "./SaleFormUpdater"
import SubmitButtons from "components/ui/buttons/SubmitButtons"
import { useQueryClient } from "@tanstack/react-query"

const SaleForm = ({ saleId, client, queryKey, onClose }: SaleFormProps) => {
  const toast = useToast()

  const query = useQueryClient()
  const onSubmit = async (data: Sale, reset: any): Promise<void> => {
    if (!client) return
    const PARAMS = !!saleId ? `/${saleId}` : ""
    try {
      await axios<any, AxiosResponse<ApiResponse<SaleFromDB>>>(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales${PARAMS}`,
        {
          method: !!saleId ? "PUT" : "POST",
          data: { ...data, client: client._id, comissions: client.comissions },
          withCredentials: true,
        }
      )

      queryKey && query.invalidateQueries(queryKey)
      reset()
      onClose && onClose()
    } catch (error: any) {
      toast({ title: error.response.data.message, status: "warning" })
    }
  }

  const onError = (errors: any) => console.log(errors)

  const setDefaultValues = async () => {
    if (!saleId) {
      return {
        operation_date: getDateForInput(),
        products: [],
        payment_methods: [],
      }
    }

    const { data } = await axios.get(
      `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/sales/${saleId}`,
      { withCredentials: true }
    )

    return {
      ...data.data,
      trigger_update: Math.random(), // Para que calcule al editar
      operation_date: getDateForInput(data?.data?.operation_date),
    }
  }

  return (
    <>
      <MyForm
        onSubmit={onSubmit}
        onError={onError}
        zodSchema={saleSchema} // El zodSchema define qué campos vamos a tener en el formulario
        defaultValues={setDefaultValues}
      >
        <SaleFormUpdater client_comissions={client?.comissions} />
        <ProductAdder saleId={saleId} />
        <ProductsSubtotal />
        <PaymentMethodAdder fieldName="payment_methods" saleId={saleId} />
        <MyInput<Sale>
          fieldName="referalDoc"
          label="Referido por"
          placeholder="Documento referente..."
          showIf={client?.sales?.count === 0}
        />
        <SubmitButtons<Sale> />
      </MyForm>
    </>
  )
}

export default SaleForm
