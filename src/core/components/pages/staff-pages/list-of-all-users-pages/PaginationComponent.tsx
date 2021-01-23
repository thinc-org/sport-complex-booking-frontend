import React from "react"
import { Pagination } from "react-bootstrap"

interface PaginationProps {
  pageNo: number
  setPageNo: React.Dispatch<React.SetStateAction<number>>
  maxUser: number
  maxUserPerPage: number
}

const PaginationComponent: React.FC<PaginationProps> = ({ pageNo, setPageNo, maxUser, maxUserPerPage }) => {
  // functions //
  const handlePagination = (next_page: number) => {
    const max_page: number = Math.floor((maxUser + maxUserPerPage - 1) / maxUserPerPage)
    if (next_page >= 1 && next_page <= max_page) {
      setPageNo(next_page)
    }
  }

  const max_page: number = Math.floor((maxUser + maxUserPerPage - 1) / maxUserPerPage)
  const numList: number[] = []
  let haveMore = true
  let i = 0
  while (numList.length < 5) {
    const page = pageNo + i - 2
    if (page >= max_page) haveMore = false
    if (page >= 1 && page <= max_page) numList.push(page)
    else if (page > max_page) break
    i++
  }
  const elementList = numList.map((num) => {
    if (num === pageNo)
      return (
        <Pagination.Item key={num} active={true}>
          {num}
        </Pagination.Item>
      )
    return (
      <Pagination.Item
        key={num}
        onClick={() => {
          handlePagination(num)
        }}
      >
        {num}
      </Pagination.Item>
    )
  })
  if (haveMore) elementList.push(<Pagination.Ellipsis key={max_page + 1} />)
  return (
    <Pagination className="justify-content-md-end">
      <Pagination.Prev
        onClick={() => {
          handlePagination(pageNo - 1)
        }}
      />
      {elementList}
      <Pagination.Next
        onClick={() => {
          handlePagination(pageNo + 1)
        }}
      />
    </Pagination>
  )
}

export default PaginationComponent
