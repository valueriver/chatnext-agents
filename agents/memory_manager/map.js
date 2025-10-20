import { createMemory } from './functions/create.js'
import { readMemory } from './functions/read.js'
import { updateMemory } from './functions/update.js'
import { deleteMemory } from './functions/delete.js'

const toolMap = [
  {
    name: 'create_memory',
    type: 'function',
    description: '创建新的记忆条目',
    execute: (args) => createMemory(args),
  },
  {
    name: 'read_memory',
    type: 'function',
    description: '读取/搜索记忆内容',
    execute: (args) => readMemory(args),
  },
  {
    name: 'update_memory',
    type: 'function',
    description: '更新现有记忆',
    execute: (args) => updateMemory(args),
  },
  {
    name: 'delete_memory',
    type: 'function',
    description: '删除记忆条目',
    execute: (args) => deleteMemory(args),
  },
]

export default toolMap