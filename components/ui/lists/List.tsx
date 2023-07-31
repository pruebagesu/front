import { Flex, Heading } from "@chakra-ui/react"
import NoItemsFound from "./NoItemsFound"
import { ListProps } from "schemas/UiSchemas"
import { ListGeneric } from "../../../schemas/UiSchemas"
import MySpinner from "../spinners/MySpinner"

function List<T>({
  items,
  isLoading,
  ListItem,
  filterFunction,
  isSelected,
  onItemClick,
  title,
  fdr,
  my = 4,
}: ListProps<ListGeneric<T>>) {
  if (isLoading) return <MySpinner />
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
      {title && <Heading>{title}</Heading>}
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
