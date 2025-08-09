// --- AOS Animation Initialization ---
AOS.init({
    duration: 800,
    once: true,
});

// --- Mobile Menu Logic ---
const menuBtn = document.getElementById('menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});

// --- CORRECTED: Dark & Light Mode Toggle Logic with Animation ---
const themeToggleBtn = document.getElementById('theme-toggle');
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleBtnMobile = document.getElementById('theme-toggle-mobile');
const themeToggleDarkIconMobile = document.getElementById('theme-toggle-dark-icon-mobile');
const themeToggleLightIconMobile = document.getElementById('theme-toggle-light-icon-mobile');

// This function now toggles the 'icon-hidden' class to trigger the animation
const updateIcons = (isDarkMode) => {
    if (isDarkMode) {
        // Dark mode is on: Show sun icon, hide moon icon
        themeToggleDarkIcon.classList.add('icon-hidden');
        themeToggleLightIcon.classList.remove('icon-hidden');
        themeToggleDarkIconMobile.classList.add('icon-hidden');
        themeToggleLightIconMobile.classList.remove('icon-hidden');
    } else {
        // Light mode is on: Show moon icon, hide sun icon
        themeToggleDarkIcon.classList.remove('icon-hidden');
        themeToggleLightIcon.classList.add('icon-hidden');
        themeToggleDarkIconMobile.classList.remove('icon-hidden');
        themeToggleLightIconMobile.classList.add('icon-hidden');
    }
};

const setTheme = (isDarkMode) => {
    if (isDarkMode) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
    } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
    }
    updateIcons(isDarkMode);
};

const initializeTheme = () => {
    const isDarkMode = localStorage.theme === 'dark' || 
                       (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches);
    setTheme(isDarkMode);
};

const handleToggleClick = () => {
    const isDarkMode = document.documentElement.classList.contains('dark');
    setTheme(!isDarkMode);
};

themeToggleBtn.addEventListener('click', handleToggleClick);
themeToggleBtnMobile.addEventListener('click', handleToggleClick);

initializeTheme();


// --- Show More / Show Less Projects Toggle Logic ---
const projectsToggleBtn = document.getElementById('projects-toggle-btn');
const hiddenProjects = document.querySelectorAll('.project-hidden');
const projectsSection = document.getElementById('projects');

if (projectsToggleBtn) {
    projectsToggleBtn.addEventListener('click', () => {
        const isShowingMore = projectsToggleBtn.textContent.trim() === 'Show Less';

        if (isShowingMore) {
            // Hide the extra projects
            hiddenProjects.forEach(project => {
                project.classList.add('project-hidden');
            });
            projectsToggleBtn.textContent = 'Show More';
            // Scroll to the top of the projects section for better UX
            projectsSection.scrollIntoView({ behavior: 'smooth' });
        } else {
            // Show the extra projects
            hiddenProjects.forEach(project => {
                project.classList.remove('project-hidden');
            });
            projectsToggleBtn.textContent = 'Show Less';
        }
    });
}