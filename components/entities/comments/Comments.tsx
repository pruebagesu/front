import { Flex, Heading, useToast } from "@chakra-ui/react"
import MyForm from "components/ui/forms/MyForm"
import axios, { AxiosResponse } from "axios"
import { ApiResponse } from "schemas/ApiSchema"
import { env } from "~/env.mjs"
import List from "components/ui/lists/List"
import CommentItem from "./CommentItem"
import { useQueryClient } from "@tanstack/react-query"
import SubmitButtons from "components/ui/buttons/SubmitButtons"
import MyInput from "components/ui/inputs/MyInput"
import { Comment, CommentSchema } from "schemas/CommentSchema"

interface CommentsProps {
  entity: "product" | "client" | "sale"
  entityId: string | undefined
}

const Comments = ({ entity, entityId }: CommentsProps) => {
  const toast = useToast()
  const query = useQueryClient()
  const queryKey = `comments/${entityId}`
  const onSubmit = async (state: Comment, reset: () => void) => {
    try {
      await axios<any, AxiosResponse<ApiResponse<any>>>(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/comments/${entity}/${entityId}`, // Misma ruta que el GET
        {
          method: "POST",
          data: { text: state.text },
          withCredentials: true,
        }
      )
      reset()
      query.invalidateQueries([queryKey])
    } catch (error: any) {
      toast({
        title: error.response.data.message,
        status: "warning",
        position: "top",
      })
    }
  }

  return (
    <Flex flexDir="column">
      <Heading size="md">Agregar nuevo comentario</Heading>
      <MyForm
        zodSchema={CommentSchema}
        onSubmit={onSubmit} // Si no ponemos nada, es "" y pasa la validación de ser String
        onError={() => console.log("Error")}
        closeModal={false}
      >
        <MyInput<Comment>
          fieldName="text"
          placeholder="Escribe un comentario..."
          label="Comentario"
          mb={0}
          mt={4}
        />
        <SubmitButtons
          submitText="Comentar"
          justSubmit
          mt="5"
          onSuccessMessage="Comentario agregado con éxito"
        />
      </MyForm>

      <List path={queryKey} ListItem={CommentItem} title={"Comentarios"} />
    </Flex>
  )
}

export default Comments
