export interface ExperienceItem {
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
  tag: string;
  titleColor?: string;
  achievements: string[];
}

export interface EducationItem {
  institution: string;
  degree?: string;
  field: string;
  startDate: string;
  endDate: string;
  description?: string;
  achievements?: string[];
}

export interface SkillGroup {
  category: string;
  tone: 'emerald' | 'violet' | 'cyan' | 'orange' | 'slate' | 'blue' | 'amber';
  skills: string[];
}

export interface ProjectItem {
  title: string;
  tag?: string;
  description: string;
  technologies: string[];
  link?: string;
}

export interface AgentNode {
  name: string;
  role: string;
  color: string;
}

export const actualCtoAgents: AgentNode[] = [
  { name: 'Blaze', role: 'Frontend implementation', color: '#6ee7b7' },
  { name: 'Tap', role: 'Expo mobile', color: '#93c5fd' },
  { name: 'Spark', role: 'Desktop apps', color: '#67e8f9' },
  { name: 'Rex', role: 'Rust backend', color: '#fdba74' },
  { name: 'Grizz', role: 'Go / gRPC', color: '#86efac' },
  { name: 'Block', role: 'Blockchain infra', color: '#fde68a' },
  { name: 'Nova', role: 'Node/Bun services', color: '#c4b5fd' },
  { name: 'Bolt', role: 'Infrastructure bootstrap', color: '#60a5fa' },
  { name: 'Atlas', role: 'Integration', color: '#f9a8d4' },
  { name: 'Stitch', role: 'PR review', color: '#a7f3d0' },
  { name: 'Cleo', role: 'Code quality', color: '#fca5a5' },
  { name: 'Tess', role: 'Testing', color: '#fcd34d' },
  { name: 'Cipher', role: 'Security analysis', color: '#fb7185' },
  { name: 'Morgan', role: 'PRD intake', color: '#a78bfa' },
  { name: 'Angie', role: 'Agent systems', color: '#22d3ee' },
  { name: 'Vex', role: 'Unity / OpenXR', color: '#d8b4fe' },
];

export const resumeData = {
  name: 'Jonathon Fritz',
  title: 'AI Infrastructure & Platform Engineering Leader',
  roles: [
    'AI Infrastructure Architect',
    'Platform Engineering Leader',
    'SRE / Infra Leadership',
    'Founder & CTO',
    'Agent Systems Builder',
  ],
  location: 'Victoria, BC',
  status: 'Available for AI infrastructure roles',
  summary:
    'AI infrastructure and platform engineering leader with 20+ years building production systems, global Kubernetes platforms, low-latency gRPC/trading-data systems, and multi-provider cloud/bare-metal infrastructure. Current work is deliberately Hermes-centric: local Hermes gateway, Hermes Agent skills/tools, MCP integrations, ACP harness routing, ACPX-backed CLI dispatch, Lobster intake workflows, memory/observability, and OpenClaw execution paths for AI-native teams.',
  focusBadges: [
    { icon: '🧠', label: 'AI infrastructure', color: '#6ee7b7' },
    { icon: '☸️', label: 'Kubernetes / GitOps', color: '#93c5fd' },
    { icon: '🦀', label: 'Rust + gRPC', color: '#fdba74' },
    { icon: '📡', label: 'Hermes + MCP ops', color: '#c4b5fd' },
    { icon: '🦞', label: 'ACPX + Lobster', color: '#fb7185' },
    { icon: '🎙️', label: 'Voice/avatar UX', color: '#67e8f9' },
    { icon: '🛡️', label: 'Infra leadership', color: '#fde68a' },
  ],
  metrics: [
    { value: 20, suffix: '+', label: 'years building infrastructure' },
    { value: 1, suffix: 'B+', label: 'daily requests led' },
    { value: 16, suffix: '', label: 'actual CTO agents mapped' },
    { value: 70, suffix: '%', label: 'infra cost reduction target', prefix: '−' },
  ],
  contact: {
    email: 'j@jonathonfritz.com',
    location: 'Victoria, BC',
    linkedin: 'https://www.linkedin.com/in/jonathonfritz',
    github: 'https://github.com/kaseonedge',
    website: 'https://resume.jonathonfritz.com',
  },
  techMarquee: [
    'Kubernetes', 'Talos Linux', 'ArgoCD', 'Cilium', 'Helm', 'Rust', 'Tokio', 'Tonic/gRPC',
    'TypeScript', 'Go', 'Hermes Agent', 'Hermes Gateway', 'OpenClaw', 'MCP', 'ACP Harness', 'ACPX', 'Lobster', 'NATS-style eventing', 'Argo Workflows',
    'ElevenLabs', 'MediaRecorder', 'WebAudio', 'Scenario P-Video', 'Pruna', 'Yellowstone gRPC',
    'QuestDB', 'PostgreSQL', 'Prometheus', 'Grafana', 'Loki', 'OpenTelemetry', 'Cloudflare Tunnels',
    'WireGuard', 'OpenBao', 'CloudNative-PG', 'Strimzi Kafka', 'SeaweedFS', 'Redis', 'OpenSearch',
    'ClickHouse', 'Solana', 'Ethereum', 'AWS/EKS', 'Bare Metal', 'Provider Abstraction', 'ZeroEdge beta',
  ],
  experiences: [
    {
      company: '5D Labs',
      position: 'Founder & AI Infrastructure Architect',
      startDate: 'May 2025',
      endDate: 'Present',
      tag: 'founder',
      titleColor: 'text-job-founder',
      description:
        'Building CTO Desktop and the Cognitive Task Orchestrator: a Hermes-centric AI infrastructure platform for agentic software delivery, Morgan voice/avatar UX, ACP harness routing through ACPX, Lobster intake/deliberation workflows, low-latency gRPC/trading-data experiments, local GitOps, model/provider routing, and self-healing Kubernetes operations across bare metal and cloud providers.',
      achievements: [
        'Architected CTO / CTO Desktop as a Hermes-centric AI infrastructure platform: specialized agents use the local Hermes gateway, Hermes Agent skills/tools, OpenClaw workflows, GitHub/GitOps integration, MCP tools, ACP harness routing, and local runtime automation to turn product intent into reviewed, deployed software',
        'Defined the actual CTO agent bench from repo-backed mappings: Blaze, Tap, Spark, Rex, Grizz, Block, Nova, Bolt, Atlas, Stitch, Cleo, Tess, Cipher, Morgan, Angie, and Vex — keeping placeholder personas out of the public story',
        'Built bare-metal and cloud cluster automation around Talos Linux, Kubernetes, Helm, Argo CD, Cilium, AWS/EKS, and provider abstraction, targeting 60-80% lower infrastructure cost than default managed-cloud patterns',
        'Integrated Hermes Agent as the operator-facing control plane: local gateway, skill loading, tool registry, browser/search/crawler providers, MCP adapters, memory, and CLI/provider abstraction, with OpenClaw supplying execution workflows underneath and ACPX providing ACP CLI dispatch',
        'Built and maintained MCP/tooling layers for infrastructure management, repository automation, Kubernetes inspection, workflow execution, ACPX-backed CLI handoffs, and model/provider hot-swapping',
        'Designed the ACP harness path: Morgan chooses Hermes/OpenClaw as the harness, ACP CLIs such as Copilot as execution surfaces, provider/model routing chooses a primary model plus enabled fallbacks, ACPX dispatches allowed CLI agents, and Lobster owns intake/deliberation graphs for research, synthesis, criteria, and readiness-audit stages',
        'Built Morgan voice/avatar UX infrastructure spanning FastAPI WebSocket voice bridge, ElevenLabs STT/TTS, browser MediaRecorder/WebAudio analyzers, reactive canvas avatar state, and Scenario P-Video/Pruna setup media workflows',
        'Developed low-latency Rust/gRPC trading-data and Solana infrastructure work: Yellowstone gRPC, QuestDB/PostgreSQL time-series storage, streaming price APIs, MEV-aware trading dashboards, and sub-100ms/p95/p99 performance targets',
        'Used ZeroEdge beta and provider-abstraction work to validate deployment paths across bare-metal and cloud providers without tying the platform to a single vendor',
        'Implemented self-healing operations patterns: agents inspect logs, metrics, Git state, Kubernetes resources, and runbooks to diagnose failures and propose or apply remediations',
        'Replaced 15+ managed cloud services with Kubernetes operators (CloudNative-PG, Strimzi Kafka, SeaweedFS, Redis, OpenSearch, ClickHouse), achieving the 60-80% cost reduction that defines the platform value proposition',
        'Designed zero-trust networking with Cloudflare Tunnels and WireGuard, plus OpenBao (Vault fork) secret management for secure multi-tenant agent operations',
        'Implemented comprehensive observability: Prometheus, Grafana, Loki, OpenTelemetry, with MCP tools enabling agents to query their own logs and metrics',
      ],
    },
    {
      company: 'Blocknative',
      position: 'Site Reliability Engineer',
      startDate: 'May 2023',
      endDate: 'May 2025',
      tag: 'sre',
      titleColor: 'text-job-sre',
      description: 'On-chain gas estimation infrastructure for Web3.',
      achievements: [
        'Led strategic transformation from mixed systemd/unikernel architecture to containerized infrastructure, achieving 100% Kubernetes adoption with ArgoCD-based GitOps workflows and a self-service model that reduced developer friction despite limited team size',
        'Implemented bare metal Kubernetes cluster using RKE2 on Latitude hardware with Cilium for CNI and network security, supporting high-performance Reth nodes',
        'Designed and implemented auto-scaling site-to-site connectivity solution, deploying Twingate Operator with AWS Gateway Load Balancer to achieve dynamic capacity management',
        'Configured Arbitrum Orbit L3 devnet with 250ms blocktime, ensuring high availability while optimizing parent chain costs',
        'Deployed and maintained Gas Network infrastructure, a distributed oracle platform providing near real-time gas price data and predictions across 35+ blockchain networks',
        'Developed Go-based on-chain data exporter for wallet balances and transaction timestamps, enabling comprehensive blockchain monitoring in DataDog dashboards and alerts',
        'Led observability initiatives using DataDog, implementing OpenTelemetry, APM, and distributed tracing while optimizing log ingestion costs',
        'Implemented nOps and Kubecost for infrastructure cost analysis, leading team initiatives that reduced infrastructure spend by 40%',
      ],
    },
    {
      company: 'Pocket Network Inc.',
      position: 'Head of Infrastructure Engineering',
      startDate: 'Jul 2022',
      endDate: 'Jan 2023',
      tag: 'head',
      titleColor: 'text-job-head',
      description: 'Decentralized Web3 infrastructure providing blockchain RPC access at scale.',
      achievements: [
        'Led and reorganized a team of 13 infrastructure engineers into specialized functional teams spanning 16 global regions — established clear ownership, streamlined communication, and enabled the team to operate independently',
        'Led migration from EC2/Docker Compose to GitOps with Kubernetes and ArgoCD across all 16 global regions, significantly reducing operational costs and deployment complexity',
        'Managed infrastructure serving over 1 billion daily requests across 50+ blockchain clients including validators, seeds, and archival nodes',
        'Led migration from DataDog to VictoriaMetrics/Loki/Grafana, drastically reducing observability costs while improving coverage',
        'Implemented comprehensive automation for node operations including key management, staking, and auto-upgrades',
        'Established Multi-Cluster architecture with Kubernetes, Helm, and ArgoCD for consistent global deployments',
      ],
    },
    {
      company: 'Pocket Network Inc.',
      position: 'DevOps Team Lead',
      startDate: 'Jan 2022',
      endDate: 'Jul 2022',
      tag: 'lead',
      titleColor: 'text-job-lead',
      description: 'Decentralized Web3 infrastructure.',
      achievements: [
        'Promoted to lead the DevOps team after demonstrating technical excellence in blockchain operations',
        'Led implementation of infrastructure as code for provisioning of diverse blockchain nodes',
        'Coordinated team efforts to optimize blockchain client configurations for improved performance',
        'Designed CI/CD pipelines for rapid deployment of infrastructure updates',
        'Mentored junior engineers on blockchain infrastructure best practices and protocols',
      ],
    },
    {
      company: 'Pocket Network Inc.',
      position: 'Sr DevOps Engineer',
      startDate: 'Jul 2021',
      endDate: 'Jan 2022',
      tag: 'engineer',
      titleColor: 'text-job-engineer',
      description: 'Decentralized Web3 infrastructure.',
      achievements: [
        'Designed and built automated health monitoring system for blockchain nodes with HAProxy integration',
        'Provisioned and maintained diverse blockchain clients (Geth, Erigon, Polygon, BSC) to support the POKT network',
        'Implemented automated failover systems to ensure 99.9% uptime for RPC endpoints',
        'Optimized blockchain node performance through benchmarking and tuning',
        'Developed automation scripts to streamline node deployment and maintenance operations',
      ],
    },
    {
      company: 'Coinmiles',
      position: 'Chief Technology Officer',
      startDate: 'Sep 2019',
      endDate: 'Jul 2021',
      tag: 'cto',
      titleColor: 'text-job-cto',
      description: 'Cryptocurrency rewards platform.',
      achievements: [
        'Promoted from Software Engineer to CTO within three months — fastest path from IC to executive in the company history — leading all technical aspects of the platform',
        'Designed and implemented backend features including ACH and API payment processing systems',
        'Led technical team management including mentoring, hiring, and code reviews',
        'Managed cloud infrastructure operations with continuous deployment using GitLab CI',
        'Implemented security improvements and GraphQL architecture upgrades',
      ],
    },
    {
      company: 'Coinmiles',
      position: 'Software Engineer',
      startDate: 'May 2019',
      endDate: 'Sep 2019',
      tag: 'engineer',
      titleColor: 'text-job-engineer',
      description: 'Cryptocurrency rewards platform.',
      achievements: [
        'Developed core platform features for cryptocurrency rewards application',
        'Contributed to microservices architecture using AWS serverless technologies',
        'Collaborated on React Native mobile application development',
      ],
    },
    {
      company: 'Consensus Core',
      position: 'Software Engineer / DevOps',
      startDate: 'May 2018',
      endDate: 'May 2019',
      tag: 'engineer',
      titleColor: 'text-job-engineer',
      description: 'Digital infrastructure providing blockchain-focused data centers.',
      achievements: [
        'Determined project scope and maintained independent project management workflows',
        'Designed and implemented GraphQL API and React front-end for Mining-as-a-Service application',
        'Responsible for cloud infrastructure operations with AWS CodePipeline for continuous deployment',
        'Designed and implemented LAN/WAN architecture for remote cloud mining facilities',
        'Established hardware vendor relationships and managed procurement for mining operations',
      ],
    },
    {
      company: 'NextWave Technologies',
      position: 'Owner, Lead Engineering Consultant',
      startDate: 'Oct 2016',
      endDate: 'May 2018',
      tag: 'consultant',
      titleColor: 'text-job-consultant',
      description: 'Technical consulting for small businesses.',
      achievements: [
        'Engaged directly with clients to determine business needs and develop solutions',
        'Designed and implemented web and mobile applications using modern JavaScript frameworks',
        'Built REST APIs for cryptocurrency startups, aggregating data from multiple exchanges',
        'Deployed applications to AWS with continuous integration using CodePipeline',
      ],
    },
    {
      company: 'TELUS',
      position: 'Technology Specialist',
      startDate: 'Nov 2006',
      endDate: 'Apr 2017',
      tag: 'specialist',
      titleColor: 'text-job-specialist',
      description: 'Enterprise IT infrastructure support.',
      achievements: [
        'Led enterprise server operations across multiple sites, managing 20+ hosts and 300+ VMs',
        'Implemented and maintained server configuration standards and templates',
        'Automated operations workflow, reducing server provisioning time by 65%',
        'Led disaster recovery implementation for Finning International, exceeding objectives',
        'Provided 24/7 support according to rotation schedule for critical infrastructure',
      ],
    },
  ] as ExperienceItem[],
  educations: [
    {
      institution: 'Hack Reactor',
      field: 'Advanced Software Engineering Immersive Program',
      startDate: '2016',
      endDate: '2016',
      description: 'Intensive software engineering bootcamp focused on full-stack JavaScript development',
      achievements: ['Completed 800+ hours of accelerated full-stack curriculum', 'Developed multiple web applications using React, Node.js, and related technologies'],
    },
    {
      institution: 'CDI College',
      field: 'Network Infrastructure Engineering Immersive Program',
      startDate: '2002',
      endDate: '2003',
      description: 'Comprehensive program covering network design, implementation, and management',
    },
    {
      institution: 'Cisco Networking Academy',
      field: 'Cisco Certified Network Associate (CCNA)',
      startDate: '2000',
      endDate: '2001',
      description: 'Foundation in network configuration, troubleshooting, and management',
    },
  ] as EducationItem[],
  skills: [
    { category: 'AI Engineering', tone: 'emerald', skills: ['Hermes Agent', 'Hermes Gateway', 'Multi-Agent Systems', 'OpenClaw Orchestration', 'ACP Harness Routing', 'ACPX CLI Dispatch', 'Lobster Workflows', 'Autonomous Coding Agents', 'Self-Healing AI', 'AI Workflow Design', 'Prompt Engineering', 'Tool Use & Function Calling', 'Context Management'] },
    { category: 'LLM & Model Integration', tone: 'violet', skills: ['Model Context Protocol (MCP)', 'Commercial LLM APIs', 'Self-Hosted Open-Weight Models', 'Model-Agnostic Orchestration', 'Inference Infrastructure', 'Tool Registration', 'Streaming Responses', 'Voice/Avatar UX', 'Prompt Engineering'] },
    { category: 'AI Infrastructure', tone: 'cyan', skills: ['Hermes Metal', 'Hermes Agent Runtime', 'OpenClaw Platform', 'ACPX', 'Agent Client Protocol', 'Lobster Orchestration', 'Argo Workflows', 'NATS-style Eventing', 'Event-Driven AI Pipelines', 'Agent State Management', 'Kubernetes CRDs for AI', 'Real-time Activity Streaming', 'Morgan Voice Bridge', 'GitHub Apps for AI'] },
    { category: 'Systems Programming', tone: 'orange', skills: ['Rust', 'Tokio', 'Tonic/gRPC', 'Axum', 'Serde', 'Go', 'TypeScript', 'Kubernetes Controllers', 'Async Runtime'] },
    { category: 'Distributed Systems & Blockchain Infra', tone: 'slate', skills: ['RPC Infrastructure', 'gRPC Streaming', 'Validator/Node Operations', 'Solana', 'Yellowstone gRPC', 'QuestDB', 'Low-Latency Systems', 'Trading Infrastructure', 'High-Throughput APIs'] },
    { category: 'Platform Engineering', tone: 'blue', skills: ['Kubernetes', 'Talos Linux', 'ArgoCD', 'GitOps', 'Cilium/eBPF', 'Helm', 'Bare Metal Provisioning', 'AWS/EKS', 'Multi-Cloud', 'Provider Abstraction', 'OpenBao/Vault'] },
    { category: 'Observability', tone: 'amber', skills: ['Prometheus', 'Grafana', 'Loki', 'OpenTelemetry', 'Fluent-bit', 'AI-Powered Alerting', 'Self-Healing Triggers', 'Incident Auto-Remediation'] },
  ] as SkillGroup[],
  projects: [
    {
      title: 'CTO — Software Factory & Bare-Metal Aggregator',
      tag: 'primary',
      description:
        'Hermes-centric autonomous software factory and bare-metal aggregator where actual CTO agents — Blaze, Tap, Spark, Rex, Grizz, Block, Nova, Bolt, Atlas, Stitch, Cleo, Tess, Cipher, Morgan, Angie, and Vex — ship production code through the local Hermes gateway, OpenClaw workflows, an ACP harness with ACPX CLI dispatch, Lobster intake/deliberation workflows, Morgan voice/avatar UX, GitOps, and model/provider routing across commercial and self-hosted LLMs.',
      technologies: ['Hermes Agent', 'Hermes Gateway', 'OpenClaw', 'ACPX', 'Lobster', 'Multi-Agent AI', 'Rust', 'MCP', 'Kubernetes', 'Bare Metal', 'Model-Agnostic'],
      link: 'https://github.com/5dlabs/cto',
    },
    {
      title: 'Morgan Voice/Avatar Setup UX',
      description:
        'Low-cognition CTO setup media and runtime voice/avatar infrastructure using FastAPI WebSockets, ElevenLabs STT/TTS, MediaRecorder/WebAudio analyzers, reactive canvas avatar state, and Scenario P-Video/Pruna media workflows.',
      technologies: ['FastAPI', 'WebSocket', 'ElevenLabs', 'MediaRecorder', 'WebAudio', 'Scenario P-Video', 'Pruna'],
    },
    {
      title: 'Distributed Systems / Blockchain Infrastructure',
      description:
        'Low-latency and HFT-adjacent trading infrastructure across Solana DEX data ingestion, Yellowstone gRPC, QuestDB/PostgreSQL time-series storage, streaming price APIs, MEV-aware execution workflows, and bare-metal validator/RPC operations. ZeroEdge beta and provider-abstraction work are framed as current beta/provider-validation experience.',
      technologies: ['Rust', 'gRPC', 'Yellowstone', 'QuestDB', 'Solana', 'MEV', 'Low-Latency', 'Bare Metal'],
    },
    {
      title: 'Hermes / MCP Runtime — Model-Agnostic Platform',
      description:
        'Hermes-centric runtime with MCP integrations, 60+ tools, local memory, browser/search/crawler providers, ACP harness routing, ACPX-backed CLI dispatch, and commercial or self-hosted LLM routing. Dynamic tool registration, real-time context streaming, and seamless hot-swapping between providers as the model landscape evolves.',
      technologies: ['Hermes Agent', 'MCP', 'ACPX', 'ACP Harness', 'Rust', 'Axum', 'Model-Agnostic', 'SSE', 'NATS-style Eventing'],
    },
  ] as ProjectItem[],
  agentNodes: actualCtoAgents,
};

export type ResumeData = typeof resumeData;
