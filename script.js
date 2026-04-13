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
        strings: ['Competitive Programmer', 'Web Developer', 'Software Engineer', 'Problem Solver', 'AI Enthusiast'],
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
        longDescription: `📝 Advanced Task Manager\n\nA modern, feature-rich Task Manager / To-Do List Web App built with HTML, CSS, and Vanilla JavaScript. This project goes beyond a simple to-do list, providing categories, priorities, recurrence, bulk actions, import/export, and progress tracking — all wrapped in a responsive and animated UI.\n\n✨ Features:\n🔧 Task Management: Add, Edit, Delete (with fade-out animation), and Mark complete.\n🏷️ Categories & Priorities: Work, Personal, Study with color-coded badges.\n📅 Smart Due Dates: Overdue highlights and sorting.\n📊 Productivity Tools: Progress Tracker and Bulk Actions.\n🔁 Recurring Tasks: Supports daily, weekly, and monthly recurrence.\n💾 Data Handling: LocalStorage persistence and JSON Import/Export.\n🖥️ UI & UX: Modern responsive layout with smooth animations.`,
        image: "assets/project-photo/task-management-photo.png",
        liveDemo: "https://aktaskmanage.netlify.app/",
        github: "https://github.com/Angkon-Kar/Task_Manager",
        technologies: ["HTML5", "CSS3", "Vanilla JavaScript(ES6)"]
    },
    {
        title: "☕ Coffee Ordering System",
        description: "A feature-rich C++ console application simulating a real-world coffee shop checkout with cart management and dynamic pricing.",
        longDescription: `☕ Advanced Coffee Ordering System (C++)\n\nA comprehensive CLI application that demonstrates strong core programming logic, control structures, and robust user input validation. It simulates a complete cafe ordering experience.\n\n✨ Key Features (Version 5):\n☕ 8-Item Menu: Wide variety with size guides (Demi → Trenta).\n📐 Dynamic Pricing: 6 size options with automatic price upcharge.\n🥛 Customizations: Milk options (Soy/Regular/Almond) and Temperature (Hot/Iced).\n🛒 Cart Management: Add or remove items before final checkout.\n⭐ Loyalty System: Earn 1 pt per $1, redeemable every 50 pts.\n🎁 Offers: Bulk order rewards (>10 items = free small cup) & 10% Student Discount.\n🧾 Smart Checkout: Formatted receipt with unique Order ID and date.\n⏳ UI Polish: Animated barista progress bar in the console.\n✅ Bulletproof Input: Full input validation ensuring zero crashes on invalid user entries.`,
        image: "assets/project-photo/coffee-ordering-system-output.png",
        liveDemo: "", // Since it's a C++ CLI application, there's no live demo link available.
        github: "https://github.com/Angkon-Kar/Coffee-Ordering-System",
        technologies: ["C++", "CLI", "Data Structures", "OOP"]
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
        title: "🎮 The Labyrinth Dream: Maze Game",
        description: "A procedural maze generator and game built with C++ and SFML, featuring multiple difficulty levels and DFS algorithm.",
        longDescription: `🎮 The Labyrinth Dream: A Procedural Maze Generator & Game\n\nA visually engaging 2D maze game developed using C++ and the SFML library. The game generates unique mazes procedurally using the Depth-First Search (DFS) algorithm, ensuring a new challenge every time.\n\n✨ Key Features:\n🧩 Procedural Generation: Unique mazes generated dynamically using DFS.\n🎚️ Multiple Difficulties: Choose from Easy, Medium, and Hard levels.\n🏃 Smooth Gameplay: Fluid player movement and collision detection.\n🏆 Game States: Clear visual feedback upon successfully escaping the maze.\n🖥️ Graphics: Clean 2D rendering utilizing the Simple and Fast Multimedia Library (SFML).\n🧠 Algorithmic Focus: Demonstrates practical application of graph traversal algorithms.`,
        image: "assets/project-photo/maze-game.png", // গিটহাব থেকে যেকোনো একটি সুন্দর স্ক্রিনশট নিয়ে এই নামে সেভ করে রাখবে
        liveDemo: "", 
        github: "https://github.com/Angkon-Kar/Maze-Game",
        technologies: ["C++", "SFML", "DFS Algorithm", "OOP"]
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
    
    document.getElementById('modal-title').textContent = project.title;
    document.getElementById('modal-description').textContent = project.longDescription || project.description;
    
    const imgElement = document.getElementById('modal-image');
    if (project.image) {
        imgElement.src = project.image;
        imgElement.style.display = 'block';
    } else {
        imgElement.style.display = 'none';
    }

    const techContainer = document.getElementById('modal-tech');
    techContainer.innerHTML = project.technologies.map(tech => 
        `<span class="bg-blue-900/40 text-blue-300 px-3 py-1 rounded-full text-sm border border-blue-800">${tech}</span>`
    ).join('');

    // Dynamic Button Logic for Modal
    const modalLive = document.getElementById('modal-live');
    const modalGithub = document.getElementById('modal-github');

    if (project.liveDemo) {
        modalLive.style.display = 'block';
        modalLive.href = project.liveDemo;
        modalGithub.textContent = 'GitHub Repo';
    } else {
        modalLive.style.display = 'none';
        modalGithub.textContent = 'View Source Code & Outputs';
    }
    modalGithub.href = project.github;

    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
    lucide.createIcons();
}

function closeModal() {
    const modal = document.getElementById('project-modal');
    modal.classList.add('hidden');
    document.body.style.overflow = 'auto';
}

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
        <div class="glow-card bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full shadow-lg transition-all duration-300">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">${p.title}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">${p.description}</p>
            <div class="flex flex-col space-y-3 mt-auto">
                <button onclick="openProjectDetails(${index})" class="w-full py-2 bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600/50 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all">
                    View Details
                </button>
                <div class="flex space-x-2">
                    ${p.liveDemo ? `<a href="${p.liveDemo}" target="_blank" class="flex-1 text-center py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-gray-900 dark:text-white text-sm transition-colors">Demo</a>` : ''}
                    <a href="${p.github}" target="_blank" class="flex-1 text-center py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-gray-900 dark:text-white text-sm transition-colors">${p.liveDemo ? 'Code' : 'Source Code & Outputs'}</a>
                </div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

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

// ==========================================
// Dark/Light Mode Toggle Logic (Global)
// ==========================================
const themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
const themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
const themeToggleBtn = document.getElementById('theme-toggle');

if (themeToggleBtn) {
    if (document.documentElement.classList.contains('dark')) {
        themeToggleLightIcon.classList.remove('hidden');
    } else {
        themeToggleDarkIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', function() {
        themeToggleDarkIcon.classList.toggle('hidden');
        themeToggleLightIcon.classList.toggle('hidden');

        if (document.documentElement.classList.contains('dark')) {
            document.documentElement.classList.remove('dark');
            localStorage.theme = 'light';
        } else {
            document.documentElement.classList.add('dark');
            localStorage.theme = 'dark';
        }
    });
}

// ==========================================
// EmailJS Contact Form Logic
// ==========================================
if (typeof emailjs !== 'undefined') {
    emailjs.init("YOUR_PUBLIC_KEY"); // এখানে তোমার পাবলিক কি বসাবে
}

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const submitBtn = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        
        const originalBtnContent = submitBtn.innerHTML;
        submitBtn.innerHTML = 'Sending... <i data-lucide="loader-2" class="w-5 h-5 ml-2 animate-spin"></i>';
        submitBtn.disabled = true;
        submitBtn.classList.add('opacity-75', 'cursor-not-allowed');
        lucide.createIcons();

        // তোমার Service ID এবং Template ID এখানে বসানো আছে
        emailjs.sendForm('service_64ee7gr', 'template_oawx9e6', this)
            .then(() => {
                formStatus.textContent = "✅ Message sent successfully!";
                formStatus.className = "text-center mt-4 text-green-600 dark:text-green-400 font-medium block";
                contactForm.reset();
            }, (error) => {
                formStatus.textContent = "❌ Failed to send message. Please try again.";
                formStatus.className = "text-center mt-4 text-red-600 dark:text-red-400 font-medium block";
                console.log('FAILED...', error);
            })
            .finally(() => {
                submitBtn.innerHTML = originalBtnContent;
                submitBtn.disabled = false;
                submitBtn.classList.remove('opacity-75', 'cursor-not-allowed');
                lucide.createIcons();
                
                setTimeout(() => { 
                    formStatus.classList.add('hidden'); 
                    formStatus.classList.remove('block');
                }, 5000);
            });
    });
}