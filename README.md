# 🧰 Satya CLI

Satya CLI is a Bun and TypeScript command-line tool for working with a codebase through an OpenRouter-powered language model. It provides agent, planning, question-answering, and Telegram bot modes. Agent mode stages file, folder, and shell operations for review before applying approved changes.



## Features

- **Agent:** Explore a codebase and stage file, folder, and shell operations for CLI review before applying them.
- **Plan:** Generate a step-by-step plan of up to 15 steps, select steps, and run them.
- **Ask:** Ask questions about the codebase and optionally save an answer as a Markdown file after confirmation and approval.
- **Telegram:** Use `/ask`, `/agent`, and `/plan` through a bot whose commands are restricted by an owner-ID check.

## How It Works

```text
Goal
  |
  v
Agent tool calls
  |
  v
Staged changes (in memory)
  |
  v
CLI review and approval
  |
  v
Apply approved operations
```


## Agent Tools

| Tool | What it does |
| --- | --- |
| `read_file` | Reads a workspace text file |
| `create_file` | Stages creation of a file |
| `modify_file` | Stages replacement of an existing file's contents |
| `delete_file` | Stages deletion of a file |
| `create_folder` | Stages creation of a directory tree |
| `list_files` | Lists files and directories under a workspace path |
| `search_files` | Finds files by glob-like pattern, optionally filtering by content |
| `analyze_codebase` | Counts files and directories under a path |
| `execute_shell` | Queues a shell command for approval before running it in the workspace |
| `list_skills` | Finds `SKILL.md` files in configured and default skill directories |
| `read_skill` | Reads a skill file from an allowed skill directory |
| `web_search` | Searches the web through Firecrawl and returns titles, URLs, and snippets |
| `web_crawl` | Scrapes a URL through Firecrawl and returns Markdown |
| `fetch_url` | Fetches a URL and returns its response body |

Plan and Ask flows include web tools; Firecrawl-backed search and scraping require `FIRECRAWL_API_KEY`. Tool inputs are validated with Zod schemas.

## Safety

- Agent mode stages file, folder, and shell changes in memory and applies them only after you approve them in the CLI review.
- Workspace paths are checked for containment; this is not a guarantee against every path escape, such as paths through symlinks.
- `node_modules`, `.git`, `dist`, `build`, `.next`, `*.log`, and `.env*` are excluded from tool access.
- `read_file` rejects files over 1 MiB.
- Shell commands are queued for approval and then run in the workspace using a shell; they are not sandboxed.
- Telegram commands use an owner-ID check against `TELEGRAM_OWNER_ID`.
- Applying approved operations collects errors and continues attempting remaining operations; it is not atomic.

## Tech Stack

| Area | Technology and version |
| --- | --- |
| Runtime | Bun |
| Language | TypeScript `^5` peer dependency (lockfile resolves `5.9.3`); strict mode enabled |
| AI SDK | Vercel AI SDK `ai ^6.0.193` |
| LLM provider | OpenRouter `@openrouter/ai-sdk-provider ^2.9.0` |
| Web research | Firecrawl `@mendable/firecrawl-js ^4.25.1` |
| Telegram | Telegraf `^4.16.3` |
| Terminal UI | `@clack/prompts ^1.4.0`, Chalk `^5.6.2`, Figlet `^1.11.0`, Marked `^18.0.4`, `marked-terminal ^7.3.0`, and `diff ^9.0.0` |
| CLI | Commander `^14.0.3` |
| Validation | Zod |

## Project Structure

```text
.
├── index.ts                    # Commander entry point
├── ai/
│   ├── ai.config.ts            # OpenRouter model configuration
│   └── index.ts                # Model configuration export
├── modes/
│   ├── cli.ts                  # CLI mode selector
│   ├── agent/
│   │   ├── orchestrator.ts     # Agent-mode workflow
│   │   ├── agents-tools.ts     # Agent tool definitions
│   │   ├── tool-executor.ts    # Workspace operations and staging
│   │   ├── action-tracker.ts   # In-memory operation tracking
│   │   ├── approval.ts         # CLI approval flow
│   │   ├── diff-view.ts        # File-change diff formatting
│   │   └── types.ts            # Agent configuration and action types
│   ├── ask/
│   │   └── orchestrator.ts     # Ask-mode workflow
│   ├── plan/
│   │   ├── orchestrator.ts     # Plan execution workflow
│   │   ├── planner.ts          # Structured plan generation
│   │   ├── selection.ts        # Plan display and step selection
│   │   ├── web-tools.ts        # Firecrawl and URL tools
│   │   └── types.ts            # Plan types
│   └── telegram/
│       ├── index.ts            # Telegram bot startup
│       ├── handlers.ts         # Commands and callbacks
│       ├── agent-run.ts        # Telegram Ask, Agent, and Plan runs
│       ├── approval-session.ts # In-memory approval sessions
│       ├── plan-session.ts     # In-memory plan selection sessions
│       ├── auth.ts             # Owner-ID check
│       ├── constants.ts        # Bot welcome message
│       └── text.ts             # Reply formatting and clipping
├── tui/
│   ├── wakeup.ts               # Startup banner and mode selection
│   └── terminal-md.ts          # Terminal Markdown rendering
├── package.json                # Package metadata and dependencies
└── tsconfig.json               # TypeScript compiler settings
```

## Setup

### Prerequisites

- [Bun](https://bun.sh)
- An [OpenRouter](https://openrouter.ai) API key
- Optional: a [Firecrawl](https://www.firecrawl.dev) API key for web research
- Optional: a Telegram bot token from [@BotFather](https://t.me/BotFather) for Telegram mode

### Install

```bash
git clone https://github.com/satyam-1605/satya-cli.git
cd satya-cli
bun install
bun add zod
```

### Configure

Create a `.env` file in the project root:

```env
# Required
OPENROUTER_API_KEY=your_openrouter_api_key
OPENROUTER_DEFAULT_MODEL=your_model_id

# Optional: web research
FIRECRAWL_API_KEY=your_firecrawl_api_key

# Optional: Telegram mode
TELEGRAM_BOT_TOKEN=your_bot_token
TELEGRAM_OWNER_ID=your_telegram_chat_id

# Optional: additional skill folders to search for SKILL.md files (separated by ;)
SKILLS_DIRS=path/to/skills;path/to/more-skills
```

`OPENROUTER_DEFAULT_MODEL` is required. Agent mode relies on tool calling, so choose a model that supports it.

The optional `test.ts` script sends a live OpenRouter request using the `openrouter/free` model. It is a connectivity check, not an automated test suite:

```bash
bun test.ts
```

## Usage

```bash
bun index.ts wakeup
```

The startup screen offers three choices: **CLI**, **Telegram**, and **Exit**. In CLI mode you then pick:

- **Agent:** describe a task, review staged operations and available file diffs, then approve or reject them.
- **Plan:** describe a goal, choose from the generated steps, and run them.
- **Ask:** ask a question about the codebase, with an optional save of the answer to a Markdown file.

## Acknowledgements

[Vercel AI SDK](https://ai-sdk.dev) · [OpenRouter](https://openrouter.ai) · [Firecrawl](https://www.firecrawl.dev) · [Telegraf](https://telegraf.js.org) · [Clack](https://github.com/bombshell-dev/clack) · [Commander](https://github.com/tj/commander.js) · [Zod](https://zod.dev)