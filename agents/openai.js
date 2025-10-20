//@ts-check

/**
 * OpenAI Chat API 服务处理器
 * @param {Object} payload OpenAI API 请求负载
 * @returns {Promise<Object>} OpenAI API 响应
 */
export async function handleChat(payload) {
  if (!payload.model) {
    throw new Error('Payload must contain model field')
  }

  const apiUrl = `${process.env.OPENAI_API_URL || 'https://api.openai.com'}/v1/chat/completions`
  const apiKey = process.env.OPENAI_API_KEY

  if (!apiKey) {
    throw new Error('OPENAI_API_KEY environment variable is required')
  }

  try {
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify(payload),
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('API error:', response.status, errorText)
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    const result = await response.json()
    // console.log('handleChat result:', JSON.stringify(result))
    return result
  } catch (err) {
    console.error('handleChat failed:', err?.message ?? err)
    throw err
  }
}
