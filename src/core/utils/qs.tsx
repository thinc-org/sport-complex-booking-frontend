import { useHistory, useLocation } from "react-router-dom"
import qs from "qs"

export function useQueryParams() {
  const { search } = useLocation()
  const history = useHistory()

  const queryParams = qs.parse(search.substring(1)) as Record<string, string> // remove '?'

  const updateQuery = (queries: Record<string, string | undefined>) => {
    const newQs = { ...queryParams, ...queries }
    history.push({
      search: qs.stringify(newQs),
    })
  }
  return {
    queryParams,
    updateQuery,
  }
}
