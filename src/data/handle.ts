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
