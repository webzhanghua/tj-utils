import Cookies from 'js-cookie'
/**
 * 获取指定键名的 Cookie 值
 *
 * @param key 键名
 * @returns 返回 Cookie 值，若不存在则返回 undefined
 */
export function getCookie(key: string) {
  return Cookies.get(key)
}
/**
 * 移除指定名称的 Cookie
 *
 * @param key Cookie 名称
 * @returns 无返回值
 */
export function removeCookie(key: string) {
  return Cookies.remove(key)
}
/**
 * 设置 Cookie
 *
 * @param key Cookie 键名
 * @param value Cookie 键值
 * @returns 设置 Cookie 后的结果
 */
export function setCookie(key: string, value: any) {
  return Cookies.set(key, value)
}
/**
 * js-cookie 实例
 *
 */
export const cookies = Cookies
