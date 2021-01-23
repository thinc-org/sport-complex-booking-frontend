/// <reference types="react-scripts" />

import i18next from "i18next"

declare module "i18next" {
  interface i18n extends i18next {
    language: "th" | "en"
  }
}
