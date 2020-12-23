export let is_first_login = localStorage.getItem('is_first_login') == 'true' ? true : false
export const setFirstLogin = (value: any) => localStorage.setItem('is_first_login', value)