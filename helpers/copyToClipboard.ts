import { UseToastOptions } from "@chakra-ui/react"

interface Props {
  e: MouseEvent | any
  text: string
  message?: string
  toast: (options: UseToastOptions) => void
}

export const copyToClipboard = ({ e, text, toast, message }: Props) => {
  e.stopPropagation()
  navigator.clipboard.writeText(text)
  toast({
    position: "top",
    title: message || `Valor copiado ${text}`,
    status: "success",
    duration: 1500,
  })
}
