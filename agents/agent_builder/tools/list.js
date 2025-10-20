/**
 * Agent构建器Agent工具列表
 */
const tools = [
  {
    type: 'function',
    function: {
      name: 'create_agent',
      description: '创建新的Agent（包含所有标准文件）',
      parameters: {
        type: 'object',
        properties: {
          agentName: {
            type: 'string',
            description: 'Agent名称（使用下划线命名法，如：data_analyzer）'
          },
          description: {
            type: 'string',
            description: 'Agent的功能描述'
          },
          tools: {
            type: 'array',
            description: 'Agent需要的工具列表',
            items: {
              type: 'object',
              properties: {
                name: { type: 'string', description: '工具名称' },
                description: { type: 'string', description: '工具描述' },
                parameters: { type: 'object', description: '工具参数定义' }
              }
            }
          }
        },
        required: ['agentName', 'description']
      },
    },
  },
    {
    type: 'function',
    function: {
      name: 'add_tool',
      description: '为现有Agent添加新工具',
      parameters: {
        type: 'object',
        properties: {
          agentName: {
            type: 'string',
            description: '目标Agent名称'
          },
          toolName: {
            type: 'string',
            description: '新工具名称'
          },
          toolDescription: {
            type: 'string',
            description: '工具描述'
          },
          toolParameters: {
            type: 'object',
            description: '工具参数定义'
          }
        },
        required: ['agentName', 'toolName', 'toolDescription']
      },
    },
  },
  {
    type: 'function',
    function: {
      name: 'list_agents',
      description: '列出所有已存在的Agent',
      parameters: {
        type: 'object',
        properties: {},
        required: []
      },
    },
  },
]

export default tools