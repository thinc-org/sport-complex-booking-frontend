import * as React from "react"
import ReactDOM from "react-dom"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/css/bootstrap.css"
import "./index.css"
import "./App.css"
import AppModule from "./core/modules/app.module"
import "./core/i18n/i18n"
import { Suspense } from "react"

ReactDOM.render(
  <Suspense fallback={<div>Loading ...</div>}>
    <AppModule />
  </Suspense>,
  document.getElementById("root")
)
