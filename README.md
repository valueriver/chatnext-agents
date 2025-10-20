# 🤖 多Agent智能助手系统

[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![SQLite](https://img.shields.io/badge/SQLite-3-lightgrey.svg)](https://sqlite.org/)

一个基于 Node.js 的多 Agent 框架智能助手系统，采用模块化 Agent 架构，支持长期记忆、历史搜索和智能对话。

## ✨ 核心特性

- 🧠 **长期记忆能力** - 智能记忆和检索重要信息
- 🔍 **历史对话搜索** - 快速查找之前的对话内容
- 📊 **智能认知更新** - 自动更新对用户的认知状态
- 💬 **连续对话** - 保持上下文连贯的多轮对话
- 🤖 **多Agent协作** - MainAgent + 6个专用Agent协同工作
- 🏗️ **约定式加载** - Agent按标准结构自动发现，零配置
- 🛠️ **Agent构建器** - 智能创建新Agent，支持自动化开发
- 💾 **数据库操作** - SQLite查询和Shell命令执行能力
- 🗄️ **SQLite 存储** - 轻量级本地数据持久化
- 🔧 **工具调用系统** - 灵活的Agent工具映射和执行机制
- 📝 **活动记录** - 完整的AI操作历史和Token使用统计

## 🚀 快速开始

### 环境要求

- Node.js >= 18.0.0
- OpenAI API Key

### 安装步骤

1. **克隆项目**
   ```bash
   git clone <repository-url>
   cd chatnext-agents
   ```

2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**

   在项目根目录创建 `.env` 文件：
   ```env
   OPENAI_API_KEY=your_openai_api_key_here
   OPENAI_API_URL=https://api.openai.com
   ```

4. **启动应用**
   ```bash
   node app.js
   ```

## 💬 使用指南

### 基本交互

启动后进入交互式对话界面：

```bash
🚀 欢迎使用 AI 智能助手！

👤 您: 你好，我是小明
🤖 AI助手: 你好，小明！很高兴认识你。我是你的AI助手，可以帮你记住重要信息、搜索历史对话，并进行智能分析。

👤 您: 记住我喜欢喝咖啡，不加糖
🤖 AI助手: 好的，我已经记住了：你喜欢喝咖啡，不加糖。这个信息会保存在我的长期记忆中。

👤 您: 帮我创建一个记忆：项目截止日期是下周五
🤖 AI助手: 记忆创建成功！我已经为你记录了项目截止日期是下周五这个重要信息。
```

### 核心功能示例

#### 长期记忆管理
```bash
# 创建记忆
"记住我的生日是6月15日"
"帮我创建记忆：重要会议明天下午3点"

# 查看记忆
"查看我所有的记忆"
"搜索关于咖啡的记忆"

# 更新记忆
"更新记忆ID 3的内容：会议改到明天上午10点"

# 删除记忆
"删除记忆ID 5"
```

#### 历史对话搜索
```bash
"我之前说过什么关于编程的事情？"
"搜索所有包含'学习'的对话"
"查找我上周提到的项目信息"
```

#### 智能分析
```bash
"根据我的记忆，帮我分析一下我的工作重点"
"我最近的学习情况怎么样？"
"更新一下对我的认知状态"
```

#### 数据库操作
```bash
"查看数据库中有多少条对话记录"
"显示所有表的结构"
"查询最近5条记忆记录"
```

#### 系统命令
```bash
"查看当前目录的文件列表"
"检查系统内存使用情况"
"显示当前时间和日期"
```

#### Agent管理
```bash
"帮我创建一个天气查询Agent"
"查看当前有哪些Agent"
"给memory_manager添加一个导出工具"
```

## 🏗️ 系统架构

```
chatnext-agents/
├── agents/                     # Agent 模块
│   ├── agent_builder/          # Agent构建器
│   │   ├── model.js
│   │   ├── prompt.js
│   │   └── tools/
│   │       ├── actions/
│   │       │   ├── addTool.js
│   │       │   ├── createAgent.js
│   │       │   └── listAgents.js
│   │       ├── list.js
│   │       └── map.js
│   ├── agent_manager/          # Agent管理器
│   │   ├── model.js
│   │   ├── prompt.js
│   │   └── tools/
│   │       ├── list.js
│   │       └── map.js
│   ├── history_seeker/         # 历史搜索Agent
│   │   ├── model.js
│   │   ├── prompt.js
│   │   └── tools/
│   │       ├── actions/
│   │       │   └── search.js
│   │       ├── list.js
│   │       └── map.js
│   ├── main_manager/           # 主控Agent (任务调度)
│   │   ├── model.js
│   │   ├── prompt.js
│   │   ├── tools/
│   │   │   ├── actions/
│   │   │   │   └── overview.js
│   │   │   ├── list.js
│   │   │   └── map.js
│   ├── memory_manager/         # 记忆管理Agent
│   │   ├── model.js
│   │   ├── prompt.js
│   │   └── tools/
│   │       ├── actions/
│   │       │   ├── create.js
│   │       │   ├── read.js
│   │       │   ├── update.js
│   │       │   └── delete.js
│   │       ├── list.js
│   │       └── map.js
│   ├── shell_executor/         # Shell执行Agent
│   │   ├── model.js
│   │   ├── prompt.js
│   │   └── tools/
│   │       ├── actions/
│   │       │   └── executeShell.js
│   │       ├── list.js
│   │       └── map.js
│   ├── sqlite_manager/         # SQLite管理Agent
│   │   ├── model.js
│   │   ├── prompt.js
│   │   └── tools/
│   │       ├── actions/
│   │       │   └── executeSql.js
│   │       ├── list.js
│   │       └── map.js
│   ├── activity.js             # 活动记录写入
│   ├── handle.js               # Agent处理器
│   ├── loader.js               # 约定式Agent加载器
│   └── openai.js               # OpenAI 客户端封装
├── database/                  # 数据库模块
│   ├── sqlite.js             # 数据库连接管理
│   ├── schema.sql            # 数据库结构定义
│   └── app.db                # SQLite数据库文件
├── app.js                     # 应用入口
├── utils.js                   # 常用消息/认知工具
├── package.json              # 项目配置
└── README.md                 # 项目文档
```

## 🤖 Agent 系统详解

### 主控Agent (main_manager)
负责理解用户意图，协调各子Agent：
- **意图分析** - 理解用户需求，选择合适的操作
- **任务调度** - 决定调用哪个专用Agent
- **Agent协调** - 智能调用6个专用Agent
- **认知更新** - 根据对话内容更新对用户的认知
- **结果整合** - 整合各Agent结果，生成最终回复

### 历史搜索Agent (history_seeker)
专门负责对话历史搜索：
- **精确搜索** - 根据关键词在messages表中搜索
- **上下文提取** - 提取相关对话的完整上下文
- **信息汇总** - 整理搜索结果，提供有价值的信息
- **相关性排序** - 按时间倒序排列最新相关对话

### 记忆管理Agent (memory_manager)
负责长期记忆的完整生命周期管理：
- **create_memory** - 创建新的记忆条目
- **read_memory** - 读取/搜索记忆内容
- **update_memory** - 更新现有记忆
- **delete_memory** - 删除过时或错误的记忆

### SQLite管理Agent (sqlite_manager)
负责数据库操作和查询：
- **execute_sql** - 执行任意SQL语句
- **查询结果格式化** - 自动格式化查询输出
- **数据库管理** - 支持表操作和数据管理
- **安全执行** - 基本的SQL安全检查

### Shell执行Agent (shell_executor)
负责系统命令执行：
- **execute_shell** - 执行任意shell命令
- **结果捕获** - 捕获标准输出和错误
- **超时控制** - 防止命令无限执行
- **错误处理** - 友好的错误信息返回

### Agent构建器 (agent_builder)
负责自动化Agent创建：
- **create_agent** - 按标准模板创建新Agent
- **add_tool** - 为现有Agent添加新工具
- **list_agents** - 列出和管理所有Agent
- **模板生成** - 自动生成符合规范的代码文件

## 📊 数据库设计

系统使用 SQLite 数据库，包含以下表结构：

### 核心数据表
- **messages** - 对话消息表（存储用户和AI的所有对话）
- **memories** - 记忆表（存储AI需要记住的重要信息）
- **overviews** - 认知状态表（存储AI对用户的整体认知）
- **activities** - 活动记录表（调试和分析AI行为）

### 数据流设计
```
用户输入 → messages表 → MainAgent
    ↓
需要历史 → history_seeker → messages表搜索
    ↓
需要记忆 → memory_manager → memories表 CRUD
    ↓
需要SQL操作 → sqlite_manager → SQLite数据库
    ↓
需要系统操作 → shell_executor → Shell命令
    ↓
需要创建Agent → agent_builder → 生成新Agent文件
    ↓
认知更新 → MainAgent → overviews表插入
```

## 🔧 Agent 开发指南

### 约定式加载机制

系统采用**约定优于配置**的原则，只要按照标准目录结构创建Agent，系统会自动发现和加载，无需手动注册。

### Agent标准结构
```
agents/[agent_name]/
├── prompt.js           # Agent提示词 (必需：getPrompt函数)
├── model.js           # 模型配置 (必需：model导出)
└── tools/
    ├── list.js        # 工具定义 (必需：默认导出)
    ├── map.js         # 工具映射 (必需：默认导出)
    └── actions/       # 工具实现 (可选)
        └── [tool_name].js
```

### 创建新的Agent

有两种方式创建新Agent：

#### 方式1：使用agent_builder (推荐)
```bash
👤 您: 帮我创建一个天气查询Agent，支持按城市查询天气和预报功能
🤖 AI助手: 我来帮你创建一个天气查询Agent...
```

#### 方式2：手动创建

1. **创建Agent目录结构**
```bash
mkdir agents/your_agent_name
mkdir -p agents/your_agent_name/tools/actions
```

2. **实现Agent组件**

**prompt.js** - 定义Agent的提示词：
```javascript
export function getPrompt() {
  return `你是XXX专家，负责...

## 核心功能
1. ...

## 可用工具
- tool_name1: 工具描述
- tool_name2: 工具描述

## 工作流程
1. 分析用户需求
2. 选择合适工具
3. 执行操作
4. 返回结果
`
}
```

**model.js** - 配置AI模型：
```javascript
export const model = 'gpt-4o-mini'
```

**tools/list.js** - 定义工具列表：
```javascript
const tools = [
  {
    type: 'function',
    function: {
      name: 'tool_name',
      description: '工具描述',
      parameters: {
        type: 'object',
        properties: {
          param1: {
            type: 'string',
            description: '参数描述'
          }
        },
        required: ['param1']
      },
    },
  },
  // 更多工具...
]

export default tools
```

**tools/map.js** - 映射工具执行函数：
```javascript
import { yourToolFunction } from './actions/your-tool.js'

const toolMap = [
  {
    name: 'tool_name',
    type: 'function',
    description: '工具描述',
    execute: (args) => yourToolFunction(args),
  },
]

export default toolMap
```

**actions/your-tool.js** - 实现具体工具：
```javascript
import { sqlite } from '../../../database/sqlite.js'

export async function yourToolFunction({ param1 }) {
  try {
    const db = await sqlite()

    return new Promise((resolve, reject) => {
      // 数据库操作逻辑
      db.run(
        'SQL_QUERY_HERE',
        [param1],
        function(err) {
          if (err) {
            reject(`操作失败: ${err.message}`)
            return
          }
          resolve('操作成功')
        }
      )
    })
  } catch (err) {
    return `操作失败: ${err.message}`
  }
}
```

4. **完成创建**
Agent创建完成后，系统会自动发现并加载该Agent，无需手动注册！

### 在MainAgent中调用子Agent

**1. 在tools/list.js中添加工具定义：**
```javascript
{
  name: 'your_agent_name',
  type: 'agent',
  description: '调用XXX子Agent',
  parameters: {
    type: 'object',
    properties: {
      message: { type: 'string', description: '要传递的消息' }
    },
    required: ['message']
  },
}
```

**2. 在tools/map.js中添加映射：**
```javascript
{
  name: 'your_agent_name',
  type: 'agent',
  description: '调用XXX子Agent',
  target: 'your_agent_name',
}
```

## 📝 API 参考

### Agent调用接口

```javascript
import { runAgent } from './agents/handle.js'

// 调用MainAgent
const result = await runAgent({
  agentName: 'main_manager',
  messages: [
    { role: 'user', content: '用户消息' }
  ]
})

// 调用子Agent
const subResult = await runAgent({
  agentName: 'memory_manager',
  messages: [
    { role: 'user', content: '子消息' }
  ]
})
```

### 常用工具函数

```javascript
import { loadMessages, saveMessage, loadOverview } from './utils.js'
import { updateOverview } from './agents/main_manager/tools/actions/overview.js'
import { searchMessages } from './agents/history_seeker/tools/actions/search.js'
import { createMemory } from './agents/memory_manager/tools/actions/create.js'
import { readMemory } from './agents/memory_manager/tools/actions/read.js'
import { executeSql } from './agents/sqlite_manager/tools/actions/executeSql.js'
import { executeShell } from './agents/shell_executor/tools/actions/executeShell.js'

// 消息服务
const history = await loadMessages(20)
await saveMessage('user', '用户消息')
const searchResults = await searchMessages({ keyword: '关键词' })

// 认知服务
const overview = await loadOverview()
await updateOverview({ content: '新的认知内容' })

// 记忆服务
await createMemory({ title: '标题', content: '记忆内容' })
const memories = await readMemory({ keyword: '搜索词' })

// SQLite服务
const sqlResult = await executeSql({ sql: 'SELECT * FROM messages LIMIT 5' })

// Shell服务
const shellResult = await executeShell({ command: 'ls -la' })
```

### 约定式Agent加载

```javascript
import { loadAgent, discoverAgents } from './agents/loader.js'

// 自动发现所有Agent
const agents = await discoverAgents()
console.log('可用Agent:', agents) // ['main_manager', 'memory_manager', ...]

// 按名称加载Agent（无需注册）
const agent = await loadAgent('memory_manager')
console.log('Agent配置:', agent.prompt, agent.tools, agent.model)

// 验证Agent结构
const isValid = await validateAgentStructure('memory_manager')
```

### 数据库操作

```javascript
import { sqlite } from './database/sqlite.js'

const db = await sqlite()
// 使用标准 sqlite3 API
db.all('SELECT * FROM messages', [], (err, rows) => {
  // 数据库操作
})
```

## 🛠️ 工具调用机制

系统支持两种工具类型：

### 函数工具 (Function Tools)
直接执行的JavaScript函数，用于简单操作：
```javascript
// 在 actions/file.js中实现
export async function saveFile({ content, filename }) {
  // 文件保存逻辑
  return `文件 ${filename} 保存成功`
}
```

### Agent工具 (Agent Tools)
调用其他Agent处理复杂任务：
```javascript
// 在 tools/map.js中定义
{
  name: 'memory_manager',
  type: 'agent',
  description: '调用记忆管理子Agent',
  target: 'memory_manager',
}
```

## 🤝 贡献指南

1. Fork 本项目
2. 创建特性分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 开启 Pull Request

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 🔮 未来计划

- [ ] 支持更多AI模型（Claude、Gemini、通义千问等）
- [ ] 添加记忆分类和标签系统
- [ ] 实现记忆导出功能（JSON、Markdown、CSV等）
- [ ] 添加对话模板和快捷命令
- [ ] 支持多用户隔离
- [ ] 实现记忆优先级和过期机制
- [ ] 添加对话分析和统计功能
- [ ] 支持记忆的模糊搜索和语义搜索
- [ ] 添加Web界面和管理后台

## 📞 支持

如果您有任何问题或建议，请：

1. 查看 [Issues](../../issues) 页面
2. 创建新的 Issue
3. 参与讨论

---

⭐ 如果这个项目对您有帮助，请给我们一个星标！
