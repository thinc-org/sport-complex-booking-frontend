<<<<<<< HEAD
export const is_first_login = localStorage.getItem('is_first_login') == 'true'
export const setIsFirstLogin = (value: boolean) => localStorage.setItem('is_first_login', value.toString())
=======
export let is_first_login = localStorage.getItem('is_first_login') == 'true' ? true : false
export const setFirstLogin = (value: any) => localStorage.setItem('is_first_login', value)
>>>>>>> 10d4d0d... change is_first_login to boolean
