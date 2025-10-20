//@ts-check
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

/**
 * 执行shell命令
 * @param {Object} args 工具参数
 * @param {string} args.command 要执行的shell命令
 * @returns {string} 执行结果
 */
export async function executeShell({ command }) {
  try {
    console.log(`🔧 执行Shell命令: ${command}`)

    // 执行命令，限制超时时间为30秒
    const { stdout, stderr } = await execAsync(command, {
      timeout: 30000,
      maxBuffer: 1024 * 1024, // 1MB buffer
    })

    let result = `命令执行成功: ${command}\n\n`

    if (stdout && stdout.trim()) {
      result += `标准输出:\n${stdout}`
    }

    if (stderr && stderr.trim()) {
      result += `\n标准错误:\n${stderr}`
    }

    if (!stdout && !stderr) {
      result += '命令执行完成，无输出。'
    }

    return result
  } catch (error) {
    let result = `命令执行失败: ${command}\n\n`

    if (error.stdout) {
      result += `标准输出:\n${error.stdout}\n\n`
    }

    if (error.stderr) {
      result += `标准错误:\n${error.stderr}\n\n`
    }

    result += `错误信息: ${error.message}`

    return result
  }
}