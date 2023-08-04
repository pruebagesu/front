import { Flex, Text } from "@chakra-ui/react"
import ListItemWrapper from "components/ui/lists/ListItemWrapper"
import CopyableText from "components/ui/text/CopiableText"
import { SaleFromDB } from "schemas/SaleSchema"

interface Props {
  item: SaleFromDB
  onClick: (sale: SaleFromDB) => void
  selected?: boolean
  fromClient?: boolean
}

const SaleItem = ({ item, onClick, selected, fromClient }: Props) => {
  return (
    <ListItemWrapper onClick={() => onClick(item)} selected={selected}>
      {!fromClient && (
        <Text>
          {item.client.firstname} {item.client.lastname}
        </Text>
      )}
      {fromClient && (
        <Flex flexDir="column">
          {item.products.map((p) => (
            <Flex key={p.code} alignItems="center">
              <Text mr={3}>{p.name}</Text>
              <CopyableText text={p.code} />
            </Flex>
          ))}
        </Flex>
      )}
      <Flex flexDir="column" alignItems="flex-end">
        <Text>$ {item.total_amount?.toFixed(2) || 0}</Text>
      </Flex>
    </ListItemWrapper>
  )
}

export default SaleItem
