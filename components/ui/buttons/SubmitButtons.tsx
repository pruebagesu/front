import {
  Button,
  ButtonGroup,
  Spinner,
  useModalContext,
  useToast,
} from "@chakra-ui/react"
import { FieldValues, useFormContext, UseFormSetError } from "react-hook-form"
type ClickParams<T extends FieldValues> = {
  formValues: T
  setError: UseFormSetError<T>
}

interface Props<T extends FieldValues> {
  onClick?: ({ formValues, setError }: ClickParams<T>) => void
  editing?: boolean
  submitText?: string
  onSuccessMessage?: string
  shouldClose?: boolean
  shouldSubmit?: boolean
  justSubmit?: boolean
  mt?: number | string
  mb?: number | string
}

const SubmitButtons = <T extends FieldValues>({
  onClick,
  editing = false,
  submitText,
  shouldClose = false,
  justSubmit = false,
  onSuccessMessage,
  mt = 0,
  mb = 0,
}: Props<T>) => {
  const { getValues, setError, formState } = useFormContext<T>()
  const { onClose } = useModalContext()
  const formValues = getValues()
  const toast = useToast()

  let finalText = !!editing ? "Guardar cambios" : "Crear"
  if (submitText) {
    finalText = submitText
  }

  const handleClick = () => {
    if (!!onClick) {
      onClick({ formValues, setError })
      shouldClose && onClose()
      onSuccessMessage && toast({ title: onSuccessMessage, status: "success" })
    }
  }

  return (
    <ButtonGroup mt={mt}>
      <Button
        colorScheme="purple"
        type={!onClick ? "submit" : "button"}
        mb={mb}
        onClick={handleClick}
        // isDisabled={!formState.isValid}
      >
        {formState.isSubmitting ? <Spinner /> : finalText}
      </Button>
      {!justSubmit && (
        <Button colorScheme="gray" onClick={() => onClose()} ml={3}>
          Cerrar
        </Button>
      )}
    </ButtonGroup>
  )
}

export default SubmitButtons
