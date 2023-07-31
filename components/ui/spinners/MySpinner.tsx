import { Flex, Spinner } from "@chakra-ui/react"
import React from "react"

const MySpinner = () => {
  return (
    <Flex height={20} width="100%" className="aic jcc">
      <Spinner alignSelf="center" />
    </Flex>
  )
}

export default MySpinner
