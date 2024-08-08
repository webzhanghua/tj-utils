type StorageType = 'localStorage' | 'sessionStorage'

// 新增 修改
function setStorage(
  key: string,
  value: any,
  type: StorageType = 'localStorage'
) {
  // 判断是否是对象
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window[type].setItem(key, value)
}
// 删除
function removeStorage(key: string, type: StorageType = 'localStorage') {
  window[type].removeItem(key)
}
// 获取
function getStorage(key: string, type: StorageType = 'localStorage') {
  let value = window[type].getItem(key)
  if (value === null || value === undefined) return null
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}
/**
 * 设置本地存储
 *
 * @param key 存储的键名
 * @param value 存储的值
 */
export function setLocalStorage(key: string, value: any) {
  setStorage(key, value)
}
/**
 * 获取本地存储中的值
 *
 * @param key 本地存储的键名
 * @returns 返回本地存储中对应键名的值，如果未找到则返回undefined
 */
export function getLocalStorage(key: string) {
  return getStorage(key)
}
/**
 * 从本地存储中删除指定键的值
 *
 * @param key 需要删除的键
 */
export function removeLocalStorage(key: string) {
  removeStorage(key)
}
/**
 * 设置 sessionStorage 中的键值对
 *
 * @param key 键名
 * @param value 键值
 */
export function setSessionStorage(key: string, value: any) {
  setStorage(key, value, 'sessionStorage')
}
/**
 * 从 sessionStorage 中获取指定键的值
 *
 * @param key 存储项的键
 * @returns 存储项的值，如果不存在则返回 undefined
 */
export function getSessionStorage(key: string) {
  return getStorage(key, 'sessionStorage')
}
/**
 * 从 sessionStorage 中移除指定键名的数据
 *
 * @param key 要移除的键名
 */
export function removeSessionStorage(key: string) {
  removeStorage(key, 'sessionStorage')
}
/**
 * 清除本地存储和会话存储中的所有数据
 */
export function clearStorage() {
  window.localStorage.clear()
  window.sessionStorage.clear()
}
