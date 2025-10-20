//@ts-check
import { sqlite } from '../../../../database/sqlite.js'

/**
 * 更新现有记忆
 * @param {Object} args 工具参数
 * @param {number} args.memoryId 记忆ID
 * @param {string} args.title 新的记忆标题（可选）
 * @param {string} args.content 新的记忆内容（可选）
 * @returns {string} 操作结果
 */
export async function updateMemory({ memoryId, title, content }) {
  try {
    const db = await sqlite()

    // 构建更新语句
    const updates = []
    const params = []

    if (title) {
      updates.push('title = ?')
      params.push(title)
    }

    if (content) {
      updates.push('content = ?')
      params.push(content)
    }

    if (updates.length === 0) {
      return '更新失败：没有提供要更新的内容'
    }

    updates.push('updated_at = CURRENT_TIMESTAMP')
    params.push(memoryId)

    return new Promise((resolve, reject) => {
      db.run(
        `UPDATE memories SET ${updates.join(', ')} WHERE id = ?`,
        params,
        function(err) {
          if (err) {
            console.error('❌ 更新记忆失败:', err.message)
            reject(`更新记忆失败: ${err.message}`)
            return
          }

          if (this.changes > 0) {
            resolve(`记忆 ${memoryId} 更新成功`)
          } else {
            resolve(`记忆 ${memoryId} 不存在`)
          }
        }
      )
    })
  } catch (err) {
    return `更新记忆失败: ${err.message}`
  }
}