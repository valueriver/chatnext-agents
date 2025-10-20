/**
 * Agent管理器Agent工具列表
 */
const tools = [
  {
    type: 'function',
    function: {
      name: 'list_agents',
      description: '列出所有Agent及其基本信息',
      parameters: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: '要传递给 shell_executor agent 的指令消息'
          }
        },
        required: ['message']
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'inspect_agent',
      description: '查看指定Agent的详细代码和结构',
      parameters: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: '要传递给 shell_executor agent 的查看指令'
          }
        },
        required: ['message']
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'create_agent',
      description: '创建新的Agent（通过agent_builder）',
      parameters: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: '要传递给 agent_builder agent 的创建指令'
          }
        },
        required: ['message']
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'delete_agent',
      description: '删除指定的Agent（通过shell_executor执行）',
      parameters: {
        type: 'object',
        properties: {
          message: {
            type: 'string',
            description: '要传递给 shell_executor agent 的删除指令'
          }
        },
        required: ['message']
      },
    },
  },
]

export default tools