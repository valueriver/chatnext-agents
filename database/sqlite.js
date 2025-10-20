import sqlite3 from 'sqlite3'
import { readFileSync, existsSync } from 'fs'
import { dirname, join } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

// 数据库文件路径
const DB_PATH = join(__dirname, 'app.db')

// 全局数据库连接实例
let dbInstance = null
let isInitialized = false

/**
 * 初始化 SQLite 数据库
 * 检查数据库文件是否存在，如果不存在则创建并执行 schema.sql
 * @returns {Promise<sqlite3.Database>} 数据库连接实例
 */
export async function sqlite() {
  if (dbInstance && isInitialized) {
    return dbInstance
  }

  return new Promise((resolve, reject) => {
    const dbExists = existsSync(DB_PATH)

    // 只在第一次连接时显示日志
    if (!dbInstance) {
      // console.log('📊 正在连接数据库...')
    }

    // 创建数据库连接
    dbInstance = new sqlite3.Database(DB_PATH, (err) => {
      if (err) {
        console.error('❌ 数据库连接失败:', err.message)
        reject(err)
        return
      }

      if (!dbExists) {
        // console.log('🆕 数据库文件不存在，正在创建...')

        // 读取并执行 SQL 文件
        try {
          const schema = readFileSync(join(__dirname, 'schema.sql'), 'utf8')

          // 启用外键约束
          dbInstance.run('PRAGMA foreign_keys = ON', (err) => {
            if (err) {
              console.error('❌ 启用外键约束失败:', err.message)
              reject(err)
              return
            }
          })

          // 执行 SQL 脚本
          dbInstance.exec(schema, (err) => {
            if (err) {
              console.error('❌ 数据库初始化失败:', err.message)
              reject(err)
              return
            }
            // console.log('✅ 数据库创建完成')
            isInitialized = true
            resolve(dbInstance)
          })
        } catch (error) {
          console.error('❌ 读取 SQL 文件失败:', error.message)
          reject(error)
        }
      } else {
        // 只在第一次连接时显示日志
        if (!isInitialized) {
          // console.log('✅ 数据库文件已存在，直接连接')
        }

        // 启用外键约束
        dbInstance.run('PRAGMA foreign_keys = ON', (err) => {
          if (err) {
            console.error('❌ 启用外键约束失败:', err.message)
            reject(err)
            return
          }
          isInitialized = true
          resolve(dbInstance)
        })
      }
    })
  })
}