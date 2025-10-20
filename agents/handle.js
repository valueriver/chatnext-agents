import { loadAgent } from './loader.js'
import { handleChat } from './openai.js'
import { saveActivity } from './activity.js'

export async function runAgent({ agentName, messages }) {

  //加载agent的上下文，工具和映射
  const { prompt, tools, map, model } = await loadAgent(agentName)

  // 在最前面添加system prompt
  if (prompt) {
    messages.unshift({ role: 'system', content: prompt })
  }

  while (true) {
    const response = await handleChat({
      model,
      messages,
      tools,
    })

    const message = response?.choices?.[0]?.message

    // console.log('ai回复',JSON.stringify(message))

    // 保存活动记录
    await saveActivity({
      model,
      message: JSON.stringify(message),
      usage: JSON.stringify(response.usage),
      agentName
    })

    const toolCalls = Array.isArray(message.tool_calls) ? message.tool_calls : []

    if (!toolCalls.length) {
      //没有工具调用
      //返回结果
      return message.content

    } else {
      //存在工具调用，继续

      messages.push({
        role: 'assistant',
        content: message.content,
        tool_calls: toolCalls,
      })

      //遍历执行所有工具
      for (const call of toolCalls) {

        //查找工具名称
        const name = call?.function?.name

        //加载工具映射
        const tool = map.find((item) => item.name === name)

        //格式化工具调用参数
        let args = JSON.parse(call.function.arguments)

        let result

        if (tool.type === 'agent') {
          //如果工具指向了agent，传递当前消息上下文
          result = await runAgent({
            agentName: tool.target,
            messages: [
              { role: 'user', content: args.message }
            ]
          })

        } else if (typeof tool.execute === 'function') {
          result = await tool.execute(args)
        }

        messages.push({
          role: 'tool',
          tool_call_id: call.id,
          content: typeof result === 'string' ? result : JSON.stringify(result),
        })
      }
    }
  }
}
