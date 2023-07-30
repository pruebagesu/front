import { Card, Flex, Text } from "@chakra-ui/react"
import getMonthName from "helpers/getMonthName"
import { SummarySaleFromDB } from "schemas/SaleSchema"

interface Props {
  item: SummarySaleFromDB
  onClick: (item: SummarySaleFromDB, selected?: boolean) => void
  selected?: boolean
}

const SaleSummaryItem = ({ item, onClick, selected }: Props) => {
  const { day, month, year } = item._id
  return (
    <Card
      key={`${day}${month}${year}`}
      width="auto"
      colorScheme="blue"
      py={1}
      px={2}
      onClick={() => onClick(item, selected)}
      bg={selected ? "gray.100" : "white"}
      _hover={{
        cursor: "pointer",
        backgroundColor: "gray.100",
      }}
    >
      <Flex flexDir="column" alignItems="center">
        <Text>{getMonthName(item._id.month - 1)}</Text>
        <Text color="green.400">${item.sales.toFixed(2)}</Text>
      </Flex>
    </Card>
  )
}

export default SaleSummaryItem
