import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import paramsGenerator from "helpers/paramsGenerator"
import { useState } from "react"
import { env } from "~/env.mjs"

interface Props {
  path: string
  params?: { [key: string]: any }
  refetchOnMount?: boolean
  staleTime?: number
}

function useFetch<T>({ path, params, refetchOnMount, staleTime }: Props) {
  const [searchText, setSearchText] = useState("")
  const PARAMS = paramsGenerator({ ...params, searchText })
  const result = useQuery<T[]>({
    queryKey: [path, PARAMS],
    queryFn: async () => {
      const res = await axios.get<{ data: T[] }>(
        `${env.NEXT_PUBLIC_BACKEND_BASE_URL}/${path}${PARAMS}`,
        { withCredentials: true }
      )
      return res?.data?.data
    },
    refetchOnMount,
    staleTime,
  })
  return { ...result, setSearchText }
}

export default useFetch
