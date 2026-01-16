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

// Data for the projects (Updated with longDescription and images)
const projects = [
    {
        title: "Task Manager Web App 🚀",
        description: "A simple Task Management application built using HTML, CSS, and JavaScript with localStorage for data persistence.",
        longDescription: `📝 Advanced Task Manager

A modern, feature-rich Task Manager / To-Do List Web App built with HTML, CSS, and Vanilla JavaScript. This project goes beyond a simple to-do list, providing categories, priorities, recurrence, bulk actions, import/export, and progress tracking — all wrapped in a responsive and animated UI.

✨ Features:
🔧 Task Management: Add, Edit, Delete (with fade-out animation), and Mark complete.
🏷️ Categories & Priorities: Work, Personal, Study with color-coded badges (High 🔴, Medium 🟠, Low 🟢).
📅 Smart Due Dates: Overdue highlights and sorting.
📊 Productivity Tools: Progress Tracker and Bulk Actions.
🔁 Recurring Tasks: Supports daily, weekly, and monthly recurrence.
💾 Data Handling: LocalStorage persistence and JSON Import/Export.
🖥️ UI & UX: Modern responsive layout with smooth animations.`,
        image: "assets/project-photo/task-management-photo.png",
        liveDemo: "https://aktaskmanage.netlify.app/",
        github: "https://github.com/Angkon-Kar/Task_Manager",
        technologies: ["HTML5", "CSS3", "Vanilla JavaScript(ES6)"]
    },
    
    {
        title: "🔐 Register-Login Page",
        description: "A simple, responsive Register and Login Page built using HTML, CSS, and JavaScript.",
        longDescription: "এই প্রোজেক্টটি মূলত ফ্রন্টএন্ড ফর্ম ভ্যালিডেশন এবং রেসপনসিভ ইউজার ইন্টারফেস ডিজাইনের ওপর ভিত্তি করে তৈরি। এতে পাসওয়ার্ড শো/হাইড ফিচার এবং ক্লায়েন্ট-সাইড ডাটা ভ্যালিডেশন চেক করা হয়েছে।",
        image: "assets/login-preview.png",
        liveDemo: "https://akregisterloginpage1.netlify.app/",
        github: "https://github.com/Angkon-Kar/Register-Login-Page",
        technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "Tic-Tac-Toe: Multi-Mode Game",
        description: "A classic Tic-Tac-Toe game built with HTML, CSS, and JavaScript, featuring three exciting game modes.",
        longDescription: "ক্লাসিক টিক-ট্যাক-টো গেমের একটি আধুনিক সংস্করণ। এতে ৩টি মোড রয়েছে: ১. লোকাল মাল্টিপ্লেয়ার, ২. অনলাইন মাল্টিপ্লেয়ার (Firebase integration), এবং ৩. প্লেয়ার বনাম এআই (AI)।",
        image: "assets/tictactoe-preview.png",
        liveDemo: "https://aktictactoegame.netlify.app/",
        github: "https://github.com/Angkon-Kar/Tic-Tac-Toe",
        technologies: ["HTML", "CSS", "JavaScript", "Firebase"]
    },
    {
        title: "Dot Connect Game",
        description: "Modern version of the classic childhood game, showcasing a full-stack, real-time multiplayer experience.",
        longDescription: "এটি একটি মাল্টিপ্লেয়ার গেম যা Socket.IO এবং Node.js ব্যবহার করে রিয়েল-টাইমে কাজ করে। ইউজাররা রুম কোড ব্যবহার করে বন্ধুদের সাথে অনলাইনে সরাসরি খেলতে পারেন।",
        image: "assets/dotconnect-preview.png",
        liveDemo: "https://dotconnectgame.netlify.app/",
        github: "https://github.com/Angkon-Kar/Dot-Connect-Game",
        technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Socket.IO"]
    }
];

// --- Modal Functionality ---

function openProjectDetails(index) {
    const project = projects[index];
    const modal = document.getElementById('project-modal');
    
    // Title and Descriptions
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.longDescription || project.description;
    
    // Image Handling
    const imgElement = document.getElementById('modal-image');
    if (project.image) {
        imgElement.src = project.image;
        imgElement.style.display = 'block';
    } else {
        imgElement.style.display = 'none';
    }

    // Technology Tags
    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = project.technologies.map(tech => 
        `<span class="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-800">${tech}</span>`
    ).join('');

    // Links
    document.getElementById('modal-live').href = project.liveDemo;
    document.getElementById('modal-github').href = project.github;

    // Show Modal
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden'; // Stop scrolling
    lucide.createIcons();
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto'; // Enable scrolling
}

// Close modal when clicking outside the content
window.onclick = function(event) {
    const modal = document.getElementById('project-modal');
    if (event.target == modal) {
        closeModal();
    }
}

// --- Render Projects Function ---

function renderProjects() {
    const container = document.getElementById('projects-container');
    if (!container) return;

    container.innerHTML = projects.map((p, index) => `
        <div class="glow-card bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col h-full shadow-lg transition-all duration-300">
            <h3 class="text-2xl font-bold text-white mb-3">${p.title}</h3>
            <p class="text-gray-400 mb-4 flex-grow">${p.description}</p>
            <div class="flex flex-col space-y-3 mt-auto">
                <button onclick="openProjectDetails(${index})" class="w-full py-2 bg-blue-600/20 text-blue-400 border border-blue-600/50 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all">
                    View Details
                </button>
                <div class="flex space-x-2">
                    <a href="${p.liveDemo}" target="_blank" class="flex-1 text-center py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors">Demo</a>
                    <a href="${p.github}" target="_blank" class="flex-1 text-center py-2 bg-gray-700 hover:bg-gray-600 rounded-lg text-white text-sm transition-colors">Code</a>
                </div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

// Initial calls
document.addEventListener('DOMContentLoaded', () => {
    renderProjects();
});


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