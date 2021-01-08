import React from "react"
import { useParams } from "react-router-dom"
import useSWR from "swr"
import { client } from "../../../axiosConfig"

const fetch = (url: string) => client.get(url).then((res) => res.data)

const FileOpener = () => {
  const { fileId } = useParams<{ fileId: string }>()
  // swr is just an example. you can retrieve the token using any method you like
  const { data, error, isValidating } = useSWR(`/fs/viewFileToken/${fileId}`, fetch, { suspense: true })
  if (isValidating) {
    return <div>Opening file...</div>
  }
  if (error) {
    return <div>Error while opening file</div>
  }
  window.location.href = `${client.defaults.baseURL}/fs/view?token=${data.token}`
  return null
}

export default FileOpener
