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

// Note: the `projects` array now lives in projects-data.js (shared with
// project-detail.html) so a project only needs to be added in one place.

// --- Render Projects Function (accepts a filtered list, defaults to all) ---
function renderProjects(list) {
    const container = document.getElementById('projects-container');
    if (!container) return;
    const data = list || projects;

    if (!data.length) {
        container.innerHTML = `<p class="col-span-full text-center text-gray-500 dark:text-gray-400 py-10">No projects in this category yet.</p>`;
        return;
    }

    container.innerHTML = data.map((p) => `
        <div class="glow-card bg-white dark:bg-gray-800 p-6 rounded-xl border border-gray-200 dark:border-gray-700 flex flex-col h-full shadow-lg transition-all duration-300">
            <h3 class="text-2xl font-bold text-gray-900 dark:text-white mb-3">${p.title}</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-4 flex-grow">${p.description}</p>
            <div class="flex flex-col space-y-3 mt-auto">
                <a href="project-detail.html?id=${p.id}" class="w-full py-2 bg-blue-100 dark:bg-blue-600/20 text-blue-600 dark:text-blue-400 border border-blue-300 dark:border-blue-600/50 rounded-lg font-bold hover:bg-blue-600 hover:text-white transition-all text-center">
                    View Details
                </a>
                <div class="flex space-x-2">
                    ${p.liveDemo ? `<a href="${p.liveDemo}" target="_blank" class="flex-1 text-center py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-gray-900 dark:text-white text-sm transition-colors">Demo</a>` : ''}
                    <a href="${p.github}" target="_blank" class="flex-1 text-center py-2 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 rounded-lg text-gray-900 dark:text-white text-sm transition-colors">${p.liveDemo ? 'Code' : 'Source Code & Outputs'}</a>
                </div>
            </div>
        </div>
    `).join('');

    lucide.createIcons();
}

// --- Category Filters (only runs on projects.html, which has #filters-container) ---
function renderProjectFilters() {
    const filterBar = document.getElementById('filters-container');
    if (!filterBar || typeof projects === 'undefined') return;

    const categories = ['All', ...new Set(projects.map(p => p.category).filter(Boolean))];

    filterBar.innerHTML = categories.map((cat, i) => `
        <button data-cat="${cat}" class="filter-btn px-5 py-2 rounded-full text-sm font-semibold border transition-all ${i === 0 ? 'bg-blue-600 text-white border-blue-600' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border-gray-300 dark:border-gray-700 hover:border-blue-400'}">${cat}</button>
    `).join('');

    filterBar.addEventListener('click', (e) => {
        const btn = e.target.closest('.filter-btn');
        if (!btn) return;

        filterBar.querySelectorAll('.filter-btn').forEach(b => {
            b.classList.remove('bg-blue-600', 'text-white', 'border-blue-600');
            b.classList.add('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300', 'border-gray-300', 'dark:border-gray-700');
        });
        btn.classList.add('bg-blue-600', 'text-white', 'border-blue-600');
        btn.classList.remove('bg-white', 'dark:bg-gray-800', 'text-gray-700', 'dark:text-gray-300', 'border-gray-300', 'dark:border-gray-700');

        const cat = btn.dataset.cat;
        renderProjects(cat === 'All' ? projects : projects.filter(p => p.category === cat));
    });
}

document.addEventListener('DOMContentLoaded', () => {
    if (typeof projects !== 'undefined') {
        renderProjects();
        renderProjectFilters();
    }
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
    emailjs.init("tTbojChhKKB2EGpal"); // Public key.
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