//@ts-check
import { sqlite } from '../../../../database/sqlite.js'

/**
 * 读取/搜索记忆内容
 * @param {Object} args 工具参数
 * @param {string} args.keyword 搜索关键词（可选）
 * @param {number} args.limit 返回结果数量限制，默认10条
 * @param {number} args.memoryId 指定记忆ID（可选）
 * @returns {string} 记忆内容
 */
export async function readMemory({ keyword, limit = 10, memoryId }) {
  try {
    const db = await sqlite()

    const result = await new Promise((resolve, reject) => {
      let query
      let params

      if (memoryId) {
        query = 'SELECT id, title, content, created_at FROM memories WHERE id = ?'
        params = [memoryId]
      } else if (keyword) {
        query = 'SELECT id, title, content, created_at FROM memories WHERE title LIKE ? OR content LIKE ? ORDER BY created_at DESC LIMIT ?'
        params = [`%${keyword}%`, `%${keyword}%`, limit]
      } else {
        query = 'SELECT id, title, content, created_at FROM memories ORDER BY created_at DESC LIMIT ?'
        params = [limit]
      }

      db.all(query, params, (err, rows) => {
        if (err) {
          console.error('❌ 读取记忆失败:', err.message)
          reject(`读取记忆失败: ${err.message}`)
          return
        }

        if (!rows || rows.length === 0) {
          if (memoryId) {
            resolve(`未找到ID为 ${memoryId} 的记忆`)
          } else if (keyword) {
            resolve(`未找到包含 "${keyword}" 的相关记忆`)
          } else {
            resolve('暂无记忆记录')
          }
          return
        }

        const memoryResults = rows.map((row, index) => {
          const time = new Date(row.created_at).toLocaleString('zh-CN')
          const contentPreview = row.content.substring(0, 200)
          const suffix = row.content.length > 200 ? '...' : ''
          return `${index + 1}. [ID:${row.id}] ${row.title} (${time})\n   内容: ${contentPreview}${suffix}`
        }).join('\n\n')

        resolve(`找到 ${rows.length} 条记忆记录:\n\n${memoryResults}`)
      })
    })

    return result
  } catch (err) {
    return `读取记忆失败: ${err.message}`
  }
}
