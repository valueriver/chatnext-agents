import { createAgent } from './functions/createAgent.js'
import { addTool } from './functions/addTool.js'
import { listAgents } from './functions/listAgents.js'

/**
 * Agent构建器Agent工具映射
 */
const toolMap = [
  {
    name: 'create_agent',
    type: 'function',
    description: '创建新的Agent（包含所有标准文件）',
    execute: ({ agentName, description, tools = [] }) => createAgent({ agentName, description, tools }),
  },
    {
    name: 'add_tool',
    type: 'function',
    description: '为现有Agent添加新工具',
    execute: ({ agentName, toolName, toolDescription, toolParameters = {} }) => addTool({ agentName, toolName, toolDescription, toolParameters }),
  },
  {
    name: 'list_agents',
    type: 'function',
    description: '列出所有已存在的Agent',
    execute: () => listAgents(),
  },
]

export default toolMap