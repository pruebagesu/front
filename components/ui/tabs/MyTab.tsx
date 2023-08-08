import { Tab } from "@chakra-ui/react"
import React from "react"
import IconFA from "../icons/IconFA"

const MyTab = ({ text, icon }: { text: string; icon: string }) => {
  return (
    <Tab
      _selected={{ color: "white", bg: "blue.500" }}
      backgroundColor="#ddd"
      height="2.5rem" // Si no se posicionaban mal al cambiar el zoom
      style={{ boxShadow: "0 -2px 4px 1px rgba(0,0,0,0.1)" }}
      color="gray"
      mr={1.5}
      userSelect="none" // Para que no se seleccione el texto al hacer click
    >
      <IconFA icon={icon} className="mr5 ml-3" />
      {text}
    </Tab>
  )
}

export default MyTab
