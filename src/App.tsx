import { useState, useEffect } from 'react';
import Header from './components/Header';
import Experience from './components/Experience';
import Education from './components/Education';
import Skills from './components/Skills';
import Projects from './components/Projects';
import GitHubContributions from './components/GitHubContributions';
import TerminalIntro from './components/TerminalIntro';

function App() {
  const [showIntro, setShowIntro] = useState(true);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const skipIntro = new URLSearchParams(window.location.search).get('skipIntro');
    const hasSeenIntro = sessionStorage.getItem('hasSeenIntro');

    if (skipIntro === 'true' || hasSeenIntro) {
      setShowIntro(false);
      setShowContent(true);
      sessionStorage.setItem('hasSeenIntro', 'true');
    }
  }, []);

  const handleIntroComplete = () => {
    sessionStorage.setItem('hasSeenIntro', 'true');
    setShowIntro(false);
    setTimeout(() => {
      setShowContent(true);
    }, 300);
  };

  const [resumeData] = useState({
    name: "Jonathon Fritz",
    title: "AI Platform Engineer",
    profileImage: "",
    summary: "Building autonomous software factories on bare metal. I architect OpenClaw-powered multi-agent AI systems that ship production code — 13 specialized agents orchestrated across Claude, GPT, Gemini, DeepSeek, and self-hosted models, running on self-healing infrastructure at 60-80% less than cloud.",
    showProjects: true,
    experiences: [
      {
        company: "5D Labs",
        position: "Founder & AI Platform Architect",
        startDate: "May 2025",
        endDate: "Present",
        description: "Building the Cognitive Task Orchestrator (CTO) — an autonomous software factory and bare-metal aggregator powered by OpenClaw. 13 AI agents ship production code end-to-end on self-hosted infrastructure at 60-80% less than cloud, supporting Claude, GPT, Gemini, DeepSeek, Qwen, and self-hosted open-weight models.",
        titleColor: "text-job-founder",
        achievements: [
          "Architected CTO as a software factory: 13 specialized AI agents autonomously write, test, review, and ship production code through OpenClaw-orchestrated workflows — from PRD to deployed feature with zero human intervention",
          "Built bare-metal aggregator provisioning Talos Linux clusters across 7+ providers (Latitude, Hetzner, OVH, Vultr, Scaleway, Cherry, DigitalOcean), delivering 60-80% cost savings vs AWS/GCP/Azure",
          "Integrated OpenClaw agent orchestration platform supporting multiple AI CLIs (Claude Code, Cursor, Codex, Factory, Gemini, OpenCode) with dynamic skill loading, NATS messaging, and Discord bridge for inter-agent communication",
          "Built MCP server with 60+ tools and dynamic registration, supporting Claude, GPT-4, Gemini, DeepSeek, Qwen, GLM-4, MiniMax, and other self-hosted Chinese and open-weight models via vLLM/Ollama",
          "Implemented self-healing Healer service with 9 alert types and automated remediation — agents autonomously diagnose root causes and fix failures without human intervention",
          "Replaced 15+ managed cloud services with Kubernetes operators (CloudNative-PG, Strimzi Kafka, SeaweedFS, Redis, OpenSearch, ClickHouse), achieving the 60-80% cost reduction that defines the platform's value proposition",
          "Built Solana and blockchain trading agent infrastructure for autonomous on-chain trading across Solana, Base, and Near ecosystems",
          "Designed zero-trust networking with Cloudflare Tunnels and WireGuard, plus OpenBao (Vault fork) secret management for secure multi-tenant agent operations",
          "Implemented comprehensive observability: Prometheus, Grafana, Loki, OpenTelemetry, with MCP tools enabling agents to query their own logs and metrics",
          "Released platform as open-source under AGPL-3.0, establishing 5D Labs as a contributor to the AI infrastructure ecosystem"
        ]
      },
      {
        company: "Blocknative",
        position: "Site Reliability Engineer",
        startDate: "May 2023",
        endDate: "May 2025",
        description: "On-chain gas estimation infrastructure for Web3.",
        titleColor: "text-job-sre",
        achievements: [
          "Led strategic transformation from mixed systemd/unikernel architecture to containerized infrastructure, achieving 100% Kubernetes adoption with ArgoCD-based GitOps workflows and a self-service model that reduced developer friction despite limited team size",
          "Implemented bare metal Kubernetes cluster using RKE2 on Latitude hardware with Cilium for CNI and network security, supporting high-performance Reth nodes",
          "Designed and implemented auto-scaling site-to-site connectivity solution, deploying Twingate Operator with AWS Gateway Load Balancer to achieve dynamic capacity management",
          "Configured Arbitrum Orbit L3 devnet with 250ms blocktime, ensuring high availability while optimizing parent chain costs",
          "Deployed and maintained Gas Network infrastructure, a distributed oracle platform providing near real-time gas price data and predictions across 35+ blockchain networks",
          "Established Blockscout expertise for blockchain indexing, metrics collection, and smart contract verification",
          "Developed Go-based on-chain data exporter for wallet balances and transaction timestamps, enabling comprehensive blockchain monitoring in DataDog dashboards and alerts",
          "Led observability initiatives using DataDog, implementing OpenTelemetry, APM, and distributed tracing while optimizing log ingestion costs",
          "Streamlined alert management across Slack and PagerDuty, implementing intelligent alert routing and reducing alert fatigue through correlation and actionable thresholds",
          "Enhanced system reliability through automated recovery procedures and proactive monitoring",
          "Demonstrated exceptional incident response capabilities through on-call rotation, rapidly debugging and resolving critical production issues",
          "Collaborated on HashiCorp Vault implementation, consolidating secrets from Ansible, GitHub, and 1Password into a unified management system, improving security posture and operational efficiency",
          "Developed streamlined onboarding process enabling new team members to contribute effectively from week one",
          "Provided daily hands-on support and education to development team, establishing infrastructure best practices and improving team efficiency",
          "Managed mission-critical RDS infrastructure including Aurora PostgreSQL clusters, implementing automated snapshots, point-in-time recovery, and cross-region replication",
          "Implemented nOPs and Kubecost for infrastructure cost analysis, leading team initiatives that reduced infrastructure spend by 40%"
        ]
      },
      {
        company: "Pocket Network Inc.",
        position: "Head Of Infrastructure Engineering",
        startDate: "Jul 2022",
        endDate: "Jan 2023",
        description: "Decentralized Web3 Infrastructure providing blockchain RPC access at scale",
        titleColor: "text-job-head",
        achievements: [
          "Led successful migration from EC2/Docker Compose to GitOps with Kubernetes and ArgoCD across 16 global regions, significantly reducing operational costs",
          "Managed infrastructure serving over 1 billion daily requests",
          "Orchestrated operations of 50+ blockchain clients including validators, seeds, and archival nodes for Ethereum, Polygon, BSC",
          "Led migration from DataDog to VictoriaMetrics/Loki/Grafana, drastically reducing observability costs",
          "Implemented comprehensive automation for node operations including key management, staking, and auto-upgrades",
          "Led and reorganized a team of 13 infrastructure engineers into specialized functional teams",
          "Conducted regular 1:1s with team members, providing mentorship and career development guidance",
          "Spearheaded technical interviews and hiring decisions for infrastructure engineering roles",
          "Collaborated with executive leadership on infrastructure cost optimization strategies",
          "Established Multi-Cluster architecture with Kubernetes, Helm, and ArgoCD for consistent global deployments"
        ]
      },
      {
        company: "Pocket Network Inc.",
        position: "DevOps Team Lead",
        startDate: "Jan 2022",
        endDate: "Jul 2022",
        description: "Decentralized Web3 Infrastructure",
        titleColor: "text-job-lead",
        achievements: [
          "Promoted to lead the DevOps team after demonstrating technical excellence in blockchain operations",
          "Led implementation of infrastructure as code for provisioning of diverse blockchain nodes",
          "Coordinated team efforts to optimize blockchain client configurations for improved performance",
          "Designed CI/CD pipelines for rapid deployment of infrastructure updates",
          "Mentored junior engineers on blockchain infrastructure best practices and protocols"
        ]
      },
      {
        company: "Pocket Network Inc.",
        position: "Sr DevOps Engineer",
        startDate: "Jul 2021",
        endDate: "Jan 2022",
        description: "Decentralized Web3 Infrastructure",
        titleColor: "text-job-engineer",
        achievements: [
          "Designed and built automated health monitoring system for blockchain nodes with HAProxy integration",
          "Provisioned and maintained diverse blockchain clients (Geth, Erigon, Polygon, BSC) to support the POKT network",
          "Implemented automated failover systems to ensure 99.9% uptime for RPC endpoints",
          "Optimized blockchain node performance through benchmarking and tuning",
          "Developed automation scripts to streamline node deployment and maintenance operations"
        ]
      },
      {
        company: "Coinmiles",
        position: "Chief Technology Officer",
        startDate: "Sep 2019",
        endDate: "Jul 2021",
        description: "Cryptocurrency rewards platform",
        titleColor: "text-job-cto",
        achievements: [
          "Promoted from Software Engineer to CTO within three months, leading all technical aspects of the platform",
          "Designed and implemented backend features including ACH and API payment processing systems",
          "Led technical team management including mentoring, hiring, and code reviews",
          "Managed cloud infrastructure operations with continuous deployment using GitLab CI",
          "Implemented security improvements and GraphQL architecture upgrades"
        ]
      },
      {
        company: "Coinmiles",
        position: "Software Engineer",
        startDate: "May 2019",
        endDate: "Sep 2019",
        description: "Cryptocurrency rewards platform",
        titleColor: "text-job-engineer",
        achievements: [
          "Developed core platform features for cryptocurrency rewards application",
          "Contributed to microservices architecture using AWS serverless technologies",
          "Collaborated on React Native mobile application development"
        ]
      },
      {
        company: "Consensus Core",
        position: "Software Engineer/DevOps",
        startDate: "May 2018",
        endDate: "May 2019",
        description: "Digital Infrastructure providing blockchain-focused data centers",
        titleColor: "text-job-engineer",
        achievements: [
          "Determined project scope and maintained independent project management workflows",
          "Designed and implemented GraphQL API and React front-end for Mining-as-a-Service application",
          "Responsible for cloud infrastructure operations with AWS CodePipeline for continuous deployment",
          "Designed and implemented LAN/WAN architecture for remote cloud mining facilities",
          "Established hardware vendor relationships and managed procurement for mining operations"
        ]
      },
      {
        company: "NextWave Technologies",
        position: "Owner, Lead Engineering Consultant",
        startDate: "Oct 2016",
        endDate: "May 2018",
        description: "Technical consulting for small businesses",
        titleColor: "text-job-consultant",
        achievements: [
          "Engaged directly with clients to determine business needs and develop solutions",
          "Designed and implemented web and mobile applications using modern JavaScript frameworks",
          "Built REST APIs for cryptocurrency startups, aggregating data from multiple exchanges",
          "Deployed applications to AWS with continuous integration using CodePipeline"
        ]
      },
      {
        company: "TELUS",
        position: "Technology Specialist",
        startDate: "Nov 2006",
        endDate: "Apr 2017",
        description: "Enterprise IT infrastructure support",
        titleColor: "text-job-specialist",
        achievements: [
          "Served as VMware team lead managing 20+ hosts and 300+ VMs across multiple sites",
          "Implemented and maintained server configuration standards and templates",
          "Automated operations workflow, reducing server provisioning time by 65%",
          "Led disaster recovery implementation for Finning International, exceeding objectives",
          "Provided 24/7 support according to rotation schedule for critical infrastructure"
        ]
      }
    ],
    educations: [
      {
        institution: "Hack Reactor",
        degree: "",
        field: "Advanced Software Engineering Immersive Program",
        startDate: "2016",
        endDate: "2016",
        description: "Intensive software engineering bootcamp focused on full-stack JavaScript development",
        achievements: [
          "Completed 800+ hours of accelerated full-stack curriculum",
          "Developed multiple web applications using React, Node.js, and related technologies"
        ]
      },
      {
        institution: "VMware",
        degree: "",
        field: "VMware Certified Professional 5 – Data Center Virtualization (VCP5-DCV)",
        startDate: "2015",
        endDate: "2015",
        description: "Professional certification in virtualization technologies"
      },
      {
        institution: "CDI College",
        degree: "",
        field: "Network Infrastructure Engineering Immersive Program",
        startDate: "2002",
        endDate: "2003",
        description: "Comprehensive program covering network design, implementation, and management"
      },
      {
        institution: "Cisco Networking Academy",
        degree: "",
        field: "Cisco Certified Network Associate (CCNA)",
        startDate: "2000",
        endDate: "2001",
        description: "Foundation in network configuration, troubleshooting, and management"
      }
    ],
    skills: [
      {
        category: "AI Engineering",
        skills: [
          "Multi-Agent Systems", "OpenClaw Orchestration", "Agent Orchestration", "Autonomous Coding Agents", "Self-Healing AI", "AI Workflow Design", "Prompt Engineering", "Tool Use & Function Calling", "Context Management"
        ]
      },
      {
        category: "LLM & Model Integration",
        skills: [
          "Model Context Protocol (MCP)", "Claude API", "GPT-4 API", "Gemini API", "DeepSeek", "Qwen", "GLM-4", "MiniMax", "Self-Hosted Open-Weight Models", "vLLM", "Ollama", "AI CLI Tools (Cursor, Codex, Factory, OpenCode)", "Tool Registration", "Streaming Responses"
        ]
      },
      {
        category: "AI Infrastructure",
        skills: [
          "OpenClaw Platform", "Argo Workflows", "NATS Messaging", "Event-Driven AI Pipelines", "Agent State Management", "Kubernetes CRDs for AI", "Real-time Activity Streaming", "Linear Integration", "GitHub Apps for AI"
        ]
      },
      {
        category: "Systems Programming",
        skills: [
          "Rust", "Tokio", "Axum", "Serde", "Go", "TypeScript", "Kubernetes Controllers", "Custom Resource Definitions", "Async Runtime"
        ]
      },
      {
        category: "Blockchain & Trading",
        skills: [
          "Solana", "Ethereum", "Base (OP Stack)", "Near", "DeFi Protocols", "On-Chain Trading Agents", "RPC Infrastructure", "Node Operations", "Polygon", "BSC"
        ]
      },
      {
        category: "Platform Engineering",
        skills: [
          "Kubernetes", "Talos Linux", "ArgoCD", "GitOps", "Cilium", "Helm", "Bare Metal Provisioning", "Cloudflare Tunnels", "WireGuard VPN", "Zero-Trust Networking", "OpenBao/Vault"
        ]
      },
      {
        category: "Observability",
        skills: [
          "Prometheus", "Grafana", "Loki", "OpenTelemetry", "Fluent-bit", "AI-Powered Alerting", "Self-Healing Triggers", "Incident Auto-Remediation"
        ]
      }
    ],
    projects: [
      {
        title: "CTO — Software Factory & Bare-Metal Aggregator",
        description: "Autonomous software factory where 13 AI agents ship production code end-to-end on self-hosted infrastructure. OpenClaw-powered orchestration across Claude, GPT, Gemini, DeepSeek, Qwen, and self-hosted models. 60-80% cost savings vs cloud through bare-metal aggregation across 7+ providers.",
        technologies: ["OpenClaw", "Multi-Agent AI", "Rust", "MCP", "Kubernetes", "Bare Metal", "Claude/GPT/DeepSeek"],
        link: "https://github.com/5dlabs/cto"
      },
      {
        title: "OpenClaw Agent Orchestration",
        description: "Open-source agent orchestration platform coordinating 13 specialized agents through NATS messaging, Discord bridge, and Argo Workflows. Supports multiple AI CLIs with dynamic skill loading and unrestricted inter-agent communication.",
        technologies: ["OpenClaw", "NATS", "Rust", "Kubernetes CRDs", "Linear API", "MCP"]
      },
      {
        title: "Agentic Trading Platform",
        description: "Autonomous on-chain trading agents operating across Solana, Base, and Near. AI-powered decision-making for DeFi market navigation with real-time blockchain data integration.",
        technologies: ["Solana", "Base", "Near", "DeFi", "Trading Agents", "Rust", "TypeScript"]
      },
      {
        title: "MCP Server — Multi-Model Platform",
        description: "Model Context Protocol server with 60+ tools supporting Claude, GPT-4, Gemini, DeepSeek, Qwen, GLM-4, MiniMax, and self-hosted open-weight models via vLLM/Ollama. Dynamic tool registration and real-time context streaming.",
        technologies: ["MCP", "Rust", "Axum", "Claude/GPT/DeepSeek/Qwen", "vLLM", "Ollama", "SSE"]
      }
    ],
    contact: {
      email: "j@jonathonfritz.com",
      phone: "",
      location: "Victoria, British Columbia, Canada",
      linkedin: "https://www.linkedin.com/in/jonathonfritz",
      github: "https://github.com/kaseonedge",
      website: ""
    }
  });

  return (
    <>
      {showIntro && !showContent && (
        <TerminalIntro onComplete={handleIntroComplete} />
      )}

      {showContent && (
        <div className="bg-[#121212] text-white min-h-screen dark-resume fade-in">
          <div className="container mx-auto px-5 md:px-6 py-8 max-w-[1500px] relative">
            <div className="bg-[#1c1c1c] rounded-lg shadow-xl border border-[#2a2a2a] resume-glow">
              <div className="header-section">
                <Header
                  name={resumeData.name}
                  title={resumeData.title}
                  profileImage={resumeData.profileImage}
                  summary={resumeData.summary}
                  showTitle={false}
                  contact={resumeData.contact}
                />
              </div>

              <main className="p-5 md:p-7 grid grid-cols-1 md:grid-cols-12 gap-5 md:gap-9">
                <div className="md:col-span-5 lg:col-span-5">
                  <div className="skills-section">
                    <Skills skills={resumeData.skills} />
                  </div>
                </div>

                <div className="md:col-span-7 lg:col-span-7 space-y-7">
                  <div className="experience-section">
                    <Experience experiences={resumeData.experiences} />
                  </div>
                  <div className="github-section">
                    <GitHubContributions username={resumeData.contact.github.split('/').pop() || "kaseonedge"} />
                  </div>
                  <div className="education-section">
                    <Education educations={resumeData.educations} />
                  </div>
                  {resumeData.showProjects && (
                    <div className="projects-section">
                      <Projects projects={resumeData.projects} />
                    </div>
                  )}
                </div>
              </main>

              <div className="footer-section">
                <footer className="px-4 py-3 border-t border-gray-800 bg-[#161616]">
                  <div className="flex flex-wrap justify-between items-center">
                    <div className="text-gray-500 text-sm">
                      © {new Date().getFullYear()} {resumeData.name}
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
