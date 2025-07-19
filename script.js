// Theme Management
function initTheme() {
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark');
    }
}

function toggleTheme() {
    const isDark = document.documentElement.classList.contains('dark');
    
    if (isDark) {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    } else {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    }
}

// Navigation Management
function updateActiveNavLink() {
    const sections = ['home', 'about', 'projects', 'skills', 'certifications', 'contact'];
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
            const rect = element.getBoundingClientRect();
            if (rect.top <= 100 && rect.bottom >= 100) {
                // Update desktop nav
                navLinks.forEach(link => {
                    link.classList.remove('bg-gradient-to-r', 'from-purple-500', 'to-cyan-500', 'text-white', 'shadow-lg');
                    link.classList.add('text-gray-600', 'dark:text-gray-300', 'hover:text-purple-600', 'dark:hover:text-purple-400');
                });
                
                const activeLink = document.querySelector(`.nav-link[href="#${section}"]`);
                if (activeLink) {
                    activeLink.classList.remove('text-gray-600', 'dark:text-gray-300', 'hover:text-purple-600', 'dark:hover:text-purple-400');
                    activeLink.classList.add('bg-gradient-to-r', 'from-purple-500', 'to-cyan-500', 'text-white', 'shadow-lg');
                }
                
                // Update mobile nav
                mobileNavLinks.forEach(link => {
                    link.classList.remove('bg-gradient-to-r', 'from-purple-500', 'to-cyan-500', 'text-white');
                    link.classList.add('text-gray-600', 'dark:text-gray-300');
                });
                
                const activeMobileLink = document.querySelector(`.mobile-nav-link[href="#${section}"]`);
                if (activeMobileLink) {
                    activeMobileLink.classList.remove('text-gray-600', 'dark:text-gray-300');
                    activeMobileLink.classList.add('bg-gradient-to-r', 'from-purple-500', 'to-cyan-500', 'text-white');
                }
                break;
            }
        }
    }
}

function updateScrollProgress() {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progress = (scrollTop / docHeight) * 100;
    document.getElementById('progress-bar').style.width = `${progress}%`;
}

function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobile-menu');
    const menuIcon = document.getElementById('menu-icon');
    const closeIcon = document.getElementById('close-icon');
    
    if (mobileMenu.classList.contains('hidden')) {
        mobileMenu.classList.remove('hidden');
        menuIcon.classList.add('hidden');
        closeIcon.classList.remove('hidden');
    } else {
        mobileMenu.classList.add('hidden');
        menuIcon.classList.remove('hidden');
        closeIcon.classList.add('hidden');
    }
}

// Utility Functions
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
    }
    
    // Close mobile menu if open
    const mobileMenu = document.getElementById('mobile-menu');
    if (!mobileMenu.classList.contains('hidden')) {
        toggleMobileMenu();
    }
}

function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Typewriter Effect
function initTypewriter() {
    const roles = ['Software Engineer', 'Full Stack Developer', 'Problem Solver', 'Tech Enthusiast','Web Developer','UI/UX Designer'];
    const typewriterElement = document.getElementById('typewriter');
    let currentRoleIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    
    function type() {
        const currentRole = roles[currentRoleIndex];
        
        if (isDeleting) {
            typewriterElement.textContent = currentRole.substring(0, currentCharIndex - 1);
            currentCharIndex--;
        } else {
            typewriterElement.textContent = currentRole.substring(0, currentCharIndex + 1);
            currentCharIndex++;
        }
        
        let typeSpeed = isDeleting ? 50 : 100;
        
        if (!isDeleting && currentCharIndex === currentRole.length) {
            typeSpeed = 2000;
            isDeleting = true;
        } else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentRoleIndex = (currentRoleIndex + 1) % roles.length;
            typeSpeed = 500;
        }
        
        setTimeout(type, typeSpeed);
    }
    
    type();
}

// Project Filtering
function filterProjects(category) {
    const projectCards = document.querySelectorAll('.project-card');
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    // Update active filter button
    filterButtons.forEach(btn => {
        btn.classList.remove('bg-gradient-to-r', 'from-purple-600', 'to-cyan-600', 'text-white', 'shadow-lg');
        btn.classList.add('bg-gray-100', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-300');
    });
    
    event.target.classList.remove('bg-gray-100', 'dark:bg-gray-800', 'text-gray-600', 'dark:text-gray-300');
    event.target.classList.add('bg-gradient-to-r', 'from-purple-600', 'to-cyan-600', 'text-white', 'shadow-lg');
    
    // Filter projects
    projectCards.forEach(card => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
            card.style.display = 'block';
            card.style.animation = 'fadeIn 0.5s ease-out';
        } else {
            card.style.display = 'none';
        }
    });
}

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    // Initialize theme
    initTheme();
    
    // Initialize typewriter effect
    initTypewriter();
    
    // Theme toggle
    document.getElementById('theme-toggle').addEventListener('click', toggleTheme);
    
    // Mobile menu toggle
    document.getElementById('mobile-menu-toggle').addEventListener('click', toggleMobileMenu);
    
    // Navigation links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href').substring(1);
            scrollToSection(targetId);
        });
    });
    
    // Scroll events
    window.addEventListener('scroll', () => {
        updateScrollProgress();
        updateActiveNavLink();
    });
    
    // Initial nav update
    updateActiveNavLink();
});

// Smooth scroll polyfill for older browsers
if (!('scrollBehavior' in document.documentElement.style)) {
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/gh/iamdustan/smoothscroll@master/src/smoothscroll.js';
    document.head.appendChild(script);
}