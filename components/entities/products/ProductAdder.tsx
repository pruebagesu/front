import { Flex, Heading, Text } from "@chakra-ui/react"
import MyDeleteIcon from "components/ui/icons/MyDeleteIcon"
import { useFormContext } from "react-hook-form"
import { ProductForState, Sale } from "schemas/SaleSchema"
import ProductSubtotal from "./ProductSubtotal"
import getProductDiscount from "helpers/getProductDiscount"
import MyModal from "components/ui/modals/MyModal"
import ProductSearcher from "./ProductSearcher"
import CopyableText from "components/ui/text/CopiableText"

function ProductAdder({ saleId = "" }) {
  const { watch } = useFormContext<Sale>()
  const products = watch("products")

  return (
    <Flex flexDir="column" alignItems="flex-start">
      <Flex alignItems="center" w="100%" justifyContent="space-between" mb={3}>
        <Heading size="lg" m={0}>
          Productos
        </Heading>
        {!saleId && (
          <MyModal title="Elegir productos" buttonText="Agregar" size="xs">
            <ProductSearcher />
          </MyModal>
        )}
      </Flex>
      {(!products || products?.length === 0) && (
        <Text w="100%" mb={5} textAlign="center">
          No se ha agregado ningún producto
        </Text>
      )}
      {products.map((product: ProductForState, index: number) => (
        <Flex
          key={index}
          gap={3}
          alignItems="center"
          justifyContent="space-between"
          mb={2}
          width="100%"
        >
          {!saleId && <MyDeleteIcon<Sale> fieldName="products" index={index} />}
          <Flex flexDir="column" flex={6}>
            <Flex gap={2} mb={-0.5}>
              <Text>{product.name}</Text>
            </Flex>
            <Flex>
              <CopyableText text={product.code} />
              {getProductDiscount(product).discount > 0 && (
                <Text fontSize="xs" color="red.400">
                  {getProductDiscount(product).formattedDiscount}
                </Text>
              )}
            </Flex>
          </Flex>

          <ProductSubtotal index={index} flex={3} />
        </Flex>
      ))}
    </Flex>
  )
}

export default ProductAdder
