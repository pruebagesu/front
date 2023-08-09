import { Flex, Text, useToast } from "@chakra-ui/react"
import axios from "axios"
import ActionButton from "components/ui/buttons/ActionButton"
import ListItemWrapper from "components/ui/lists/ListItemWrapper"
import CopyableText from "components/ui/text/CopiableText"
import { AttachmentFromDB } from "schemas/AttachmentSchema"
import { env } from "~/env.mjs"

interface Props {
  item: AttachmentFromDB
  onClick: (attachment: AttachmentFromDB) => void
  selected?: boolean
  refetch: () => void
}

const AttachmentItem = ({ item, onClick, selected, refetch }: Props) => {
  const toast = useToast()
  return (
    <Flex alignItems="center">
      <ListItemWrapper onClick={() => onClick(item)} selected={selected}>
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <CopyableText
            text={item.description}
            copyableText={item.url}
            message="Link copiado con éxito"
            fs="md"
            mb={0.25}
            mt={0.25}
          />

          <Text as="span" fontSize="xs" color="purple.400">
            {item?.file_ext}
          </Text>
        </Flex>
      </ListItemWrapper>
      <ActionButton
        action="delete"
        onClick={async () => {
          try {
            await axios.delete(
              `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/attachments/${item._id}`,
              { withCredentials: true }
            )
            await refetch()
          } catch (error: any) {
            toast({
              title: error.response.data.message,
              status: "error",
              position: "top",
            })
          }
        }}
      />
      <ActionButton
        action="download"
        onClick={async () => {
          let element = document.createElement("a")
          element.setAttribute("href", item.url)

          element.style.display = "none"
          document.body.appendChild(element)

          element.click()

          document.body.removeChild(element)
        }}
        fakeDelay={500}
      />
    </Flex>
  )
}

export default AttachmentItem
