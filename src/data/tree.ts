/**
 * 树形结构数据的处理函数汇总
 */

type TreeToObjConfigType = {
  fieldNames?: {
    key?: string
    children?: string
  }
  rootId?: string
}
type TreeToObjItemType = {
  id: string
  children: string[]
  [key: string]: any
}
type TreeToObjResultType = {
  [key: string]: TreeToObjItemType
}

/**
 * 将树形结构数据转换为对象结构。
 *
 * @param data 树形结构的数据数组，其中每个元素代表树的一个节点。
 * @param config 配置对象，用于自定义节点中ID和子节点列表的字段名称，以及根节点的ID。
 * @param config.fieldNames 自定义字段名称的对象，可以包含`key`（节点ID的字段名）和`children`（子节点列表的字段名）。
 * @param config.rootId 根节点的ID，用于标记树形结构的根。
 * @returns 转换后的对象结构，其中每个节点的ID作为键，节点对象作为值，节点对象包含原始数据、父节点ID和子节点ID数组。
 */
export function treeToObj(
  data: any[],
  config: TreeToObjConfigType = {}
): TreeToObjResultType {
  // 边界条件处理
  if (!Array.isArray(data)) {
    return {}
  }
  // 解构配置对象，设置默认字段名称和根节点ID
  const {
    fieldNames: afferentNames = {},
    rootId = 'root',
    ...restConfig
  } = config
  // 合并默认字段名称和自定义字段名称
  const fieldNames = {
    key: 'id',
    children: 'children',
    ...afferentNames
  }
  // 初始化转换后的对象
  const obj: TreeToObjResultType = {}
  // 递归转换函数
  function _core(node: any = {}, parentId: string | number = '') {
    // 获取节点ID
    const nodeId: string | number = node[fieldNames.key]
    // 初始化子节点ID数组
    const children: string | number[] = []
    // 获取子节点列表
    const childList = node?.[fieldNames.children] || []
    // 递归处理每个子节点
    if (childList.length > 0) {
      childList.forEach((item: any) => {
        _core(item, nodeId)
        children.push(item[fieldNames.key])
      })
    }
    // 如果节点有ID，则将其添加到结果对象中
    if (nodeId || nodeId === 0) {
      obj[nodeId] = {
        ...node,
        parentId,
        children
      }
    }
  }
  // 遍历数据数组，对每个元素调用_core函数进行转换
  data.forEach(item => _core(item, rootId))
  // 返回转换后的对象结构
  return obj
}

interface TreeNode {
  children?: TreeNode[]
}
/**
 * 过滤树形数据
 *
 * @param treeData 树形数据
 * @param scheduler 过滤条件，默认为返回true的函数
 * @param nodeHandle 对节点数据进行额外处理，默认为返回原节点的函数
 * @returns 过滤后的树形数据
 * @throws 当scheduler或nodeHandle不是函数时，抛出TypeError异常
 */
export const filterTreeData = (
  treeData: TreeNode[],
  scheduler: (node: TreeNode) => boolean = (node: TreeNode) => true, // 过滤条件
  nodeHandle: (node: TreeNode, type: 'noLeaf' | 'leaf') => TreeNode = (
    node: TreeNode,
    type: 'noLeaf' | 'leaf'
  ) => node // 对节点数据进行额外处理
) => {
  // 边界条件处理
  if (!Array.isArray(treeData)) {
    return []
  }

  // 对传递的scheduler和nodeHandle函数进行类型检查
  if (typeof scheduler !== 'function') {
    throw new TypeError('scheduler must be a function')
  }
  if (typeof nodeHandle !== 'function') {
    throw new TypeError('nodeHandle must be a function')
  }
  function processNode(node: TreeNode): TreeNode | null {
    const { children = [], ...rest } = node
    const newChildren: TreeNode[] = children.flatMap(child => {
      const newData = processNode(child)
      return newData ? [newData] : []
    })
    if (newChildren.length > 0) {
      return {
        ...nodeHandle(rest, 'noLeaf'),
        children: newChildren
      }
    } else if (scheduler(node)) {
      return {
        ...nodeHandle(rest, 'leaf')
      }
    } else {
      return null
    }
  }
  return treeData.flatMap(node => {
    const data = processNode(node)
    return data ? [data] : []
  })
}
