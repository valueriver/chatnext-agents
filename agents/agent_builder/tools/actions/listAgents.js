//@ts-check
import { readdir, readFile } from 'fs/promises'
import { join, dirname } from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const AGENTS_DIR = join(__dirname, '../../../../')

/**
 * 列出所有已存在的Agent
 * @returns {string} Agent列表
 */
export async function listAgents() {
  try {
    const agentsPath = join(AGENTS_DIR, 'agents')
    const entries = await readdir(agentsPath, { withFileTypes: true })

    // 过滤出目录（Agent）
    const agentDirs = entries
      .filter(entry => entry.isDirectory())
      .map(entry => entry.name)
      .filter(name => !name.startsWith('.'))
      .sort()

    if (agentDirs.length === 0) {
      return '📭 当前没有任何Agent'
    }

    let result = `📋 当前共有 ${agentDirs.length} 个Agent:\n\n`

    for (let i = 0; i < agentDirs.length; i++) {
      const agentName = agentDirs[i]
      result += `${i + 1}. **${agentName}**\n`

      try {
        // 尝试读取prompt.js获取描述
        const promptPath = join(agentsPath, agentName, 'prompt.js')
        const promptContent = await readFile(promptPath, 'utf8')
        const descMatch = promptContent.match(/你是(.+?)专家/)
        if (descMatch) {
          result += `   📝 ${descMatch[1]}\n`
        }

        // 检查工具数量
        const toolsListPath = join(agentsPath, agentName, 'tools', 'list.js')
        const toolsContent = await readFile(toolsListPath, 'utf8')
        const toolMatches = toolsContent.match(/name: '([^']+)'/g) || []
        result += `   🔧 工具: ${toolMatches.length}个\n`
      } catch (err) {
        result += `   ⚠️  读取Agent信息失败\n`
      }

      result += '\n'
    }

    result += `💡 使用 "创建agent" 命令来创建新的Agent`

    return result
  } catch (error) {
    return `❌ 列出Agent失败: ${error.message}`
  }
}