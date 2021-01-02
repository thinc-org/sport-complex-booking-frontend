import React from "react"
import { Link } from "react-router-dom"
const Footer = () => {
  return (
    <div className="custom-footer d-flex flex-row justify-content-center">
      <Link
        to="/"
        style={{
          color: "var(--text-color)",
        }}
      >
        Forget password?
      </Link>
    </div>
  )
}
export default Footer
