import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  Tabs,
  TabList,
} from "@chakra-ui/react"
import React, { ReactElement, ReactNode } from "react"
import { Sizes } from "schemas/UiSchemas"
import MyTab from "../tabs/MyTab"

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
  tabs?: { icon: string; text: string }[]
}

const MyModal = ({
  title,
  children,
  buttonText = title,
  disableButton,
  size = "md",
  colorScheme = "blue",
  mr = 0,
  tabs = [],
}: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  const isChildrenAFunction = typeof children === "function"

  const hasTabs = tabs.length > 0

  return (
    <>
      <Button
        size={size}
        onClick={onOpen}
        colorScheme={colorScheme}
        mr={mr}
        isDisabled={disableButton}
      >
        {buttonText}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Tabs variant="enclosed" colorScheme="blue" isLazy>
          <ModalOverlay />
          <ModalContent
            p={"0.5rem 0"}
            borderRadius={
              hasTabs || title ? "0 0.5rem 0.5rem 0.5rem" : "0.5rem"
            }
          >
            {(hasTabs || title) && (
              <TabList mt={"-3rem"} border="none">
                {title && <MyTab text={title} icon="" />}
                {tabs.map((t) => (
                  <MyTab text={t.text} icon={t.icon} />
                ))}
              </TabList>
            )}
            <ModalBody p={"0.75rem 1rem"}>
              {isChildrenAFunction ? children({ onClose }) : children}
            </ModalBody>
          </ModalContent>
        </Tabs>
      </Modal>
    </>
  )
}

export default MyModal
