# Satya CLI - Project Upgrade Plan

**Created:** May 30, 2026  
**Project:** satya-cli  
**Current Version:** 1.0.0  
**Target Version:** 2.0.0  

---

## Executive Summary

This document outlines a comprehensive upgrade plan for Satya CLI, expanding from the current 4 core modes (Agent, Ask, Plan, Telegram) to 9+ advanced modes with research capabilities, multi-channel integrations, knowledge management, and automation features.

**Key Objectives:**
- Add Research Mode for in-depth information gathering
- Integrate Gmail for email-based task execution
- Implement Knowledge Base for context persistence
- Add batch automation and scheduling
- Enhance code review and analysis capabilities
- Enable Git workflow automation
- Support documentation generation
- Build testing and QA automation

**Timeline:** 8-12 weeks  
**Effort:** 200-300 development hours

---

## Table of Contents

1. [Tier 1: High-Priority Features](#tier-1-high-priority-features)
2. [Tier 2: Enhanced Core Features](#tier-2-enhanced-core-features)
3. [Tier 3: Integration & Advanced Features](#tier-3-integration--advanced-features)
4. [Infrastructure & Services](#infrastructure--services)
5. [Detailed Implementation Phases](#detailed-implementation-phases)
6. [Architecture Changes](#architecture-changes)
7. [Dependencies & Technologies](#dependencies--technologies)
8. [Database & Storage](#database--storage)
9. [API Integrations](#api-integrations)
10. [Testing Strategy](#testing-strategy)
11. [Risk Assessment](#risk-assessment)
12. [Success Metrics](#success-metrics)

---

## Tier 1: High-Priority Features

### Feature 1: Research Mode

**Description:** Dedicated mode for comprehensive research with multi-source aggregation, synthesis, and report generation.

**Priority:** 🔴 CRITICAL  
**Effort:** 40 hours  
**Dependencies:** Web tools, Knowledge Base, Report generator

**Structure:**
```
modes/research/
├── orchestrator.ts       # Main research orchestrator
├── types.ts              # Research session and result types
├── researcher.ts         # Core research execution
├── source-crawler.ts     # Multi-source crawling engine
├── synthesis.ts          # Information synthesis & deduplication
├── report-generator.ts   # Markdown/PDF report generation
├── cache-manager.ts      # Research result caching
└── citations.ts          # Bibliography & citation management
```

**Core Components:**

1. **Researcher Engine** (`researcher.ts`)
   - Orchestrate multi-source research
   - Parallel source querying
   - Real-time progress tracking
   - Error handling per source

2. **Source Crawler** (`source-crawler.ts`)
   - Web search via Firecrawl
   - GitHub repository analysis
   - Documentation scraping
   - Academic paper search (future: Semantic Scholar API)
   - Product/company data (future: Crunchbase API)

3. **Synthesis Engine** (`synthesis.ts`)
   - Deduplicate information across sources
   - Identify contradictions
   - Create knowledge graph
   - Generate summary insights
   - Highlight key findings

4. **Report Generator** (`report-generator.ts`)
   - Markdown output (default)
   - PDF generation with styling
   - HTML output for web viewing
   - Summary/detailed sections
   - Table of contents and indexing

5. **Citation Manager** (`citations.ts`)
   - Track source references
   - Generate bibliography (APA, MLA, Chicago)
   - Inline citations in reports
   - Source credibility scoring

**User Workflow:**
```
1. User: "Research: TypeScript patterns for enterprise"
2. System: 
   - Search web (Firecrawl)
   - Analyze GitHub repos
   - Check documentation
   - Query AI for synthesis
3. Result:
   - Synthesized insights
   - Source citations
   - PDF/Markdown report
   - Key recommendations
```

**Implementation Steps:**
- [ ] Create research types and interfaces
- [ ] Build researcher orchestrator
- [ ] Implement multi-source crawler
- [ ] Add synthesis engine with AI integration
- [ ] Build report generator (Markdown first)
- [ ] Add PDF generation (pdfkit)
- [ ] Implement caching layer
- [ ] Add citation management
- [ ] Create CLI mode entry point
- [ ] Add Telegram/Email integration
- [ ] Write tests and documentation

**Key APIs/Libraries:**
- Firecrawl (web crawling)
- GitHub API (repository analysis)
- pdfkit (PDF generation)
- marked (Markdown generation)
- TBD: Academic paper API

---

### Feature 2: Gmail Integration

**Description:** Enable task execution and approval via Gmail, following Telegram pattern.

**Priority:** 🔴 CRITICAL  
**Effort:** 35 hours  
**Dependencies:** OAuth2, Gmail API, Session management

**Structure:**
```
modes/email/
├── index.ts              # Email mode entry point
├── auth.ts               # Gmail OAuth2 authentication
├── handlers.ts           # Email command handlers
├── sessions.ts           # Email session management
├── agent-run.ts          # Agent execution via email
├── approval-session.ts   # Approval workflow via email
├── draft-builder.ts      # Email draft composition
├── templates.ts          # Email response templates
├── constants.ts          # Email constants and messages
└── utils.ts              # Email utilities
```

**Core Components:**

1. **Gmail Authentication** (`auth.ts`)
   - OAuth2 flow for Gmail API
   - Token storage and refresh
   - Multi-user support
   - Secure credential handling

2. **Email Handlers** (`handlers.ts`)
   - Parse incoming emails
   - Extract commands from subject/body
   - Supported commands:
     - `/agent <task>`
     - `/ask <question>`
     - `/plan <goal>`
     - `/research <query>`
     - `/review <file>`
     - `/approve` (in approval flow)
     - `/reject` (in approval flow)

3. **Session Management** (`sessions.ts`)
   - Track active email sessions
   - Store email thread context
   - Handle multi-step conversations
   - Session persistence

4. **Agent Execution** (`agent-run.ts`)
   - Execute agent tasks from email
   - Capture results
   - Format output for email
   - Handle file attachments in results

5. **Approval Workflow** (`approval-session.ts`)
   - Send approval requests via email
   - Present diffs in email format
   - Accept/reject via reply commands
   - Apply approved changes

6. **Draft Builder** (`draft-builder.ts`)
   - Compose reply emails
   - Format code blocks in emails
   - Add attachments (reports, diffs)
   - Create email templates

7. **Response Templates** (`templates.ts`)
   - Task result templates
   - Approval request template
   - Error notification template
   - Welcome/setup template

**User Workflow:**
```
1. User sends email:
   Subject: /agent Add dark mode to config
   
2. System:
   - Receives email
   - Extracts task
   - Executes agent
   - Generates changes
   
3. System sends email:
   Subject: Re: /agent Add dark mode to config
   Body: 
   - Changes preview
   - Approve: Reply with /approve
   - Reject: Reply with /reject
   
4. User replies:
   Subject: Re: /agent Add dark mode to config
   Body: /approve
   
5. System applies changes and confirms
```

**Implementation Steps:**
- [ ] Set up Gmail OAuth2 flow
- [ ] Implement token storage (secure)
- [ ] Build email polling mechanism
- [ ] Create command parser
- [ ] Implement agent/ask/plan handlers
- [ ] Build approval workflow
- [ ] Create email templates
- [ ] Add draft composition system
- [ ] Implement session persistence
- [ ] Add error handling and logging
- [ ] Create setup documentation
- [ ] Write tests

**Key APIs/Libraries:**
- `@google-auth-library/oauth2-client`
- `googleapis` (Gmail API)
- `nodemailer` (optional, for sending)

**Configuration:**
```
GMAIL_CLIENT_ID=your_client_id
GMAIL_CLIENT_SECRET=your_client_secret
GMAIL_REDIRECT_URI=http://localhost:3000/auth/callback
GMAIL_OWNER_EMAIL=your_email@gmail.com
```

---

### Feature 3: Knowledge Base / Context Management

**Description:** Persistent, semantic knowledge storage for improved agent decision-making and context injection.

**Priority:** 🟠 HIGH  
**Effort:** 50 hours  
**Dependencies:** Vector DB, Storage, Embedding model

**Structure:**
```
services/knowledge-base/
├── index.ts              # KB module exports
├── manager.ts            # KB management interface
├── builder.ts            # Knowledge construction
├── storage.ts            # DB abstraction layer
├── vector-engine.ts      # Vector embeddings
├── retrieval.ts          # Semantic search & retrieval
├── indexing.ts           # Index management
├── cache-system.ts       # Caching layer
├── types.ts              # KB type definitions
└── migrations.ts         # DB schema migrations
```

**Core Components:**

1. **Knowledge Manager** (`manager.ts`)
   - Add/update/delete knowledge entries
   - Semantic search capabilities
   - Context injection for agents
   - Knowledge persistence lifecycle

2. **KB Builder** (`builder.ts`)
   - Construct KB from codebase
   - Extract file structures
   - Analyze dependencies
   - Generate embeddings
   - Build knowledge graphs

3. **Vector Engine** (`vector-engine.ts`)
   - Generate embeddings using OpenRouter
   - Store vectors in vector DB
   - Similarity search
   - Batch processing

4. **Retrieval System** (`retrieval.ts`)
   - Semantic search queries
   - Multi-field search (title, description, code)
   - Context window management
   - Result ranking and filtering

5. **Storage Layer** (`storage.ts`)
   - Abstract storage (SQLite/PostgreSQL/Vector DB)
   - Schema management
   - Transaction support
   - Query optimization

6. **Caching System** (`cache-system.ts`)
   - Cache frequent queries
   - Smart invalidation
   - Cache warming strategies
   - Memory management

**Data Structure:**
```typescript
interface KnowledgeEntry {
  id: string
  type: 'file' | 'pattern' | 'decision' | 'api' | 'configuration'
  title: string
  description: string
  content: string
  tags: string[]
  embedding: number[]
  source: {
    file?: string
    line?: number
    url?: string
  }
  metadata: Record<string, any>
  createdAt: Date
  updatedAt: Date
  relevanceScore?: number
}

interface KnowledgeContext {
  entries: KnowledgeEntry[]
  totalRelevance: number
  searchQuery: string
  executionTime: number
}
```

**Implementation Steps:**
- [ ] Design KB schema
- [ ] Choose and set up vector DB (pinecone/weaviate/milvus)
- [ ] Implement storage abstraction layer
- [ ] Build KB builder for codebase indexing
- [ ] Implement embedding generation
- [ ] Create semantic search engine
- [ ] Add caching system
- [ ] Build KB management CLI commands
- [ ] Integrate KB into agent prompts
- [ ] Add KB persistence
- [ ] Create migration system
- [ ] Write tests and documentation

**Key APIs/Libraries:**
- `hnswlib-node` or `pinecone-client` (vector DB)
- `better-sqlite3` (local storage) or PostgreSQL
- OpenRouter embeddings API
- `dotenv` (configuration)

**Configuration:**
```
KB_PROVIDER=pinecone|local|weaviate
KB_PINECONE_API_KEY=your_key
KB_DATABASE_URL=sqlite:./kb.db
KB_EMBEDDING_MODEL=openrouter/embedding-model
KB_CACHE_ENABLED=true
```

---

## Tier 2: Enhanced Core Features

### Feature 4: Batch/Automation Mode

**Description:** Execute multiple agents in parallel with scheduling and aggregated reporting.

**Priority:** 🟠 HIGH  
**Effort:** 45 hours  
**Dependencies:** Scheduling, Queue management, Parallel execution

**Structure:**
```
modes/batch/
├── orchestrator.ts       # Batch mode orchestrator
├── types.ts              # Batch and job types
├── scheduler.ts          # Cron-based scheduling
├── queue-manager.ts      # Job queue management
├── parallel-executor.ts  # Parallel execution engine
├── worker-pool.ts        # Worker thread management
├── reports.ts            # Batch result reporting
└── persistence.ts        # Job persistence
```

**Core Components:**

1. **Batch Orchestrator** (`orchestrator.ts`)
   - Define batch configurations
   - Schedule batch runs
   - Monitor execution
   - Generate reports

2. **Scheduler** (`scheduler.ts`)
   - Cron expression support
   - One-time and recurring tasks
   - Timezone support
   - Job history tracking

3. **Queue Manager** (`queue-manager.ts`)
   - Queue job definitions
   - Priority-based execution
   - Job status tracking
   - Retry logic

4. **Parallel Executor** (`parallel-executor.ts`)
   - Execute multiple jobs concurrently
   - Resource pooling
   - Error isolation
   - Progress aggregation

5. **Worker Pool** (`worker-pool.ts`)
   - Thread-based execution
   - Load balancing
   - Graceful shutdown
   - Performance monitoring

6. **Batch Reporter** (`reports.ts`)
   - Aggregate results
   - Success/failure breakdown
   - Performance metrics
   - Email/Slack notifications

**Batch Configuration Example:**
```yaml
# batches/daily-analysis.yaml
name: "Daily Code Analysis"
schedule: "0 9 * * *"  # 9 AM daily
jobs:
  - id: "lint-check"
    type: "agent"
    task: "Run eslint on modified files"
    
  - id: "type-check"
    type: "agent"
    task: "Run TypeScript type checking"
    
  - id: "security-scan"
    type: "research"
    query: "Security vulnerabilities in our dependencies"
    
  - id: "doc-generate"
    type: "docs"
    target: "generate API documentation"

notifications:
  - type: "email"
    to: "team@company.com"
    on: ["failure", "completion"]
```

**Implementation Steps:**
- [ ] Design batch configuration schema
- [ ] Build job queue infrastructure
- [ ] Implement scheduler (node-cron)
- [ ] Create parallel execution engine
- [ ] Add worker pool management
- [ ] Build result aggregation
- [ ] Create report generation
- [ ] Add persistence layer
- [ ] Integrate with notification systems
- [ ] Create CLI commands
- [ ] Write tests

**Key APIs/Libraries:**
- `node-cron` (scheduling)
- `bull` or `bullmq` (queue management)
- `piscina` (worker threads)
- `nodemailer` (email notifications)

---

### Feature 5: Code Review Mode

**Description:** Automated code review with best practices checking and refactoring suggestions.

**Priority:** 🟡 MEDIUM  
**Effort:** 35 hours  
**Dependencies:** Code analysis tools, AST parsing

**Structure:**
```
modes/review/
├── orchestrator.ts       # Review mode orchestrator
├── types.ts              # Review types
├── analyzer.ts           # Code analysis
├── suggestions.ts        # Improvement suggestions
├── patterns.ts           # Code pattern detection
├── metrics.ts            # Code quality metrics
├── best-practices.ts     # Best practices checker
└── report-builder.ts     # Review report generation
```

**Core Components:**

1. **Code Analyzer** (`analyzer.ts`)
   - Parse code (AST)
   - Identify code smells
   - Complexity analysis
   - Dependency tracking

2. **Best Practices Checker** (`best-practices.ts`)
   - TypeScript strict mode compliance
   - Error handling patterns
   - Naming conventions
   - Code organization
   - Security issues

3. **Suggestions Engine** (`suggestions.ts`)
   - Refactoring recommendations
   - Performance improvements
   - Readability enhancements
   - Type safety improvements

4. **Metrics Generator** (`metrics.ts`)
   - Cyclomatic complexity
   - Lines of code
   - Test coverage
   - Duplication detection

5. **Report Builder** (`report-builder.ts`)
   - Detailed review reports
   - Severity-based filtering
   - Side-by-side code comparisons
   - Suggested fixes

**Review Report Example:**
```markdown
# Code Review Report: src/modes/agent/orchestrator.ts

## Summary
- Lines: 156
- Complexity: Medium
- Issues Found: 4 (1 Critical, 2 Major, 1 Minor)

## Issues

### 🔴 Critical Issues
1. Unhandled Promise Rejection (Line 45)
   - Missing error handling in agent.generate()
   - Suggestion: Add try-catch or .catch()

### 🟠 Major Issues
1. Missing Type Annotation (Line 23)
   - Variable 'result' lacks explicit type
   - Suggestion: Annotate with Agent result type

## Metrics
- Cyclomatic Complexity: 6
- Code Duplication: 2 instances found
- Test Coverage: 45% (⚠️ Below target 80%)

## Recommendations
1. Add error boundary around agent execution
2. Improve type safety with explicit annotations
3. Extract common patterns to utility functions
```

**Implementation Steps:**
- [ ] Set up TypeScript AST parser
- [ ] Build code analyzer
- [ ] Create best practices rules
- [ ] Implement suggestions engine
- [ ] Add metrics calculation
- [ ] Build report generation
- [ ] Create CLI integration
- [ ] Add batch review support
- [ ] Write tests

**Key APIs/Libraries:**
- `typescript` (AST parsing)
- `@typescript-eslint/parser` (ESLint integration)
- `eslint` (code linting)
- `complexity` (cyclomatic complexity)

---

### Feature 6: Documentation Generator Mode

**Description:** Automatically generate and maintain comprehensive project documentation.

**Priority:** 🟡 MEDIUM  
**Effort:** 30 hours  
**Dependencies:** Code analysis, Template engine

**Structure:**
```
modes/docs/
├── orchestrator.ts       # Docs mode orchestrator
├── types.ts              # Documentation types
├── analyzer.ts           # Codebase structure analysis
├── extractor.ts          # JSDoc/comments extraction
├── template-engine.ts    # Markdown template generation
├── publisher.ts          # Multi-format publishing
└── layouts/              # Documentation layouts
    ├── api.md
    ├── architecture.md
    ├── guide.md
    └── tutorial.md
```

**Core Components:**

1. **Structure Analyzer** (`analyzer.ts`)
   - File structure analysis
   - Module dependencies
   - Export tracking
   - Type extraction

2. **JSDoc Extractor** (`extractor.ts`)
   - Parse JSDoc comments
   - Extract function signatures
   - Collect type information
   - Gather examples

3. **Template Engine** (`template-engine.ts`)
   - Generate API documentation
   - Create architecture diagrams
   - Generate guides
   - Generate type catalogs

4. **Publisher** (`publisher.ts`)
   - Markdown generation
   - HTML generation
   - PDF generation
   - Static site generation (Hugo/Jekyll)

**Generated Documentation:**
```
docs/
├── README.md             # Main documentation
├── API.md                # API reference
├── ARCHITECTURE.md       # Architecture overview
├── GUIDE.md              # User guide
├── TYPES.md              # Type definitions
├── EXAMPLES.md           # Code examples
└── TUTORIALS/            # Tutorial collection
```

**Implementation Steps:**
- [ ] Build codebase analyzer
- [ ] Implement JSDoc parser
- [ ] Create template system
- [ ] Build documentation generator
- [ ] Add multi-format publishing
- [ ] Create layout templates
- [ ] Add versioning support
- [ ] Integrate with git
- [ ] Write tests

**Key APIs/Libraries:**
- `typescript` (AST parsing)
- `marked` (Markdown generation)
- `pdfkit` (PDF generation)

---

## Tier 3: Integration & Advanced Features

### Feature 7: Git Integration Mode

**Description:** Automate Git workflows including branch management, commit analysis, and PR assistance.

**Priority:** 🟡 MEDIUM  
**Effort:** 40 hours  
**Dependencies:** Git operations, GitHub API

**Structure:**
```
modes/git/
├── orchestrator.ts       # Git mode orchestrator
├── types.ts              # Git types
├── branch-agent.ts       # Branch management
├── commit-analyzer.ts    # Commit analysis
├── pr-assistant.ts       # PR automation
├── conflict-resolver.ts  # Merge conflict help
└── hooks.ts              # Git hooks integration
```

**Core Components:**

1. **Branch Management** (`branch-agent.ts`)
   - Create feature branches
   - Manage branch naming
   - Track branch status
   - Cleanup stale branches

2. **Commit Analysis** (`commit-analyzer.ts`)
   - Analyze commit messages
   - Check commit conventions (Conventional Commits)
   - Generate changelogs
   - Track author statistics

3. **PR Assistant** (`pr-assistant.ts`)
   - Auto-generate PR descriptions
   - Check PR requirements
   - Suggest reviewers
   - Validate PR titles

4. **Conflict Resolution** (`conflict-resolver.ts`)
   - Identify merge conflicts
   - Suggest resolutions
   - Generate conflict resolution strategies
   - Apply safe resolutions

**Implementation Steps:**
- [ ] Set up isomorphic-git
- [ ] Implement branch operations
- [ ] Add commit analysis
- [ ] Build PR assistant
- [ ] Create conflict resolver
- [ ] Add GitHub API integration
- [ ] Build git hooks
- [ ] Write tests

**Key APIs/Libraries:**
- `isomorphic-git` (Git operations)
- `@octokit/rest` (GitHub API)
- `simple-git` (Git CLI wrapper)

---

### Feature 8: Testing & QA Mode

**Description:** Automated test generation, execution tracking, and QA assistance.

**Priority:** 🟡 MEDIUM  
**Effort:** 40 hours  
**Dependencies:** Test frameworks, Coverage tools

**Structure:**
```
modes/test/
├── orchestrator.ts       # Test mode orchestrator
├── types.ts              # Test types
├── generator.ts          # Test case generation
├── executor.ts           # Test execution
├── coverage-analyzer.ts  # Coverage tracking
├── bug-reproducer.ts     # Bug reproduction help
└── reports.ts            # Test reports
```

**Core Components:**

1. **Test Generator** (`generator.ts`)
   - Generate unit tests
   - Generate integration tests
   - Generate E2E tests
   - Create fixtures

2. **Test Executor** (`executor.ts`)
   - Run test suites
   - Track execution
   - Capture results
   - Generate reports

3. **Coverage Analyzer** (`coverage-analyzer.ts`)
   - Track test coverage
   - Identify uncovered code
   - Generate coverage reports
   - Suggest tests for gaps

4. **Bug Reproducer** (`bug-reproducer.ts`)
   - Analyze bug reports
   - Generate reproduction steps
   - Create test cases for bugs
   - Track bug fixes

**Implementation Steps:**
- [ ] Integrate with test frameworks (Jest, Vitest)
- [ ] Build test generator
- [ ] Create test executor
- [ ] Implement coverage tracking
- [ ] Build bug reproducer
- [ ] Add report generation
- [ ] Write tests

**Key APIs/Libraries:**
- `jest` or `vitest` (test framework)
- `nyc` or `c8` (coverage)
- `@testing-library/*` (testing utilities)

---

### Feature 9: Slack Integration

**Description:** Add Slack bot for distributed team collaboration.

**Priority:** 🟡 MEDIUM  
**Effort:** 35 hours  
**Dependencies:** Slack API, Bot framework

**Structure:**
```
modes/slack/
├── index.ts              # Slack mode entry
├── auth.ts               # OAuth authentication
├── handlers.ts           # Slack handlers
├── sessions.ts           # Session management
├── agent-run.ts          # Agent execution
├── threads.ts            # Thread management
├── templates.ts          # Slack message templates
└── constants.ts          # Constants
```

**Slack Commands:**
```
/satya agent <task>        - Run agent task
/satya ask <question>      - Ask question
/satya plan <goal>         - Create plan
/satya research <query>    - Research topic
/satya review <file>       - Review code
/satya gen-tests <file>    - Generate tests
/satya status              - Check status
```

**Implementation Steps:**
- [ ] Set up Slack Bot
- [ ] Implement OAuth flow
- [ ] Build command handlers
- [ ] Add session management
- [ ] Create Slack templates
- [ ] Add thread support
- [ ] Implement user management
- [ ] Write tests

**Key APIs/Libraries:**
- `@slack/bolt` (Slack framework)
- `@slack/web-api` (Slack API)

---

### Feature 10: Web Dashboard (Optional)

**Description:** Real-time web UI for monitoring and executing tasks.

**Priority:** 🔵 LOW  
**Effort:** 60+ hours  
**Dependencies:** React/Vue, WebSocket, API server

**Structure:**
```
web-dashboard/
├── src/
│   ├── components/       # React components
│   ├── pages/            # Pages
│   ├── services/         # API services
│   ├── hooks/            # Custom hooks
│   └── styles/           # Styling
├── public/
└── package.json
```

**Features:**
- Agent execution monitoring
- Plan creation and tracking
- Research history
- Real-time notifications
- Task scheduling
- User management
- Analytics dashboard

**Implementation Steps:**
- [ ] Set up Next.js/Vite project
- [ ] Build UI components
- [ ] Create API routes
- [ ] Implement WebSocket
- [ ] Add authentication
- [ ] Build monitoring dashboards
- [ ] Add user management
- [ ] Deploy

**Key Technologies:**
- Next.js/Vite (framework)
- React (UI library)
- TailwindCSS (styling)
- Socket.io (real-time)
- Chart.js (charts)

---

## Infrastructure & Services

### Service 1: Shared Caching Layer

**Location:** `services/cache-engine/`

```typescript
// services/cache-engine/index.ts
export interface CacheConfig {
  type: 'redis' | 'memory'
  ttl: number
  maxSize?: number
}

export class CacheEngine {
  set(key: string, value: any, ttl?: number): Promise<void>
  get(key: string): Promise<any | null>
  delete(key: string): Promise<void>
  clear(): Promise<void>
  invalidatePattern(pattern: string): Promise<void>
}
```

**Implementation:**
- In-memory caching (development)
- Redis support (production)
- Pattern-based invalidation
- TTL support
- Metrics tracking

---

### Service 2: Advanced Logging & Observability

**Location:** `services/observability/`

```typescript
export interface LogEntry {
  level: 'debug' | 'info' | 'warn' | 'error'
  timestamp: Date
  message: string
  context: Record<string, any>
  userId?: string
  mode?: string
  duration?: number
}

export class Logger {
  debug(msg: string, context?: any): void
  info(msg: string, context?: any): void
  warn(msg: string, context?: any): void
  error(msg: string, context?: any): void
  metric(name: string, value: number): void
}
```

**Features:**
- Structured logging
- Performance metrics
- Error tracking
- Usage analytics
- Distributed tracing

---

### Service 3: Session Management

**Location:** `services/session-manager/`

```typescript
export interface Session {
  id: string
  userId: string
  mode: string
  startedAt: Date
  lastActivity: Date
  state: Record<string, any>
  status: 'active' | 'paused' | 'completed'
}

export class SessionManager {
  create(userId: string, mode: string): Promise<Session>
  get(sessionId: string): Promise<Session | null>
  update(sessionId: string, state: any): Promise<void>
  close(sessionId: string): Promise<void>
  list(userId: string): Promise<Session[]>
}
```

**Features:**
- Cross-mode session sharing
- Session persistence
- Session replay
- Timeout management
- Activity tracking

---

### Service 4: Notification Hub

**Location:** `services/notifications/`

```typescript
export type NotificationChannel = 'email' | 'slack' | 'telegram' | 'webhook'

export interface Notification {
  id: string
  channel: NotificationChannel
  recipient: string
  subject: string
  message: string
  priority: 'low' | 'medium' | 'high'
  status: 'pending' | 'sent' | 'failed'
  createdAt: Date
}

export class NotificationHub {
  send(notification: Notification): Promise<void>
  batch(notifications: Notification[]): Promise<void>
  schedule(notification: Notification, delay: number): Promise<void>
  retry(notificationId: string): Promise<void>
}
```

**Features:**
- Multi-channel support
- Batch sending
- Scheduled notifications
- Retry logic
- Template system

---

## Detailed Implementation Phases

### Phase 1: Foundation (Weeks 1-3)

**Objective:** Establish core infrastructure for upgrades

**Tasks:**
1. **Week 1:**
   - [ ] Set up database infrastructure
   - [ ] Create storage abstraction layer
   - [ ] Build session manager service
   - [ ] Set up configuration management
   - [ ] Create base types for all modes

2. **Week 2:**
   - [ ] Implement cache engine
   - [ ] Build observability service
   - [ ] Create notification hub
   - [ ] Set up API integrations base
   - [ ] Update main CLI orchestrator

3. **Week 3:**
   - [ ] Research Mode - Foundation
     - [ ] Build types and interfaces
     - [ ] Create orchestrator
     - [ ] Set up source crawler base
   - [ ] Gmail Integration - Foundation
     - [ ] OAuth2 setup
     - [ ] Gmail API integration
     - [ ] Token storage

**Deliverables:**
- Core infrastructure in place
- Database schema created
- Configuration management working
- Base service layer established

---

### Phase 2: Tier 1 Features (Weeks 4-6)

**Objective:** Implement critical high-priority features

**Tasks:**
1. **Week 4 - Research Mode Continued:**
   - [ ] Implement source crawler (Web, GitHub)
   - [ ] Build synthesis engine
   - [ ] Create report generator (Markdown)
   - [ ] Add caching system
   - [ ] Integrate with CLI

2. **Week 5 - Gmail Integration Continued:**
   - [ ] Build email handlers
   - [ ] Implement command parsing
   - [ ] Create agent/ask/plan handlers
   - [ ] Build approval workflow
   - [ ] Add session persistence

3. **Week 6 - Knowledge Base:**
   - [ ] Design KB schema
   - [ ] Implement vector storage
   - [ ] Build embedding system
   - [ ] Create semantic search
   - [ ] Integrate with Agent Mode

**Deliverables:**
- Research Mode fully functional
- Gmail integration complete
- Knowledge Base operational
- All three Tier 1 features integrated

---

### Phase 3: Tier 2 Features (Weeks 7-9)

**Objective:** Add enhanced core features

**Tasks:**
1. **Week 7 - Batch/Automation:**
   - [ ] Build job queue
   - [ ] Implement scheduler
   - [ ] Create parallel executor
   - [ ] Add batch configuration
   - [ ] Build reporting

2. **Week 8 - Code Review:**
   - [ ] Set up AST parser
   - [ ] Build code analyzer
   - [ ] Implement best practices rules
   - [ ] Create suggestions engine
   - [ ] Build report generation

3. **Week 9 - Documentation Generator:**
   - [ ] Build structure analyzer
   - [ ] Implement JSDoc extractor
   - [ ] Create template engine
   - [ ] Add publisher
   - [ ] Integrate with git

**Deliverables:**
- Batch/Automation Mode operational
- Code Review Mode working
- Documentation Generator functional
- All Tier 2 features integrated

---

### Phase 4: Tier 3 Features (Weeks 10-12)

**Objective:** Add integrations and advanced features

**Tasks:**
1. **Week 10 - Git Integration:**
   - [ ] Set up Git operations
   - [ ] Build branch management
   - [ ] Implement commit analysis
   - [ ] Create PR assistant
   - [ ] Add conflict resolver

2. **Week 11 - Testing & QA:**
   - [ ] Build test generator
   - [ ] Implement test executor
   - [ ] Create coverage analyzer
   - [ ] Build bug reproducer
   - [ ] Add reporting

3. **Week 12 - Slack Integration & Polish:**
   - [ ] Build Slack bot
   - [ ] Implement handlers
   - [ ] Add session management
   - [ ] Testing and QA
   - [ ] Documentation updates

**Deliverables:**
- Git Integration Mode working
- Testing & QA Mode operational
- Slack bot functional
- All Tier 3 features integrated
- Project upgraded to v2.0.0

---

## Architecture Changes

### Current Architecture
```
cli-project/
├── modes/ (4 modes)
├── ai/ (config)
├── tui/ (UI)
└── index.ts
```

### New Architecture
```
cli-project/
├── modes/                    # 10+ modes
│   ├── agent/
│   ├── ask/
│   ├── plan/
│   ├── telegram/
│   ├── research/             # NEW
│   ├── email/                # NEW
│   ├── batch/                # NEW
│   ├── review/               # NEW
│   ├── docs/                 # NEW
│   ├── git/                  # NEW
│   ├── test/                 # NEW
│   ├── slack/                # NEW
│   └── web-dashboard/        # NEW (optional)
│
├── services/                 # NEW - Shared services
│   ├── cache-engine/
│   ├── observability/
│   ├── session-manager/
│   ├── notifications/
│   ├── knowledge-base/
│   └── storage/
│
├── integrations/             # NEW - API integrations
│   ├── gmail.ts
│   ├── slack.ts
│   ├── github.ts
│   ├── firecrawl.ts
│   ├── openrouter.ts
│   └── vector-db.ts
│
├── ai/
├── tui/
├── db/                       # NEW - Database
│   ├── migrations/
│   ├── schemas/
│   └── seeders/
│
├── config/                   # NEW - Configuration
│   ├── modes.config.ts
│   ├── integrations.config.ts
│   └── services.config.ts
│
├── utils/                    # Enhanced utilities
│   ├── report-generator/
│   ├── pdf-builder/
│   ├── notifications/
│   └── formatters/
│
├── tests/                    # Test suite
│   ├── unit/
│   ├── integration/
│   └── e2e/
│
└── index.ts
```

### Module Dependencies
```
Core:
└── index.ts
    ├── tui/wakeup.ts (entry)
    └── modes/cli.ts (selector)

Modes depend on:
├── services/ (all modes)
├── integrations/ (specific)
├── ai/ (all modes)
└── utils/ (all modes)

Services depend on:
├── integrations/
├── db/
└── config/

New inter-dependencies:
├── research mode → kb-service
├── batch mode → scheduler, queue
├── code review → analyzer service
├── git mode → github integration
└── web dashboard → all services
```

---

## Dependencies & Technologies

### New Dependencies to Add

**Package.json additions:**
```json
{
  "dependencies": {
    "@google-auth-library/oauth2-client": "^10.0.0",
    "@google-auth-library/google-auth-library-nodejs": "^9.0.0",
    "googleapis": "^144.0.0",
    "nodemailer": "^6.9.0",
    "@slack/bolt": "^3.17.0",
    "@slack/web-api": "^6.8.0",
    "isomorphic-git": "^1.26.0",
    "@octokit/rest": "^20.0.0",
    "simple-git": "^3.20.0",
    "node-cron": "^3.0.0",
    "bull": "^4.14.0",
    "bullmq": "^5.7.0",
    "piscina": "^4.1.0",
    "pdfkit": "^0.13.0",
    "better-sqlite3": "^9.2.0",
    "redis": "^4.6.0",
    "pinecone-client": "^2.2.0",
    "hnswlib-node": "^1.4.0",
    "dotenv": "^16.3.1",
    "joi": "^17.11.0",
    "winston": "^3.11.0",
    "axios": "^1.6.0",
    "p-queue": "^7.3.0"
  },
  "devDependencies": {
    "@types/node-cron": "^3.0.11",
    "@types/pdfkit": "^0.12.9",
    "@types/better-sqlite3": "^7.6.8",
    "jest": "^29.7.0",
    "@testing-library/node": "^20.0.0"
  }
}
```

### Technology Stack

| Component | Technology | Version |
|-----------|-----------|---------|
| CLI Framework | Commander.js | 14.0.3 |
| AI Provider | OpenRouter | Latest |
| AI SDK | Vercel AI | 6.0.193 |
| Authentication | Google Auth | 10.0+ |
| Email | Gmail API | Latest |
| Chat | Telegraf | 4.16.3 |
| Chat (Slack) | @slack/bolt | 3.17+ |
| Scheduling | node-cron | 3.0+ |
| Queuing | BullMQ | 5.7+ |
| Vector DB | Pinecone/HNSW | Latest |
| SQL DB | SQLite3/PostgreSQL | Latest |
| Cache | Redis | 7.0+ |
| PDF | PDFKit | 0.13+ |
| Git | isomorphic-git | 1.26+ |
| GitHub | @octokit/rest | 20.0+ |
| Logging | Winston | 3.11+ |
| Terminal UI | @clack | 1.4+ |
| Markdown | marked | 18.0+ |
| Testing | Jest | 29.7+ |

---

## Database & Storage

### Database Schema

**Core Tables:**

```sql
-- Sessions
CREATE TABLE sessions (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  mode TEXT NOT NULL,
  state JSON,
  status TEXT DEFAULT 'active',
  started_at TIMESTAMP,
  last_activity TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Knowledge Base Entries
CREATE TABLE kb_entries (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  content TEXT,
  tags TEXT[], -- JSON array
  embedding BLOB, -- Vector
  source_file TEXT,
  source_line INTEGER,
  metadata JSON,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
);

-- Batch Jobs
CREATE TABLE batch_jobs (
  id TEXT PRIMARY KEY,
  batch_id TEXT NOT NULL,
  type TEXT NOT NULL,
  task TEXT,
  status TEXT DEFAULT 'pending',
  result JSON,
  error TEXT,
  started_at TIMESTAMP,
  completed_at TIMESTAMP,
  FOREIGN KEY (batch_id) REFERENCES batches(id)
);

-- Batches
CREATE TABLE batches (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  name TEXT NOT NULL,
  schedule TEXT,
  config JSON,
  last_run TIMESTAMP,
  next_run TIMESTAMP,
  created_at TIMESTAMP
);

-- Notifications
CREATE TABLE notifications (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  channel TEXT NOT NULL,
  recipient TEXT NOT NULL,
  subject TEXT,
  message TEXT,
  status TEXT DEFAULT 'pending',
  sent_at TIMESTAMP,
  created_at TIMESTAMP
);

-- Action Logs
CREATE TABLE action_logs (
  id TEXT PRIMARY KEY,
  user_id TEXT NOT NULL,
  session_id TEXT,
  type TEXT NOT NULL,
  path TEXT,
  details JSON,
  status TEXT,
  user_approved BOOLEAN,
  timestamp TIMESTAMP
);
```

### Storage Options

| Use Case | Technology | Reason |
|----------|-----------|--------|
| Primary Data | SQLite (dev) / PostgreSQL (prod) | Reliable, query support |
| Vector Search | Pinecone / HNSW | Semantic search |
| Caching | Redis (prod) / In-memory (dev) | Speed, TTL support |
| Sessions | Database | Persistence, sharing |
| File Storage | Local filesystem / S3 | Documents, reports |

---

## API Integrations

### 1. Google APIs (Gmail)

```typescript
// integrations/gmail.ts
export interface GmailConfig {
  clientId: string
  clientSecret: string
  redirectUri: string
  ownerEmail: string
}

export class GmailIntegration {
  authenticate(): Promise<void>
  listMessages(query: string): Promise<Message[]>
  getMessage(id: string): Promise<Message>
  sendMessage(to: string, subject: string, body: string): Promise<void>
  createDraft(to: string, subject: string, body: string): Promise<void>
}
```

### 2. Slack API

```typescript
// integrations/slack.ts
export class SlackIntegration {
  sendMessage(channel: string, message: string): Promise<void>
  updateMessage(channel: string, ts: string, message: string): Promise<void>
  addReaction(channel: string, ts: string, emoji: string): Promise<void>
  postEphemeral(channel: string, user: string, message: string): Promise<void>
}
```

### 3. GitHub API

```typescript
// integrations/github.ts
export class GitHubIntegration {
  createBranch(owner: string, repo: string, branch: string): Promise<void>
  createPullRequest(owner: string, repo: string, pr: PR): Promise<void>
  listConflicts(owner: string, repo: string): Promise<Conflict[]>
  getFileContent(owner: string, repo: string, path: string): Promise<string>
}
```

### 4. Firecrawl (Web Crawling)

```typescript
// integrations/firecrawl.ts
export class FirecrawlIntegration {
  search(query: string, options: SearchOptions): Promise<SearchResult[]>
  scrape(url: string): Promise<PageContent>
  crawlSite(url: string): Promise<SiteContent>
}
```

### 5. Vector Database

```typescript
// integrations/vector-db.ts
export interface VectorDBConfig {
  provider: 'pinecone' | 'weaviate' | 'hnswlib'
  apiKey?: string
  indexName?: string
}

export class VectorDB {
  upsert(vectors: Vector[]): Promise<void>
  search(vector: number[], topK: number): Promise<SearchResult[]>
  delete(ids: string[]): Promise<void>
}
```

---

## Testing Strategy

### Test Coverage Goals

| Component | Target Coverage | Type |
|-----------|-----------------|------|
| Services | 90%+ | Unit + Integration |
| Modes | 80%+ | Integration + E2E |
| Integrations | 85%+ | Unit + Mock |
| Utils | 95%+ | Unit |
| Overall | 85%+ | Mixed |

### Test Structure

```
tests/
├── unit/
│   ├── services/
│   ├── integrations/
│   └── utils/
├── integration/
│   ├── modes/
│   ├── services/
│   └── workflows/
├── e2e/
│   ├── scenarios/
│   └── workflows/
├── fixtures/
│   ├── mocks/
│   └── data/
└── jest.config.js
```

### Test Examples

```typescript
// tests/unit/services/cache-engine.test.ts
describe('CacheEngine', () => {
  it('should cache and retrieve values', async () => {
    const cache = new CacheEngine()
    await cache.set('key', 'value', 3600)
    const value = await cache.get('key')
    expect(value).toBe('value')
  })
})

// tests/integration/modes/research/orchestrator.test.ts
describe('Research Mode', () => {
  it('should research topic and generate report', async () => {
    const result = await runResearchMode('TypeScript patterns')
    expect(result).toHaveProperty('report')
    expect(result).toHaveProperty('sources')
    expect(result).toHaveProperty('citations')
  })
})

// tests/e2e/workflows/full-research.test.ts
describe('Full Research Workflow', () => {
  it('should research, synthesize, and generate PDF report', async () => {
    // User initiates research
    // System gathers data
    // System generates report
    // User downloads PDF
  })
})
```

---

## Risk Assessment

### High-Risk Areas

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Gmail OAuth complexity | High | Start with simple flow, test thoroughly |
| Vector DB performance | High | Benchmark before production, use caching |
| Batch job failures | High | Implement retry logic, error isolation |
| API rate limits | Medium | Implement throttling, queuing |
| Storage scalability | Medium | Plan DB optimization, archiving strategy |
| Session persistence | Medium | Use robust storage, test recovery |

### Mitigation Strategies

1. **Phased Rollout**
   - Deploy to staging first
   - Gradual production rollout
   - Feature flags for new features

2. **Monitoring**
   - Error tracking (Sentry)
   - Performance monitoring
   - Usage analytics

3. **Backup & Recovery**
   - Database backups
   - Session recovery
   - Rollback procedures

4. **Load Testing**
   - Batch job stress tests
   - Concurrent user testing
   - API limit testing

---

## Success Metrics

### Feature Completion

- [ ] All Tier 1 features implemented and tested
- [ ] All Tier 2 features operational
- [ ] All Tier 3 features integrated
- [ ] Documentation complete
- [ ] Test coverage >85%

### Quality Metrics

| Metric | Target | Current |
|--------|--------|---------|
| Test Coverage | 85% | 0% (new features) |
| Build Time | <60s | TBD |
| Performance P95 | <5s | TBD |
| Error Rate | <0.1% | TBD |
| API Response Time | <1s | TBD |

### User-Facing Metrics

- Time to complete task across modes
- Success rate of automated operations
- User satisfaction with new features
- Adoption rate per mode
- Error recovery rate

### Operational Metrics

- System uptime >99.9%
- Average resolution time <24h
- Documentation completeness 100%
- Code review coverage >80%

---

## Timeline Summary

```
Phase 1: Foundation (Weeks 1-3)
├─ Database setup
├─ Services infrastructure
└─ Configuration management

Phase 2: Tier 1 (Weeks 4-6)
├─ Research Mode
├─ Gmail Integration
└─ Knowledge Base

Phase 3: Tier 2 (Weeks 7-9)
├─ Batch/Automation
├─ Code Review
└─ Documentation Generator

Phase 4: Tier 3 (Weeks 10-12)
├─ Git Integration
├─ Testing & QA
└─ Slack Integration

Post-Launch (Optional):
├─ Web Dashboard
├─ Analytics Dashboard
└─ Advanced AI Features
```

---

## Next Steps

1. **Review & Approval**
   - Review this plan with stakeholders
   - Adjust priorities if needed
   - Finalize technology choices

2. **Preparation**
   - Set up development environment
   - Create project management tracking
   - Establish CI/CD pipeline

3. **Phase 1 Kickoff**
   - Create database schema
   - Build service layer
   - Set up integrations base

4. **Ongoing**
   - Weekly progress reviews
   - Bi-weekly stakeholder updates
   - Monthly retrospectives

---

## Appendix

### A. Configuration Files Template

```yaml
# config/modes.config.ts
export const modesConfig = {
  agent: { enabled: true, maxSteps: 40 },
  ask: { enabled: true },
  plan: { enabled: true, maxSteps: 15 },
  telegram: { enabled: process.env.TELEGRAM_BOT_TOKEN ? true : false },
  research: { enabled: true, maxSources: 10 },
  email: { enabled: process.env.GMAIL_CLIENT_ID ? true : false },
  batch: { enabled: true, maxConcurrent: 5 },
  review: { enabled: true },
  docs: { enabled: true },
  git: { enabled: true },
  test: { enabled: true },
  slack: { enabled: process.env.SLACK_BOT_TOKEN ? true : false },
}
```

### B. Environment Variables Template

```env
# AI Configuration
OPENROUTER_API_KEY=your_key
OPENROUTER_DEFAULT_MODEL=openrouter/free

# Gmail
GMAIL_CLIENT_ID=your_id
GMAIL_CLIENT_SECRET=your_secret
GMAIL_REDIRECT_URI=http://localhost:3000/auth/callback
GMAIL_OWNER_EMAIL=your_email@gmail.com

# Telegram
TELEGRAM_BOT_TOKEN=your_token
TELEGRAM_OWNER_ID=your_id

# Slack
SLACK_BOT_TOKEN=your_token
SLACK_SIGNING_SECRET=your_secret

# GitHub
GITHUB_TOKEN=your_token

# Vector DB
KB_PROVIDER=pinecone
KB_PINECONE_API_KEY=your_key
KB_INDEX_NAME=satya-kb

# Database
DATABASE_URL=sqlite:./satya.db

# Cache
CACHE_TYPE=memory
REDIS_URL=redis://localhost:6379

# Logging
LOG_LEVEL=info

# Firecrawl
FIRECRAWL_API_KEY=your_key
```

### C. Deployment Checklist

- [ ] Database migrations run
- [ ] Environment variables configured
- [ ] API keys secured
- [ ] SSL certificates updated
- [ ] Monitoring configured
- [ ] Backups scheduled
- [ ] Documentation published
- [ ] Team trained
- [ ] Rollback procedure tested

---

## Document Version History

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | 2026-05-30 | AI Assistant | Initial plan creation |

---

*This is a comprehensive upgrade plan for Satya CLI. Adjust timelines, priorities, and technologies based on your team's capacity and requirements.*
