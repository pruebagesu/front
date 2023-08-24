import { Flex, useToast } from "@chakra-ui/react"
import axios from "axios"
import ActionButton from "components/ui/buttons/ActionButton"
import ListItemWrapper from "components/ui/lists/ListItemWrapper"
import CopyableText from "components/ui/text/CopiableText"
import { CommentFromDB } from "schemas/CommentSchema"
import { env } from "~/env.mjs"

interface Props {
  item: CommentFromDB
  onClick: (attachment: CommentFromDB) => void
  selected?: boolean
  refetch: () => void
}

const CommentItem = ({ item, onClick, selected, refetch }: Props) => {
  const toast = useToast()
  return (
    <Flex alignItems="center">
      <ListItemWrapper onClick={() => onClick(item)} selected={selected}>
        <Flex width="100%" justifyContent="space-between" alignItems="center">
          <CopyableText
            text={item.text}
            copyableText={item.text}
            message="Comentario copiado con éxito"
            fs="md"
            mb={0.25}
            mt={0.25}
          />
        </Flex>
      </ListItemWrapper>
      <ActionButton
        action="delete"
        onClick={async () => {
          try {
            await axios.delete(
              `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/comments/${item._id}`,
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
    </Flex>
  )
}

export default CommentItem
