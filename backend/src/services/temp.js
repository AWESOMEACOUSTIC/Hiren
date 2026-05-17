const resume = `Aditya Kumar Panigrahy  
Email: adityapanigrahy98@gmail.com  
GitHub: github.com/AWESOMEACOUSTIC  
Mobile: (+91) 8457960757  
LeetCode: leetcode.com/Aditya  
LinkedIn: linkedin.com/in/aditya-kumar-panigrahy-5138091a5  

Education  
- Vellore Institute of Technology, Vellore, Tamil Nadu  
  Computer Science and Engineering with Specialization in Internet of Things  
  CGPA: 8.48  
  Sept 2022 - May 2026  

- D.A.V. Public School, Brahmapur, Odisha  
  Higher Education in Computer Science  
  Percentage: 87.4%  
  March 2019 - May 2021  

Skills Summary  
- Languages: Java, JavaScript, OOP, SQL, Python, TypeScript  
- Frameworks: Node.js, React.js, Next.js, Express.js, Tailwind CSS, shadcn/ui  
- Tools / Databases: Git, Neon, MySQL, SQLite, MongoDB, SQL Server, Redis, MongoDB Atlas, Pinecone  
- Platforms: Web, Windows, Arduino, Raspberry Pi, AWS, Modal, Firebase, Supabase, Clerk, Vercel, Kuberns  
- AI Engineering & LLM Architecture: Gemini 1.5 Pro/Flash, GPT-4o, Qwen2.5-7B-Instruct, stabilityai/sdxl-turbo, Langchain  

Experience  
- Kuberns (Remote)  
  UI/UX Intern  
  Nov 2024 - April 2025  
  - Redesigned IA flows and multi-step onboarding using usability testing, pain-point mapping, and iterative feedback loops, introducing interactive UX improvements. This reduced task time by 25% and drove +24% organic growth, higher retention, and stronger product adoption.  

- NAPX (Remote)  
  UI/UX Intern  
  June 2024 - July 2024  
  - Drove organic growth through SEO-focused content, performance optimization, and conversion-led UX improvements, while building a high-conversion e-commerce platform UI using React + Tailwind. This resulted in +40% traffic growth, faster client acquisition, and improved checkout conversions.  

Projects  
- PDF Chat  
  Tech Stack: Next.js, Tailwind CSS, shadcn/ui, MongoDB, LangChain, OpenAI, Pinecone, Clerk  
  - A full-stack PDF assistant using anthropic level chunking, hybrid retrieval (dense + sparse embeddings), and threshold-based reranking to enable accurate conversational search over large documents.  
  - Optimized retrieval pipeline with LangChain and Pinecone by tuning chunk granularity and implementing rerank filtering, reducing query latency by 50% while improving contextual relevance of responses.  

- Swara  
  Tech Stack: Python, Next.js, Neon, Modal, AWS, Polar, Inngest, TypeScript, ACE-Step, Qwen  
  - A multimodal AI platform combining LLMs and diffusion models, leveraged query refinement to convert raw user prompts into high-quality structured inputs, for accurate end-to-end song generation.  
  - A production-grade backend architecture with async queues, serverless GPU inference, and cloud storage, ensuring efficient resource utilization and scalable performance.  

- SpiroStrap  
  Tech Stack: React.js, Express.js, Node.js, MongoDB, Redux, Recharts, Dexie, Web Bluetooth, Arduino  
  - A real-time breathing analytics system that processes high-frequency sensor data, classifies anomalies using window-based scoring, and visualizes live respiratory patterns with session playback and exports.  
  - A high-performance data pipeline for continuous sensor streams, integrating local and server persistence while optimizing rendering, storage, and scalability for real-time health monitoring.  

Research & Publications  
- Scalable Ingestion Framework for Large Scale Time Series Data in RAG Systems  
  - Applied hierarchical temporal memory, correlation-aware compression, and dynamic context allocation to selectively retain high-signal patterns from time-series data, achieving 0.92 AUROC with 3× higher ingestion throughput and 56% lower latency.  

- A Security Engineering Framework for H2A-PQC Integration in Heterogeneous IoT Environments  
  - Applied hierarchical cryptography, KEM-based authentication and Merkle tree–based signature aggregation to eliminate PQC signature bottlenecks, achieving 99.1% bandwidth reduction and 78% energy savings & enabled scalable, quantum-resilient security for large-scale heterogeneous IoT systems.  

Awards and Achievements  
- Won HackBattle, DEVSOC & Design Odyssey by leading teams through the complete product cycle, problem framing, MVP build, live demo, pitching and delivering stable prototypes within 48–72h hackathon windows.  
- Led Assignofast’s design, now serving 200+ users, delivered discovery to v1 with user research, IA/flows, and a tokenized design system.  
- Earned the MongoDB Associate Database Administrator Certification, demonstrating proficiency in database management, indexing, and performance optimization.`

const jobDescription = `Software Engineer - Full Stack (AI Platform)

About the role
We are looking for a full stack engineer to build product features across the web app, APIs, and data layer. You will work with modern JavaScript/TypeScript, React, Node.js, and cloud services to ship reliable, scalable features. Experience with AI workflows and RAG pipelines is a plus.

Responsibilities
- Build responsive UI and reusable components with React and Tailwind CSS.
- Design and implement REST APIs using Node.js and Express.
- Integrate third-party services (auth, storage, analytics).
- Optimize performance and improve reliability in production.
- Collaborate with design and product to deliver polished UX.
- Write clean, tested, and well-documented code.

Requirements
- 1+ years of experience in full stack development.
- Strong JavaScript/TypeScript fundamentals.
- Hands-on experience with React and Node.js.
- Working knowledge of SQL or NoSQL databases.
- Familiarity with Git, CI/CD, and cloud deployment.

Nice to have
- Experience with LLMs, vector databases, or RAG systems.
- Knowledge of Next.js, serverless, or GPU inference.

Location
Remote or hybrid. Full-time.`

const selfDescription = `I am a full stack engineer with a strong focus on building polished, user-friendly products. 
I enjoy working end-to-end from UI to backend services, with a special interest in AI-powered 
features and scalable data pipelines.

I bring hands-on experience with React, Node.js, TypeScript, and cloud services. 
I value clean architecture, measurable performance improvements, and clear communication with 
cross-functional teams.

I am looking to contribute to a fast-moving team where I can ship impactful features, learn 
continuously, and help build reliable systems that users love.`


module.exports = {
    resume,
    jobDescription,
    selfDescription
}