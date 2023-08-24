import { Tab } from "@chakra-ui/react"
import IconFA from "../icons/IconFA"

const MyTab = ({
  text,
  icon,
  isSelected,
  hideUnselectedText = false,
}: {
  text: string
  icon: string
  isSelected?: boolean
  hideUnselectedText?: boolean
}) => {
  const showText = isSelected || !hideUnselectedText

  return (
    <>
      <Tab
        _selected={{ color: "white", bg: "blue.500" }}
        onChange={(tab) => console.log("Tab changed", tab)}
        backgroundColor="#ddd"
        height="2.5rem" // Si no se posicionaban mal al cambiar el zoom
        style={{
          boxShadow: "0 -1px 3px rgba(0,0,0,0.1)",
          border: "1px solid rgba(0,0,0,0.1)",
          borderBottom: "none",
        }}
        color="gray"
        mr={1.5}
        userSelect="none" // Para que no se seleccione el texto al hacer click
      >
        <IconFA icon={icon} className={showText ? "mr5 ml-3" : ""} />
        {showText && <span>{text}</span>}
      </Tab>
      <style jsx>{`
        span {
           {
            /* color: red; */
          }
        }
      `}</style>
    </>
  )
}

export default MyTab
