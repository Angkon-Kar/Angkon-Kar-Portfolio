// Initialize Lucide icons
lucide.createIcons();

// Footer Year Update
const yearEl = document.getElementById('current-year');
if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
}

// Typing Animation Logic
if (document.getElementById('typed-text')) {
    new Typed('#typed-text', {
        strings: ['Web Developer', 'Problem Solver', 'CSE Student', 'UI/UX Enthusiast'],
        typeSpeed: 60,
        backSpeed: 40,
        loop: true
    });
}

// Data for the projects
const projects = [
    {
        title: "Task Manager Web App 🚀",
        description: "A simple Task Management application built using HTML, CSS, and JavaScript with localStorage for data persistence.",
        liveDemo: "https://aktaskmanage.netlify.app/",
        github: "https://github.com/Angkon-Kar/Task_Manager",
        technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "🔐 Register-Login Page",
        description: "A simple, responsive Register and Login Page built using HTML, CSS, and JavaScript.",
        liveDemo: "https://akregisterloginpage1.netlify.app/",
        github: "https://github.com/Angkon-Kar/Register-Login-Page",
        technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "Tic-Tac-Toe: Multi-Mode Game",
        description: "A classic Tic-Tac-Toe game built with HTML, CSS, and JavaScript, featuring three exciting game modes.",
        liveDemo: "https://aktictactoegame.netlify.app/",
        github: "https://github.com/Angkon-Kar/Tic-Tac-Toe",
        technologies: ["HTML", "CSS", "JavaScript", "Firebase"]
    },
    {
        title: "Dot Connect Game",
        description: "Modern version of the classic childhood game, showcasing a full-stack, real-time multiplayer experience.",
        liveDemo: "https://dotconnectgame.netlify.app/",
        github: "https://github.com/Angkon-Kar/Dot-Connect-Game",
        technologies: ["HTML", "CSS", "JavaScript", "Node.js"]
    }
];

// Function to render projects
function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = projects.map(p => `
        <div class="glow-card bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col h-full shadow-lg transition-all duration-300">
            <h3 class="text-2xl font-bold text-white mb-3">${p.title}</h3>
            <p class="text-gray-400 mb-4 flex-grow">${p.description}</p>
            <div class="flex space-x-4 mt-auto">
                <a href="${p.liveDemo}" target="_blank" class="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium transition-transform hover:scale-105">Demo</a>
                <a href="${p.github}" target="_blank" class="px-4 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white font-medium transition-transform hover:scale-105">Code</a>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', renderProjects);


// Bio "See More" Functionality
const seeMoreBtn = document.getElementById('see-more-btn');
const bioMore = document.getElementById('bio-more');

if (seeMoreBtn && bioMore) {
    seeMoreBtn.addEventListener('click', () => {
        if (bioMore.classList.contains('hidden')) {
            bioMore.classList.remove('hidden');
            seeMoreBtn.textContent = 'See Less';
        } else {
            bioMore.classList.add('hidden');
            seeMoreBtn.textContent = 'See More...';
        }
    });
}


// Glow Card Mousemove Effect
document.addEventListener('mousemove', (e) => {
    const cards = document.querySelectorAll('.glow-card');
    cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
    });
});