export const is_first_login = localStorage.getItem('is_first_login')
export const setFirstLogin = (value: string) => localStorage.setItem('is_first_login', value)