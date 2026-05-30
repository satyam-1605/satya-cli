# Satya CLI - Comprehensive Project Documentation

## Project Overview

**Satya CLI** is an intelligent command-line interface project built with Bun and TypeScript. It provides multiple operational modes for interacting with codebases through AI-powered agents, planning utilities, and interactive Telegram bot integration.

**Key Details:**
- **Name:** satya-cli
- **Type:** Bun CLI Application
- **Runtime:** Bun
- **Language:** TypeScript (ESNext)
- **License:** Private
- **Version:** 1.0.0

---

## Project Structure

```
cli-project/
├── index.ts                 # Main entry point with CLI commands
├── package.json             # Project dependencies and metadata
├── tsconfig.json            # TypeScript configuration
├── test.ts                  # Test file for basic functionality
├── README.md                # Original minimal README
│
├── ai/                      # AI Configuration Module
│   ├── ai.config.ts         # OpenRouter AI model configuration
│   └── index.ts             # Exports AI utilities
│
├── modes/                   # Operation Modes
│   ├── cli.ts               # Main CLI mode selector
│   │
│   ├── agent/               # Agent Mode - Autonomous Task Execution
│   │   ├── orchestrator.ts   # Main agent orchestrator
│   │   ├── types.ts          # Type definitions and config
│   │   ├── action-tracker.ts # Tracks all agent actions
│   │   ├── tool-executor.ts  # Executes tool operations
│   │   ├── agents-tools.ts   # Tool definitions for agent
│   │   ├── approval.ts       # User approval workflow
│   │   └── diff-view.ts      # Displays file diffs
│   │
│   ├── ask/                 # Ask Mode - Question Answering
│   │   └── orchestrator.ts   # Ask mode orchestrator
│   │
│   ├── plan/                # Plan Mode - Task Planning
│   │   ├── orchestrator.ts   # Plan mode orchestrator
│   │   ├── planner.ts        # Generates execution plans
│   │   ├── selection.ts      # Step selection interface
│   │   ├── types.ts          # Plan data structures
│   │   └── web-tools.ts      # Web scraping/research tools
│   │
│   └── telegram/            # Telegram Bot Integration
│       ├── index.ts         # Telegram mode entry point
│       ├── handlers.ts      # Telegram message handlers
│       ├── agent-run.ts     # Agent execution in Telegram
│       ├── approval-session.ts # Approval workflow for bot
│       ├── plan-session.ts   # Plan mode in Telegram
│       ├── auth.ts          # Telegram authentication
│       ├── constants.ts     # Bot constants and messages
│       └── text.ts          # Text formatting utilities
│
└── tui/                     # Terminal UI Components
    ├── wakeup.ts            # Main startup/mode selector with ASCII banner
    ├── terminal-md.ts       # Markdown rendering for terminal
    └── [index.ts]           # [Potentially additional TUI utilities]
```

---

## Core Features

### 1. **Agent Mode** (`modes/agent/`)

Autonomous AI agent that can analyze, modify, and create files in the codebase.

**Key Components:**
- **Orchestrator** (`orchestrator.ts`): Manages the agent lifecycle
  - Takes user goal as input
  - Runs ToolLoopAgent with max 40 steps
  - Tracks all actions for review
  - Implements approval workflow before applying changes

- **Action Tracker** (`action-tracker.ts`): Records all operations
  - Logs file creates, modifications, deletions, folder operations
  - Tracks status: pending → approved/rejected → executed
  - Returns pending mutations for review

- **Tool Executor** (`tool-executor.ts`): Safe file operations
  - Stages changes before applying (no direct mutations)
  - Supports: read_file, create_file, modify_file, delete_file, create_folder
  - Enforces path safety (escapes workspace prevention)
  - Respects exclusion patterns (node_modules, .git, etc.)
  - File size limits for safety

- **Agent Tools** (`agents-tools.ts`): Tool definitions
  - File operations (read, create, modify, delete)
  - Directory operations (list, search, analyze)
  - Skill discovery and reading
  - Shell command execution

- **Approval System** (`approval.ts`): User review workflow
  - Batch or individual approval options
  - Diff preview for file changes
  - Groups changes by path for easy review
  - Shows shell commands for verification

### 2. **Ask Mode** (`modes/ask/`)

AI-powered question answering system that analyzes codebases and answers queries.

**Features:**
- Read-only access to codebase files
- Codebase analysis capabilities
- Skill discovery and analysis
- Web research tools integration
- Markdown formatted answers

### 3. **Plan Mode** (`modes/plan/`)

Strategic planning and step-by-step execution system.

**Key Components:**
- **Planner** (`planner.ts`): Generates multi-step execution plans
  - Uses AI to break down goals into steps
  - Returns structured plan with descriptions and complexity
  - Limited to 15 steps max per plan

- **Selection** (`selection.ts`): Interactive step selection
  - Users choose which steps to execute
  - Displays plan with complexity indicators
  - Allows selective execution

- **Web Tools** (`web-tools.ts`): Research capabilities
  - Web scraping/research tools
  - Firecrawl integration for web data
  - Supports informed planning decisions

**Process:**
1. User provides goal
2. AI generates multi-step plan
3. User selects steps to execute
4. Agent executes selected steps with full toolset
5. Changes staged for approval
6. User reviews and applies changes

### 4. **Telegram Bot Mode** (`modes/telegram/`)

Distributed AI access via Telegram chat interface.

**Features:**
- Bot authentication with TELEGRAM_BOT_TOKEN
- Owner verification via TELEGRAM_OWNER_ID
- Session management for multi-step interactions
  - Agent sessions (`agent-run.ts`)
  - Plan sessions (`plan-session.ts`)
  - Approval sessions (`approval-session.ts`)

**Components:**
- **Handlers** (`handlers.ts`): Telegram command processing
- **Text Formatting** (`text.ts`): Telegram-specific formatting
- **Auth** (`auth.ts`): Authentication and security
- **Constants** (`constants.ts`): Bot messages and constants

### 5. **Terminal UI** (`tui/`)

User interface components for terminal interactions.

**Components:**
- **Wakeup** (`wakeup.ts`): Main startup screen
  - ASCII art banner (using Figlet)
  - Mode selector: CLI, Telegram, or Exit
  - Entry point for all interactions

- **Terminal Markdown** (`terminal-md.ts`): Markdown rendering
  - Uses marked-terminal for styled output
  - Terminal width detection (40-120 chars)
  - Text reflow support

### 6. **AI Configuration** (`ai/`)

Central AI model management using OpenRouter.

**Configuration:**
- Provider: OpenRouter (free tier support)
- Environment variables:
  - `OPENROUTER_API_KEY`: API authentication
  - `OPENROUTER_DEFAULT_MODEL`: Default model selection
- Exported via unified interface

---

## Environment Variables

Required for operation:

```bash
# OpenRouter AI Configuration
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_DEFAULT_MODEL=openrouter/free  # or specific model

# Telegram Bot Configuration (optional, for Telegram mode)
TELEGRAM_BOT_TOKEN=your_telegram_bot_token
TELEGRAM_OWNER_ID=your_telegram_user_id
```

---

## Dependencies

### Runtime Dependencies
- **@clack/core** & **@clack/prompts**: Interactive terminal UI components
- **ai**: Vercel AI SDK for agent/model interactions
- **@openrouter/ai-sdk-provider**: OpenRouter provider for AI SDK
- **@mendable/firecrawl-js**: Web scraping and research
- **telegraf**: Telegram bot framework
- **commander**: CLI argument parsing
- **chalk**: Terminal color/styling
- **figlet**: ASCII art text generation
- **marked** & **marked-terminal**: Markdown parsing and terminal rendering
- **diff**: Unified diff generation

### Development Dependencies
- **@types/bun**: Bun type definitions
- **@types/node**: Node.js type definitions
- **@types/marked-terminal**: Type support for marked-terminal
- **typescript**: TypeScript compiler

---

## Command Structure

### Main CLI Entry Point

```bash
bun index.ts
```

**Available Commands:**

```bash
# Launch interactive wakeup (main entry)
satya-cli wakeup

# Shows banner and presents mode selection:
# - CLI Mode (Agent, Plan, Ask)
# - Telegram Mode
# - Exit
```

### CLI Modes

From the CLI mode selector, choose:

1. **Agent Mode**
   - Autonomous codebase modification
   - Requires approval before applying changes
   - Max 40 execution steps per task

2. **Plan Mode**
   - Strategic task planning
   - Step-by-step execution
   - User-controlled step selection

3. **Ask Mode**
   - Question answering
   - Codebase analysis
   - Read-only operations

### Telegram Mode

Launch Telegram bot for remote operations via chat commands.

---

## Type Definitions

### Agent Types (`modes/agent/types.ts`)

```typescript
type ActionType = 'file_create' | 'file_modify' | 'file_delete' 
                | 'folder_create' | 'code_analysis' | 'tool_execute'

type ActionStatus = 'pending' | 'executed' | 'approved' | 'rejected'

interface ActionLog {
  id: string
  timestamp: Date
  type: ActionType
  path: string
  details: {
    before?: string
    after?: string
    toolName?: string
    toolResult?: string
    error?: string
    command?: string
  }
  status: ActionStatus
  userApproved?: boolean
}

interface AgentConfig {
  codebasePath: string
  maxFileSizeToRead: number
  excludePatterns: string[]
  tools: {
    allowShellExecution: boolean
    allowFileModification: boolean
    allowFileCreation: boolean
    allowFolderCreation: boolean
  }
}
```

### Plan Types (`modes/plan/types.ts`)

```typescript
interface PlanStep {
  id: string
  title: string
  description: string
  hints?: string[]
  complexity?: 'low' | 'medium' | 'high'
}

interface Plan {
  goal: string
  researchSummary?: string
  steps: PlanStep[]
}
```

---

## Safety Features

### 1. **Path Escaping Prevention**
- ToolExecutor validates paths stay within workspace
- Rejects `../` and absolute path escapes

### 2. **Exclusion Patterns**
Default exclusions:
- `node_modules` - Dependencies
- `.git` - Version control
- `dist`, `build` - Build outputs
- `.next` - Framework builds
- `*.log` - Log files
- `.env*` - Environment files

### 3. **File Size Limits**
- Default: 1MB max file read size
- Prevents memory issues on large files

### 4. **Staged Operations**
- All mutations staged in memory first
- Presented to user for approval
- Applied only after explicit confirmation
- Full diff preview available

### 5. **Execution Limits**
- Agent mode: Max 40 steps per execution
- Plan mode: Max 15 steps per plan
- Prevents runaway executions

---

## Development Workflow

### Setup

```bash
# Install dependencies
bun install

# Environment configuration
cp .env.example .env  # Create and configure
```

### Running

```bash
# Main CLI
bun index.ts wakeup

# Testing/Development
bun test.ts
```

### TypeScript Configuration

- **Target**: ESNext (latest features)
- **Module**: Preserve (native ES modules)
- **Strict Mode**: Enabled (type safety)
- **JSX**: React JSX support enabled
- **Module Resolution**: Bundler mode

---

## Architecture Patterns

### 1. **Orchestrator Pattern**
Each mode (Agent, Ask, Plan, Telegram) has an orchestrator managing:
- User input collection
- Configuration setup
- Tool/executor initialization
- Workflow coordination

### 2. **Tool Pattern**
Operations are defined as tools with:
- Input schema (Zod validation)
- Description
- Execute function
- Error handling

### 3. **Staged Operations**
Changes aren't applied immediately:
- Stage in memory
- Present for review
- Apply only on approval
- Track all changes

### 4. **Composition Pattern**
Tools composed from:
- Common utilities (ToolExecutor, ActionTracker)
- Mode-specific implementations
- Web/external service integrations

---

## Key Files Quick Reference

| File | Purpose |
|------|---------|
| `index.ts` | CLI entry point with wakeup command |
| `ai/ai.config.ts` | OpenRouter model initialization |
| `modes/cli.ts` | Mode selection menu |
| `modes/agent/orchestrator.ts` | Agent mode main logic |
| `modes/agent/tool-executor.ts` | Safe file operations |
| `modes/agent/action-tracker.ts` | Operation logging |
| `modes/plan/planner.ts` | Plan generation |
| `modes/telegram/index.ts` | Telegram bot setup |
| `tui/wakeup.ts` | Startup UI |
| `tui/terminal-md.ts` | Markdown rendering |

---

## Future Enhancements

Potential features based on current structure:
- [ ] Caching of analysis results
- [ ] Persistent session storage
- [ ] Plan history tracking
- [ ] Custom tool plugins
- [ ] Rate limiting for API calls
- [ ] Batch operation support
- [ ] Integration with other AI providers
- [ ] Advanced conflict resolution
- [ ] Rollback capabilities

---

## Notes

- **Shebang**: `#!/usr/bin/env bun` enables direct execution
- **Comments**: Code includes Hindi comments explaining concepts
- **Error Handling**: Comprehensive error messages for debugging
- **Accessibility**: Styled terminal output with chalk for visibility

---

## License

Private - Satya CLI Project

---


