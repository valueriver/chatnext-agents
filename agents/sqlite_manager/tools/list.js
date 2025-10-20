/**
 * SQLite管理器Agent工具列表
 */
const tools = [
  {
    type: 'function',
    function: {
      name: 'execute_sql',
      description: '执行任意SQL语句（查询、增删改、表操作等）',
      parameters: {
        type: 'object',
        properties: {
          sql: {
            type: 'string',
            description: '要执行的SQL语句'
          }
        },
        required: ['sql']
      },
    },
  },
]

export default tools