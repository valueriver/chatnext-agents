import { executeShell } from './actions/executeShell.js'

/**
 * Shell执行器Agent工具映射
 */
const toolMap = [
  {
    name: 'execute_shell',
    type: 'function',
    description: '执行任意shell命令',
    execute: ({ command }) => executeShell({ command }),
  },
]

export default toolMap