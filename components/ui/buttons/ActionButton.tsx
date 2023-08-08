import { Button } from "@chakra-ui/react"
import { useState } from "react"
import MySpinner from "../spinners/MySpinner"

const ACTIONS = {
  delete: { icon: "trash", title: "Eliminar" },
  download: { icon: "download", title: "Descargar" },
}

interface Props {
  action: keyof typeof ACTIONS
  onClick: () => void
  fakeDelay?: number
}

const ActionButton = ({ action, onClick, fakeDelay = 0 }: Props) => {
  const [loading, setLoading] = useState(false)

  const ACTION = ACTIONS[action]

  return (
    <Button
      ml={3}
      width={15}
      title={ACTION.title}
      onClick={async () => {
        setLoading(true)
        await onClick()
        setTimeout(() => setLoading(false), fakeDelay)
      }}
    >
      {loading ? (
        <MySpinner height="15" width="15" />
      ) : (
        <i className={`fas fa-${ACTION.icon}`} />
      )}
    </Button>
  )
}

export default ActionButton
