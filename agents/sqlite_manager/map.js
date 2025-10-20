import { executeSql } from './functions/executeSql.js'

/**
 * SQLite管理器Agent工具映射
 */
const toolMap = [
  {
    name: 'execute_sql',
    type: 'function',
    description: '执行任意SQL语句（查询、增删改、表操作等）',
    execute: ({ sql }) => executeSql({ sql }),
  },
]

export default toolMap