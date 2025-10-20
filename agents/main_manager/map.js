import { updateOverview } from './functions/overview.js'

const toolMap = [
  {
    name: 'update_overview',
    type: 'function',
    description: '更新AI对用户的认知状态',
    execute: (args) => updateOverview(args),
  },
  {
    name: 'history_seeker',
    type: 'agent',
    description: '搜索相关的对话历史记录',
    target: 'history_seeker',
  },
  {
    name: 'memory_manager',
    type: 'agent',
    description: '管理长期记忆（增删改查）',
    target: 'memory_manager',
  },
  {
    name: 'sqlite_manager',
    type: 'agent',
    description: '执行SQL数据库操作',
    target: 'sqlite_manager',
  },
  {
    name: 'shell_executor',
    type: 'agent',
    description: '执行shell系统命令',
    target: 'shell_executor',
  },
  {
    name: 'agent_manager',
    type: 'agent',
    description: '管理Agent系统（查看、创建、删除Agent）',
    target: 'agent_manager',
  },
]
export default toolMap
