//@ts-check
import { readFile, writeFile, mkdir } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const AGENTS_DIR = join(__dirname, '../../../')

/**
 * 为Agent添加新工具
 * @param {Object} args 工具参数
 * @param {string} args.agentName 目标Agent名称
 * @param {string} args.toolName 新工具名称
 * @param {string} args.toolDescription 工具描述
 * @param {Object} args.toolParameters 工具参数定义
 * @returns {string} 添加结果
 */
export async function addTool({ agentName, toolName, toolDescription, toolParameters = {} }) {
  try {
    const agentPath = join(AGENTS_DIR, 'agents', agentName)

    // 检查Agent是否存在
    try {
      await readFile(join(agentPath, 'prompt.js'), 'utf8')
    } catch {
      return `❌ Agent "${agentName}" 不存在`
    }

    // 更新tools.js
    await updateTools(agentPath, toolName, toolDescription, toolParameters)

    // 更新map.js
    await updateToolMap(agentPath, toolName, toolParameters)

    // 创建新的函数文件
    await createFunctionFile(agentPath, toolName, toolDescription, toolParameters)

    return `✅ 工具 "${toolName}" 成功添加到Agent "${agentName}"

📁 Agent: agents/${agentName}/
🔧 新工具: ${toolName}
📝 描述: ${toolDescription}

📋 更新的文件:
- tools.js           # 添加了工具定义
- map.js             # 添加了工具映射
- functions/${toolName}.js    # 新建工具实现

💡 下一步：编辑 functions/${toolName}.js 实现具体的工具逻辑
`
  } catch (error) {
    return `❌ 添加工具失败: ${error.message}`
  }
}

/**
 * 更新tools.js
 */
async function updateTools(agentPath, toolName, toolDescription, toolParameters) {
  const toolsPath = join(agentPath, 'tools.js')
  let content = await readFile(toolsPath, 'utf8')

  const parameters = Object.keys(toolParameters).length > 0
    ? JSON.stringify(toolParameters, null, 8).replace(/"([^"]+)":/g, '$1:')
    : "type: 'object', properties: {}, required: []"

  const newTool = `  {
    type: 'function',
    function: {
      name: '${toolName}',
      description: '${toolDescription}',
      parameters: ${parameters},
    },
  }`

  // 在tools数组的最后添加新工具
  content = content.replace(
    /(export default tools\s*\n)/,
    `$1`
  ).replace(
    /(\]$\n?export default tools)/m,
    `,\n${newTool}\n$2`
  ).replace(
    /(\]$\n?$)/m,
    `,\n${newTool}\n]`
  )

  await writeFile(toolsPath, content, 'utf8')
}

/**
 * 更新map.js
 */
async function updateToolMap(agentPath, toolName, toolParameters) {
  const mapPath = join(agentPath, 'map.js')
  let content = await readFile(mapPath, 'utf8')

  // 添加import
  if (!content.includes(`import { ${toolName} }`)) {
    content = `import { ${toolName} } from './functions/${toolName}.js'\n` + content
  }

  const paramNames = Object.keys(toolParameters || {})
  const newTool = `  {
    name: '${toolName}',
    type: 'function',
    description: 'TODO: 添加工具描述',
    execute: ({ ${paramNames.join(', ')} }) => ${toolName}({ ${paramNames.join(', ')} }),
  }`

  // 在toolMap数组的最后添加新工具
  content = content.replace(
    /(\]\s*\nexport default toolMap)/m,
    `,\n${newTool}\n$1`
  ).replace(
    /(\]\s*$)/m,
    `,\n${newTool}\n]`
  )

  await writeFile(mapPath, content, 'utf8')
}

/**
 * 创建新的函数文件
 */
async function createFunctionFile(agentPath, toolName, toolDescription, toolParameters) {
  const functionsDir = join(agentPath, 'functions')
  await mkdir(functionsDir, { recursive: true })

  const functionPath = join(functionsDir, `${toolName}.js`)

  const params = Object.keys(toolParameters).map(param => `  @param {string} args.${param} ${toolParameters[param].description}`).join('\n')
  const paramNames = Object.keys(toolParameters).join(', ')

  const content = `//@ts-check

/**
 * ${toolDescription}
${params}
 * @returns {string} 执行结果
 */
export async function ${toolName}({ ${paramNames} }) {
  try {
    // TODO: 实现具体的工具逻辑
    return '${toolDescription}功能待实现'
  } catch (err) {
    return \`${toolDescription}失败: \${err.message}\`
  }
}`

  await writeFile(functionPath, content, 'utf8')
}
