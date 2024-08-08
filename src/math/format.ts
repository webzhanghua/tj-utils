import Decimal from 'decimal.js'

/**
 * 将数字或字符串转为指定小数位数的固定小数
 *
 * @param num 要转换的数字或字符串
 * @param decimalNum 指定的小数位数，默认为2
 * @returns 转换后的固定小数
 */
export const toFixedNumber = (num: number | string, decimalNum: number = 2) => {
  const v = Math.pow(10, decimalNum)
  return Math.round(+num * v) / v
}

/**
 * 对数字进行四舍五入并保留指定小数位数，返回字符串形式。
 *
 * @param num 要进行四舍五入的数字，可以是数字或字符串类型。
 * @param decimalPlaces 要保留的小数位数。
 * @param trim 是否需要去除末尾多余的0或小数点。默认为true。
 * @returns 四舍五入后保留指定小数位数的数字字符串。
 */
export function roundNumber(
  num: number | string,
  decimalPlaces: number,
  trim = true
): string {
  const factor = new Decimal(num)

  let fixedString = factor
    .toFixed(decimalPlaces, Decimal.ROUND_HALF_CEIL)
    .toString()
  if (!trim) {
    return fixedString
  } else {
    while (
      fixedString.includes('.') &&
      (fixedString.endsWith('0') || fixedString.endsWith('.'))
    ) {
      fixedString = fixedString.slice(0, -1)
    }

    return fixedString
  }
}

type IParseMoneyConfig = {
  separation?: boolean
  trim?: boolean
  decimalSeparation?: boolean
}
export type IParseMoneyFn = (
  money?: number | string,
  precision?: number,
  config?: IParseMoneyConfig
) => string

/**
 * 格式化金额字符串的小数位数
 *
 * @param money 金额字符串
 * @param precision 小数位数
 * @param trim 是否需要去除空格
 * @returns 格式化后的金额字符串
 */
function fixFractionDigits(
  money: string,
  precision: number,
  trim: boolean
): string {
  const isNeedFixed = precision && precision >= 0
  let moneyFixed = money
  if (isNeedFixed) {
    moneyFixed = roundNumber(money, precision, trim)
  }
  return moneyFixed
}

/**
 * 使用正则表达式格式化金额字符串
 *
 * @param moneyFixed 格式化小数位数后的金额字符串
 * @returns 使用正则表达式格式化后的金额字符串
 */
function formatMoneyWithRegExp(
  moneyFixed: string,
  decimalSeparation: boolean
): string {
  let beforeData = moneyFixed
  let afterData = ''

  if (!decimalSeparation) {
    const moneyArray = moneyFixed.split('.')
    beforeData = moneyArray[0]
    if (moneyArray[1]) {
      afterData = '.' + moneyArray[1]
    }
  }
  const reg = /\B(?=(\d{3})+(?!\d))/g
  if (!beforeData.startsWith('-')) {
    return beforeData.replace(reg, ',') + afterData
  } else {
    return '-' + beforeData.slice(1).replace(reg, ',') + afterData
  }
}

/**
 * 解析金额字符串，支持格式化输出
 *
 * @param money 金额字符串或数值
 * @param precision 数值精度保留小数位数，默认为-1表示不处理小数部分
 * @param config.separation  是否使用千分位分隔展示，默认为true
 * @param config.trim 是否去除格式化后的字符串末尾的零，默认为true
 * @param config.decimalSeparation 小数位是否使用千分位分隔展示，默认为false
 * @returns 返回格式化后的金额字符串
 */
export const parseMoney: IParseMoneyFn = (
  money,
  precision = -1,
  config: IParseMoneyConfig = {}
) => {
  const { separation = true, trim = true, decimalSeparation = false } = config
  if (!money) {
    return '0'
  }
  if (typeof money !== 'string') {
    money = String(money)
  }

  const moneyFixed = fixFractionDigits(money, precision, trim)

  if (!separation) {
    return moneyFixed
  }

  return formatMoneyWithRegExp(moneyFixed, decimalSeparation)
}
