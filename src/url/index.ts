/**
 * url 操作
 */
type ParamsObjType = {
  [key: string]: any
}
/**
 * 获取URL参数
 *
 * @param url URL地址
 * @param paramName 参数名称，默认为空字符串
 * @returns 返回参数对象或指定参数值
 */
export function getUrlParams(
  url: string,
  paramName: string = ''
): ParamsObjType | any {
  const paramsObj: ParamsObjType = {}
  const startIndex = url.indexOf('?')
  const paramsStr = url.slice(startIndex + 1)
  if (startIndex !== -1) {
    paramsStr.split('&').forEach(item => {
      const [key, value] = item.split('=')
      paramsObj[key] = value
    })
  }
  if (paramName) {
    return paramsObj[paramName] || ''
  } else {
    return paramsObj
  }
}

/**
 * 将对象参数拼接成查询字符串
 *
 * @param paramsObj 包含参数的对象
 * @returns 拼接后的查询字符串
 */
export function paramsConcat(paramsObj: ParamsObjType) {
  let paramsStr = '?'
  for (const key in paramsObj) {
    if (paramsObj.hasOwnProperty(key)) {
      paramsStr += `${key}=${paramsObj[key]}&`
    }
  }
  return paramsStr.length > 1 ? paramsStr.slice(0, -1) : ''
}

/**
 * 设置URL参数
 *
 * @param url 待设置参数的URL地址
 * @param paramsObj 待设置的参数对象
 * @returns 返回设置参数后的URL地址
 */
export function setUrlParams(url: string, paramsObj: ParamsObjType) {
  const startIndex = url.indexOf('?')
  const baseUrl = url.slice(0, startIndex)
  const oldParams = startIndex !== -1 ? getUrlParams(url) : {}
  return baseUrl + paramsConcat({ ...oldParams, ...paramsObj })
}
