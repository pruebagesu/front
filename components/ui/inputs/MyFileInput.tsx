import { Flex, FormControl, FormErrorMessage } from "@chakra-ui/react"
import { ReactNode } from "react"
import { useFormContext } from "react-hook-form"

function MyFileInput({ fieldName = "file" }) {
  const {
    formState: { errors },
    register,
  } = useFormContext()

  return (
    <FormControl isInvalid={!!errors[fieldName as string]}>
      <Flex gap={2}>
        <input type="file" {...register(fieldName as string)} />
      </Flex>
      <FormErrorMessage mt={1}>
        {errors[fieldName]?.message as ReactNode}
      </FormErrorMessage>
    </FormControl>
  )
}

export default MyFileInput
