/**
 * 时间相关操作
 */
import Dayjs, { QUnitType, OpUnitType } from 'dayjs'
// https://dayjs.fenxianglu.cn/category/manipulate.html#%E5%8A%A0%E4%B8%8A
// 仅支持时间戳
export type DateType = string | number | undefined

export const DATE_YYYY = 'YYYY'
export const DATE_MM = 'YYYY-MM'
export const DATE_DD = 'YYYY-MM-DD'
export const DATE_HH = 'YYYY-MM-DD HH'
export const DATE_mm = 'YYYY-MM-DD HH:mm'
export const DATE_ss = 'YYYY-MM-DD HH:mm:ss'
const isEmptyDate = (time: DateType) => time && time !== '0'

/**
 * 格式化日期
 * 主要为非时间戳类型提供格式化，时间戳类型请使用 formartTime 格式化
 * @param time 待格式化的日期，支持 Date、string、number 类型,
 * @param temp 格式化模板
 * @param empty 默认值，当日期为空时返回
 * @returns 返回格式化后的日期字符串，若日期为空则返回默认值
 */
export const formartDate = (
  time: DateType & Date,
  temp: string,
  empty: any = undefined
) => {
  try {
    return isEmptyDate(time) ? Dayjs(time).format(temp) : empty
  } catch (error) {
    return empty
  }
}

/**
 * 格式化时间戳
 *
 * @param time 时间，支持 string、number 类型的数据戳
 * @param temp 格式化模板
 * @param empty 时间为空时的返回值，默认为 undefined
 * @returns 返回格式化后的时间字符串，若时间为空则返回 empty
 */
export const formartTime = (
  time: DateType,
  temp: string,
  empty: any = undefined
) => (isEmptyDate(time) ? Dayjs(Number(time)).format(temp) : empty)

/**
 * 格式化时间戳 年类型快捷方式
 *
 * @param time 时间戳
 * @param empty 空值占位符，默认为 '--'
 * @returns 返回格式化后的日期字符串
 */
export const formart_YYYY = (time: DateType, empty = '--') =>
  formartTime(time, DATE_YYYY, empty)

/**
 * 格式化时间戳 年月 类型快捷方式
 *
 * @param time 时间戳
 * @param empty 空值占位符，默认为 '--'
 * @returns 返回格式化后的日期字符串
 */
export const formart_MM = (time: DateType, empty = '--') =>
  formartTime(time, DATE_MM, empty)

/**
 * 格式化时间戳 年月日 类型快捷方式
 *
 * @param time 时间戳
 * @param empty 空值占位符，默认为 '--'
 * @returns 返回格式化后的日期字符串
 */
export const formart_DD = (time: DateType, empty = '--') =>
  formartTime(time, DATE_DD, empty)

/**
 * 格式化时间戳 年月日时 类型快捷方式
 *
 * @param time 时间戳
 * @param empty 空值占位符，默认为 '--'
 * @returns 返回格式化后的日期字符串
 */
export const formart_HH = (time: DateType, empty = '--') =>
  formartTime(time, DATE_HH, empty)

/**
 * 格式化时间戳 年月日时分 类型快捷方式
 *
 * @param time 时间戳
 * @param empty 空值占位符，默认为 '--'
 * @returns 返回格式化后的日期字符串
 */
export const formart_mm = (time: DateType, empty = '--') =>
  formartTime(time, DATE_mm, empty)

/**
 * 格式化时间戳 年月日时分秒 类型快捷方式
 *
 * @param time 时间戳
 * @param empty 空值占位符，默认为 '--'
 * @returns 返回格式化后的日期字符串
 */
export const formart_ss = (time: DateType, empty = '--') =>
  formartTime(time, DATE_ss, empty)

/**
 * 获取指定时间的日期开始时间戳
 *
 * @param time 时间，可以是 Date 对象、时间戳或者时间字符串
 * @returns 如果传入的时间为空，则返回当前日期开始的时间戳；否则返回传入时间的日期开始时间戳
 */
export const dateStartOf = (time: DateType) =>
  isEmptyDate(time) && Dayjs(Number(time)).startOf('day').valueOf()
/**
 * 获取给定时间的日期末尾时间戳
 *
 * @param time 日期类型，可以是 Date 对象、时间戳或日期字符串
 * @returns 如果传入的时间为空，则返回当天日期的末尾时间戳；否则返回原始时间戳
 */
export const dateEndOf = (time: DateType) =>
  isEmptyDate(time) && Dayjs(Number(time)).endOf('day').valueOf()

/**
 * 格式化时间范围
 *
 * @param times 时间范围数组，包含开始时间和结束时间
 * @param statrKey 开始时间的键名，默认为'createStart'
 * @param endKey 结束时间的键名，默认为'createEnd'
 * @returns 返回格式化后的时间范围对象，如果times不符合要求则返回空对象
 */
export const formatTimeRange = (
  times: string[],
  statrKey: string = 'createStart',
  endKey: string = 'createEnd'
) => {
  if (!times || times.length !== 2) {
    return {}
  }
  return times[0]
    ? {
        [statrKey]: dateStartOf(times[0]),
        [endKey]: dateEndOf(times[1])
      }
    : {}
}

/**
 * 计算两个日期之间的数差值
 *
 * @param startDate 开始日期，支持字符串或数字类型
 * @param endDate 结束日期，支持字符串或数字类型
 * @param unit 时间单位，可选值为 week (w,周) day (d,日) month (M,月份 (一月 0， 十二月 11)) quarter (Q,季度) year (y,年) hour (h,小时) minute (m,分钟) second (s,秒) millisecond (ms,毫秒)，默认为 'day'
 * @returns 返回两个日期之间的天数差
 */
export const calculateDaysBetween = (
  startDate: string | number,
  endDate: string | number,
  unit: QUnitType | OpUnitType = 'day'
) => {
  const start = dayjs(startDate)
  const end = dayjs(endDate)
  return end.diff(start, unit)
}
/**
 * dayjs 实例
 */
export const dayjs = Dayjs
