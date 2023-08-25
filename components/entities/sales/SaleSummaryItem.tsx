import { Flex, Text } from "@chakra-ui/react"
import ListItemWrapper from "components/ui/lists/ListItemWrapper"
import getMonthName from "helpers/getMonthName"
import { SummarySaleFromDB } from "schemas/SaleSchema"

interface Props {
  item: SummarySaleFromDB
  onClick: (item: SummarySaleFromDB, selected?: boolean) => void
  selected?: boolean
}

const SaleSummaryItem = ({ item, onClick, selected }: Props) => {
  return (
    <ListItemWrapper
      onClick={() => onClick(item, selected)}
      selected={selected}
      w="auto"
    >
      <Flex flexDir="column" alignItems="center">
        <Text>{getMonthName(item._id.month - 1)}</Text>
        <Text color="green.400">${item.sales.toFixed(2)}</Text>
      </Flex>
    </ListItemWrapper>
  )
}

export default SaleSummaryItem
