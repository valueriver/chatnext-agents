//@ts-check
import { sqlite } from '../../../../database/sqlite.js'

/**
 * 创建新的记忆条目
 * @param {Object} args 工具参数
 * @param {string} args.title 记忆标题
 * @param {string} args.content 记忆内容
 * @returns {string} 操作结果
 */
export async function createMemory({ title, content }) {
  try {
    const db = await sqlite()

    const result = await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO memories (title, content) VALUES (?, ?)',
        [title, content],
        function(err) {
          if (err) {
            console.error('❌ 创建记忆失败:', err.message)
            reject(`创建记忆失败: ${err.message}`)
            return
          }
          resolve(`记忆创建成功，记忆ID: ${this.lastID}`)
        }
      )
    })

    return result
  } catch (err) {
    return `创建记忆失败: ${err.message}`
  }
}
