import { Flex, Spinner } from "@chakra-ui/react"
import NoItemsFound from "./NoItemsFound"

interface Props<T> {
  items: T[] | undefined
  isLoading: Boolean
  ListItem: ({ product, onClick, selected }: Item<T>) => JSX.Element
  selectedItem: T | null | undefined
  onItemClick: (item: T | undefined) => void
  isSelected: (item: T | undefined) => boolean
}

interface Item<T> {
  product: T
  onClick: (product: T) => void
  selected?: boolean
}

function List<T extends { _id?: string }>({
  items,
  isLoading,
  ListItem,
  isSelected,
  onItemClick,
}: Props<T>) {
  if (isLoading) return <Spinner alignSelf="center" mt={20} mb={20} />
  if (!items) return <NoItemsFound />

  return (
    <Flex
      flexDirection="column"
      p={1}
      gap={2}
      my={4}
      maxHeight="40vh"
      overflowY="scroll"
    >
      {items.map((item, index) => (
        <ListItem
          key={index}
          product={item}
          onClick={(item) => onItemClick(item)}
          selected={isSelected(item)}
        />
      ))}
    </Flex>
  )
}

export default List
