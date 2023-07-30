import { Flex, Text } from "@chakra-ui/react"
import ListItemWrapper from "components/ui/lists/ListItemWrapper"
import { SaleFromDB } from "schemas/SaleSchema"

interface Props {
  item: SaleFromDB
  onClick: (sale: SaleFromDB) => void
  selected?: boolean
}

const SaleItem = ({ item, onClick, selected }: Props) => {
  return (
    <ListItemWrapper onClick={() => onClick(item)} selected={selected}>
      <Text>
        {item.client.firstname} {item.client.lastname}
      </Text>
      <Flex flexDir="column" alignItems="flex-end">
        <Text>$ {item.total_amount?.toFixed(2) || 0}</Text>
      </Flex>
    </ListItemWrapper>
  )
}

export default SaleItem
