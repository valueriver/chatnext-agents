import { sqlite } from '../../../database/sqlite.js'

/**
 * 搜索对话历史记录
 * @param {Object} args 工具参数
 * @param {string} args.keyword 搜索关键词
 * @param {number} args.limit 返回结果数量限制，默认10条
 * @returns {string} 搜索结果
 */
export async function searchMessages({ keyword, limit = 10 }) {
  try {
    const db = await sqlite()

    const result = await new Promise((resolve, reject) => {
      db.all(
        `SELECT role, content, created_at
         FROM messages
         WHERE content LIKE ?
         ORDER BY created_at DESC
         LIMIT ?`,
        [`%${keyword}%`, limit],
        (err, rows) => {
          if (err) {
            console.error('❌ 搜索对话历史失败:', err.message)
            reject(`搜索对话历史失败: ${err.message}`)
            return
          }

          if (!rows || rows.length === 0) {
            resolve(`未找到包含 "${keyword}" 的相关对话记录`)
            return
          }

          const searchResults = rows.map((row, index) => {
            const time = new Date(row.created_at).toLocaleString('zh-CN')
            const role = row.role === 'user' ? '用户' : 'AI助手'
            const contentPreview = row.content.substring(0, 200)
            const suffix = row.content.length > 200 ? '...' : ''
            return `${index + 1}. [${time}] ${role}: ${contentPreview}${suffix}`
          }).join('\n\n')

          resolve(`找到 ${rows.length} 条相关对话记录:\n\n${searchResults}`)
        }
      )
    })

    return result
  } catch (err) {
    return `搜索对话历史失败: ${err.message}`
  }
}
