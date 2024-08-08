import Decimal from 'decimal.js'
// https://mikemcl.github.io/decimal.js/
// http://docs.asprain.cn/nodejsdecimal/API.html#cmp

type AmountType = string | number | Decimal

/**
 * 数值相加函数
 *
 * @param a 类型支持字符串、数字和Decimal类型
 * @param b 类型支持字符串、数字和Decimal类型
 * @returns 返回相加后的字符串结果
 */
export const numberAdd = (a: AmountType, b: AmountType) => {
  return Decimal.add(a || 0, b || 0).toString()
}
/**
 * 数值相减函数
 *
 * @param a 类型支持字符串、数字和Decimal类型
 * @param b 类型支持字符串、数字和Decimal类型
 * @returns 返回相减后的字符串结果
 */
export const numberSub = (a: AmountType, b: AmountType) => {
  return Decimal.sub(a || 0, b || 0).toString()
}

/**
 * 乘法函数，将两个金额类型的数值相乘
 *
 * @param a 类型支持字符串、数字和Decimal类型
 * @param b 类型支持字符串、数字和Decimal类型
 * @returns 返回相乘后的字符串结果
 */
export const numberMul = (a: AmountType, b: AmountType) => {
  return Decimal.mul(a || 0, b || 0).toString()
}

/**
 * 数值除法
 *
 * @param a 类型支持字符串、数字和Decimal类型
 * @param b 类型支持字符串、数字和Decimal类型
 * @returns 返回除法结果的字符串形式
 */
export const numberDiv = (a: AmountType, b: AmountType) => {
  return Decimal.div(a || 0, b || 0).toString()
}

/**
 * decimal.js 实例
 */
export const decimal = Decimal
