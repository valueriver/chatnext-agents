/**
 * Shell执行器Agent工具列表
 */
const tools = [
  {
    type: 'function',
    function: {
      name: 'execute_shell',
      description: '执行任意shell命令',
      parameters: {
        type: 'object',
        properties: {
          command: {
            type: 'string',
            description: '要执行的shell命令'
          }
        },
        required: ['command']
      },
    },
  },
]

export default tools