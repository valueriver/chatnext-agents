const tools = [
  {
    type: 'function',
    function: {
      name: 'search_messages',
      description: '在对话历史中搜索相关记录',
      parameters: {
        type: 'object',
        properties: {
          keyword: { type: 'string', description: '搜索关键词' },
          limit: { type: 'number', description: '返回结果数量限制，默认10条' },
        },
        required: ['keyword'],
      },
    },
  },
]

export default tools