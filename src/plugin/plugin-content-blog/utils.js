// 自己写的
export function getCategoriesByfrontMatter(frontMatter) {
  let categories = frontMatter?.categories
  if (categories === undefined || categories === null || categories === '') {
    categories = frontMatter?.category
  }
  let defCat = '未分类'
  let normalizedCategories
  // 处理不同类型的 categories
  if (categories === undefined || categories === null || categories === '') {
    normalizedCategories = [defCat]
  } else if (Array.isArray(categories)) {
    // 数组：过滤掉无效值并转为字符串
    normalizedCategories = categories
      .filter(cat => cat !== undefined && cat !== null)
      .map(String)
  } else if (typeof categories === 'string') {
    // 字符串：直接使用
    normalizedCategories = [categories]
  } else if (typeof categories === 'number') {
    // 数字或布尔值：转为字符串
    normalizedCategories = [String(categories)]
  } else if (typeof categories === 'boolean') {
    // 数字或布尔值：转为字符串
    throw new Error('categories需要:字符串 或 数字 或 数组!')
  } else {
    // 其他类型（如对象、null）：忽略
    throw new Error('categories需要:字符串 或 数字 或 数组!')
  }
  return normalizedCategories
}