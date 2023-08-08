import { Text, useToast } from "@chakra-ui/react"
import { copyToClipboard } from "helpers/copyToClipboard"

const CopyableText = ({
  text,
  copyableText = text,
  aclaration,
  message,
  fs = "xs",
  mt = 0,
  mb = 0,
}: {
  text: string
  copyableText?: string
  aclaration?: string
  message?: string
  fs?: string
  mt?: number
  mb?: number
}) => {
  const toast = useToast()
  return (
    <Text
      fontSize={fs}
      mt={mt}
      mb={mb}
      display="inline"
      width="fit-content"
      color="blue.400"
      _hover={{ color: "green.400" }}
      onClick={(e) =>
        copyToClipboard({
          e,
          text: copyableText,
          toast,
          message,
        })
      }
    >
      {text}
      {aclaration && (
        <Text as="span" fontSize="xs" display="inline" color="gray" ml={1.5}>
          ({aclaration})
        </Text>
      )}
    </Text>
  )
}

export default CopyableText
