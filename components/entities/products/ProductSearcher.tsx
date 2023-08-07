import { Button, useModalContext } from "@chakra-ui/react"
import { useState } from "react"
import { ProductFromDB } from "schemas/ProductSchema"
import { useFieldArray, useFormContext } from "react-hook-form"
import calcProductPrice from "helpers/calcProductPrice"
import { Sale } from "schemas/SaleSchema"
import SearchForm from "components/ui/forms/SearchForm"
import List from "components/ui/lists/List"
import ProductItem from "./ProductItem"
import paramsGenerator from "helpers/paramsGenerator"

const ProductSearcher = () => {
  const { control, setValue, watch } = useFormContext<Sale>()
  const { onClose } = useModalContext()
  const { append } = useFieldArray({ control, name: "products" })
  const [selectedProducts, setSelectedProducts] = useState<ProductFromDB[]>([])
  const [searchText, setSearchText] = useState("")

  const params = { toSell: true }
  const fetchPath = "products"
  const PARAMS = paramsGenerator({ ...params, searchText })

  const handleClick = (p: ProductFromDB) => {
    const alreadyIncluded = selectedProducts.some((sp) => sp._id === p._id)
    if (!alreadyIncluded) {
      setSelectedProducts([...selectedProducts, p])
    } else {
      setSelectedProducts(selectedProducts.filter((prod) => prod._id !== p._id))
    }
  }

  const handleSelect = () => {
    for (const product of selectedProducts) {
      const unit_price = calcProductPrice(product)
      const { code, name, iva, discount, _id } = product

      append({
        _id,
        code,
        name,
        iva,
        discount,
        unit_price,
      })
    }
    setValue("trigger_update", Math.random())
    onClose()
  }
  const addedProducts = watch("products")

  return (
    <div>
      <SearchForm
        setSearchText={setSearchText}
        placeholder="Buscar por código..."
      />
      <List
        path={fetchPath}
        params={PARAMS}
        filterFunction={(p) => !addedProducts.find((ap) => ap.code === p.code)}
        ListItem={ProductItem}
        onItemClick={(p) => handleClick(p)}
        isSelected={(p) => selectedProducts?.some((sp) => sp._id === p?._id)}
      />
      <Button
        colorScheme="purple"
        isDisabled={selectedProducts.length === 0}
        onClick={handleSelect}
      >
        Finalizar selección
      </Button>
      <Button colorScheme="gray" onClick={() => onClose()} ml={3}>
        Cerrar
      </Button>
    </div>
  )
}

export default ProductSearcher
