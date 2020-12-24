export const setCookie = (name: string, value: string | boolean | null, exdays: number) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
export const getCookie = (value: string) => {
    let m = document.cookie.match('(^|;)\\s*' + value + '\\s*=\\s*([^;]+)');
    return (m && m[m.length - 1] !== 'undefined') ? m.pop() : ''
}