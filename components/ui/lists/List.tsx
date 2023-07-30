import { Flex, Spinner } from "@chakra-ui/react"
import NoItemsFound from "./NoItemsFound"
import { ListProps } from "schemas/UiSchemas"
import { ListGeneric } from "../../../schemas/UiSchemas"

function List<T>({
  items,
  isLoading,
  ListItem,
  filterFunction,
  isSelected,
  onItemClick,
  fdr,
  my = 4,
}: ListProps<ListGeneric<T>>) {
  if (isLoading) return <Spinner alignSelf="center" mt={20} mb={20} />
  if (!items || items?.length === 0) return <NoItemsFound />

  let finalItems = items
  if (typeof filterFunction === "function") {
    finalItems = items.filter(filterFunction)
  }

  return (
    <Flex
      flexDirection={fdr ? "row" : "column"}
      p={1}
      gap={2}
      my={my}
      maxHeight={items.length > 5 ? "40vh" : "auto"}
      overflowY={items.length > 5 ? "scroll" : "auto"}
    >
      {finalItems.map((item, index) => (
        <ListItem
          key={index}
          item={item}
          onClick={(item) => onItemClick(item, isSelected(item))}
          selected={isSelected(item)}
        />
      ))}
    </Flex>
  )
}

export default List
