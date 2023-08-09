import { z } from "zod"
import { UserBasicInfo } from "./AuthSchema"

export const AttachmentSchema = z.object({
  file: z.any().refine((val) => val?.length !== 0, {
    message: "Debes seleccionar un archivo",
  }),
  description: z
    .string({ required_error: "Debes indicar una descripción" })
    .min(4, "Mínimo 4 caracteres")
    .max(30, "Máximo 30 caracteres"),
})

export interface AttachmentFromDB {
  _id: string
  description: string
  file_name: string
  file_size: number
  file_ext: string
  entity_id: string
  url: string
  creatorInfo: UserBasicInfo
  deleterInfo?: UserBasicInfo
}

export type Attachment = z.infer<typeof AttachmentSchema>
