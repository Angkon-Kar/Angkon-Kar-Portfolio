// ==========================================
// Project Detail Page — auto-builds itself from projects-data.js
// based on the ?id= in the URL. Add a project in projects-data.js
// and it gets a detail page here automatically — nothing to edit.
// ==========================================

function getProjectIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'), 10);
    return Number.isNaN(id) ? null : id;
}

function renderNotFound(root) {
    root.innerHTML = `
        <div class="text-center py-24">
            <i data-lucide="search-x" class="w-14 h-14 mx-auto mb-4 text-gray-400"></i>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Project not found</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">The project you're looking for doesn't exist or was moved.</p>
            <a href="projects.html" class="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all">Back to Projects</a>
        </div>`;
}

function setMainImage(src) {
    const mainImg = document.getElementById('gallery-main-img');
    if (mainImg) mainImg.src = src;
}

function renderProjectDetail() {
    const root = document.getElementById('project-detail-root');
    if (!root) return;

    const id = getProjectIdFromUrl();
    const project = projects.find(p => p.id === id);

    if (!project) {
        renderNotFound(root);
        lucide.createIcons();
        return;
    }

    document.title = `${project.title} - Angkon Kar`;

    const gallery = (project.gallery && project.gallery.length) ? project.gallery : [project.image];

    const galleryThumbs = gallery.length > 1 ? `
        <div class="flex gap-3 mt-4 overflow-x-auto pb-2">
            ${gallery.map((src, i) => `
                <button onclick="setMainImage('${src}')" class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${i === 0 ? 'border-blue-500' : 'border-transparent'} hover:border-blue-400 transition-colors">
                    <img src="${src}" class="w-full h-full object-cover">
                </button>`).join('')}
        </div>` : '';

    const techBadges = project.technologies.map(tech =>
        `<span class="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">${tech}</span>`
    ).join('');

    const liveBtn = project.liveDemo
        ? `<a href="${project.liveDemo}" target="_blank" class="flex-1 text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center"><i data-lucide="external-link" class="w-5 h-5 mr-2"></i> Live Demo</a>`
        : '';

    const githubBtn = `<a href="${project.github}" target="_blank" class="flex-1 text-center px-6 py-3 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold rounded-xl transition-all flex items-center justify-center"><i data-lucide="github" class="w-5 h-5 mr-2"></i> ${project.liveDemo ? 'GitHub Repo' : 'Source Code & Outputs'}</a>`;

    root.innerHTML = `
        <span class="inline-block bg-purple-100 dark:bg-purple-900/40 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-xs font-bold border border-purple-200 dark:border-purple-800 mb-4">${project.category || 'Project'}</span>
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">${project.title}</h1>

        <div class="glow-card bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden mb-6">
            <img id="gallery-main-img" src="${gallery[0]}" alt="${project.title}" class="w-full h-72 md:h-96 object-cover">
        </div>
        ${galleryThumbs}

        <div class="glow-card bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl mt-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <i data-lucide="info" class="w-5 h-5 mr-2 text-blue-500"></i> Overview
            </h3>
            <p id="modal-description" class="text-gray-700 dark:text-gray-400 leading-relaxed">${project.longDescription || project.description}</p>
        </div>

        <div class="glow-card bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl mt-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <i data-lucide="code" class="w-5 h-5 mr-2 text-green-500"></i> Technologies Used
            </h3>
            <div class="flex flex-wrap gap-3">${techBadges}</div>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 mt-8">
            ${liveBtn}
            ${githubBtn}
        </div>
    `;

    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', renderProjectDetail);