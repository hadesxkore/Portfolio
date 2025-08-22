import React, { useEffect, useState  } from 'react';
import { motion, AnimatePresence  } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import kobieImage from './images/kobie.png';
import { Github, ExternalLink } from 'lucide-react';
// Import project images
import pgoInventory1 from './images/pgoInventorySystem/1.png';
import pgoInventory2 from './images/pgoInventorySystem/2.png';
import pgoInventory3 from './images/pgoInventorySystem/3.png';
import pgoInventory4 from './images/pgoInventorySystem/4.png';
import pgoInventory5 from './images/pgoInventorySystem/5.png';
import pgoInventory6 from './images/pgoInventorySystem/6.png';
import pgoInventory7 from './images/pgoInventorySystem/7.png';

import pgoScheduler1 from './images/pgoEventScheduler/1.png';
import pgoScheduler2 from './images/pgoEventScheduler/2.png';
import pgoScheduler3 from './images/pgoEventScheduler/3.png';
import pgoScheduler4 from './images/pgoEventScheduler/4.png';
import pgoScheduler5 from './images/pgoEventScheduler/5.png';
import pgoScheduler6 from './images/pgoEventScheduler/6.png';
import pgoScheduler7 from './images/pgoEventScheduler/7.png';
import pgoScheduler8 from './images/pgoEventScheduler/8.png';
import pgoScheduler9 from './images/pgoEventScheduler/9.png';
import pgoScheduler10 from './images/pgoEventScheduler/10.png';

import pgoDocument1 from './images/pgoDocumentFileSharing/1.png';
import pgoDocument2 from './images/pgoDocumentFileSharing/2.png';
import pgoDocument3 from './images/pgoDocumentFileSharing/3.png';
import pgoDocument4 from './images/pgoDocumentFileSharing/4.png';
import pgoDocument5 from './images/pgoDocumentFileSharing/5.png';

import salesInventory1 from './images/SalesInventory/1.png';
import salesInventory2 from './images/SalesInventory/2.png';
import salesInventory3 from './images/SalesInventory/3.png';
import salesInventory4 from './images/SalesInventory/4.png';
import salesInventory5 from './images/SalesInventory/5.png';
import salesInventory6 from './images/SalesInventory/6.png';
import salesInventory7 from './images/SalesInventory/7.png';
import salesInventory8 from './images/SalesInventory/8.png';
import salesInventory9 from './images/SalesInventory/9.png';
import salesInventory10 from './images/SalesInventory/10.png';
import salesInventory11 from './images/SalesInventory/11.png';
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
import BlobCursor from './components/BlobCursor/BlobCursor';

import { 
  HiCode, 
  HiBadgeCheck, 
  HiLightningBolt, 
  HiAcademicCap, 
  HiHeart, 
  HiUserGroup,
  HiChip,
  HiCube,
  HiSparkles,
  HiClock
} from 'react-icons/hi';


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

const quickFacts = [
  {
    icon: HiCode,
    title: "Web Developer",
    description: "Learning modern web technologies",
    color: "bg-blue-500"
  },
  {
    icon: HiBadgeCheck,
    title: "Certified",
    description: "Growing technical expertise",
    color: "bg-purple-500"
  },
  {
    icon: HiChip,
    title: "Tech Enthusiast",
    description: "Eager to learn and improve",
    color: "bg-green-500"
  },
  {
    icon: HiLightningBolt,
    title: "Quick Learner",
    description: "Always ready to learn new skills",
    color: "bg-yellow-500"
  },
  {
    icon: HiHeart,
    title: "Passionate",
    description: "Dedicated to quality work",
    color: "bg-red-500"
  },
  {
    icon: HiUserGroup,
    title: "Collaborative",
    description: "Great team communication",
    color: "bg-indigo-500"
  }
];

const stats = [
  { icon: HiClock, number: "2+", label: "Years Experience" },
  { icon: HiCube, number: "8+", label: "Projects Completed" },
  { icon: HiUserGroup, number: "15+", label: "Happy Clients" },
  { icon: HiSparkles, number: "100%", label: "Client Satisfaction" }
];

// Image Gallery Modal Component
const ImageGalleryModal = ({ isOpen, onClose, images, title, currentImageIndex: initialIndex = 0 }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);

  if (!isOpen) return null;

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-8 bg-black/90 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        className="relative max-w-3xl w-full bg-white/10 backdrop-blur-md rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-50 p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors"
        >
          <X size={20} />
        </button>

        {/* Title */}
        <div className="absolute top-4 left-4 z-50">
          <h3 className="text-xl font-medium text-white drop-shadow-lg">
            {title}
          </h3>
          <p className="text-white/80 text-sm">
            Image {currentImageIndex + 1} of {images.length}
          </p>
        </div>

        {/* Main Image */}
        <div className="relative aspect-[16/9] bg-black/30">
          <motion.img
            key={currentImageIndex}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            src={images[currentImageIndex]}
            alt={`${title} screenshot ${currentImageIndex + 1}`}
            className="w-full h-full object-contain"
          />
          
          {/* Navigation Buttons */}
          <div className="absolute inset-x-4 inset-y-0 flex items-center justify-between pointer-events-none">
            <button
              onClick={prevImage}
              className="w-10 h-10 rounded-full bg-black/50 text-white shadow-lg flex items-center justify-center pointer-events-auto hover:bg-black/70 transition-all transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={nextImage}
              className="w-10 h-10 rounded-full bg-black/50 text-white shadow-lg flex items-center justify-center pointer-events-auto hover:bg-black/70 transition-all transform hover:scale-105"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 p-4 bg-black/30 overflow-x-auto">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-300 
                ${currentImageIndex === index 
                  ? 'ring-2 ring-white ring-offset-1 ring-offset-black/50' 
                  : 'opacity-50 hover:opacity-75'}`}
            >
              <img 
                src={img} 
                alt={`Thumbnail ${index + 1}`} 
                className="w-full h-full object-cover" 
              />
            </button>
          ))}
        </div>
      </motion.div>
    </motion.div>
  );
};

const ProjectCard = ({ image, title, description, tools, githubLink, liveLink, galleryImages, onOpenGallery }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
      className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
    >
      {/* Project Image */}
      <div className="relative overflow-hidden group h-56 rounded-t-xl">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover object-top transition-all duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-300" />
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
          <button
            onClick={() => onOpenGallery({ images: galleryImages, title })}
            className="flex items-center gap-2 text-slate-600 hover:text-blue-600 transition-colors"
          >
            <ExternalLink size={20} />
            <span>View Sample Images</span>
          </button>
        </div>
      </div>
    </motion.div>
  );
};

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
  
  // Gallery state
  const [galleryState, setGalleryState] = useState({
    isOpen: false,
    images: [],
    title: '',
    currentImageIndex: 0
  });

  
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

  // Projects data
  const projectsData = [
    {
      image: pgoInventory1,
      title: "PGO - Inventory System",
      description: "A comprehensive inventory management system for PGO with real-time tracking, stock management, and analytics dashboard.",
      tools: ["React + Vite", "TailwindCSS", "Shadcn/ui", "Framer Motion", "Firebase", "Node.js", "Cloudinary"],
      githubLink: "https://github.com/hadesxkore254/pgo-inventory",
      galleryImages: [pgoInventory1, pgoInventory2, pgoInventory3, pgoInventory4, pgoInventory5, pgoInventory6, pgoInventory7]
    },
    {
      image: pgoScheduler1,
      title: "PGO - Event Scheduler",
      description: "Dynamic event scheduling and management system with calendar integration, notifications, and team collaboration features.",
      tools: ["React + Vite", "TailwindCSS", "Shadcn/ui", "GRASP", "Supabase", "Node.js"],
      githubLink: "https://github.com/hadesxkore254/pgo-scheduler",
      galleryImages: [pgoScheduler1, pgoScheduler2, pgoScheduler3, pgoScheduler4, pgoScheduler5, pgoScheduler6, pgoScheduler7, pgoScheduler8, pgoScheduler9, pgoScheduler10]
    },
    {
      image: pgoDocument1,
      title: "PGO - Document File Sharing System",
      description: "Secure document management and file sharing platform with role-based access control and version tracking.",
      tools: ["React + Vite", "TailwindCSS", "Framer Motion", "Firebase", "Cloudinary"],
      githubLink: "https://github.com/hadesxkore254/pgo-fileshare",
      galleryImages: [pgoDocument1, pgoDocument2, pgoDocument3, pgoDocument4, pgoDocument5]
    },
    {
      image: salesInventory1,
      title: "Sales Inventory System",
      description: "Complete sales and inventory management solution with POS integration, stock tracking, and sales analytics.",
      tools: ["React + Vite", "TailwindCSS", "Shadcn/ui", "Supabase", "Node.js"],
      githubLink: "https://github.com/hadesxkore254/sales-inventory",
      galleryImages: [salesInventory1, salesInventory2, salesInventory3, salesInventory4, salesInventory5, salesInventory6, salesInventory7, salesInventory8, salesInventory9, salesInventory10, salesInventory11]
    }
  ];

  // Sample skills data
  const skillsData = {
    frontend: [
      { name: 'Next.js', percentage: 85 },
      { name: 'React.js', percentage: 90 },
      { name: 'TypeScript', percentage: 85 },
      { name: 'Tailwind CSS', percentage: 90 },
      { name: 'Framer Motion', percentage: 85 },
      { name: 'Zustand', percentage: 80 }
    ],
    backend: [
      { name: 'Express.js', percentage: 85 },
      { name: 'Node.js', percentage: 85 },
      { name: 'MongoDB', percentage: 80 },
      { name: 'Firebase', percentage: 85 },
      { name: 'Supabase', percentage: 80 }
    ],
    tools: [
      { name: 'Git/GitHub', percentage: 90 },
      { name: 'VS Code', percentage: 95 },
      { name: 'Figma', percentage: 85 },
      { name: 'Vercel', percentage: 90 },
      { name: 'Netlify', percentage: 85 }
    ]
  };

  return (

  
  
    <div className="min-h-screen bg-slate-50">
    <BlobCursor/>
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

      <section id= "about"            className="py-20 bg-slate-50">
      <section className="py-32 bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl font-bold tracking-tight mb-4">About Me</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto rounded-full mb-6"></div>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Passionate about creating innovative solutions and delivering exceptional digital experiences
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="col-span-full lg:col-span-2 bg-white rounded-2xl shadow-xl p-8 border border-gray-100"
          >
            <h3 className="text-2xl font-bold mb-6">Growing Developer with a Passion for Learning</h3>
            <div className="space-y-4 text-gray-600">
              <p>
                As a dedicated web developer with 2 years of hands-on experience, I'm enthusiastically building my skills
                in both front-end and back-end development. I love learning new technologies and applying them to create
                useful applications that solve real problems.
              </p>
              <p>
                I'm constantly improving my skills through practical projects and staying up-to-date with modern web
                development practices. My goal is to grow into a well-rounded full-stack developer while delivering
                quality solutions for my clients.
              </p>
            </div>
          </motion.div>

          {quickFacts.map((fact, index) => (
            <motion.div
              key={fact.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
            >
              <div className={`w-12 h-12 ${fact.color} rounded-xl flex items-center justify-center mb-4`}>
                <fact.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{fact.title}</h3>
              <p className="text-gray-600">{fact.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center"
        >
          {stats.map((stat, index) => (
            <div key={index} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex items-center justify-center mb-2">
                <stat.icon className="w-6 h-6 text-blue-600" />
              </div>
              <div className="text-3xl font-bold text-blue-600 mb-2">{stat.number}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
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
       <section id="projects" className="py-20 bg-white overflow-hidden">
        <div className="container mx-auto px-6 overflow-hidden">
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

            {/* Projects Slider */}
            <div className="relative w-full overflow-hidden max-w-[1000px] mx-auto px-4 py-12">
              <Swiper
                effect={'coverflow'}
                grabCursor={true}
                loop={true}
                slidesPerView={'auto'}
                centeredSlides={true}
                coverflowEffect={{
                  rotate: 0,
                  stretch: 0,
                  depth: 100,
                  modifier: 2.5,
                  slideShadows: true,
                }}
                speed={800}
                pagination={{
                  clickable: true,
                  dynamicBullets: false,
                  bulletActiveClass: 'swiper-pagination-bullet-active !bg-blue-600 !scale-100',
                  bulletClass: 'swiper-pagination-bullet !w-8 !h-1 !rounded-full !bg-slate-200 !transition-all !duration-300',
                }}
                navigation={{
                  nextEl: '.swiper-button-next',
                  prevEl: '.swiper-button-prev',
                }}
                autoplay={{
                  delay: 5000,
                  disableOnInteraction: false,
                  pauseOnMouseEnter: true,
                }}
                modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                className="project-swiper !pb-14 !overflow-visible"
              >
              {projectsData.map((project, index) => (
                  <SwiperSlide key={index} className="h-auto">
                    <ProjectCard 
                      {...project} 
                      onOpenGallery={({ images, title }) => setGalleryState({
                        isOpen: true,
                        images,
                        title,
                        currentImageIndex: 0
                      })}
                    />
                  </SwiperSlide>
              ))}
              </Swiper>
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

      {/* Image Gallery Modal */}
      <AnimatePresence>
        {galleryState.isOpen && (
          <ImageGalleryModal
            isOpen={galleryState.isOpen}
            onClose={() => setGalleryState(prev => ({ ...prev, isOpen: false }))}
            images={galleryState.images}
            title={galleryState.title}
            currentImageIndex={galleryState.currentImageIndex}
          />
        )}
      </AnimatePresence>
    </div>
  );
};



export default App;