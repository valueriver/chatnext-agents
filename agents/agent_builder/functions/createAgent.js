//@ts-check
import { mkdir, writeFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const AGENTS_DIR = join(__dirname, '../../../')

/**
 * 创建新的Agent
 * @param {Object} args 工具参数
 * @param {string} args.agentName Agent名称
 * @param {string} args.description Agent功能描述
 * @param {Array} args.tools Agent工具列表
 * @returns {string} 创建结果
 */
export async function createAgent({ agentName, description, tools = [] }) {
  try {
    // 验证Agent名称
    if (!/^[a-z][a-z0-9_]*$/.test(agentName)) {
      return `❌ Agent名称无效：必须以小写字母开头，只能包含小写字母、数字和下划线`
    }

    const agentPath = join(AGENTS_DIR, 'agents', agentName)
    const functionsPath = join(agentPath, 'functions')

    // 创建目录结构
    await mkdir(functionsPath, { recursive: true })

    // 生成prompt.js
    const promptContent = generatePromptContent(description, tools)
    await writeFile(join(agentPath, 'prompt.js'), promptContent, 'utf8')

    // 生成model.js
    const modelContent = `/**
 * ${description}Agent模型配置
 */
export const model = 'gpt-4o-mini'\n`
    await writeFile(join(agentPath, 'model.js'), modelContent, 'utf8')

    // 生成tools.js
    const toolsListContent = generateToolsListContent(tools)
    await writeFile(join(agentPath, 'tools.js'), toolsListContent, 'utf8')

    // 生成map.js
    const toolsMapContent = generateToolsMapContent(tools)
    await writeFile(join(agentPath, 'map.js'), toolsMapContent, 'utf8')

    // 为每个工具创建函数文件
    for (const tool of tools) {
      const actionContent = generateActionContent(tool)
      await writeFile(join(functionsPath, `${tool.name}.js`), actionContent, 'utf8')
    }

    return `✅ Agent "${agentName}" 创建成功！

📁 路径: agents/${agentName}/
📝 描述: ${description}
🔧 工具数量: ${tools.length}

📋 创建的文件:
- prompt.js           # Agent提示词
- model.js            # 模型配置
- tools.js            # 工具定义
- map.js              # 工具映射
${tools.map(tool => `- functions/${tool.name}.js    # ${tool.description}`).join('\n')}

✅ Agent已创建完成，系统会自动发现并加载该Agent
`
  } catch (error) {
    return `❌ Agent创建失败: ${error.message}`
  }
}

/**
 * 生成prompt.js内容
 */
function generatePromptContent(description, tools) {
  const toolDescriptions = tools.map(tool => `- ${tool.name}: ${tool.description}`).join('\n')

  return [
    '/**',
    ` * ${description}Agent提示词`,
    ' */',
    `export default \`你是${description}专家，负责相关操作。`,
    '',
    '## 核心功能',
    `1. ${description}`,
    '2. 智能分析和决策',
    '3. 提供准确的结果和建议',
    '',
    '## 可用工具',
    `${toolDescriptions}`,
    '',
    '## 工作流程',
    '1. 分析用户需求和问题',
    '2. 选择合适的工具执行操作',
    '3. 根据工具结果进行分析',
    '4. 提供清晰、有用的回答',
    '',
    '## 注意事项',
    '- 确保操作结果的准确性',
    '- 提供清晰的解释和建议',
    '- 遇到错误时给出解决方案',
    '`',
  ].join('\n')
}

/**
 * 生成tools.js内容
 */
function generateToolsListContent(tools) {
  const toolsArray = tools.map(tool => {
    const parameters = Object.keys(tool.parameters || {}).length > 0
      ? JSON.stringify(tool.parameters, null, 8).replace(/"([^"]+)":/g, '$1:')
      : "type: 'object', properties: {}, required: []"

    return `  {
    type: 'function',
    function: {
      name: '${tool.name}',
      description: '${tool.description}',
      parameters: ${parameters},
    },
  }`
  }).join(',\n')

  return `/**
 * ${tools[0]?.description || 'Agent'}工具列表
 */
const tools = [
${toolsArray}
]

export default tools`
}

/**
 * 生成map.js内容
 */
function generateToolsMapContent(tools) {
  const toolsArray = tools.map(tool =>
    `  {
    name: '${tool.name}',
    type: 'function',
    description: '${tool.description}',
    execute: ({ ${Object.keys(tool.parameters || {}).join(', ')} }) => ${tool.name}({ ${Object.keys(tool.parameters || {}).join(', ')} }),
  }`
  ).join(',\n')

  const imports = tools.map(tool =>
    `import { ${tool.name} } from './functions/${tool.name}.js'`
  ).join('\n')

  return `${imports}

/**
 * ${tools[0]?.description || 'Agent'}工具映射
 */
const toolMap = [
${toolsArray}
]

export default toolMap`
}

/**
 * 生成函数文件内容
 */
function generateActionContent(tool) {
  const params = Object.keys(tool.parameters || {}).map(param => `  @param {string} args.${param} ${tool.parameters[param].description}`).join('\n')
  const paramNames = Object.keys(tool.parameters || {}).join(', ')

  return `//@ts-check

/**
 * ${tool.description}
${params}
 * @returns {string} 执行结果
 */
export async function ${tool.name}({ ${paramNames} }) {
  try {
    // TODO: 实现具体的工具逻辑
    return '${tool.description}功能待实现'
  } catch (err) {
    return \`${tool.description}失败: \${err.message}\`
  }
}`
}
