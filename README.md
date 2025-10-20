# ⚡️ Chatnext Agents

🤖 模块化多 Agent 终端助手：主控管理者按需编排各功能 Agent，既能通过智能认知刷新、长期记忆管理、历史记录搜索打造“记忆型”对话体验，又能借助 Shell 命令执行与 SQLite 查询解锁实用技能；配合 Agent 管理 / 构建能力，系统具备自我治理与持续扩展的潜力。  
🌐 兼容模型：OpenAI、DeepSeek、Kimi、Gemini（OpenAI 接口）、Grok、Mistral、Doubao 等所有支持 OpenAI Chat Completions + Tool Calling 的服务。  

## Default Agents
- 🧠 `main_manager` – 总控中枢，判断意图并派发子任务  
- 🔎 `history_seeker` – 检索历史消息，补全上下文  
- 🗂️ `memory_manager` – 管理长期记忆（增删改查）  
- 🧮 `sqlite_manager` – 执行自定义 SQL  
- 🖥️ `shell_executor` – 运行系统 Shell 命令  
- 🧭 `agent_manager` – 查看与维护现有 Agent  
- 🏗️ `agent_builder` – 生成或扩展 Agent 框架

## Quick Start
1. 安装依赖：`npm install`
2. 配置 OpenAI 兼容模型参数（如 OpenAI、DeepSeek、Kimi、Gemini、Grok、Mistral、Doubao 等任意遵循同规范并具备工具调用能力的服务）：
   ```bash
   export OPENAI_API_KEY=your_key
   export OPENAI_API_URL=https://api.openai.com # 可选，默认为官方地址
   ```
   > 任何支持工具调用（Tool Calling / Function Calling）的 Chat Completion 模型都可使用。
3. 运行 CLI：`node app.js`

## Multi-Agent Flow
- `loader.js` 按约定式目录加载指定 Agent 的 `prompt`、`tools`、`map`、`model`，并将系统提示与当前消息交给 `runAgent`。
- `runAgent` 内部是一个 `while` 循环：每轮向兼容 OpenAI 工具调用规范的模型发起请求；若返回普通文本，直接回复用户并结束循环。
- 若模型返回工具调用，则根据当前 Agent 的 `map.js` 判断是执行 `functions/` 中的函数，还是递归触发其他 Agent；执行结果写回消息队列后继续下一轮，直到得到最终回答。
- 全流程会把消息、认知概览与调用日志写入 SQLite，方便历史回放与状态追踪。

## Agent Development Guide
- **结构约定**：每个 Agent 位于 `agents/<name>/`，包含 `model.js`、`prompt.js`、`tools.js`、`map.js` 以及可选的 `functions/` 实现。
- **工具声明**：`tools.js` 列出工具名称、描述与参数；`map.js` 将这些工具映射到具体实现（函数或子 Agent），决定执行路线。
- **扩展流程**：
  1. 在 `tools.js` 添加或修改工具定义；
  2. 若为函数型工具，在 `functions/` 中实现具体逻辑；
  3. 更新当前 Agent 的 `map.js` 指向新函数或目标 Agent，并确保该工具被主控 `main_manager`（或其他可触达的 Agent）在自身 `map.js` 中引用，`runAgent` 才能自动调度。
