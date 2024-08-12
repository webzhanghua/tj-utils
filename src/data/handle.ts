type OptionsConfigType = {
  label?: string
  value?: string
}

interface ListItemType {
  [key: string]: any
}

/**
 * 将对象转换为列表
 *
 * @param obj 待转换的对象
 * @param config.label 列表项中作为对象键的字段名，默认为 'label'
 * @param config.value 列表项中作为对象值的字段名，默认为 'value'
 * @returns 转换后的列表
 */
export function objToList(
  obj: Record<string, any>,
  config: OptionsConfigType = {}
) {
  const { label = 'label', value = 'value' } = config
  if (!obj || typeof obj !== 'object') return []
  let list: ListItemType[] = []
  for (let key in obj) {
    list.push({
      [label]: obj[key],
      [value]: key
    })
  }
  return list
}

/**
 * 将列表转换为对象
 *
 * @param list 列表项数组
 * @param config 配置对象，可选参数
 * @param config.label 列表项中作为对象键的字段名，默认为 'label'
 * @param config.value 列表项中作为对象值的字段名，默认为 'value'
 * @returns 转换后的对象
 */
export function listToObj(
  list: ListItemType[],
  config: OptionsConfigType = {}
) {
  const { label = 'label', value = 'value' } = config
  if (!list || !Array.isArray(list)) return {}
  let obj: Record<string, any> = {}
  for (let item of list) {
    obj[item[value]] = item
  }
  return obj
}

/**
 * 将列表转换成Map对象
 *
 * @param list 列表数组
 * @param config 配置选项，可选参数
 * @param config.label 列表中作为Map键的字段名，默认为'label'
 * @param config.value 列表中作为Map值的字段名，默认为'value'
 * @returns 转换后的Map对象，如果列表为空或非数组则返回null
 */
export function listToMap(
  list: ListItemType[],
  config: OptionsConfigType = {}
) {
  const { label = 'label', value = 'value' } = config
  if (!list || !Array.isArray(list)) return null
  let map = new Map<string, any>()
  for (let item of list) {
    map.set(item[value], item)
  }
  return map
}

/**
 * 将对象转换为 Map 类型
 *
 * @param obj 要转换的对象
 * @returns 转换后的 Map 对象，若转换失败则返回 null
 */
export function objToMap(obj: Record<string, any>) {
  if (!obj || typeof obj !== 'object') return null
  let map = new Map<string, any>()
  for (let key in obj) {
    map.set(key, obj[key])
  }
  return map
}
/**
 * 处理选项数据
 * 注意 值为数字 1 和字符串 '1' 会有混淆，所以建议都是用字符串
 * @param data 数据
 * @param config 配置参数，默认为空对象
 * @param config.label 数据中键对应的的字段名，默认为 'label'
 * @param config.value 数据中值对应的字段名，默认为 'value'
 * @returns 处理后的结果，包含 obj 对象、list 数组、map 对象以及 getKeyToValue 函数
 */
export function optionsHandle(data: any, config: OptionsConfigType = {}) {
  if (!data || typeof data !== 'object') return null
  let obj: Record<string, any> = {}
  const list: ListItemType[] = []
  if (Array.isArray(data)) {
    list.push(...data)
    obj = listToObj(list, config) as Record<string, any>
  } else {
    obj = {
      ...data
    }
    list.push(...objToList(data, config))
  }

  const map = listToMap(list, config)
  return {
    obj,
    list,
    map,
    getKeyToValue(v: string) {
      return map?.get(v) || null
    }
  }
}
/**
 * 规范化唯一性判断的键数组
 *
 * @param key 唯一性判断的键
 * @returns 规范化后的键数组
 */
function normalizeUniqueKeys(key: string | string[]): string[] {
  return Array.isArray(key) ? key : [key]
}

/**
 * 处理数组元素
 *
 * @param updatedArr 更新后的数组
 * @param totalObjects totalObjects 对象
 * @param index 当前元素的索引
 * @param keys 用于比较重复的键数组
 * @param normalizedUniqueKeys 规范化后的唯一性判断的键数组
 */
function processArrayElements(
  updatedArr: any[],
  totalObjects: Record<string, Map<any, number>>,
  i: number,
  keys: string[],
  normalizedUniqueKeys: string[],
  length: number
): void {
  const current = updatedArr[i]
  const previous = updatedArr[i - 1]
  for (let j = 0; j < keys.length; j++) {
    const key = keys[j]
    // 前一项数据
    const preValue = previous?.[key]
    // 当前项数据
    const value = current?.[key]

    if (i === length) {
      totalObjects[key] = new Map([[value, 1]])
    }
    let isDifferentGroup = false
    if (
      Array.isArray(normalizedUniqueKeys) &&
      normalizedUniqueKeys.length > 0
    ) {
      isDifferentGroup = normalizedUniqueKeys.some(key => {
        return previous?.[key] !== current?.[key]
      })
    }
    if (isDifferentGroup || preValue !== value) {
      // 不属于同一组数据 或  属于同一组数据，但前后数据不同
      updatedArr[i][key + '_total'] = totalObjects?.[key]?.get(value) || 1
      // 设置缓存中前一项初始数据
      totalObjects[key] = new Map([[preValue, 1]])
    } else {
      // 属于同一组数据，前后数据相同
      const newTotal = (totalObjects?.[key]?.get(preValue) || 0) + 1
      // 更新缓存中当前项数据
      totalObjects[key].set(preValue, newTotal)
      // 设置当前项数据
      updatedArr[i][key + '_total'] = 0
    }
    if (i === 1) {
      // 设置第一项数据
      updatedArr[0][key + '_total'] = totalObjects?.[key]?.get(value)
    }
  }
}

/**
 * 统计行内数据连续重复次数，以 [key]_total 字段存储, 重复项开始保存总数，其它项保存为0
 *
 * @param arr 待处理的数组
 * @param keys 重复行判断的关键字数组
 * @param uniqueKeys 唯一标识的关键字数组或单个关键字
 * @returns 处理后的数组
 */
export const repeatedRowCalculationHandle = (
  arr: any[],
  keys: string[],
  uniqueKeys: string | string[]
): any[] => {
  if (arr.length < 2 || keys.length === 0) return arr

  const normalizedUniqueKeys = normalizeUniqueKeys(uniqueKeys)
  const updatedArr = [...arr]
  const totalObjects: Record<string, Map<any, number>> = {}
  const length = updatedArr.length - 1

  for (let i = length; i > 0; i--) {
    processArrayElements(
      updatedArr,
      totalObjects,
      i,
      keys,
      normalizedUniqueKeys,
      length
    )
  }
  return updatedArr
}
