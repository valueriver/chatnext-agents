//@ts-check
import { sqlite } from '../../../../database/sqlite.js'

/**
 * 删除记忆条目
 * @param {Object} args 工具参数
 * @param {number} args.memoryId 记忆ID
 * @returns {string} 操作结果
 */
export async function deleteMemory({ memoryId }) {
  try {
    const db = await sqlite()

    return new Promise((resolve, reject) => {
      db.run(
        'DELETE FROM memories WHERE id = ?',
        [memoryId],
        function(err) {
          if (err) {
            console.error('❌ 删除记忆失败:', err.message)
            reject(`删除记忆失败: ${err.message}`)
            return
          }

          if (this.changes > 0) {
            resolve(`记忆 ${memoryId} 删除成功`)
          } else {
            resolve(`记忆 ${memoryId} 不存在`)
          }
        }
      )
    })
  } catch (err) {
    return `删除记忆失败: ${err.message}`
  }
}