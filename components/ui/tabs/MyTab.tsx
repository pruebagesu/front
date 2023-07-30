import { Tab } from "@chakra-ui/react"
import React from "react"
import IconFA from "../icons/IconFA"

const MyTab = ({ text, icon }: { text: string; icon: string }) => {
  return (
    <Tab
      _selected={{ color: "white", bg: "blue.500" }}
      backgroundColor="#ddd"
      color="gray"
      mr={1.5}
    >
      <IconFA icon={icon} className="mr5 ml-3" />
      {text}
    </Tab>
  )
}

export default MyTab
