//@ts-check
import { sqlite } from '../database/sqlite.js'

/**
 * 保存活动记录
 * @param {Object} activityData 活动数据
 * @returns {Promise<void>}
 */
export async function saveActivity(activityData) {
  try {
    const db = await sqlite()

    return new Promise((resolve, reject) => {
      const { model, message, usage, agentName } = activityData
      const timestamp = new Date().toISOString()

      db.run(
        'INSERT INTO activities (model, message, usage, agent_name, created_at) VALUES (?, ?, ?, ?, ?)',
        [model, message, usage, agentName, timestamp],
        function(err) {
          if (err) {
            reject(`保存活动记录失败: ${err.message}`)
            return
          }
          resolve()
        }
      )
    })
  } catch (err) {
    console.error('保存活动记录失败:', err.message)
    // 活动记录失败不应该影响主要流程
  }
}
