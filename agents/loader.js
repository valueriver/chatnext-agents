import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

/**
 * 约定式加载Agent - 按照标准目录结构自动发现和加载
 * @param {string} agentName Agent名称
 * @returns {Promise<Object>} Agent配置对象
 */
export async function loadAgent(agentName) {
  // 验证Agent名称格式
  if (!agentName || typeof agentName !== 'string') {
    throw new Error('Agent名称必须是非空字符串')
  }

  if (!/^[a-z][a-z0-9_]*$/.test(agentName)) {
    throw new Error(`Agent名称 "${agentName}" 格式无效：必须以小写字母开头，只能包含小写字母、数字和下划线`)
  }

  try {
    // 构建标准文件路径
    const agentBasePath = `./${agentName}`

    // 并行加载所有必需文件
    const [promptModule, toolsModule, mapModule, modelModule] = await Promise.all([
      loadModuleWithValidation(`${agentBasePath}/prompt.js`, 'getPrompt'),
      loadModuleWithValidation(`${agentBasePath}/tools/list.js`, 'default'),
      loadModuleWithValidation(`${agentBasePath}/tools/map.js`, 'default'),
      loadModuleWithValidation(`${agentBasePath}/model.js`, 'model')
    ])

    return {
      prompt: promptModule.getPrompt(),
      tools: toolsModule.default,
      map: mapModule.default,
      model: modelModule.model,
    }
  } catch (error) {
    throw new Error(`加载Agent "${agentName}" 失败: ${error.message}`)
  }
}

/**
 * 安全加载模块并验证必需的导出
 * @param {string} modulePath 模块路径
 * @param {string} exportName 需要验证的导出名称
 * @returns {Promise<Object>} 模块对象
 */
async function loadModuleWithValidation(modulePath, exportName) {
  try {
    const module = await import(modulePath)

    if (exportName === 'default') {
      if (module.default === undefined) {
        throw new Error(`模块 ${modulePath} 缺少默认导出`)
      }
    } else {
      if (module[exportName] === undefined) {
        throw new Error(`模块 ${modulePath} 缺少必需的导出: ${exportName}`)
      }
    }

    return module
  } catch (error) {
    // 如果是模块加载错误，提供更友好的错误信息
    if (error.code === 'MODULE_NOT_FOUND' || error.message.includes('Cannot resolve module')) {
      throw new Error(`找不到文件: ${modulePath}`)
    }
    throw error
  }
}

/**
 * 获取所有可用的Agent列表（扫描agents目录）
 * @returns {Promise<string[]>} Agent名称数组
 */
export async function discoverAgents() {
  try {
    const { readdir } = await import('fs/promises')
    const agentsDir = join(__dirname, '.')

    const entries = await readdir(agentsDir, { withFileTypes: true })

    return entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .filter(name => !name.startsWith('.') && name !== 'node_modules')
      .sort()
  } catch (error) {
    console.warn('扫描Agent目录失败:', error.message)
    return []
  }
}

/**
 * 验证Agent结构的完整性
 * @param {string} agentName Agent名称
 * @returns {Promise<boolean>} 是否完整
 */
export async function validateAgentStructure(agentName) {
  try {
    await loadAgent(agentName)
    return true
  } catch {
    return false
  }
}
