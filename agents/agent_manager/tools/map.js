/**
 * Agent管理器Agent工具映射
 */
const toolMap = [
  {
    name: 'list_agents',
    type: 'agent',
    description: '列出所有Agent及其基本信息（通过shell_executor）',
    target: 'shell_executor',
  },
  {
    name: 'inspect_agent',
    type: 'agent',
    description: '查看指定Agent的详细代码和结构（通过shell_executor）',
    target: 'shell_executor',
  },
  {
    name: 'create_agent',
    type: 'agent',
    description: '创建新的Agent（通过agent_builder）',
    target: 'agent_builder',
  },
  {
    name: 'delete_agent',
    type: 'agent',
    description: '删除指定的Agent（通过shell_executor执行）',
    target: 'shell_executor',
  },
]

export default toolMap