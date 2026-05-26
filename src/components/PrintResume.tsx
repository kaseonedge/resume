/**
 * PrintResume — Condensed one-page PDF layout.
 *
 * Rendered into a hidden off-screen div and captured by html2pdf.js.
 * Designed to fit on a single US Letter page at standard margins.
 * Uses inline styles throughout to ensure html2pdf captures them correctly
 * (Tailwind classes are not reliably captured by the PDF renderer).
 */

const s = {
  page: {
    fontFamily: "'Inter', 'Segoe UI', Arial, sans-serif",
    fontSize: "9.5px",
    lineHeight: "1.35",
    color: "#1a1a1a",
    background: "#ffffff",
    width: "816px",       // 8.5in @ 96dpi
    minHeight: "1056px",  // 11in @ 96dpi
    padding: "28px 32px 24px 32px",
    boxSizing: "border-box" as const,
  },
  header: {
    borderBottom: "2px solid #111",
    paddingBottom: "10px",
    marginBottom: "10px",
  },
  name: {
    fontSize: "22px",
    fontWeight: "700",
    letterSpacing: "-0.3px",
    color: "#111",
    margin: "0 0 2px 0",
  },
  title: {
    fontSize: "11px",
    fontWeight: "500",
    color: "#444",
    margin: "0 0 6px 0",
    letterSpacing: "0.3px",
  },
  contactRow: {
    display: "flex" as const,
    flexWrap: "wrap" as const,
    gap: "0 14px",
    fontSize: "8.5px",
    color: "#555",
  },
  contactItem: {
    color: "#333",
  },
  columns: {
    display: "flex" as const,
    gap: "18px",
    alignItems: "flex-start" as const,
  },
  leftCol: {
    width: "175px",
    flexShrink: "0" as const,
  },
  rightCol: {
    flex: "1",
    minWidth: "0",
  },
  sectionTitle: {
    fontSize: "8px",
    fontWeight: "700",
    letterSpacing: "0.8px",
    textTransform: "uppercase" as const,
    color: "#111",
    borderBottom: "1px solid #ddd",
    paddingBottom: "2px",
    marginBottom: "6px",
    marginTop: "10px",
  },
  sectionTitleFirst: {
    fontSize: "8px",
    fontWeight: "700",
    letterSpacing: "0.8px",
    textTransform: "uppercase" as const,
    color: "#111",
    borderBottom: "1px solid #ddd",
    paddingBottom: "2px",
    marginBottom: "6px",
    marginTop: "0",
  },
  summary: {
    fontSize: "8.5px",
    color: "#333",
    lineHeight: "1.45",
    marginBottom: "0",
  },
  jobBlock: {
    marginBottom: "8px",
  },
  jobHeader: {
    display: "flex" as const,
    justifyContent: "space-between" as const,
    alignItems: "baseline" as const,
    marginBottom: "1px",
  },
  jobTitle: {
    fontSize: "9.5px",
    fontWeight: "700",
    color: "#111",
  },
  jobDate: {
    fontSize: "8px",
    color: "#777",
    whiteSpace: "nowrap" as const,
  },
  jobCompany: {
    fontSize: "8.5px",
    color: "#444",
    marginBottom: "3px",
  },
  bullet: {
    fontSize: "8.5px",
    color: "#333",
    paddingLeft: "10px",
    position: "relative" as const,
    lineHeight: "1.4",
    marginBottom: "1.5px",
  },
  skillCategory: {
    fontSize: "8px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "2px",
    marginTop: "6px",
  },
  skillCategoryFirst: {
    fontSize: "8px",
    fontWeight: "700",
    color: "#333",
    marginBottom: "2px",
    marginTop: "0",
  },
  skillTags: {
    display: "flex" as const,
    flexWrap: "wrap" as const,
    gap: "2px",
  },
  skillTag: {
    fontSize: "7.5px",
    background: "#f0f0f0",
    color: "#333",
    borderRadius: "2px",
    padding: "1px 4px",
  },
  eduBlock: {
    marginBottom: "5px",
  },
  eduTitle: {
    fontSize: "8.5px",
    fontWeight: "600",
    color: "#111",
  },
  eduSub: {
    fontSize: "8px",
    color: "#555",
  },
};

export default function PrintResume() {
  return (
    <div id="resume-pdf-page" style={s.page}>
      {/* Header */}
      <div style={s.header}>
        <h1 style={s.name}>Jonathon Fritz</h1>
        <p style={s.title}>AI Infrastructure & Platform Engineering Leader</p>
        <div style={s.contactRow}>
          <span style={s.contactItem}>Victoria, BC</span>
          <span style={s.contactItem}>j@jonathonfritz.com</span>
          <span style={s.contactItem}>github.com/kaseonedge</span>
          <span style={s.contactItem}>linkedin.com/in/jonathonfritz</span>
          <span style={s.contactItem}>resume.jonathonfritz.com</span>
        </div>
      </div>

      <div style={s.columns}>
        {/* LEFT COLUMN */}
        <div style={s.leftCol}>

          {/* Summary */}
          <div style={s.sectionTitleFirst}>Summary</div>
          <p style={s.summary}>
            AI infrastructure and platform engineering leader with 20+ years building production systems.
            Hands-on across Kubernetes/GitOps, Talos, bare metal, multi-cloud/provider abstraction,
            low-latency gRPC/trading-data systems, Morgan voice/avatar UX, MCP tooling, and
            OpenClaw/Hermes agent infrastructure. Led SRE, Head of Infra, CTO, and founder scopes.
          </p>

          {/* Core Skills */}
          <div style={s.sectionTitle}>Core Skills</div>

          <div style={s.skillCategoryFirst}>AI & Agent Systems</div>
          <div style={s.skillTags}>
            {["OpenClaw", "Multi-Agent AI", "MCP (60+ tools)", "Model-Agnostic Orch.", "Voice/Avatar UX", "Self-Healing Infra"].map(t => (
              <span key={t} style={s.skillTag}>{t}</span>
            ))}
          </div>

          <div style={s.skillCategory}>Platform Engineering</div>
          <div style={s.skillTags}>
            {["Kubernetes", "Talos Linux", "ArgoCD", "Cilium/eBPF", "Helm", "GitOps", "Bare Metal", "Multi-Cloud"].map(t => (
              <span key={t} style={s.skillTag}>{t}</span>
            ))}
          </div>

          <div style={s.skillCategory}>Systems Programming</div>
          <div style={s.skillTags}>
            {["Rust", "Tokio/Tonic", "gRPC", "Go", "TypeScript", "K8s CRDs", "Async Runtimes"].map(t => (
              <span key={t} style={s.skillTag}>{t}</span>
            ))}
          </div>

          <div style={s.skillCategory}>Distributed Systems</div>
          <div style={s.skillTags}>
            {["RPC Infra", "Solana", "QuestDB", "Low-Latency", "Trading Infra", "Cost Controls"].map(t => (
              <span key={t} style={s.skillTag}>{t}</span>
            ))}
          </div>

          <div style={s.skillCategory}>Observability</div>
          <div style={s.skillTags}>
            {["Prometheus", "Grafana", "Loki", "OpenTelemetry", "Incident Automation"].map(t => (
              <span key={t} style={s.skillTag}>{t}</span>
            ))}
          </div>

          {/* Education */}
          <div style={s.sectionTitle}>Education</div>

          <div style={s.eduBlock}>
            <div style={s.eduTitle}>Hack Reactor</div>
            <div style={s.eduSub}>Advanced Software Engineering Immersive · 2016</div>
          </div>
          <div style={s.eduBlock}>
            <div style={s.eduTitle}>CDI College</div>
            <div style={s.eduSub}>Network Infrastructure Engineering · 2002–2003</div>
          </div>
          <div style={s.eduBlock}>
            <div style={s.eduTitle}>Cisco Networking Academy (CCNA)</div>
            <div style={s.eduSub}>Certified Network Associate · 2000–2001</div>
          </div>

        </div>

        {/* RIGHT COLUMN — Experience */}
        <div style={s.rightCol}>
          <div style={s.sectionTitleFirst}>Experience</div>

          {/* 5D Labs */}
          <div style={s.jobBlock}>
            <div style={s.jobHeader}>
              <span style={s.jobTitle}>Founder & AI Infrastructure Architect</span>
              <span style={s.jobDate}>May 2025 – Present</span>
            </div>
            <div style={s.jobCompany}>5D Labs · Victoria, BC</div>
            <div style={s.bullet}>• Built CTO / CTO Desktop: AI infrastructure for agentic software delivery, Morgan voice/avatar UX, local GitOps, model/tool routing, and self-healing Kubernetes operations</div>
            <div style={s.bullet}>• Automated Talos/Kubernetes/GitOps patterns across bare metal, AWS/EKS, and cloud-provider abstraction; targeting 60-80% lower cost than default managed-cloud deployments</div>
            <div style={s.bullet}>• Built OpenClaw/Hermes/MCP tooling plus low-latency Rust/gRPC trading-data work: Yellowstone gRPC, QuestDB/PostgreSQL, streaming APIs, MEV-aware dashboards</div>
            <div style={s.bullet}>• Used ZeroEdge beta/provider validation and Kubernetes operators (CloudNative-PG, Strimzi Kafka, SeaweedFS, ClickHouse) to keep infrastructure portable across providers</div>
          </div>

          {/* Blocknative */}
          <div style={s.jobBlock}>
            <div style={s.jobHeader}>
              <span style={s.jobTitle}>Site Reliability Engineer</span>
              <span style={s.jobDate}>May 2023 – May 2025</span>
            </div>
            <div style={s.jobCompany}>Blocknative · Remote</div>
            <div style={s.bullet}>• Led cloud-to-Kubernetes transformation: 100% K8s adoption with ArgoCD GitOps on bare metal (Latitude / Cilium CNI); reduced infra spend by 40%</div>
            <div style={s.bullet}>• Deployed Gas Network — distributed oracle providing real-time gas price data across 35+ blockchain networks</div>
            <div style={s.bullet}>• Implemented Kubecost/nOPs for cost analysis; streamlined observability (OpenTelemetry, APM, distributed tracing)</div>
          </div>

          {/* Pocket Network Head */}
          <div style={s.jobBlock}>
            <div style={s.jobHeader}>
              <span style={s.jobTitle}>Head of Infrastructure Engineering</span>
              <span style={s.jobDate}>Jul 2022 – Jan 2023</span>
            </div>
            <div style={s.jobCompany}>Pocket Network · Remote</div>
            <div style={s.bullet}>• Led and reorganized 13 infrastructure engineers into specialized functional teams across 16 global regions</div>
            <div style={s.bullet}>• Migrated EC2/Docker Compose → GitOps Kubernetes/ArgoCD across all 16 regions; infrastructure serving 1B+ daily requests</div>
            <div style={s.bullet}>• Replaced DataDog with VictoriaMetrics/Loki/Grafana; managed global RPC/node infrastructure across Ethereum, Polygon, and BSC ecosystems</div>
          </div>

          {/* Pocket Network Lead */}
          <div style={s.jobBlock}>
            <div style={s.jobHeader}>
              <span style={s.jobTitle}>DevOps Team Lead → Sr. DevOps Engineer</span>
              <span style={s.jobDate}>Jul 2021 – Jul 2022</span>
            </div>
            <div style={s.jobCompany}>Pocket Network · Remote</div>
            <div style={s.bullet}>• Promoted from Sr. DevOps Engineer to Team Lead within 6 months; designed IaC, CI/CD pipelines, and blockchain node automation</div>
          </div>

          {/* Coinmiles CTO */}
          <div style={s.jobBlock}>
            <div style={s.jobHeader}>
              <span style={s.jobTitle}>CTO (promoted from Software Engineer in 3 months)</span>
              <span style={s.jobDate}>May 2019 – Jul 2021</span>
            </div>
            <div style={s.jobCompany}>Coinmiles · Remote</div>
            <div style={s.bullet}>• SE → CTO in 3 months; led architecture, team management, ACH/API payment systems, GraphQL upgrades, CI/CD, and cloud operations</div>
          </div>

          {/* TELUS */}
          <div style={s.jobBlock}>
            <div style={s.jobHeader}>
              <span style={s.jobTitle}>Technology Specialist</span>
              <span style={s.jobDate}>Nov 2006 – Apr 2017</span>
            </div>
            <div style={s.jobCompany}>TELUS · Victoria, BC</div>
            <div style={s.bullet}>• Managed enterprise server operations across 20+ hosts and 300+ VMs; automated server provisioning (65% time reduction); DR implementation for Finning International</div>
          </div>

          {/* Key metrics bar */}
          <div style={{
            marginTop: "10px",
            padding: "7px 10px",
            background: "#f5f5f5",
            borderRadius: "4px",
            display: "flex",
            flexWrap: "wrap" as const,
            gap: "0 20px",
          }}>
            {[
              ["20+ yrs", "production infra"],
              ["10,600+", "GitHub contributions"],
              ["1B+", "daily requests managed"],
              ["60-80%", "cloud cost savings"],
              ["AI infra", "agents + GitOps"],
            ].map(([val, label]) => (
              <span key={val} style={{ fontSize: "8px", color: "#444" }}>
                <strong style={{ color: "#111" }}>{val}</strong> {label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
