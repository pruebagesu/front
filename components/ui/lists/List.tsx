import { Flex, Heading } from "@chakra-ui/react"
import NoItemsFound from "./NoItemsFound"
import { ListProps } from "schemas/UiSchemas"
import MySpinner from "../spinners/MySpinner"
import useFetch from "hooks/useFetch"

function List<T>({
  ListItem,
  filterFunction,
  isSelected,
  onItemClick,
  path,
  params = "", // sino viaja "undefined" y el useFetch no funciona
  title,
  fdr,
  my = 4,
}: ListProps<T>) {
  const {
    data: items,
    isLoading,
    refetch,
  } = useFetch<T>({
    path,
    params,
    refetchOnMount: true,
    staleTime: 0,
  })
  if (isLoading) return <MySpinner />
  if (!items || items?.length === 0) return <NoItemsFound title={title} />

  let finalItems = items
  if (typeof filterFunction === "function") {
    finalItems = items.filter(filterFunction)
  }

  const isClickable = onItemClick && isSelected

  return (
    <Flex
      flexDirection={fdr ? "row" : "column"}
      p={1}
      gap={2}
      my={my}
      maxHeight={items.length > 5 ? "40vh" : "auto"}
      overflowY={items.length > 5 ? "scroll" : "auto"}
    >
      {title && <Heading size="md">{title}</Heading>}
      {finalItems.map((item, index) => (
        <ListItem
          key={index}
          item={item}
          onClick={(item) =>
            isClickable && onItemClick(item, isSelected(item), refetch)
          }
          refetch={refetch}
          selected={isClickable && isSelected(item)}
        />
      ))}
    </Flex>
  )
}

export default List
