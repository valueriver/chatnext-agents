const tools = [
  {
    type: 'function',
    function: {
      name: 'create_memory',
      description: '创建新的记忆条目',
      parameters: {
        type: 'object',
        properties: {
          title: { type: 'string', description: '记忆标题' },
          content: { type: 'string', description: '记忆内容' },
        },
        required: ['title', 'content'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'read_memory',
      description: '读取/搜索记忆内容',
      parameters: {
        type: 'object',
        properties: {
          keyword: { type: 'string', description: '搜索关键词（可选）' },
          limit: { type: 'number', description: '返回结果数量限制，默认10条' },
          memoryId: { type: 'number', description: '指定记忆ID（可选）' },
        },
        required: [],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'update_memory',
      description: '更新现有记忆',
      parameters: {
        type: 'object',
        properties: {
          memoryId: { type: 'number', description: '记忆ID' },
          title: { type: 'string', description: '新的记忆标题（可选）' },
          content: { type: 'string', description: '新的记忆内容（可选）' },
        },
        required: ['memoryId'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'delete_memory',
      description: '删除记忆条目',
      parameters: {
        type: 'object',
        properties: {
          memoryId: { type: 'number', description: '记忆ID' },
        },
        required: ['memoryId'],
      },
    },
  },
]

export default tools