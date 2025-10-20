//@ts-check
import { sqlite } from './database/sqlite.js'

/**
 * 加载对话消息
 * @param {number} [limit=20] 加载的消息数量
 * @returns {Promise<Array<{role: string, content: string}>>} 消息列表
 */
export async function loadMessages(limit = 20) {
  try {
    const db = await sqlite()

    return new Promise((resolve) => {
      db.all(
        'SELECT role, content FROM messages ORDER BY created_at DESC LIMIT ?',
        [limit],
        (err, rows) => {
          if (err) {
            console.error('❌ 加载对话历史失败:', err.message)
            resolve([])
            return
          }
          resolve(rows ? rows.reverse() : [])
        }
      )
    })
  } catch (err) {
    console.error('❌ 加载对话历史异常:', err.message)
    return []
  }
}

/**
 * 保存对话消息
 * @param {string} role 角色 'user' or 'assistant'
 * @param {string} content 消息内容
 * @returns {Promise<{id: number}>} 保存结果
 */
export async function saveMessage(role, content) {
  try {
    const db = await sqlite()

    return new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO messages (role, content) VALUES (?, ?)',
        [role, content],
        function(err) {
          if (err) {
            console.error('❌ 保存消息失败:', err.message)
            reject(err)
            return
          }
          resolve({ id: this.lastID })
        }
      )
    })
  } catch (err) {
    console.error('❌ 保存消息异常:', err.message)
    throw err
  }
}

/**
 * 加载AI认知状态（获取最新的一条）
 * @returns {Promise<string>} AI对用户的认知
 */
export async function loadOverview() {
  try {
    const db = await sqlite()

    return new Promise((resolve) => {
      db.get(
        'SELECT overview FROM overviews ORDER BY created_at DESC LIMIT 1',
        [],
        (err, row) => {
          if (err) {
            console.error('❌ 加载AI认知失败:', err.message)
            resolve('')
            return
          }
          resolve(row ? row.overview || '' : '')
        }
      )
    })
  } catch (err) {
    console.error('❌ 加载AI认知异常:', err.message)
    return ''
  }
}
