import type { CaseStudy } from "@/types"

export interface CaseStudyDetailData extends CaseStudy {
  research?: string
  planning?: string
  design?: string
  architecture?: string
  development?: string
  testing?: string
  deployment?: string
  technologies?: string[]
}

export const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "Scaling E-Commerce Platform for 500% Growth",
    slug: "scaling-ecommerce-platform",
    client: "RetailTech Inc.",
    overview:
      "RetailTech Inc. needed to scale their e-commerce platform to handle a 500% increase in traffic after a successful funding round. The legacy monolith was buckling under load, causing frequent outages during peak hours.",
    challenge:
      "The existing monolithic architecture couldn't handle the growing user base. Database queries were timing out, page loads exceeded 8 seconds, and deployment cycles took 3 days. The platform needed a complete architectural overhaul without disrupting ongoing operations.",
    approach:
      "We adopted a strangler fig pattern, incrementally extracting microservices from the monolith. The first phase focused on the product catalog and checkout — the two highest-traffic services. We migrated the database to a sharded PostgreSQL cluster and introduced Redis caching at multiple layers.",
    solution:
      "Delivered a microservices architecture with 12 services, each with its own database and API Gateway. Implemented CDN caching, database read replicas, and auto-scaling Kubernetes clusters. The new system supports blue-green deployments and canary releases.",
    results:
      "The platform now handles 50,000 concurrent users with sub-200ms page loads. Deployment time dropped from 3 days to 15 minutes. The new architecture saved 40% in infrastructure costs while supporting 5x the previous traffic volume.",
    techStack: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Kubernetes", "Docker", "AWS"],
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop",
    ],
    testimonial:
      "The transformation was seamless. Our users didn't notice a thing, but our engineering team felt the difference immediately. Deployments went from a dreaded weekly event to something we do multiple times a day with confidence.",
    metrics: [
      { label: "Page Load Time", value: "200ms" },
      { label: "Concurrent Users", value: "50K" },
      { label: "Deployment Time", value: "15min" },
      { label: "Cost Savings", value: "40%" },
    ],
    featured: true,
    completedDate: new Date("2024-03-15"),
    duration: "4 months",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "2",
    title: "Building a Real-Time Analytics Engine",
    slug: "real-time-analytics-engine",
    client: "DataFlow Corp",
    overview:
      "DataFlow Corp needed a real-time analytics platform to process and visualize streaming data from IoT devices deployed across smart city infrastructure.",
    challenge:
      "The existing batch processing system had a 24-hour delay between data collection and insight delivery. City operators needed real-time visibility into traffic, energy usage, and public safety metrics to make informed decisions.",
    approach:
      "We designed an event-driven architecture using Apache Kafka for stream ingestion, Apache Flink for real-time processing, and a custom dashboard built with Next.js. The system processes millions of events per second with sub-second latency.",
    solution:
      "Built a real-time analytics pipeline with Kafka, Flink, and TimescaleDB. The frontend uses Server-Sent Events for live dashboard updates. Custom ML models detect anomalies and trigger alerts within milliseconds.",
    results:
      "Processing latency dropped from 24 hours to under 100ms. The platform processes 10M+ events daily and reduced city operational costs by 25% through real-time resource optimization.",
    techStack: ["Next.js", "Python", "Kafka", "Flink", "TimescaleDB", "Docker", "Terraform"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",
    ],
    testimonial: null,
    metrics: [
      { label: "Processing Latency", value: "100ms" },
      { label: "Daily Events", value: "10M+" },
      { label: "Cost Reduction", value: "25%" },
      { label: "Uptime", value: "99.99%" },
    ],
    featured: true,
    completedDate: new Date("2024-06-01"),
    duration: "6 months",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  {
    id: "3",
    title: "Modernizing Healthcare Records System",
    slug: "healthcare-records-modernization",
    client: "MediCore Health",
    overview:
      "MediCore Health needed to modernize their legacy healthcare records system to improve patient care, meet regulatory requirements, and enable interoperability with other healthcare providers.",
    challenge:
      "The legacy system was built on outdated technology that couldn't support modern healthcare standards like FHIR. Data silos prevented information sharing between departments, and manual data entry led to errors and inefficiencies.",
    approach:
      "We conducted a thorough audit of existing workflows and data models before designing a FHIR-compliant microservices architecture. The migration was phased, starting with patient intake and gradually moving to clinical records.",
    solution:
      "Delivered a cloud-native healthcare platform with FHIR-compliant APIs, role-based access control, audit logging, and real-time data synchronization across departments. The system integrates with existing EHR systems through HL7/FHIR adapters.",
    results:
      "Patient intake time reduced by 60%, data entry errors dropped by 90%, and the platform achieved HIPAA compliance. Interoperability with 3 major hospital networks was established within the first quarter.",
    techStack: ["TypeScript", "Node.js", "PostgreSQL", "FHIR", "AWS", "Docker", "React"],
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop",
    images: [
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=800&h=600&fit=crop",
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop",
    ],
    testimonial: null,
    metrics: [
      { label: "Intake Time Reduction", value: "60%" },
      { label: "Error Reduction", value: "90%" },
      { label: "Interoperability", value: "3 Networks" },
      { label: "Compliance", value: "HIPAA" },
    ],
    featured: false,
    completedDate: new Date("2024-08-20"),
    duration: "8 months",
    createdAt: new Date(),
    updatedAt: new Date(),
  },
]

export const caseStudyDetails: CaseStudyDetailData[] = [
  {
    ...caseStudies[0],
    research:
      "We conducted stakeholder interviews with engineering, product, and operations teams to understand pain points. Load testing revealed critical bottlenecks in the database layer and session management. User analytics showed that 70% of users abandoned carts when page load exceeded 3 seconds.",
    planning:
      "The migration was planned in 6 phases over 4 months. Phase 0 focused on observability (distributed tracing, metrics, logging). Phases 1-3 extracted product catalog, user management, and checkout into independent services. Phase 4 introduced database sharding. Phase 5 implemented the API Gateway and migration completion.",
    design:
      "Each microservice was designed with its own data store, clear bounded contexts, and well-defined APIs. We used an API Gateway pattern for cross-cutting concerns (auth, rate limiting, logging). The frontend was migrated to a micro-frontend architecture to allow independent team deployments.",
    architecture:
      "The new architecture consists of 12 microservices, each deployed in Kubernetes pods with auto-scaling. PostgreSQL with Citus extension for horizontal sharding. Redis for caching and session management. Kafka for async communication between services. The system runs on AWS EKS with multi-AZ redundancy.",
    development:
      "Development followed a trunk-based workflow with feature flags. Each team owned one or more services. We maintained backward compatibility throughout by running the monolith and new services in parallel, gradually shifting traffic using the strangler fig pattern.",
    testing:
      "Comprehensive testing included unit tests, integration tests with Testcontainers, chaos engineering experiments to validate fault tolerance, and performance tests that simulated 10x peak traffic. We achieved 85% code coverage across all services.",
    deployment:
      "Deployments use GitHub Actions for CI, ArgoCD for GitOps-style CD, and feature flags for safe rollouts. Each service has canary deployment with automatic rollback based on error rate and latency SLIs. Deployments went from weekly to multiple times daily.",
    technologies: ["Next.js", "Node.js", "PostgreSQL", "Redis", "Kubernetes", "Docker", "AWS", "Kafka", "ArgoCD", "Terraform"],
  },
  {
    ...caseStudies[1],
    research:
      "We analyzed IoT data patterns across 5 city departments and conducted performance benchmarking of various stream processing frameworks. User research with city operators revealed that they needed actionable insights, not just raw data visualizations.",
    planning:
      "The project was divided into 8 sprints over 6 months. The first 3 sprints focused on the data pipeline (ingestion, processing, storage), sprints 4-5 on the dashboard and alerting system, and the final sprints on ML model integration and production hardening.",
    design:
      "Designed a lambda architecture with Kafka for speed layer (real-time) and TimescaleDB for batch layer (historical analytics). The dashboard uses a composable widget system where operators can build custom views. Alerts are configurable with dynamic thresholds.",
    architecture:
      "Kafka cluster with 6 brokers ingests data from 50,000+ IoT devices. Flink processes streaming data with event-time semantics. Processed data is stored in TimescaleDB for time-series analytics. The Next.js dashboard connects via Server-Sent Events for real-time updates.",
    development:
      "Developed in Python for stream processing services and TypeScript for the dashboard. Apache Flink jobs were implemented in Python using PyFlink. The dashboard uses a modular widget architecture with React and D3.js for custom visualizations.",
    testing:
      "Testing focused heavily on data correctness and performance. We built a simulation framework that generates synthetic IoT data to validate the pipeline at scale. Chaos engineering tests validated fault tolerance of the Kafka and Flink clusters.",
    deployment:
      "Infrastructure is defined as code with Terraform, deployed across AWS EKS. Kafka and Flink clusters are managed with Strimzi operator. Monitoring uses Prometheus, Grafana, and custom dashboards for pipeline health.",
    technologies: ["Next.js", "Python", "Apache Kafka", "Apache Flink", "TimescaleDB", "Docker", "Terraform", "AWS"],
  },
  {
    ...caseStudies[2],
    research:
      "We shadowed clinicians, nurses, and admin staff for 2 weeks to map out every workflow. The audit revealed 47 distinct data entry points, 12 of which were redundant. We identified FHIR R4 as the interoperability standard and conducted a gap analysis against the existing data model.",
    planning:
      "The project was planned in 4 major phases over 8 months: (1) Foundation — FHIR data model and API layer, (2) Patient Management — intake, scheduling, demographics, (3) Clinical Records — encounters, observations, medications, (4) Interoperability — HL7/FHIR adapters and external integrations.",
    design:
      "Designed a FHIR-first data architecture with a custom FHIR server built on PostgreSQL. The UI follows Material Design with accessibility-first principles. Role-based access controls were mapped to 15 distinct user roles with granular permissions at the resource and field level.",
    architecture:
      "FHIR server built with Node.js and PostgreSQL using the FHIR R4 specification. A React-based SPA serves as the frontend. The system uses AWS HealthLake for long-term storage and integrates with existing EHRs via HL7v2 and FHIR adapters deployed as edge services.",
    development:
      "Development followed a FHIR-first approach — all data models and APIs were defined by the FHIR specification first, then the UI was built on top. We implemented SMART on FHIR for third-party app integrations. Feature flags enabled gradual rollout to departments.",
    testing:
      "Rigorous testing included FHIR conformance validation, HIPAA security audits, penetration testing, and performance testing with 10,000 concurrent users. We achieved 95% test coverage and passed all ONC certification criteria.",
    deployment:
      "Deployed on AWS with HIPAA-eligible services. CI/CD pipeline includes automated FHIR conformance checks and security scanning. Database migrations use Flyway with automated rollback. The system achieved HIPAA compliance certification on first audit.",
    technologies: ["TypeScript", "Node.js", "PostgreSQL", "FHIR R4", "AWS", "Docker", "React", "HL7", "SMART on FHIR"],
  },
]
