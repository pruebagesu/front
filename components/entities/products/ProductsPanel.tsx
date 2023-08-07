import { Flex, TabPanel } from "@chakra-ui/react"
import { useState } from "react"
import SearchForm from "components/ui/forms/SearchForm"
import List from "components/ui/lists/List"
import ProductItem from "./ProductItem"
import { ProductFromDB } from "schemas/ProductSchema"
import ProductForm from "./ProductForm"
import MyModal from "components/ui/modals/MyModal"
import paramsGenerator from "helpers/paramsGenerator"
import SaleItem from "../sales/SaleItem"
import { SaleFromDB } from "schemas/SaleSchema"
import Attachments from "../attachments/Attachments"

const ProductsPanel = () => {
  const [selectedProduct, setSelectedProduct] = useState<ProductFromDB | null>()
  const [searchText, setSearchText] = useState("")

  const params = { toSell: false, searchText }
  const fetchPath = "products"
  const PARAMS = paramsGenerator({ ...params, searchText })
  const queryKey = [fetchPath, PARAMS]

  return (
    <TabPanel p={0}>
      <Flex>
        <SearchForm
          placeholder="Buscar producto..."
          setSearchText={setSearchText}
        />
        <MyModal
          title="Nuevo producto"
          icon="fas fa-plus"
          colorScheme="green"
          ml={3}
        >
          <ProductForm />
        </MyModal>
      </Flex>

      <List
        path={fetchPath}
        params={PARAMS}
        ListItem={ProductItem}
        isSelected={(p) => p?._id === selectedProduct?._id}
        onItemClick={(p) => {
          const valueToSet = p?._id === selectedProduct?._id ? null : p
          setSelectedProduct(valueToSet)
        }}
      />

      <Flex>
        <MyModal
          tabs={[
            {
              icon: "fas fa-dollar",
              text: "Venta",
              component: (
                <List<SaleFromDB>
                  path={`sales/product/${selectedProduct?._id}`}
                  ListItem={({ item, onClick, selected }) => (
                    <SaleItem
                      item={item}
                      onClick={onClick}
                      selected={selected}
                    />
                  )}
                  my={0}
                />
              ),
            },
            {
              icon: "fas fa-paperclip",
              text: "Adjuntos",
              component: (
                <Attachments entity="product" entityId={selectedProduct?._id} />
              ),
            },
          ]}
          buttonText="Ver producto"
          mr={2}
          disableButton={!selectedProduct}
        />
        <MyModal
          title={`Replicar ${selectedProduct?.name || ""}`}
          mr={2}
          colorScheme="green"
          disableButton={!selectedProduct}
        >
          <ProductForm
            productId={selectedProduct?._id}
            submitText="Replicar"
            queryKey={queryKey}
          />
        </MyModal>
      </Flex>
    </TabPanel>
  )
}

export default ProductsPanel
