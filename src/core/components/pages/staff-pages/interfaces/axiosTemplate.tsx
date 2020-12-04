import axios from "axios"

const fetch = axios.create({
  baseURL: "http://localhost:3000",
})

export default fetch
