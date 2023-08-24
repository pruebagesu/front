import { Flex, Heading, useToast } from "@chakra-ui/react"
import MyForm from "components/ui/forms/MyForm"
import { Attachment, AttachmentSchema } from "../../../schemas/AttachmentSchema"
import axios, { AxiosResponse } from "axios"
import { ApiResponse } from "schemas/ApiSchema"
import { env } from "~/env.mjs"
import MyFileInput from "components/ui/inputs/MyFileInput"
import List from "components/ui/lists/List"
import AttachmentItem from "./AttachmentItem"
import { useQueryClient } from "@tanstack/react-query"
import SubmitButtons from "components/ui/buttons/SubmitButtons"
import MyInput from "components/ui/inputs/MyInput"

interface AttachmentsProps {
  entity: "product" | "client" | "sale"
  entityId: string | undefined
}

const Attachments = ({ entity, entityId }: AttachmentsProps) => {
  const toast = useToast()
  const query = useQueryClient()
  const queryKey = `attachments/${entityId}`
  const onSubmit = async (state: Attachment, reset: () => void) => {
    console.log({ file: state.file })
    if (!state.file["0"]) {
      toast({
        title: "Debe seleccionar un archivo",
        status: "warning",
        position: "top",
      })
      return
    }
    const formData = new FormData()
    formData.append("image", state.file[0])
    formData.append("description", state.description)
    try {
      await axios<any, AxiosResponse<ApiResponse<any>>>(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/attachments/${entity}/${entityId}`,
        {
          method: "POST",
          data: formData,
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
      <Heading size="md" mb="2">
        Adjuntar nuevo archivo
      </Heading>
      <MyForm
        zodSchema={AttachmentSchema}
        onSubmit={onSubmit} // Si no ponemos nada, es "" y pasa la validación de ser String
        onError={() => console.log("Error")}
        closeModal={false}
      >
        <MyFileInput />
        <MyInput<Attachment>
          fieldName="description"
          placeholder="Descripción del adjunto..."
          label="Descripción"
          mb={0}
          mt={4}
        />
        <SubmitButtons
          submitText="Adjuntar"
          justSubmit
          mt="5"
          onSuccessMessage="Archivo adjuntado con éxito"
        />
      </MyForm>

      <List
        path={queryKey}
        ListItem={AttachmentItem}
        title={"Archivos adjuntos"}
      />
    </Flex>
  )
}

export default Attachments
