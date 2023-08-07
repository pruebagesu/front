interface Props {
  [key: string]: any
}

const paramsGenerator = (params: Props) => {
  let keys = Object.keys(params)

  if (keys.length === 0) return ""

  let finalParams = "?"

  for (let index = 0; index < keys.length; index++) {
    const key = keys[index] as string
    const value = params[key]
    const isFirstOne = index === 0

    if (value !== undefined && value !== null && value !== "") {
      finalParams += `${!isFirstOne ? "&" : ""}${key}=${value}`
    }
  }

  return finalParams
}

export default paramsGenerator
