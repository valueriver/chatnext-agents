//@ts-check
import { sqlite } from '../../../../database/sqlite.js'

/**
 * 更新AI对用户的认知状态（插入新的认知记录）
 * @param {Object} args 工具参数
 * @param {string} args.content 新的认知内容（完整的overview）
 * @returns {string} 操作结果
 */
export async function updateOverview({ content }) {
  try {
    const db = await sqlite()

    await new Promise((resolve, reject) => {
      db.run(
        'INSERT INTO overviews (overview) VALUES (?)',
        [content],
        function(err) {
          if (err) {
            console.error('❌ 创建认知记录失败:', err.message)
            reject(err)
            return
          }
          resolve()
        }
      )
    })

    return `AI认知状态更新成功`
  } catch (err) {
    return `更新AI认知状态失败: ${err.message}`
  }
}
