const tools = [
  {
    type: 'function',
    function: {
      name: 'update_overview',
      description: '更新AI对用户的认知状态',
      parameters: {
        type: 'object',
        properties: {
          content: { type: 'string', description: '新的认知内容' },
        },
        required: ['content'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'history_seeker',
      description: '搜索相关的对话历史记录',
      parameters: {
        type: 'object',
        properties: {
          message: { type: 'string', description: '要传递给 history_seeker agent 的指令消息' },
        },
        required: ['message'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'memory_manager',
      description: '管理长期记忆（增删改查）',
      parameters: {
        type: 'object',
        properties: {
          message: { type: 'string', description: '要传递给 memory_manager agent 的指令消息' },
        },
        required: ['message'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'sqlite_manager',
      description: '执行SQL数据库操作',
      parameters: {
        type: 'object',
        properties: {
          message: { type: 'string', description: '要传递给 sqlite_manager agent 的SQL指令消息' },
        },
        required: ['message'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'shell_executor',
      description: '执行shell系统命令',
      parameters: {
        type: 'object',
        properties: {
          message: { type: 'string', description: '要传递给 shell_executor agent 的shell指令消息' },
        },
        required: ['message'],
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'agent_manager',
      description: '管理Agent系统（查看、创建、删除Agent）',
      parameters: {
        type: 'object',
        properties: {
          message: { type: 'string', description: '要传递给 agent_manager agent 的指令消息' },
        },
        required: ['message'],
      },
    },
  },
]

export default tools
