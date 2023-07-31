import { useFormContext } from "react-hook-form"
import { useEffect } from "react"
import { Sale } from "schemas/SaleSchema"
import productSummary, { defaultProductSummary } from "helpers/productSummary"

const SaleFormUpdater = ({ client_comissions = 0 }) => {
  const { setValue, watch, getValues } = useFormContext<Sale>()
  const trigger = watch("trigger_update")

  useEffect(() => {
    const products = getValues("products")
    const { subtotal, totalIva, discounts } = products.reduce(
      productSummary,
      defaultProductSummary
    )

    setValue("subtotal", subtotal)
    setValue("totalIva", totalIva)
    setValue("discounts", discounts)
    setValue("client_comissions", client_comissions)
    const totalBeforeComissions = subtotal + totalIva - discounts
    const finalComissions = Math.min(totalBeforeComissions, client_comissions)
    const total = totalBeforeComissions - finalComissions
    setValue("total", total)
  }, [trigger])

  return <></>
}

export default SaleFormUpdater
