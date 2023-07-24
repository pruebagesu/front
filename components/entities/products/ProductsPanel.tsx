import { Flex, TabPanel } from "@chakra-ui/react"
import { useState } from "react"
import SearchForm from "components/ui/forms/SearchForm"
import List from "components/ui/lists/List"
import ProductItem from "./ProductItem"
import { ProductFromDB } from "schemas/ProductSchema"
import ProductForm from "./ProductForm"
import MyModal from "components/ui/modals/MyModal"
import useFetch from "hooks/useFetch"

const ProductsPanel = () => {
  const [selectedItem, setSelectedItem] = useState<ProductFromDB | null>()
  const { data, isLoading, refetch, setSearchText } = useFetch<ProductFromDB>({
    path: "products",
    params: { toSell: false },
  })

  return (
    <TabPanel p={0}>
      <SearchForm
        placeholder="Buscar producto..."
        setSearchText={setSearchText}
      />

      <List
        items={data}
        isLoading={isLoading}
        ListItem={ProductItem}
        selectedItem={selectedItem}
        setSelectedItem={setSelectedItem}
      />

      <Flex>
        <MyModal
          title={(selectedItem ? "Editar " : "Nuevo ") + "producto"}
          mr={2}
        >
          <ProductForm productId={selectedItem?._id} refetch={refetch} />
        </MyModal>
        <MyModal
          title={`Replicar ${selectedItem?.name || ""}`}
          mr={2}
          colorScheme="green"
          disableButton={!selectedItem}
        >
          <ProductForm
            productId={selectedItem?._id}
            refetch={refetch}
            submitText="Replicar"
          />
        </MyModal>
      </Flex>
    </TabPanel>
  )
}

export default ProductsPanel
