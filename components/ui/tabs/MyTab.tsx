import { Tab } from "@chakra-ui/react"
import React from "react"

const MyTab = ({ text, icon }: { text: string; icon: string }) => {
  return (
    <Tab
      _selected={{ color: "white", bg: "blue.500" }}
      backgroundColor="#ddd"
      color="gray"
      className="bs" // de styles.css
      mr={1.5}
    >
      <i className={`${icon} mr4`} />
      {text}
    </Tab>
  )
}

export default MyTab
