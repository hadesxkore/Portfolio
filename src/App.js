import React, { useEffect, useState  } from 'react';
import { motion, AnimatePresence  } from 'framer-motion';
import kobieImage from './images/kobie.png';
import { Github, ExternalLink } from 'lucide-react';
import system1 from './images/System1.png';
import system2 from './images/System2.png';
import system3 from './images/System3.png';
import { X } from 'lucide-react';
import badge1 from './images/badge1.png';
import badge2 from './images/badge2.png';
import badge3 from './images/badge3.png';
import badge4 from './images/badge4.png';
import cert1 from './images/cert1.png';
import cert2 from './images/cert2.png';
import cert3 from './images/cert3.png';
import cert4 from './images/cert4.png';
import { db, addDoc, collection } from "./firebase";  // Importing Firebase methods

import { Mail, GithubIcon, LucideFacebook, LucideTwitter, InstagramIcon } from 'lucide-react';

// Add SkillCard component
const SkillCard = ({ title, skills }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow"
  >
    <h3 className="text-2xl font-semibold text-slate-800 mb-6">{title}</h3>
    <div className="space-y-4">
      {skills.map((skill, index) => (
        <div key={index} className="space-y-2">
          <div className="flex justify-between">
            <span className="text-slate-700">{skill.name}</span>
            <span className="text-slate-500">{skill.percentage}%</span>
          </div>
          <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.percentage}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              viewport={{ once: true }}
              className="h-full bg-blue-600 rounded-full"
            />
          </div>
        </div>
      ))}
    </div>
  </motion.div>
);

// Certificate Modal Component
const CertModal = ({ isOpen, onClose, certification }) => (
  <AnimatePresence>
    {isOpen && (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          className="bg-white rounded-xl p-6 max-w-4xl w-full relative"
          onClick={e => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-slate-500 hover:text-slate-700"
          >
            <X size={24} />
          </button>
          
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-slate-800">{certification.title}</h3>
            <img 
              src={certification.certImage} 
              alt={certification.title}
              className="w-full h-auto rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      </motion.div>
    )}
  </AnimatePresence>
);
const ProjectCard = ({ image, title, description, tools, githubLink, liveLink }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
  >
    {/* Project Image */}
    <div className="relative overflow-hidden group h-48">
      <img 
        src={image} 
        alt={title} 
        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
      />
      <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>

    {/* Content */}
    <div className="p-6 space-y-4">
      <h3 className="text-2xl font-semibold text-slate-800">{title}</h3>
      <p className="text-slate-600">{description}</p>

      {/* Tools Used */}
      <div className="space-y-2">
        <h4 className="text-sm font-semibold text-slate-700">Tools Used:</h4>
        <div className="flex flex-wrap gap-2">
          {tools.map((tool, index) => (
            <span 
              key={index}
              className="px-3 py-1 bg-blue-100 text-blue-600 rounded-full text-sm"
            >
              {tool}
            </span>
          ))}
        </div>
      </div>

      {/* Links */}
      <div className="flex gap-4 pt-4">
        <a
          href={githubLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
        >
          <Github size={20} />
          <span>Code</span>
        </a>
        <a
          href={liveLink}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
        >
          <ExternalLink size={20} />
          <span>Live Demo</span>
        </a>
      </div>
    </div>
  </motion.div>
);

// Certificate Card Component
const CertificationCard = ({ certification, onView }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5 }}
    viewport={{ once: true }}
    className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow"
  >
    <div className="space-y-4">
      {/* Badge Icon */}
      <div className="w-20 h-20 mx-auto">
        <img 
          src={certification.badge} 
          alt={certification.title} 
          className="w-full h-full object-contain"
        />
      </div>

      {/* Certificate Info */}
      <div className="text-center space-y-2">
        <h3 className="text-xl font-semibold text-slate-800">{certification.title}</h3>
        <p className="text-slate-600">{certification.company}</p>
        <p className="text-sm text-slate-500">Issued: {certification.issued}</p>
      </div>

      {/* View Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => onView(certification)}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
      >
        View Certificate
      </motion.button>
    </div>
  </motion.div>
);

const App = () => {
  // Add smooth scrolling effect
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [selectedCert, setSelectedCert] = useState(null);

  
  const NavLink = ({ href, children, mobile }) => (
    <a
      href={href}
      onClick={() => mobile && setIsMenuOpen(false)}
      className={`relative py-2 px-4 text-sm font-medium transition-all duration-300 hover:text-blue-600 
        ${activeSection === href.replace('#', '') ? 'text-blue-600' : 'text-gray-600'}
        ${mobile ? 'text-lg w-full text-center' : ''}
        group`}
    >
      {children}
      <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 transform origin-left transition-transform duration-300 
        ${activeSection === href.replace('#', '') ? 'scale-x-100' : 'scale-x-0'} 
        group-hover:scale-x-100`} 
      />
    </a>
  );
  
 // Handle scroll events
 useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
    
    // Get current section
    const sections = ['about', 'skills', 'projects', 'certifications', 'contact'];
    const current = sections.find(section => {
      const element = document.getElementById(section);
      if (element) {
        const rect = element.getBoundingClientRect();
        return rect.top <= 100 && rect.bottom >= 100;
      }
      return false;
    });
    
    setActiveSection(current || '');
  };

  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// State for form inputs
const [formData, setFormData] = useState({
  name: "",
  email: "",
  message: "",
});

const [loading, setLoading] = useState(false);
const [successMessage, setSuccessMessage] = useState("");
const [errorMessage, setErrorMessage] = useState("");

// Handle form input changes
const handleInputChange = (e) => {
  const { name, value } = e.target;
  setFormData({
    ...formData,
    [name]: value,
  });
};

// Handle form submission
const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSuccessMessage("");
  setErrorMessage("");

  try {
    // Add the form data to the Firestore 'contactMessages' collection
    await addDoc(collection(db, "contactMessages"), {
      ...formData,
      timestamp: new Date(),
    });

    setSuccessMessage("Your message has been sent!");
    setFormData({ name: "", email: "", message: "" }); // Reset the form fields
  } catch (error) {
    setErrorMessage("Error sending message. Please try again.");
  } finally {
    setLoading(false);
  }
};
  
  const socialLinks = {
    email: "mailto:kobievillanueva26@gmail.com",
    github: "https://github.com/hadesxkore254",
    facebook: "https://facebook.com/kobievillanueva",
    twitter: "https://twitter.com/kobievillanueva",
    instagram: "https://instagram.com/kobievillanueva"
  };
   // Sample certifications data
   const certificationsData = [
    {
      badge: badge1,
      certImage: cert1,
      title: "CyberSecurity",
      company: "Certiport",
      issued: "6/20/2023"
    },
    {
      badge: badge2,
      certImage: cert2,
      title: "Network Security",
      company: "Certiport",
      issued: "	5/28/2024"
    },
    {
      badge: badge3,
      certImage: cert3,
      title: "Networking",
      company: "Certiport",
      issued: "11/23/2024"
    },
    {
      badge: badge4,
      certImage: cert4,
      title: "Device Configuration",
      company: "Certiport",
      issued: "	12/7/2024"
    }
  ];

  useEffect(() => {

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        target?.scrollIntoView({
          behavior: 'smooth'
        });
      });
    });
  }, []);

  // Sample projects data
  const projectsData = [
    {
      image: system1,
      title: "Warehouse Rental Management System",
      description: "A comprehensive dashboard for managing online store operations with real-time analytics and inventory tracking.",
      tools: ["React", "Node.js", "Firebase", "TailwindCSS"],
      githubLink: "https://github.com/yourusername/project1",
      liveLink: "https://new-warehouse.vercel.app/"
    },
    {
      image: system2,
      title: "Student Faculty Evaluation System",
      description: "A collaborative task management platform with real-time updates and team collaboration features.",
      tools: ["React", "Firebase", "Material-UI", "Redux", "TailwindCSS"],
      githubLink: "https://github.com/yourusername/project2",
      liveLink: "https://grade-evaluation-alpha.vercel.app"
    },
    {
      image: system3,
      title: "Personal Task Management System",
      description: "An interactive platform for online education with course management and progress tracking.",
      tools: ["React", "Express", "PostgreSQL", "WebSocket"],
      githubLink: "https://github.com/yourusername/project3",
      liveLink: "https://project3-demo.com"
    }
  ];

  // Sample skills data
  const skillsData = {
    frontend: [
      { name: 'React.js', percentage: 85 },
      { name: 'HTML/CSS', percentage: 90 },
      { name: 'JavaScript', percentage: 85 },
      { name: 'Tailwind CSS', percentage: 80 },
      { name: 'TypeScript', percentage: 75 }
    ],
    backend: [
      { name: 'Node.js', percentage: 80 },
      { name: 'Python', percentage: 75 },
      { name: 'MySQL', percentage: 85 },
      { name: 'MongoDB', percentage: 75 },
      { name: 'RESTful APIs', percentage: 85 }
    ],
    tools: [
      { name: 'Git/GitHub', percentage: 90 },
      { name: 'VS Code', percentage: 95 },
      { name: 'Docker', percentage: 70 },
      { name: 'Postman', percentage: 85 },
      { name: 'Figma', percentage: 75 }
    ]
  };

  return (
    <div className="min-h-screen bg-slate-50">
    <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        className={`fixed w-full z-50 transition-all duration-300 
          ${scrolled ? 'py-4 bg-white/90 backdrop-blur-md shadow-lg' : 'py-6 bg-white/50 backdrop-blur-sm'}`}
      >
        <div className="max-w-6xl mx-auto px-6">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <motion.a
              href="#"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="relative group"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-400 bg-clip-text text-transparent">
                Kobie.dev
              </span>
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full" />
            </motion.a>

            {/* Desktop Navigation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="hidden md:flex items-center gap-2"
            >
              <NavLink href="#about">About</NavLink>
              <NavLink href="#skills">Skills</NavLink>
              <NavLink href="#projects">Projects</NavLink>
              <NavLink href="#certifications">Certifications</NavLink>
              <NavLink href="#contact">
                <span className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Contact
                </span>
              </NavLink>
            </motion.div>

            {/* Mobile Menu Button */}
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="w-6 h-6 relative">
                <span className={`absolute left-0 top-1/2 w-6 h-0.5 bg-gray-800 transform transition-all duration-300 
                  ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`} />
                <span className={`absolute left-0 top-1/2 w-6 h-0.5 bg-gray-800 transform transition-all duration-300 
                  ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
                <span className={`absolute left-0 top-1/2 w-6 h-0.5 bg-gray-800 transform transition-all duration-300 
                  ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`} />
              </div>
            </motion.button>
          </div>
        </div>
      </motion.nav>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-[72px] left-0 w-full bg-white/95 backdrop-blur-lg shadow-lg z-40 md:hidden"
          >
            <div className="flex flex-col items-center py-6 space-y-4">
              <NavLink href="#about" mobile>About</NavLink>
              <NavLink href="#skills" mobile>Skills</NavLink>
              <NavLink href="#projects" mobile>Projects</NavLink>
              <NavLink href="#certifications" mobile>Certifications</NavLink>
              <NavLink href="#contact" mobile>
                <span className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                  Contact
                </span>
              </NavLink>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-24 min-h-screen flex items-center">
        {/* Your existing hero section code... */}
        <div className="container mx-auto px-6 flex flex-col md:flex-row items-center gap-12">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 space-y-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold text-slate-800">
              Kobie Villanueva
            </h1>
            <h2 className="text-2xl md:text-3xl text-slate-600">
              Full Stack Web Developer | Certiport Certified
            </h2>
            <p className="text-xl text-slate-600">
              Crafting digital experiences with passion and precision
            </p>
            <div className="flex gap-4 pt-6">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-medium"
              >
                View Projects
              </motion.button>
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-6 py-3 border-2 border-blue-600 text-blue-600 rounded-lg font-medium"
              >
                Contact Me
              </motion.button>
            </div>
          </motion.div>

          {/* Right Content - Profile Picture */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="flex-1 flex justify-center"
          >
            <img 
              src={kobieImage}
              alt="Kobie Villanueva" 
              className="w-80 h-80 rounded-full object-cover shadow-xl"
            />
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-white">
        {/* Your existing about section code... */}
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto space-y-8"
          >
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-slate-800">About Me</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <h3 className="text-2xl font-semibold text-slate-800">
                  Passionate Developer & Problem Solver
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  With a deep passion for web development and a keen eye for detail, I specialize in creating seamless, user-centric digital experiences. My journey in technology began with a curiosity about how things work, which evolved into a career dedicated to building innovative solutions.
                </p>
                <p className="text-slate-600 leading-relaxed">
                  I combine technical expertise with creative problem-solving to deliver robust and scalable applications. Whether it's front-end development, back-end architecture, or full-stack solutions, I'm committed to writing clean, efficient code that makes a difference.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                viewport={{ once: true }}
                className="space-y-4 bg-slate-50 p-6 rounded-xl shadow-lg"
              >
                <h3 className="text-2xl font-semibold text-slate-800">
                  Quick Facts
                </h3>
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-slate-600">Full Stack Web Developer</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-slate-600">Certiport Certified Professional</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-slate-600">Problem-Solving Enthusiast</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-2 h-2 bg-blue-600 rounded-full"></span>
                    <span className="text-slate-600">Continuous Learner</span>
                  </li>
                </ul>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto space-y-12"
          >
            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-slate-800">My Skills</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
              <p className="text-slate-600 max-w-2xl mx-auto">
                A comprehensive overview of my technical expertise and proficiency levels
                in various technologies and tools.
              </p>
            </div>

            {/* Skills Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              <SkillCard title="Frontend Development" skills={skillsData.frontend} />
              <SkillCard title="Backend Development" skills={skillsData.backend} />
              <SkillCard title="Tools & Others" skills={skillsData.tools} />
            </div>
          </motion.div>
        </div>
      </section>

       {/* Projects Section */}
       <section id="projects" className="py-20 bg-white">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto space-y-12"
          >
            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-slate-800">My Projects</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Showcasing some of my recent work and projects that demonstrate my technical abilities and problem-solving skills.
              </p>
            </div>

            {/* Projects Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {projectsData.map((project, index) => (
                <ProjectCard key={index} {...project} />
              ))}
            </div>
          </motion.div>
        </div>
      </section>
        {/* Certifications Section */}
        <section id="certifications" className="py-20 bg-slate-50">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto space-y-12"
          >
            {/* Section Header */}
            <div className="text-center space-y-4">
              <h2 className="text-4xl font-bold text-slate-800">Certifications</h2>
              <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full"></div>
              <p className="text-slate-600 max-w-2xl mx-auto">
                Professional certifications and achievements that demonstrate my expertise and commitment to continuous learning.
              </p>
            </div>

            {/* Certifications Grid */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {certificationsData.map((cert, index) => (
                <CertificationCard 
                  key={index}
                  certification={cert}
                  onView={setSelectedCert}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <section className="py-24 bg-gradient-to-br from-white to-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-16">
          {/* Left Column - Social Links */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Let's Connect</h2>
              <p className="mt-4 text-gray-600">
                Have a project in mind? Let's talk about how we can work together.
              </p>
            </div>
            
            <div className="flex flex-col gap-6">
              {[
                { icon: Mail, label: 'Email', link: socialLinks.email },
                { icon: GithubIcon, label: 'GitHub', link: socialLinks.github },
                { icon: LucideFacebook, label: 'Facebook', link: socialLinks.facebook },
                { icon: LucideTwitter, label: 'Twitter', link: socialLinks.twitter },
                { icon: InstagramIcon, label: 'Instagram', link: socialLinks.instagram }
              ].map((social, index) => (
                <a 
                  key={index}
                  href={social.link}
                  className="flex items-center gap-4 group hover:translate-x-2 transition-transform duration-300"
                >
                  <div className="p-2 rounded-lg bg-gray-100 group-hover:bg-gray-200 transition-colors">
                    <social.icon className="w-5 h-5 text-gray-700" />
                  </div>
                  <span className="text-gray-600 group-hover:text-gray-900">{social.label}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Right Column - Contact Form */}
          <div className="relative">
            <div className="p-8 bg-white rounded-2xl shadow-sm border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="space-y-4">
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Name</span>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="Your name"
                      required
                    />
                  </label>
                  
                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Email</span>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      className="mt-1 block w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all"
                      placeholder="your.email@example.com"
                      required
                    />
                  </label>

                  <label className="block">
                    <span className="text-sm font-medium text-gray-700">Message</span>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      rows="4"
                      className="mt-1 block w-full px-4 py-3 bg-gray-50 border-0 rounded-lg focus:ring-2 focus:ring-blue-500 transition-all resize-none"
                      placeholder="Your message..."
                      required
                    />
                  </label>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3 px-6 text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-500/50 transition-all disabled:opacity-50"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>

              {successMessage && (
                <div className="mt-4 p-4 bg-green-50 text-green-700 rounded-lg">
                  {successMessage}
                </div>
              )}
              
              {errorMessage && (
                <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
                  {errorMessage}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>


      {/* Certificate Modal */}
      <CertModal 
        isOpen={selectedCert !== null}
        onClose={() => setSelectedCert(null)}
        certification={selectedCert}
      />
    </div>
 
  );
};



export default App;