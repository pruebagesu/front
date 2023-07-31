import { Button, ButtonGroup, Spinner, useModalContext } from "@chakra-ui/react"
import { FieldValues, useFormContext, UseFormSetError } from "react-hook-form"
type ClickParams<T extends FieldValues> = {
  formValues: T
  setError: UseFormSetError<T>
}

interface Props<T extends FieldValues> {
  onClick?: ({ formValues, setError }: ClickParams<T>) => void
  editing?: boolean
  submitText?: string
  shouldClose?: boolean
  shouldSubmit?: boolean
}

const SubmitButtons = <T extends FieldValues>({
  onClick,
  editing = false,
  submitText,
  shouldClose = false,
}: Props<T>) => {
  const { getValues, setError, formState } = useFormContext<T>()
  const { onClose } = useModalContext()
  const formValues = getValues()

  let finalText = !!editing ? "Guardar cambios" : "Crear"
  if (submitText) {
    finalText = submitText
  }

  const handleClick = () => {
    if (!!onClick) {
      onClick({ formValues, setError })
      shouldClose && onClose()
    }
  }

  return (
    <ButtonGroup>
      <Button
        colorScheme="purple"
        type={!onClick ? "submit" : "button"}
        mb={2}
        onClick={handleClick}
        isDisabled={!formState.isValid}
      >
        {formState.isSubmitting ? <Spinner /> : finalText}
      </Button>
      <Button colorScheme="gray" onClick={() => onClose()} ml={3}>
        Cerrar
      </Button>
    </ButtonGroup>
  )
}

export default SubmitButtons
