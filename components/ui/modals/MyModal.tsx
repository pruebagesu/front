import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
  Button,
} from "@chakra-ui/react"
import React, { ReactElement, ReactNode } from "react"
import { Sizes } from "schemas/UiSchemas"

interface Props {
  title: string
  buttonText?: string
  disableButton?: boolean
  size?: Sizes
  children:
    | ReactElement<any, any>
    | ReactNode
    | ((props: { onClose: () => void }) => ReactElement)
  colorScheme?: string
  mr?: number
}

const MyModal = ({
  title,
  children,
  buttonText,
  disableButton,
  size = "md",
  colorScheme = "blue",
  mr = 0,
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const isChildrenAFunction = typeof children === "function"

  return (
    <>
      <Button
        size={size}
        onClick={onOpen}
        colorScheme={colorScheme}
        mr={mr}
        isDisabled={disableButton}
      >
        {buttonText || title}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p={"0.5rem 0.3rem"}>
          {title && <ModalHeader>{title}</ModalHeader>}
          <ModalBody>
            {isChildrenAFunction ? children({ onClose }) : children}
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  )
}

export default MyModal
