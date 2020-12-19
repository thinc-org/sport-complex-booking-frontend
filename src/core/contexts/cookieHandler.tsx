export const setCookie = (name, value, exdays) => {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = name + "=" + value + ";" + expires + ";path=/";
}
export const getCookie = (value) => {
    var match = document.cookie.match('(^|;)\\s*' + value + '\\s*=\\s*([^;]+)');
    return (match && match.pop() !== 'undefined') ? match.pop() : '';
}