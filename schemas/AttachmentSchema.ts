import { z } from "zod"

export const AttachmentSchema = z.object({
  file: z.any(),
})

export interface AttachmentFromDB {
  _id: string
  file_name: string
  file_size: number
  file_ext: string
  entity_id: string
  url: string
}

export type Attachment = z.infer<typeof AttachmentSchema>
