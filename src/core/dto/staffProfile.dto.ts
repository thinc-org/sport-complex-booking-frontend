export interface ProfileResponse {
  name: string
  surname: string
  is_admin: boolean
}
export interface Error {
  badRequest: string
  invalidAccess: string
}
