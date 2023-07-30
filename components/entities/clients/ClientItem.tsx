import { Flex, Text, useToast } from "@chakra-ui/react"
import ListItemWrapper from "components/ui/lists/ListItemWrapper"
import { copyToClipboard } from "helpers/copyToClipboard"
import { ClientFromDB } from "schemas/ClientSchema"

interface Props {
  item: ClientFromDB
  onClick: (client: ClientFromDB) => void
  selected?: boolean
}

const ClientItem = ({ item, onClick, selected }: Props) => {
  const noSales = item.sales?.count === 0 || !item.sales?.count
  const s = item.sales?.count === 1 ? "" : "s"
  const toast = useToast()
  console.log({ item })
  return (
    <ListItemWrapper onClick={() => onClick(item)} selected={selected}>
      <Flex flexDir="column">
        <Text>
          {item.firstname} {item.lastname}
        </Text>
        <Text
          fontSize="xs"
          display="inline"
          color="blue.400"
          _hover={{ color: "green.400" }}
          onClick={(e) =>
            copyToClipboard({
              e,
              text: item.document_value,
              toast,
            })
          }
        >
          {item.document_value}{" "}
          <Text as="span" fontSize="xs" display="inline" color="gray">
            ({item.document_type})
          </Text>
        </Text>
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
