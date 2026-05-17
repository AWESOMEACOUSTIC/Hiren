const example = {
  match_score: 92,
  technical_questions: [
    {
      question: `Can you describe a challenging UI performance issue you faced in a React or Next.js application and how you approached optimizing it, especially considering real-time data or complex interactions like in your SpiroStrap project?`,
      intention: `To assess practical experience with React/Next.js performance optimization, problem-solving methodologies, and understanding of tools and techniques for improving user experience with high-frequency data.`,
      ideal_answer: `I would describe a scenario, for example, optimizing a large dashboard with multiple charts displaying real-time sensor data from SpiroStrap. The initial challenge was excessive re-renders and slow updates. My approach involved using React.memo for component memoization to prevent unnecessary re-renders, optimizing data structures to minimize prop changes, and implementing virtualization libraries (e.g., react-window) for large lists or tables. For real-time updates, I debounced/throttled event handlers and used efficient state management (e.g., Redux for global state, React Context for local sub-trees) to minimize re-rendering scope. I leveraged React Dev Tools Profiler to identify bottlenecks and ensure targeted optimizations, which led to a significant improvement in perceived performance and responsiveness.`,
    },
    {
      question: `In your PDF Chat project, you mentioned implementing hybrid retrieval (dense + sparse embeddings) and threshold-based reranking. Could you elaborate on why hybrid retrieval is particularly effective compared to a single retrieval method, and how the threshold-based reranking mechanism specifically improves both the relevance and latency of responses from the LLM?`,
      intention: `To evaluate deep understanding of RAG pipeline components, their individual strengths and weaknesses, and the practical application of advanced optimization techniques for AI-powered features.`,
      ideal_answer: `Hybrid retrieval is crucial because dense vector search (like with Pinecone) excels at semantic similarity but can miss exact keyword matches, while sparse methods (like BM25) are great for keyword relevance but lack semantic understanding. Combining them (e.g., reciprocal rank fusion) leverages both strengths, providing a more comprehensive and robust initial set of relevant chunks. Threshold-based reranking then takes this combined set and applies a stricter relevance filter (e.g., using a smaller, highly optimized cross-encoder model like BGE-reranker or Cohere Rerank). By filtering out less relevant documents at this stage, we significantly reduce the context window size for the final, larger LLM, which directly improves latency and ensures the LLM focuses only on the most pertinent information, leading to higher quality and more accurate responses.`,
    },
    {
      question: `Your Swara project utilized 'serverless GPU inference' and 'production-grade backend architecture with async queues.' Can you walk through the architectural design choices you made to achieve scalable and efficient performance for a multimodal AI platform, specifically how you managed the interaction between LLMs, diffusion models, and the backend services?`,
      intention: `To assess the candidate's understanding of scalable backend architectures for AI workloads, including asynchronous processing, resource management, and deployment strategies for computationally intensive tasks.`,
      ideal_answer: `For Swara, the key was decoupling the request ingestion from the compute-heavy AI inference. User prompts would first hit an API gateway and be pushed into an asynchronous queue (e.g., using Inngest or a similar message queue service). This ensured the UI remained responsive and allowed the system to absorb traffic spikes. Separate worker services, specifically designed for serverless GPU inference (e.g., utilizing Modal as listed, or AWS Lambda with GPU support), would pick up tasks from the queue. These workers were optimized for specific models (LLMs for query refinement, diffusion models for generation) and scaled independently based on demand, ensuring efficient GPU utilization. Cloud storage (AWS S3) was used for intermediary assets and final outputs. This architecture provided high throughput, fault tolerance, and cost efficiency by only spinning up GPU resources when needed, while the async queues managed the overall workflow and ensured task completion even under varying load.`,
    },
    {
      question: `You've listed experience with a variety of databases, including SQL (MySQL, SQLite), NoSQL (MongoDB, Redis), and vector databases (Pinecone). In what specific scenarios would you choose a vector database like Pinecone over a traditional NoSQL database like MongoDB for an AI-centric application, and what are the main data modeling and operational considerations for integrating it into a full-stack system?`,
      intention: `To evaluate the candidate's ability to differentiate between database types, understand their specific use cases in AI contexts, and articulate the architectural implications and challenges of working with specialized databases.`,
      ideal_answer: `I would choose a vector database like Pinecone specifically for performing high-dimensional similarity searches, which is fundamental for RAG systems, semantic search, recommendation engines, or anomaly detection on embeddings. MongoDB, while flexible for document storage, is not optimized for vector similarity calculations at scale. When integrating Pinecone, data modeling involves generating and storing high-dimensional embeddings for each piece of content. Operational considerations include ensuring a robust embedding generation pipeline (e.g., using OpenAI, Cohere, or open-source models), managing data synchronization between the primary content store (which might be MongoDB or a traditional SQL DB) and Pinecone, updating embeddings when source content changes, handling vector index scaling, and monitoring Pinecone's performance and cost. For example, in PDF Chat, Pinecone was ideal for storing document chunk embeddings, allowing for fast and accurate semantic retrieval, while MongoDB could store metadata about the PDFs or user interactions.`,
    },
  ],
  behavioral_questions: [
    {
      question: `The job description emphasizes collaborating with design and product teams to deliver polished UX. In your UI/UX internships, you redesigned IA flows and drove conversion-led UX improvements. Can you describe a specific situation where you had to bridge a gap between technical feasibility and design aspirations, and how you communicated and negotiated a solution to satisfy both sides?`,
      intention: `To assess the candidate's collaboration skills, ability to communicate technical constraints to non-technical stakeholders, and problem-solving approach in cross-functional team settings.`,
      ideal_answer: `During my internship at Kuberns, we were redesigning a complex multi-step onboarding flow. The design team proposed an animation-heavy, highly interactive sequence that, while beautiful, posed significant performance challenges and development time given our timeline and current tech stack. I scheduled a meeting with the lead designer and product manager to present a simplified prototype that achieved 80% of the desired aesthetic and interaction, but was significantly more performant and feasible within the sprint. I explained the technical implications of the original design (e.g., increased load times, potential for jank on lower-end devices) and demonstrated how a slightly modified approach could still deliver a 'polished UX' without compromising performance. We collectively agreed on an iterative approach, implementing the simpler version first and planning for more advanced animations post-launch, which allowed us to meet our deadline and deliver a great user experience.`,
    },
    {
      question: `You've shown a strong interest in AI-powered features and scalable data pipelines through your projects. Describe a time you faced a significant technical hurdle or had to learn a completely new technology or concept rapidly to unblock a project, especially related to AI/ML or distributed systems. What was the challenge, how did you approach learning, and what was the outcome?`,
      intention: `To evaluate the candidate's intellectual curiosity, adaptability, self-learning capability, and resilience in tackling complex, unfamiliar technical challenges in fast-evolving domains like AI.`,
      ideal_answer: `In my PDF Chat project, a major challenge was optimizing the retrieval pipeline for large documents to achieve both contextual relevance and low query latency. Initially, I struggled with suboptimal chunking strategies and basic vector search, which led to irrelevant responses or slow query times. To overcome this, I had to dive deep into advanced RAG techniques, specifically learning about hybrid retrieval and reranking models. I spent a week intensely researching academic papers, LangChain documentation, and Pinecone best practices. I experimented with different chunking granularities, embedding models, and rerankers. Through iterative testing and tuning parameters, I successfully implemented hybrid retrieval combined with a threshold-based reranking mechanism. This reduced query latency by 50% while significantly improving the contextual relevance of responses, directly enabling the project to meet its performance goals. This experience taught me the importance of continuous learning and systematic experimentation when working with cutting-edge AI technologies.`,
    },
    {
      question: `Your resume highlights several impressive achievements from your internships and projects, such as reducing task time by 25% and driving +40% traffic growth. Can you describe a situation where you took full ownership of a feature or initiative from its conception to deployment, detailing your specific role in achieving the measurable impact, and what you learned from that experience about accountability and delivery?`,
      intention: `To assess the candidate's sense of ownership, initiative, ability to drive projects to completion, and understanding of how their work translates into tangible business or user impact.`,
      ideal_answer: `During my internship at NAPX, I took ownership of revamping the e-commerce platform's UI with a specific goal: increasing checkout conversions and organic traffic. From conception, I started by analyzing existing user flows and conversion funnels, identifying pain points through heuristic evaluation. I then designed and implemented the new UI using React and Tailwind, focusing on a cleaner aesthetic, clearer calls to action, and mobile responsiveness. Beyond just coding, I integrated SEO-focused content strategies directly into the UI components and optimized image loading and overall page performance. I collaborated closely with the marketing team to ensure content alignment. Upon deployment, we saw a +40% traffic growth due to improved SEO and faster page load times, and a significant improvement in checkout conversions through the optimized UX. This experience taught me that true ownership means not just coding, but understanding the end-to-end impact of my work, from user research and design to performance and business metrics, and being accountable for the final outcome.`,
    },
  ],
  skill_gaps: [
    {
      skill: `Formal 1+ years of full-time professional full-stack development experience`,
      severity: `medium`,
    },
    {
      skill: `In-depth experience with setting up and managing complex CI/CD pipelines`,
      severity: `low`,
    },
    {
      skill: `Hands-on experience with production monitoring and alerting tools (e.g., Prometheus, Grafana, Datadog)`,
      severity: `low`,
    },
  ],
  preparation_resources: [
    {
      resource: `System Design Interview Prep: Focus on designing scalable and reliable full-stack web applications, emphasizing architectural trade-offs and common patterns.`,
      day_number: 1,
    },
    {
      resource: `Advanced React Performance Patterns & Best Practices: Deep dive into memoization, virtualization, context API optimization, and using tools like React Dev Tools for profiling.`,
      day_number: 2,
    },
    {
      resource: `Practical CI/CD for Modern Web Apps: Hands-on tutorials for setting up and optimizing CI/CD pipelines using tools like Vercel deployments, GitHub Actions, or AWS CodePipeline.`,
      day_number: 3,
    },
    {
      resource: `Production Monitoring and Observability for Node.js Applications: Explore concepts of logging, metrics, tracing, and practical application with tools like AWS CloudWatch, Prometheus, and Grafana.`,
      day_number: 4,
    },
    {
      resource: `Optimizing RAG Pipelines with Advanced Techniques: Research and practice with hybrid search, advanced reranking strategies, prompt engineering for LLMs, and fine-tuning considerations for specific domains.`,
      day_number: 5,
    },
  ],
}

module.exports = example