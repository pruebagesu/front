import { Flex, Text } from "@chakra-ui/react"
import ListItemWrapper from "components/ui/lists/ListItemWrapper"
import CopyableText from "components/ui/text/CopiableText"
import { ClientFromDB } from "schemas/ClientSchema"

interface Props {
  item: ClientFromDB
  onClick: (client: ClientFromDB) => void
  selected?: boolean
}

const ClientItem = ({ item, onClick, selected }: Props) => {
  const noSales = item.sales?.count === 0 || !item.sales?.count
  const s = item.sales?.count === 1 ? "" : "s"

  return (
    <ListItemWrapper onClick={() => onClick(item)} selected={selected}>
      <Flex flexDir="column">
        <Text>
          {item.firstname} {item.lastname}
        </Text>
        <CopyableText
          text={item.document_value}
          aclaration={item.document_type}
        />
      </Flex>
      <Flex flexDir="column" alignItems="flex-end">
        {noSales ? (
          <Text color="red.600">Sin ventas</Text>
        ) : (
          <Text color="green" title={`${item.sales?.count} venta${s}`}>
            $ {item.sales?.amount?.toFixed(2)}
          </Text>
        )}
        {(item?.comissions || 0) > 0 && (
          <Text as="span" fontSize="xs" color="purple.400">
            ${item?.comissions} en comisiones
          </Text>
        )}
      </Flex>
    </ListItemWrapper>
  )
}

export default ClientItem
