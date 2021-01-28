import React from "react"
import { Link } from "react-router-dom"
import useSidebarData from "./staff-sidebarData"

const StaffSidebar: React.FC = () => {
  const data = useSidebarData()

  const listItems = data.map((item, index) => (
    <li key={index} className="navbar-toggle menu">
      <Link className="menu-bars" to={item.path}>
        <div className="menu p-0">{item.name}</div>
      </Link>
    </li>
  ))

  return (
    <div>
      <nav className="nav-menu staff">
        <ul className="nav-menu-items staff-sidebar">
          <header> เมนู </header>
          {listItems}
        </ul>
      </nav>
    </div>
  )
}

export default StaffSidebar
