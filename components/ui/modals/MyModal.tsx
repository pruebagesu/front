import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  useDisclosure,
  Button,
  Tabs,
  TabList,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react"
import React, { ReactElement, ReactNode, useState } from "react"
import { Sizes } from "schemas/UiSchemas"
import MyTab from "../tabs/MyTab"

interface Props {
  title?: string
  icon?: string
  buttonText?: string
  disableButton?: boolean
  size?: Sizes
  children?:
    | ReactElement<any, any>
    | ReactNode
    | ((props: { onClose: () => void }) => ReactElement)
  colorScheme?: string
  mr?: number
  ml?: number
  tabs?: { icon: string; text: string; component: ReactNode }[]
}

const MyModal = ({
  title,
  children,
  buttonText = title,
  icon,
  disableButton,
  size = "md",
  colorScheme = "blue",
  mr = 0,
  ml = 0,
  tabs = [],
}: Props) => {
  const [selectedTab, setSelectedTab] = useState(0)
  const { isOpen, onOpen, onClose } = useDisclosure()

  const isChildrenAFunction = typeof children === "function"

  const hasTabs = tabs.length > 0

  return (
    <>
      <Button
        size={size}
        onClick={onOpen}
        title={buttonText || title}
        colorScheme={colorScheme}
        mr={mr}
        ml={ml}
        isDisabled={disableButton}
      >
        {icon ? <i className={icon} /> : <span>{buttonText}</span>}
      </Button>
      <Modal isOpen={isOpen} onClose={onClose}>
        <Tabs
          variant="enclosed"
          colorScheme="blue"
          isLazy
          onChange={(index) => {
            console.log({ index })
            setSelectedTab(index)
          }}
        >
          <ModalOverlay />
          <ModalContent
            p={"0.5rem 0"}
            borderRadius={
              hasTabs || title ? "0 0.5rem 0.5rem 0.5rem" : "0.5rem"
            }
          >
            {(hasTabs || title) && (
              <TabList mt={"-3rem"} border="none">
                {title && (
                  <MyTab
                    text={title}
                    icon=""
                    isSelected={selectedTab === 0}
                    hideUnselectedText
                  />
                )}
                {tabs.map((t, index) => (
                  <MyTab
                    text={t.text}
                    icon={t.icon}
                    isSelected={selectedTab === index}
                    hideUnselectedText
                  />
                ))}
              </TabList>
            )}
            <ModalBody p={"0.75rem 1rem"}>
              <TabPanels>
                {children && (
                  <TabPanel p={0}>
                    {isChildrenAFunction ? children({ onClose }) : children}
                  </TabPanel>
                )}
                {tabs.map((t) => (
                  <TabPanel p={0}>{t.component}</TabPanel>
                ))}
              </TabPanels>
            </ModalBody>
          </ModalContent>
        </Tabs>
      </Modal>
    </>
  )
}

export default MyModal
