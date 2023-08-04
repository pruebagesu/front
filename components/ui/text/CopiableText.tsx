import { Text, useToast } from "@chakra-ui/react"
import { copyToClipboard } from "helpers/copyToClipboard"

const CopyableText = ({
  text,
  aclaration,
}: {
  text: string
  aclaration?: string
}) => {
  const toast = useToast()
  return (
    <Text
      fontSize="xs"
      display="inline"
      color="blue.400"
      _hover={{ color: "green.400" }}
      onClick={(e) =>
        copyToClipboard({
          e,
          text,
          toast,
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
