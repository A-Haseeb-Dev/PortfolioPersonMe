export interface KnowledgeEntry {
  patterns: RegExp[]
  response: string
  category: string
}

export interface Suggestion {
  label: string
  query: string
  category?: string
}

const knowledgeBase: KnowledgeEntry[] = [
  {
    patterns: [/hi\b|hello\b|hey\b|greetings/i],
    response:
      "Hi there! 👋 I'm Abdul Haseeb's AI assistant. I can tell you about his skills, projects, experience, services, and more. What would you like to know?",
    category: "greeting",
  },
  {
    patterns: [/how are you/i, /how('s| is) it going/i],
    response:
      "I'm doing great, thanks for asking! I'm here to help you learn about Abdul Haseeb and his work. What can I help you with?",
    category: "greeting",
  },

  {
    patterns: [
      /what skills|skills|technologies\b|tech stack|tech stack/i,
      /what (does|can) .* (do|work with)/i,
      /what .* (expert|proficient|good at)/i,
    ],
    response:
      "Abdul Haseeb has a diverse skill set spanning multiple domains:\n\n**Programming Languages:** JavaScript (6 yrs, Expert), TypeScript (4 yrs, Advanced), Python (5 yrs, Advanced), HTML & CSS (7 yrs, Expert)\n\n**Frontend:** React (5 yrs, Expert), Next.js (4 yrs, Advanced), Tailwind CSS (4 yrs, Expert)\n\n**Backend:** Node.js (5 yrs, Advanced), Express.js (5 yrs, Advanced), REST API Design (5 yrs, Expert)\n\n**Mobile:** React Native (3 yrs, Intermediate)\n\n**Databases:** MongoDB (4 yrs, Advanced), PostgreSQL (4 yrs, Advanced)\n\n**Cloud & DevOps:** Docker (3 yrs), AWS (3 yrs), GitHub Actions (3 yrs)\n\n**AI/ML:** TensorFlow (2 yrs), PyTorch (1 yr)\n\n**Design:** Figma (3 yrs)\n\n**Business:** Project Management (4 yrs), SEO & Analytics (3 yrs)\n\nHe also has experience with Django, GraphQL, Prisma, Docker, Kubernetes, and more. Check the Skills page for the full tech radar!",
    category: "skills",
  },
  {
    patterns: [
      /react\s*(projects|work|experience)/i,
      /projects? (built with|using|in) react/i,
      /what react/i,
      /react (js|\.js)/i,
    ],
    response:
      "Abdul Haseeb has built several impressive projects with React:\n\n• **Portfolio Platform** — A full-featured portfolio built with Next.js, TypeScript, and Tailwind CSS\n• **E-commerce Dashboard** — Admin dashboard for managing products, orders, and analytics\n• **Real-time Chat App** — A messaging application with real-time updates and user authentication\n• **Social Media Dashboard** — Analytics and management interface for social media accounts\n• **Task Management System** — Project management tool with drag-and-drop Kanban boards\n\nHe has 5 years of React experience and is considered an Expert. React is his go-to for building interactive UIs!",
    category: "projects",
  },
  {
    patterns: [/flutter\s*(projects|work|experience)/i, /projects? (built with|using|in) flutter/i, /what flutter/i],
    response:
      "Abdul Haseeb primarily works with React Native for mobile development rather than Flutter. His expertise is in the JavaScript/TypeScript ecosystem, so React Native is his preferred mobile framework.\n\n**Mobile Projects (React Native):**\n• **Mobile Fitness App** — Cross-platform fitness tracking app\n• **Social Media App** — Social networking mobile application\n• **E-commerce Mobile App** — Shopping app with payment integration\n\nHe has 3 years of experience with React Native at an Intermediate level and continues to explore the mobile development space.",
    category: "projects",
  },
  {
    patterns: [
      /next\.?(js)?\s*(projects|work|experience)/i,
      /projects? (built with|using|in) next/i,
      /what next/i,
    ],
    response:
      "Next.js is one of Abdul Haseeb's core technologies! He has 4 years of Advanced-level experience.\n\n**Next.js Projects:**\n• **Portfolio Platform** (this very site!) — Built with Next.js 16, TypeScript, Tailwind CSS, and Prisma\n• **E-commerce Dashboard** — Full-stack dashboard with authentication and database integration\n• **Blog Platform** — Content management with markdown support and SEO optimization\n• **SaaS Application** — Multi-tenant software-as-a-service platform\n\nHe uses Next.js for SSR, SSG, API routes, and full-stack development. Check the Projects page for more details!",
    category: "projects",
  },
  {
    patterns: [
      /projects?|portfolio|what (has|did) .* (built|create|made|develop)/i,
      /show (me )?(your )?projects/i,
      /what projects/i,
    ],
    response:
      "Abdul Haseeb has completed 50+ projects across various domains! Here are some highlights:\n\n**Web Development:** Portfolio Platform, E-commerce Dashboard, Real-time Chat App, Task Management System, SaaS Application, Content Management System\n\n**Mobile Apps:** Mobile Fitness App, Social Media App, E-commerce Mobile App\n\n**Backend/API:** REST API Gateway, Authentication Service, Payment Processing API, ML Prediction API, GraphQL API Gateway\n\n**DevOps/Infrastructure:** CI/CD Pipeline, Cloud Infrastructure, Microservices Deployment\n\n**Featured projects include:**\n• A full-stack **Portfolio Platform** with blog, CMS, and analytics\n• An **E-commerce Dashboard** with real-time inventory management\n• A **Real-time Chat App** with WebSocket support\n\nVisit the Projects page for detailed case studies!",
    category: "projects",
  },
  {
    patterns: [
      /node\.?(js)?\s*(projects|work|experience)/i,
      /backend\s*(projects|work|experience|tech|technology)/i,
    ],
    response:
      "Abdul Haseeb has strong backend development skills with 5 years of Node.js experience (Advanced).\n\n**Backend Projects:**\n• REST API Gateway — Scalable API infrastructure\n• Real-time Chat Server — WebSocket-based messaging\n• Authentication Service — JWT & OAuth implementation\n• File Processing API — Upload, process, and serve files\n• Payment Processing API — Stripe integration\n\n**Backend Technologies:** Node.js, Express.js, Python, FastAPI, Django, GraphQL, REST APIs, Prisma, PostgreSQL, MongoDB\n\nHe's built everything from simple REST APIs to complex microservice architectures!",
    category: "projects",
  },
  {
    patterns: [
      /experience|work (history|background)|career|background|professional/i,
      /how many years/i,
      /how long/i,
      /years of experience/i,
    ],
    response:
      "Abdul Haseeb is a Full Stack Developer with 6+ years of professional experience in the tech industry.\n\n**Experience Breakdown:**\n• **Full Stack Development:** 6+ years\n• **JavaScript:** 6 years (Expert)\n• **Python:** 5 years (Advanced)\n• **React:** 5 years (Expert)\n• **Node.js:** 5 years (Advanced)\n• **Next.js:** 4 years (Advanced)\n• **TypeScript:** 4 years (Advanced)\n• **Tailwind CSS:** 4 years (Expert)\n• **Mobile Development:** 3 years (React Native)\n• **Cloud/AWS:** 3 years\n• **AI/ML:** 2 years\n\nHe has worked on 50+ projects, served 20+ happy clients, and continues to expand his expertise across full-stack development, mobile apps, cloud infrastructure, and AI/ML. Check the About page for the full career timeline!",
    category: "experience",
  },
  {
    patterns: [
      /services?|what (do|can) you offer|what (do|can) (he|you) do/i,
      /hire|consult|contract|freelance/i,
      /how much/i,
      /pricing|price|cost|rate/i,
    ],
    response:
      "Abdul Haseeb offers a range of professional services through his agency:\n\n**1. Web Development** — Starting from $500\nFull-stack web apps using Next.js, React, Node.js, and modern frameworks. Includes responsive design, SPA/SSR, API development, and performance optimization.\n\n**2. Mobile Development** — Starting from $800\nCross-platform mobile apps using React Native and Expo. Works on both iOS and Android with push notifications and offline support.\n\n**3. UI/UX Design** — Starting from $300\nUser-centered design solutions including wireframing, prototyping, design systems, and user research.\n\n**4. Cloud Solutions** — Starting from $400\nScalable cloud infrastructure on AWS/GCP/Azure with CI/CD pipelines, containerization (Docker), and monitoring.\n\n**5. Consulting** — Starting from $200/hr\nTechnical consulting for architecture design, code reviews, tech stack planning, and best practices.\n\n**6. AI & Automation** — Starting from $600\nIntelligent automation solutions including chatbots, process automation, data analysis, and ML models.\n\n👉 Want to get started? Visit the Services page or use the Contact form to discuss your project!",
    category: "services",
  },
  {
    patterns: [/contact|reach|email|message|get in touch/i, /how (do|can) (i|someone) (reach|contact|hire)/i],
    response:
      "You can reach Abdul Haseeb through multiple channels:\n\n📧 **Email:** anas@example.com\n💬 **WhatsApp:** Click the WhatsApp link on the Contact page\n🔗 **LinkedIn:** Connect on LinkedIn\n🐙 **GitHub:** Follow on GitHub\n\nFor quick inquiries, the contact form on the website is the best option. He typically responds within 24 hours.\n\nYou can also book a consultation through the Services page if you're looking for professional collaboration!",
    category: "contact",
  },
  {
    patterns: [
      /k(&|and)h tech sol|agency|k&h|kh tech/i,
      /what is (k&h|k and h)/i,
      /tell me about (the )?agency/i,
    ],
    response:
      "**K&H Tech Sol** is Abdul Haseeb's tech agency that provides end-to-end digital solutions. The agency specializes in:\n\n• **Web Development** — Full-stack applications, landing pages, and web platforms\n• **Mobile App Development** — Cross-platform iOS & Android apps\n• **UI/UX Design** — Modern, user-friendly interfaces\n• **Cloud Infrastructure** — Scalable deployments and DevOps\n• **Technical Consulting** — Architecture, code reviews, and strategy\n\nK&H Tech Sol focuses on delivering premium, high-quality solutions using cutting-edge technologies like Next.js, React, TypeScript, and Node.js. The agency follows a client-centric approach with transparent communication and agile development methodologies.\n\nVisit the Agency page to learn more about the team, services, process, and portfolio!",
    category: "agency",
  },
  {
    patterns: [
      /blog|articles|writing|content/i,
      /what (does .* )?(write|blog) (about|on)/i,
    ],
    response:
      "Abdul Haseeb maintains a blog where he shares knowledge and insights on:\n\n• **Web Development** — Tutorials, best practices, and modern techniques\n• **Next.js & React** — Deep dives into framework features\n• **TypeScript** — Tips, patterns, and advanced usage\n• **Career & Learning** — Advice for developers at all levels\n• **Tech Reviews** — Opinions on tools, libraries, and technologies\n\nCheck the Blog page for the latest articles and tutorials!",
    category: "blog",
  },
  {
    patterns: [
      /learning|learn|study|course|certification|education/i,
      /what (is he|are you) learning/i,
      /currently learning/i,
    ],
    response:
      "Abdul Haseeb is a lifelong learner! Here's his current learning journey:\n\n**Currently Learning:**\n• **Kubernetes** — Container orchestration and cluster management\n• **PyTorch** — Deep learning and neural networks\n• **Solidity** — Smart contract development for blockchain\n• **Advanced Next.js Patterns** — Server Components, caching strategies\n\n**Completed Certifications:**\n• JavaScript Algorithms and Data Structures — freeCodeCamp\n• React - The Complete Guide — Udemy\n• Next.js 14 & React — Academind\n• Python for Everybody — Coursera\n• MongoDB University M001 — MongoDB\n• AWS Cloud Practitioner — Amazon\n• TensorFlow Developer Certificate — Google\n• PostgreSQL Bootcamp — Udemy\n• Docker Essentials — IBM\n• Google Analytics Certification — Google\n• React Native - The Practical Guide — Udemy\n• Project Management Professional (PMP) — PMI\n\nVisit the Learning page for a complete roadmap!",
    category: "learning",
  },
  {
    patterns: [
      /achievements?|awards?|milestones?|recognition/i,
      /what has .* (achieved|accomplished)/i,
      /notable/i,
    ],
    response:
      "Abdul Haseeb has several notable achievements and certifications:\n\n**Certifications:**\n• **AWS Cloud Practitioner** — Amazon Web Services\n• **TensorFlow Developer Certificate** — Google\n• **JavaScript Algorithms and Data Structures** — freeCodeCamp\n• **React - The Complete Guide** — Udemy\n• **Next.js 14 & React** — Academind\n• **Python for Everybody** — Coursera\n• **MongoDB University M001** — MongoDB\n• **PostgreSQL Bootcamp** — Udemy\n• **Docker Essentials** — IBM\n• **Google Analytics Certification** — Google\n• **Project Management Professional (PMP)** — PMI\n• **React Native - The Practical Guide** — Udemy\n**React (5 yrs, Expert)** — The core of his frontend arsenal\n**Next.js (4 yrs, Advanced)** — Full-stack React framework\n**Node.js (5 yrs, Advanced)** — Server-side JavaScript runtime\n\n**Stats:**\n• 50+ projects completed\n• 30+ technologies mastered\n• 6+ years of experience\n• 20+ happy clients\n\nVisit the Achievements page for a complete list!",
    category: "achievements",
  },
  {
    patterns: [/certifications?|certificates?|credentials?/i, /what .* certified/i],
    response:
      "Abdul Haseeb holds several professional certifications:\n\n• **AWS Cloud Practitioner** — Amazon Web Services\n• **TensorFlow Developer Certificate** — Google\n• **JavaScript Algorithms and Data Structures** — freeCodeCamp\n• **React - The Complete Guide** — Udemy\n• **Next.js 14 & React** — Academind\n• **Python for Everybody** — Coursera\n• **MongoDB University M001** — MongoDB\n• **PostgreSQL Bootcamp** — Udemy\n• **Docker Essentials** — IBM\n• **Google Analytics Certification** — Google\n• **Project Management Professional (PMP)** — PMI\n• **React Native - The Practical Guide** — Udemy\n\nHis certifications span cloud computing, AI/ML, web development, databases, and project management. Check the Achievements page for more details!",
    category: "achievements",
  },
  {
    patterns: [
      /about|who is|tell me about|introduce|bio|biography/i,
      /what is .* (background|story)/i,
    ],
    response:
      "Abdul Haseeb is a passionate Full Stack Developer & Tech Innovator with 6+ years of experience building modern web and mobile applications.\n\nHe specializes in **Next.js, React, TypeScript, and Node.js**, and has delivered 50+ projects for 20+ clients worldwide.\n\n**What drives him:** Building innovative solutions to complex problems using cutting-edge technologies. He's equally comfortable with frontend aesthetics, backend architecture, cloud infrastructure, and exploring AI/ML.\n\n**Beyond coding:** He runs **K&H Tech Sol**, an agency offering end-to-end digital solutions, and regularly shares his knowledge through his blog.\n\nVisit the About page for the complete story, career timeline, and future goals!",
    category: "about",
  },
  {
    patterns: [
      /resume|resume|cv/i,
      /download resume/i,
      /view resume/i,
    ],
    response:
      "You can view or download Abdul Haseeb's resume through the website. Check the About page or use the Contact form to request a copy. You can also connect with him on LinkedIn for professional details!",
    category: "general",
  },
  {
    patterns: [
      /open source|opensource|github|contribution|oss/i,
      /what open source/i,
    ],
    response:
      "Abdul Haseeb is active in the open source community. You can find his work on GitHub where he contributes to:\n\n• Various JavaScript/TypeScript projects\n• React and Next.js libraries\n• Open source tools he uses in his workflow\n\nHe believes in giving back to the community and regularly publishes code snippets and libraries. Check the Open Source page or his GitHub profile to see his contributions!",
    category: "general",
  },
  {
    patterns: [
      /case stud(y|ies)/i,
      /client (work|project|case)/i,
      /real (world|project)/i,
    ],
    response:
      "Abdul Haseeb has several detailed case studies showcasing real-world projects:\n\nEach case study covers:\n• **The Challenge** — What problem needed solving\n• **The Approach** — How the solution was designed\n• **The Solution** — What was built and delivered\n• **The Results** — Measurable outcomes and metrics\n\nVisit the Case Studies page for in-depth looks at client projects, complete with metrics and client testimonials!",
    category: "general",
  },
  {
    patterns: [
      /startup|idea|business/i,
      /what startup/i,
    ],
    response:
      "Abdul Haseeb has several startup ideas in various stages of development. He's passionate about:\n\n• **SaaS Products** — Solving real problems with software\n• **Developer Tools** — Making developers more productive\n• **EdTech** — Technology-enabled learning platforms\n• **HealthTech** — Digital health solutions\n\nVisit the Startup Ideas page to see what he's working on and thinking about!",
    category: "general",
  },
  {
    patterns: [
      /thank(s| you)/i,
      /thanks/i,
      /appreciate/i,
    ],
    response:
      "You're very welcome! 😊 I'm glad I could help. If you have any more questions about Abdul Haseeb's work, skills, or services, feel free to ask. Have a great day!",
    category: "greeting",
  },
  {
    patterns: [/bye|goodbye|see you|talk later/i],
    response:
      "Goodbye! 👋 Thanks for chatting with me about Abdul Haseeb. Feel free to come back anytime if you have more questions. Have a great day!",
    category: "greeting",
  },
]

export const suggestions: Suggestion[] = [
  { label: "What skills does Abdul have?", query: "What skills does Abdul Haseeb have?", category: "skills" },
  { label: "Show React projects", query: "Show React projects", category: "projects" },
  { label: "How to hire him?", query: "How can I hire him?", category: "services" },
  { label: "What services do you offer?", query: "What services do you offer?", category: "services" },
  { label: "Years of experience?", query: "How many years of experience?", category: "experience" },
  { label: "What is K&H Tech Sol?", query: "What is K&H Tech Sol?", category: "agency" },
  { label: "Show certifications", query: "Show me your certifications", category: "achievements" },
  { label: "Tell me about yourself", query: "Tell me about Abdul Haseeb", category: "about" },
]

export function getResponse(message: string): string {
  const trimmed = message.trim()

  for (const entry of knowledgeBase) {
    for (const pattern of entry.patterns) {
      if (pattern.test(trimmed)) {
        return entry.response
      }
    }
  }

  return (
    "I'm not sure I understood that question. 🤔 Here are some things you can ask me about:\n\n" +
    "• **Skills** — What technologies does Abdul work with?\n" +
    "• **Projects** — Show React projects, Flutter projects, or all projects\n" +
    "• **Experience** — Years of experience, career background\n" +
    "• **Services** — Web development, consulting, pricing\n" +
    "• **Agency** — What is K&H Tech Sol?\n" +
    "• **Contact** — How to reach or hire him\n" +
    "• **Achievements** — Certifications, awards\n" +
    "• **Learning** — Current learning journey\n\n" +
    "Or just pick a suggestion below! 👇"
  )
}
