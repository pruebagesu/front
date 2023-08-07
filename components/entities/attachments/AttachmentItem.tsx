import { Flex, Text } from "@chakra-ui/react"
import ListItemWrapper from "components/ui/lists/ListItemWrapper"
import CopyableText from "components/ui/text/CopiableText"
import { AttachmentFromDB } from "schemas/AttachmentSchema"

interface Props {
  item: AttachmentFromDB
  onClick: (attachment: AttachmentFromDB) => void
  selected?: boolean
}

const AttachmentItem = ({ item, onClick, selected }: Props) => {
  return (
    <ListItemWrapper onClick={() => onClick(item)} selected={selected}>
      <Flex flexDir="column">
        <Text
          overflow="hidden"
          textOverflow="ellipsis"
          width="20rem"
          maxWidth="50%"
          whiteSpace="nowrap"
          title={item.file_name}
        >
          {item.file_name}
        </Text>
        <CopyableText
          text="Copiar link"
          copyableText={item.url}
          message="Link copiado con éxito!"
        />
      </Flex>
      <Flex flexDir="column" alignItems="flex-end">
        <Text as="span" fontSize="xs" color="purple.400">
          {item?.file_ext}
        </Text>
      </Flex>
    </ListItemWrapper>
  )
}

export default AttachmentItem
