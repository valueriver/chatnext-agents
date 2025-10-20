//@ts-check
import { sqlite } from '../../../../database/sqlite.js'

/**
 * 执行任意SQL语句
 * @param {Object} args 工具参数
 * @param {string} args.sql 要执行的SQL语句
 * @returns {string} 执行结果
 */
export async function executeSql({ sql }) {
  try {
    console.log(`🔍 执行SQL: ${sql}`)
    const db = await sqlite()

    return new Promise((resolve, reject) => {
      // 根据SQL类型选择执行方法
      const trimmedSql = sql.trim().toLowerCase()

      if (trimmedSql.startsWith('select') || trimmedSql.startsWith('with')) {
        // 查询语句
        db.all(sql, [], (err, rows) => {
          if (err) {
            reject(`查询失败: ${err.message}`)
            return
          }

          if (rows.length === 0) {
            resolve('查询执行成功，但未返回任何结果。')
          } else {
            // 格式化输出结果
            let result = `查询成功，共返回 ${rows.length} 条记录:\n\n`

            // 添加表头
            const headers = Object.keys(rows[0])
            result += '| ' + headers.join(' | ') + ' |\n'
            result += '|' + headers.map(() => ' --- ').join('|') + '|\n'

            // 添加数据行
            rows.forEach(row => {
              const values = headers.map(header => {
                const value = row[header]
                return value !== null ? String(value) : 'NULL'
              })
              result += '| ' + values.join(' | ') + ' |\n'
            })

            resolve(result)
          }
        })
      } else {
        // 非查询语句（INSERT, UPDATE, DELETE, CREATE, ALTER等）
        db.run(sql, [], function(err) {
          if (err) {
            reject(`执行失败: ${err.message}`)
            return
          }

          resolve(`执行成功！影响行数: ${this.changes}`)
        })
      }
    })
  } catch (err) {
    return `数据库连接失败: ${err.message}`
  }
}