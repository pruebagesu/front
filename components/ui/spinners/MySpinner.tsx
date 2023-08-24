import { Flex, Spinner } from "@chakra-ui/react"
import React from "react"

const MySpinner = ({ height = "20", width = "100%" }) => {
  return (
    <Flex height={height} width={width} className="aic jcc">
      <Spinner alignSelf="center" />
    </Flex>
  )
}

export default MySpinner
