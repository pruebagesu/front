import { Badge, Flex, Text } from "@chakra-ui/react"
import calcProductPrice from "helpers/calcProductPrice"
import { ProductFromDB } from "schemas/ProductSchema"
import getProductDiscount from "../../../helpers/getProductDiscount"
import ListItemWrapper from "components/ui/lists/ListItemWrapper"
import CopyableText from "components/ui/text/CopiableText"

interface Props {
  item: ProductFromDB
  onClick: (product: ProductFromDB) => void
  selected?: boolean
}

const ProductItem = ({ item, onClick, selected }: Props) => {
  const productPrice = calcProductPrice(item, true)
  const { discount, formattedDiscount } = getProductDiscount(item)

  return (
    <ListItemWrapper onClick={() => onClick(item)} selected={selected}>
      <Flex flexDir="column">
        <Flex alignItems="center">
          <Text>{item.name}</Text>
          {item.sold && (
            <Badge ml="3" colorScheme="green" fontSize="xs">
              SOLD
            </Badge>
          )}
        </Flex>
        <CopyableText text={item.code} />
      </Flex>
      <Flex flexDir="column" alignItems="flex-end">
        <Text>$ {productPrice || 0}</Text>
        {discount > 0 && (
          <Text color="red.400" fontSize="xs">
            {formattedDiscount}
          </Text>
        )}
      </Flex>
    </ListItemWrapper>
  )
}

export default ProductItem
