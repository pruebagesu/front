import { z } from "zod"
import { UserBasicInfo } from "./AuthSchema"

export const CommentSchema = z.object({
  text: z
    .string()
    .min(4, "Mínimo 4 caracteres")
    .max(120, "Máximo 120 caracteres"),
})

export interface CommentFromDB {
  _id: string
  text: string
  creatorInfo: UserBasicInfo
  deleterInfo?: UserBasicInfo
}

export type Comment = z.infer<typeof CommentSchema>
