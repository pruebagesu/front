import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { DefaultValues, FieldValues } from "react-hook-form/dist/types"
import { FormProvider } from "react-hook-form"
import { ReactNode } from "react"
import { DevTool } from "@hookform/devtools"
import MySpinner from "../spinners/MySpinner"
import { useModalContext } from "@chakra-ui/react"

interface Props<T> {
  zodSchema: z.Schema
  onSubmit: (data: T, reset: any) => Promise<void> | void
  onError: (data: FieldValues) => void
  children: ReactNode
  defaultValues?: DefaultValues<FieldValues>
  isModal?: boolean
  closeModal?: boolean
}

const MyForm = <T,>({
  defaultValues,
  zodSchema,
  onSubmit,
  onError,
  children,
  isModal = true,
  closeModal = true,
}: Props<T>) => {
  type EntityType = z.infer<typeof zodSchema>
  const methods = useForm<EntityType>({
    resolver: zodResolver(zodSchema),
    defaultValues,
  })
  const { onClose } = isModal ? useModalContext() : { onClose: () => {} }

  if (methods.formState.isLoading) return <MySpinner />

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit(
          async (data) => {
            await onSubmit(data, methods.reset) // Si o si el await para el loading
            closeModal && onClose()
          },
          (errors) => {
            onError(errors)
          }
        )}
      >
        {children}
      </form>
      <DevTool control={methods.control} />
    </FormProvider>
  )
}

export default MyForm
