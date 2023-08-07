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

interface AttachmentsProps {
  entity: "product" | "client" | "sale"
  entityId: string | undefined
}

const Attachments = ({ entity, entityId }: AttachmentsProps) => {
  const toast = useToast()
  const query = useQueryClient()
  const queryKey = `attachments/${entity}/${entityId}`
  const onSubmit = async (state: Attachment, reset: () => void) => {
    if (state.file.length === 0) {
      toast({
        title: "Debe seleccionar un archivo",
        status: "warning",
        position: "top",
      })
      return
    }
    const formData = new FormData()
    formData.append("image", state.file[0])
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
      console.log({ error })
      toast({ title: error.response.data.message, status: "warning" })
    }
  }

  return (
    <Flex flexDir="column">
      <Heading size="md" mb="2">
        Nuevo archivo
      </Heading>
      <MyForm
        zodSchema={AttachmentSchema}
        onSubmit={onSubmit}
        onError={() => console.log("Error")}
        closeModal={false}
      >
        <MyFileInput />
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
        onItemClick={async (a, _, refetch) => {
          await axios.delete(
            `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/attachments/${a._id}`,
            { withCredentials: true }
          )
          refetch()
        }}
        isSelected={() => false}
      />
    </Flex>
  )
}

export default Attachments
