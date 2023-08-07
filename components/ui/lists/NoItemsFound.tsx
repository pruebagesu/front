import { Flex, Heading, Text } from "@chakra-ui/react"

const NoItemsFound = ({ title = "", mt = 5 }) => {
  return (
    <Flex flexDir="column" mt={mt}>
      {title && <Heading size="md">{title}</Heading>}
      <Text mt={5} mb={25} textAlign="center">
        No se encontraron registros en la base de datos
      </Text>
    </Flex>
  )
}

export default NoItemsFound
