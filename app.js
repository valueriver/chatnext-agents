import { runAgent } from './agents/handle.js'
import { loadMessages, saveMessage, loadOverview } from './utils.js'
import dotenv from 'dotenv'
import readline from 'readline'

// 加载环境变量
dotenv.config()

/**
 * 创建命令行接口
 */
function createCLI() {
  return readline.createInterface({
    input: process.stdin,
    output: process.stdout,
    prompt: '\n👤 您: '
  })
}

/**
 * 显示欢迎信息
 */
function showWelcome() {
  console.log(`
🚀 欢迎使用 AI 智能助手！

💡 功能特点：
• 🧠 长期记忆 - 会记住重要信息
• 🔍 历史搜索 - 可以查找之前的对话
• 📊 智能分析 - 自动更新对您的认知
• 💬 连续对话 - 保持上下文连贯

📝 输入示例：
• "记住我喜欢咖啡"
• "我之前说过什么关于学习的事情？"
• "更新一下对我的认知"
• "帮我创建一个记忆：项目截止日期是下周三"

🚪 输入 'exit' 或 'quit' 退出程序
• 输入 'help' 查看帮助信息
`)
}


/**
 * 处理用户消息
 */
async function handleUserMessage(userMessage) {
  try {

    // 加载对话历史和AI认知
    const history = await loadMessages()
    const overview = await loadOverview()

    // 构建完整的消息数组
    const messages = []

    // 添加系统认知状态
    if (overview) {
      messages.push({
        role: 'system',
        content: `当前对用户的认知状态: ${overview}`
      })
    }

    // 添加对话历史
    if (history.length > 0) {
      messages.push(...history)
    }

    // 添加当前用户消息
    messages.push({
      role: 'user',
      content: userMessage
    })

    // 保存用户消息
    await saveMessage('user', userMessage)

    // 调用AI助手
    const aiResponse = await runAgent({
      agentName: 'main_manager',
      messages: [...messages] // 传递副本，避免被修改
    })

    console.log(`\n🤖 AI助手: ${aiResponse}`)

    // 保存AI回复
    await saveMessage('assistant', aiResponse)

  } catch (error) {
    console.error('❌ 处理消息时出错:', error.message)
    console.log('💡 请检查您的输入或稍后重试')
  }
}

/**
 * 主要应用入口 - 交互式AI助手
 */
async function main() {
  try {
    // 检查 API Key
    if (!process.env.OPENAI_API_KEY) {
      console.error('❌ 错误：未找到 OPENAI_API_KEY 环境变量')
      console.log('💡 请在 .env 文件中配置您的 OpenAI API Key')
      process.exit(1)
    }

    // 显示欢迎信息
    showWelcome()

    // 创建命令行接口
    const cli = createCLI()
    cli.prompt()

    // 监听用户输入
    cli.on('line', async (input) => {
      const trimmedInput = input.trim()

      // 处理特殊命令
      switch (trimmedInput.toLowerCase()) {
        case 'exit':
        case 'quit':
          console.log('\n👋 再见！感谢使用 AI 智能助手！')
          cli.close()
          return

        case '':
          cli.prompt()
          return

        case 'help':
          console.log(`
📖 帮助信息：

【基本命令】
• help - 显示此帮助信息
• exit/quit - 退出程序

【AI助手功能】
• "记住..." - 让AI记住重要信息
• "搜索..." - 查找历史对话
• "更新认知" - 让AI更新对你的认知
• "创建记忆" - 保存长期记忆
• "查看记忆" - 查看已保存的记忆

【示例对话】
• "记住我喜欢喝咖啡，不加糖"
• "我之前说过什么关于学习编程的事情？"
• "帮我创建记忆：项目deadline是下周五"
• "查看我所有的记忆"
`)
          cli.prompt()
          return

        default:
          // 处理普通对话
          await handleUserMessage(trimmedInput)
          cli.prompt()
      }
    })

    // 处理 Ctrl+C
    cli.on('close', () => {
      console.log('\n👋 程序已退出')
      process.exit(0)
    })

    // 处理未捕获的异常
    process.on('uncaughtException', (error) => {
      console.error('\n❌ 未捕获的异常:', error.message)
      process.exit(1)
    })

    process.on('unhandledRejection', (reason, promise) => {
      console.error('\n❌ 未处理的 Promise 拒绝:', reason)
      process.exit(1)
    })

  } catch (error) {
    console.error('❌ AI助手启动失败:', error.message)
    console.error(error.stack)
    process.exit(1)
  }
}

// 如果直接运行此文件，则执行主函数
if (import.meta.url === `file://${process.argv[1]}`) {
  main()
}
