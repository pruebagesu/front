import { Flex } from "@chakra-ui/react"
import MyForm from "components/ui/forms/MyForm"
import MyInput from "components/ui/inputs/MyInput"
import MySelect from "components/ui/selects/MySelect"
import {
  PAYMENT_METHOD_TYPES,
  PaymentMethod,
  TIME_UNITS,
  salePaymentMethodSchema,
} from "schemas/SaleSchema"
import { useFieldArray, useFormContext } from "react-hook-form"
import SubmitButtons from "components/ui/buttons/SubmitButtons"

const PaymentMethodForm = () => {
  const { control, watch } = useFormContext()

  const { append } = useFieldArray({ control, name: "payment_methods" })
  const total = watch("total")
  const paymentMethods = (watch("payment_methods") as PaymentMethod[]) || []

  const totalPM = paymentMethods?.reduce((acc, curr) => acc + curr.amount, 0)

  return (
    <MyForm<PaymentMethod>
      zodSchema={salePaymentMethodSchema}
      onSubmit={() => {}}
      onError={(data) => console.log({ data })}
      defaultValues={{
        method: "Sin utilización Sist. Financiero",
        amount: +(total - totalPM).toFixed(2),
        time_value: 0,
        time_unit: "Meses",
      }}
    >
      <Flex flexDir="column" gap={3} mb={5}>
        <MySelect
          fieldName="method"
          label="Método"
          options={PAYMENT_METHOD_TYPES}
        />
        <MyInput<PaymentMethod>
          fieldName="amount"
          label="Valor"
          mb={0}
          valueAsNumber
        />
        <MyInput<PaymentMethod>
          fieldName="time_value"
          label="Plazo"
          mb={0}
          valueAsNumber
          showIf={["method", "Tarjeta de crédito"]}
        />
        <MySelect<PaymentMethod>
          fieldName="time_unit"
          label="Período"
          options={Object.keys(TIME_UNITS.Enum)}
          showIf={["method", "Tarjeta de crédito"]}
        />
      </Flex>
      <SubmitButtons<PaymentMethod>
        submitText="Agregar"
        shouldClose
        shouldSubmit={false}
        onClick={({ formValues, setError }) => {
          const { time_value, time_unit, ...cleanedPM } = formValues
          const pmToAppend =
            formValues.method === "Tarjeta de crédito" ? formValues : cleanedPM
          if (cleanedPM.amount <= 0) {
            setError("amount", { message: "El valor debe ser mayor a 0" })
            return
          }
          append && append(pmToAppend)
        }}
      />
    </MyForm>
  )
}

export default PaymentMethodForm
