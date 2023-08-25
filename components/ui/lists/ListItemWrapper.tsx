import { Card } from "@chakra-ui/react"
import { ReactNode } from "react"

interface Props {
  onClick: () => void
  selected: boolean | undefined
  children: ReactNode
  w?: string
}

const ListItemWrapper = ({
  onClick,
  selected,
  children,
  w = "100%",
}: Props) => {
  return (
    <Card
      py={2}
      px={4}
      cursor="pointer"
      bg={selected ? "gray.100" : "white"}
      color="black"
      _hover={
        selected
          ? {}
          : {
              backgroundColor: "gray.100",
              color: "#222",
            }
      }
      _focus={{ backgroundColor: "gray.100" }}
      onClick={onClick}
      width={w}
      flexDir="row"
      alignItems="center"
      justifyContent="space-between"
    >
      {children}
    </Card>
  )
}

export default ListItemWrapper
