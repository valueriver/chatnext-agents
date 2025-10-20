# Chatnext Agents

多 Agent 协作的终端助手：主控管理者会解析意图、调度专职 Agent，可以搭配任意兼容 OpenAI Chat Completions + 工具调用规范的模型（如 OpenAI、DeepSeek等）协同完成任务。

## Agents
- `main_manager` – 总控中枢，判断意图并派发子任务  
- `history_seeker` – 在历史消息中检索上下文  
- `memory_manager` – 维护长期记忆（增删改查）  
- `sqlite_manager` – 执行自定义 SQL  
- `shell_executor` – 运行系统 Shell 命令  
- `agent_manager` – 查看与维护现有 Agent  
- `agent_builder` – 生成或扩展 Agent 框架

## Quick Start
1. 安装依赖：`npm install`
2. 配置 OpenAI 兼容模型参数（任意遵循同规范且具备工具调用能力的服务，如 OpenAI、DeepSeek 等）：
   ```bash
   export OPENAI_API_KEY=your_key
   export OPENAI_API_URL=https://api.openai.com # 可选，默认为官方地址
   ```
   > 任何支持工具调用（Tool Calling / Function Calling）的 Chat Completion 模型都可使用。
3. 运行 CLI：`node app.js`

## How It Works
- `runAgent` 会把系统提示插入消息列表，通过 OpenAI Chat Completion 获取回复；若模型返回工具调用，循环会：
  1. 记录 assistant 消息；
  2. 根据当前 Agent 的 `map.js` 查找工具描述；
  3. 若目标是函数，调用 `functions/` 内的实现；若目标是 Agent，则递归调用 `runAgent`。
- 每个 Agent 的 `tools.js` 与 `map.js` 共同描述了可调用工具与路由规则，从而在配置层实现多 Agent 协作。
- 所有消息、认知、活动记录统一写入 SQLite，确保记忆检索与状态追踪。
