import { searchMessages } from './functions/search.js'

const toolMap = [
  {
    name: 'search_messages',
    type: 'function',
    description: '搜索相关的对话历史记录',
    execute: (args) => searchMessages(args),
  },
]

export default toolMap