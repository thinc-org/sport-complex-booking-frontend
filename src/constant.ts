export const is_first_login = localStorage.getItem('is_first_login') == 'true'
export const setFirstLogin = (value: any) => localStorage.setItem('is_first_login', value)