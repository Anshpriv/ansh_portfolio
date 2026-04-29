export const navItems = [
  { name: "About", link: "#about" },
  { name: "Skills", link: "#skills" },
  { name: "Projects", link: "#projects" },
  { name: "Certificates", link: "#certificates" },
  { name: "Contact", link: "#contact" },
] as const;

export const gridItems = [
  {
    id: 1,
    title: "About Me",
    description: "I am a dedicated student at MIT World Peace University, pursuing a career in Artificial Intelligence and Data Science. My academic journey is driven by a fascination for how data can be transformed into intelligent action and meaningful insights. Beyond the classroom, I am a passionate creator, constantly building projects that challenge me and expand my skill set.",
    title2: "Education",
    description2: "2022 - Present   MIT World Peace University, Pune",
    description3: "                  AI & Data Science",
    className: "lg:col-span-3 md:col-span-3 md:row-span-1",
    imgClassName: "w-full h-full",
    titleClassName: "justify-end",
    img: "/grid.svg",
    spareImg: "",
  },
  {
    id: 4,
    title: "Technical Skills",
    description: "",
    className: "lg:col-span-2 md:col-span-3 md:row-span-1",
    imgClassName: "",
    titleClassName: "justify-start",
    img: "/grid.svg",
    spareImg: "",
  },
] as const;

export const projects = [
  {
    id: 1,
    title: "Capstone Registration Portal",
    des: "A full-stack web application to automate the capstone project registration process, featuring multi-role dashboards and an AI-powered idea similarity checker.",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg"],
    link: "https://mitcapstoneregistration.netlify.app/",
    sourceCode: "",
  },
  {
    id: 2,
    title: "FANET-based Drone Communication (SIH 2025)",
    des: "A FANET-based communication platform for drones, enabling real-time data exchange and coordination in swarm operations.",
    img: "/p2.svg",
    iconLists: ["/re.svg", "/ts.svg"],
    link: "https://neuromesh.onrender.com/",
    sourceCode: "",
  },
  {
    id: 3,
    title: "Blockchain Blue Carbon Registry (SIH 2025)",
    des: "A blockchain-based system for tracking and verifying blue carbon credits, ensuring transparency in carbon offset projects.",
    img: "/p3.svg",
    iconLists: ["/ts.svg", "/brandtypescript.svg"],
    link: "https://sih2k25.netlify.app/",
    sourceCode: "",
  },
  {
    id: 4,
    title: "Student Attendance Tracker",
    des: "A web application for teachers to mark student attendance, create classes, add students, and track attendance with Supabase backend.",
    img: "/p4.svg",
    iconLists: ["/re.svg"],
    link: "https://attendancestraker.onrender.com",
    sourceCode: "",
  },
  {
    id: 5,
    title: "Helmet-Based Accident Detection System",
    des: "A smart helmet equipped with sensors to detect accidents and hazardous conditions, sending real-time alerts to emergency contacts.",
    img: "/p1.svg",
    iconLists: ["/re.svg"],
    link: "https://neuroguard.netlify.app/",
    sourceCode: "",
  },
  {
    id: 6,
    title: "Kisan Setu – Crop Recommendation",
    des: "A Streamlit decision support system for farmers, recommending suitable crops based on environmental and soil parameters using Machine Learning.",
    img: "/p2.svg",
    iconLists: ["/re.svg"],
    link: "https://kisaan-setu-1.onrender.com/",
    sourceCode: "",
  },
  {
    id: 7,
    title: "English to SQL Converter (NLP)",
    des: "A web application that leverages Natural Language Processing to translate user-inputted English queries into SQL commands.",
    img: "/p3.svg",
    iconLists: ["/re.svg", "/ts.svg"],
    link: "https://english-to-sql-pbl2.onrender.com",
    sourceCode: "",
  },
  {
    id: 8,
    title: "CyberPulse – Anomaly Detection",
    des: "A web application that uses your own transaction data to find anomalies using machine learning algorithms.",
    img: "/p4.svg",
    iconLists: ["/ts.svg", "/tail.svg"],
    link: "https://cyberpluse.netlify.app/",
    sourceCode: "",
  },
  {
    id: 9,
    title: "PopSpin Cinema – Movie Picker",
    des: "Movie Picker makes movie nights easy—just spin and instantly get a random film suggestion from a curated list.",
    img: "/p1.svg",
    iconLists: ["/re.svg", "/tail.svg"],
    link: "https://pop-spin-cinema.netlify.app/",
    sourceCode: "",
  },
  {
    id: 10,
    title: "BrandLifts – Digital Marketing Platform",
    des: "An online platform for professionals and agencies looking to provide digital marketing services, featuring service showcases, client onboarding, and lead generation.",
    img: "/p2.svg",
    iconLists: ["/re.svg", "/tail.svg", "/ts.svg"],
    link: "https://brandlifts.netlify.app",
    sourceCode: "",
  },
] as const;

export const testimonials = [] as const;

export const companies = [
  { id: 1, name: "Python", img: "/re.svg", nameImg: "/appName.svg" },
  { id: 2, name: "JavaScript", img: "/ts.svg", nameImg: "/cloudName.svg" },
  { id: 3, name: "SQL", img: "/mysql.svg", nameImg: "/hostName.svg" },
  { id: 4, name: "Node.js", img: "/nextjs.svg", nameImg: "/streamName.svg" },
  { id: 5, name: "TypeScript", img: "/brandtypescript.svg", nameImg: "/dockerName.svg" },
  { id: 6, name: "Java", img: "/java.svg", nameImg: "/dockerName.svg" },
  { id: 7, name: "React", img: "/re.svg", nameImg: "/dockerName.svg" },
  { id: 8, name: "TailwindCSS", img: "/tail.svg", nameImg: "/dockerName.svg" },
] as const;

export const socialMedia = [
  {
    name: "LinkedIn",
    img: "/link.svg",
    link: "https://www.linkedin.com/in/ansh-thakare-053783359",
  },
  {
    name: "Instagram",
    img: "/insta.svg",
    link: "https://www.instagram.com/ash.thakare_22",
  },
] as const;

export const techStack = {
  stack1: ["Python", "JavaScript", "TypeScript"],
  stack2: ["SQL", "Node.js", "React"],
} as const;

export const skills = [
  { name: "Python", icon: "🐍" },
  { name: "Java", icon: "☕" },
  { name: "JavaScript", icon: "🌐" },
  { name: "HTML5", icon: "🏗️" },
  { name: "CSS3", icon: "🎨" },
  { name: "SQL", icon: "🗄️" },
  { name: "Node.js", icon: "🟢" },
] as const;

export const certificates = [
  { name: "Power BI for Beginners", issuer: "Microsoft & Simplilearn", path: "/ansh/POWER_BI.png" },
  { name: "SIH 2025 Internal Hackathon", issuer: "MIT-WPU", path: "/ansh/SIH_2k25.jpg" },
  { name: "Social Media Internship", issuer: "People Conexxions", path: "/ansh/Ansh_internship.png" },
  { name: "SIH 2023 Internal Nomination", issuer: "MIT-WPU", path: "/ansh/Ansh_sih_2023.png" },
  { name: "Basketball Committee Member", issuer: "MIT-WPU Polytechnic", path: "/ansh/commite_basketball.jpg" },
  { name: "FLAME Football Champions League", issuer: "FLAME University", path: "/ansh/flames_basketball_win.jpg" },
  { name: "Inter-Department Basketball Runner Up", issuer: "MIT-WPU Polytechnic", path: "/ansh/Inter_depts_runnerUp.jpg" },
  { name: "Reliance Foundation Jr. NBA", issuer: "Jr. NBA", path: "/ansh/junior_nba.jpg" },
  { name: "Inter-Department Basketball Referee", issuer: "MIT-WPU Polytechnic", path: "/ansh/mit_interdepts_refering.jpg" },
  { name: "Commando Training Program", issuer: "Dhruv Defence Motivation Center", path: "/ansh/self_defence_training.jpg" },
  { name: "DAV National Sports", issuer: "DAV College Managing Committee", path: "/ansh/basketball_national.jpg" },
  { name: "Java Course Mastering The Fundamentals", issuer: "Scaler-Topics", path: "/ansh/Ansh thakare java Certificate.jpg" },
] as const;

export const aboutContent = {
  education: {
    title: "Education",
    description1: "My foundational years were spent at <strong>D.A.V. Public School, Aundh, Pune.</strong> This is where my academic and personal growth began — from Junior KG all the way to 10th standard.",
    description2: "The school provided a strong base in academics and extracurricular activities, which played a huge role in shaping who I am today.",
    iconText: "D.A.V. Public School",
    iconSubtext: "Jr. KG to 10th Standard",
  },
  interest: {
    title: "My Interest in AI",
    description1: "At D.A.V. Public School, we had the unique opportunity to study Artificial Intelligence as a subject right from the 8th standard.",
    description2: "This early exposure sparked a genuine passion. I was fascinated by how we could teach machines to learn and make decisions — what started as a school subject grew into my career path.",
    iconText: "Early Spark",
    iconSubtext: "Passion for Innovation",
  },
} as const;

