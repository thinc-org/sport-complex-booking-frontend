export const getIsFirstlogin = () => localStorage.getItem('is_first_login') == 'true'
export const setIsFirstLogin = (value: boolean) => localStorage.setItem('is_first_login', value.toString())

