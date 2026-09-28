// ==========================================
// Extension Detail Page — auto-builds itself from extensions-data.js
// based on the ?id= in the URL.
//
// Setup Guide = flowchart overview + interactive step cards:
//  - flowchart nodes at the top (click one to jump to that step)
//  - every step card has a "Mark as done" button, progress bar fills up
//  - progress is remembered in the visitor's browser (per extension)
//
// Optional fields per step in extensions-data.js:
//   icon  : any lucide icon name (e.g. "download")
//   copy  : text to show as a copy-chip (e.g. "edge://extensions")
//   tip   : small highlighted hint under the description
//   image : screenshot path
// ==========================================

const DEFAULT_STEP_ICONS = ['download', 'folder-open', 'settings', 'upload', 'pin'];

let currentExt = null;
let stepDone = [];

function getExtIdFromUrl() {
    const params = new URLSearchParams(window.location.search);
    const id = parseInt(params.get('id'), 10);
    return Number.isNaN(id) ? null : id;
}

function setExtMainImage(src) {
    const mainImg = document.getElementById('ext-gallery-main-img');
    if (mainImg) mainImg.src = src;
}

function renderExtNotFound(root) {
    root.innerHTML = `
        <div class="text-center py-24">
            <i data-lucide="search-x" class="w-14 h-14 mx-auto mb-4 text-gray-400"></i>
            <h2 class="text-2xl font-bold text-gray-900 dark:text-white mb-2">Extension not found</h2>
            <p class="text-gray-600 dark:text-gray-400 mb-6">The extension you're looking for doesn't exist or was moved.</p>
            <a href="extensions.html" class="inline-block px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all">Back to Extensions</a>
        </div>`;
}

// ---------- progress persistence ----------
function loadProgress(ext, total) {
    try {
        const saved = JSON.parse(localStorage.getItem(`ext-progress-${ext.id}`));
        if (Array.isArray(saved) && saved.length === total) return saved;
    } catch (e) { /* ignore */ }
    return new Array(total).fill(false);
}

function saveProgress() {
    try {
        localStorage.setItem(`ext-progress-${currentExt.id}`, JSON.stringify(stepDone));
    } catch (e) { /* ignore */ }
}

// ---------- interactions ----------
function scrollToStep(i) {
    const el = document.getElementById(`step-${i}`);
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'center' });
}

function toggleStep(i) {
    stepDone[i] = !stepDone[i];
    saveProgress();
    updateSetupUI();

    if (stepDone[i] && stepDone.every(Boolean) && typeof showToast === 'function') {
        showToast('Setup complete — enjoy the extension!', { emoji: '🎉', type: 'success', duration: 4000 });
    }
}

function resetSteps() {
    stepDone = stepDone.map(() => false);
    saveProgress();
    updateSetupUI();
}

function copyStepText(text) {
    const done = () => {
        if (typeof showToast === 'function') showToast(`Copied: ${text}`, { emoji: '📋', type: 'success' });
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(text).then(done).catch(done);
    } else {
        const ta = document.createElement('textarea');
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        try { document.execCommand('copy'); } catch (e) { /* ignore */ }
        ta.remove();
        done();
    }
}

// ---------- UI refresh (no re-render, so images don't reload) ----------
function updateSetupUI() {
    const total = stepDone.length;
    const doneCount = stepDone.filter(Boolean).length;
    const currentIdx = stepDone.findIndex(d => !d); // first unfinished step

    const bar = document.getElementById('setup-progress-bar');
    const label = document.getElementById('setup-progress-label');
    if (bar) bar.style.width = `${(doneCount / total) * 100}%`;
    if (label) label.textContent = doneCount === total ? 'All steps completed 🎉' : `${doneCount} of ${total} steps completed`;

    stepDone.forEach((done, i) => {
        const isCurrent = i === currentIdx;

        // flowchart node
        const node = document.getElementById(`flow-node-${i}`);
        if (node) {
            node.classList.toggle('bg-green-500', done);
            node.classList.toggle('border-green-500', done);
            node.classList.toggle('text-white', done);
            node.classList.toggle('bg-blue-600', isCurrent && !done);
            node.classList.toggle('border-blue-600', isCurrent && !done);
            node.classList.toggle('ring-4', isCurrent && !done);
            node.classList.toggle('ring-blue-500/30', isCurrent && !done);
            node.classList.toggle('bg-white', !done && !isCurrent);
            node.classList.toggle('dark:bg-gray-800', !done && !isCurrent);
            node.querySelector('[data-role="icon"]').classList.toggle('hidden', done);
            node.querySelector('[data-role="check"]').classList.toggle('hidden', !done);
            const nodeIcon = node.querySelector('[data-role="icon"]');
            nodeIcon.classList.toggle('text-white', isCurrent && !done);
        }
        const connector = document.getElementById(`flow-connector-${i}`);
        if (connector) {
            connector.classList.toggle('bg-green-500', done);
            connector.classList.toggle('bg-gray-300', !done);
            connector.classList.toggle('dark:bg-gray-600', !done);
        }

        // step card
        const card = document.getElementById(`step-${i}`);
        if (card) {
            card.classList.toggle('border-green-400', done);
            card.classList.toggle('dark:border-green-600', done);
            card.classList.toggle('border-blue-500', isCurrent && !done);
            card.classList.toggle('border-gray-200', !done && !isCurrent);
            card.classList.toggle('dark:border-gray-700', !done && !isCurrent);
            card.classList.toggle('opacity-70', done);
        }
        const badge = document.getElementById(`step-badge-${i}`);
        if (badge) {
            badge.classList.toggle('bg-green-500', done);
            badge.classList.toggle('bg-blue-600', !done);
            badge.querySelector('[data-role="num"]').classList.toggle('hidden', done);
            badge.querySelector('[data-role="check"]').classList.toggle('hidden', !done);
        }
        const btn = document.getElementById(`step-btn-${i}`);
        if (btn) {
            btn.querySelector('[data-role="label"]').textContent = done ? 'Done' : 'Mark as done';
            btn.classList.toggle('bg-green-500', done);
            btn.classList.toggle('text-white', done);
            btn.classList.toggle('border-green-500', done);
            btn.classList.toggle('text-blue-600', !done);
            btn.classList.toggle('dark:text-blue-400', !done);
            btn.classList.toggle('border-blue-300', !done);
            btn.classList.toggle('dark:border-blue-600/50', !done);
        }
    });
}

// ---------- builders ----------
function buildFlowchart(steps) {
    const nodes = steps.map((step, i) => {
        const icon = step.icon || DEFAULT_STEP_ICONS[i] || 'circle';
        const connector = i < steps.length - 1
            ? `<div id="flow-connector-${i}" class="h-1 w-8 sm:w-12 mt-6 rounded bg-gray-300 dark:bg-gray-600 flex-shrink-0 transition-colors duration-500"></div>`
            : '';
        return `
            <div class="flex items-start">
                <button type="button" onclick="scrollToStep(${i})" class="flex flex-col items-center w-20 sm:w-24 flex-shrink-0 group focus:outline-none">
                    <span id="flow-node-${i}" class="w-12 h-12 rounded-full border-2 border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-600 dark:text-gray-300 flex items-center justify-center transition-all duration-300 group-hover:scale-110">
                        <span data-role="icon"><i data-lucide="${icon}" class="w-5 h-5"></i></span>
                        <span data-role="check" class="hidden"><i data-lucide="check" class="w-5 h-5"></i></span>
                    </span>
                    <span class="mt-2 text-[11px] leading-tight text-center text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">${step.title}</span>
                </button>
                ${connector}
            </div>`;
    }).join('');

    return `<div class="overflow-x-auto pb-2"><div class="flex items-start min-w-max mx-auto w-fit">${nodes}</div></div>`;
}

function buildStepCards(steps) {
    return steps.map((step, i) => {
        const copyChip = step.copy ? `
            <div class="mt-3 inline-flex items-center gap-2 bg-gray-100 dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg pl-3 pr-1 py-1">
                <code class="text-sm font-mono text-gray-800 dark:text-gray-200 allow-context-menu">${step.copy}</code>
                <button type="button" onclick="copyStepText('${step.copy}')" class="p-1.5 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-500 dark:text-gray-400 transition-colors" aria-label="Copy">
                    <i data-lucide="copy" class="w-4 h-4"></i>
                </button>
            </div>` : '';

        const tip = step.tip ? `
            <div class="mt-3 flex gap-2 items-start text-sm bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/60 text-amber-800 dark:text-amber-300 rounded-lg px-3 py-2">
                <i data-lucide="lightbulb" class="w-4 h-4 mt-0.5 flex-shrink-0"></i><span>${step.tip}</span>
            </div>` : '';

        const image = step.image
            ? `<img src="${step.image}" alt="${step.title}" class="mt-4 rounded-xl border border-gray-200 dark:border-gray-700 max-w-md w-full">`
            : '';

        const arrow = i < steps.length - 1
            ? `<div class="flex justify-center my-2 text-gray-400 dark:text-gray-600"><i data-lucide="arrow-down" class="w-5 h-5"></i></div>`
            : '';

        return `
            <div id="step-${i}" class="rounded-2xl border-2 border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 p-5 sm:p-6 transition-all duration-300">
                <div class="flex gap-4">
                    <div id="step-badge-${i}" class="flex-shrink-0 w-10 h-10 rounded-full bg-blue-600 text-white font-bold flex items-center justify-center transition-colors duration-300">
                        <span data-role="num">${i + 1}</span>
                        <span data-role="check" class="hidden"><i data-lucide="check" class="w-5 h-5"></i></span>
                    </div>
                    <div class="flex-grow min-w-0">
                        <h4 class="font-bold text-gray-900 dark:text-white mb-1">${step.title}</h4>
                        <p class="text-gray-600 dark:text-gray-400 leading-relaxed">${step.description}</p>
                        ${copyChip}
                        ${tip}
                        ${image}
                        <button type="button" id="step-btn-${i}" onclick="toggleStep(${i})" class="mt-4 inline-flex items-center gap-2 px-4 py-1.5 rounded-lg border text-sm font-semibold text-blue-600 dark:text-blue-400 border-blue-300 dark:border-blue-600/50 hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-all">
                            <i data-lucide="check-circle-2" class="w-4 h-4"></i><span data-role="label">Mark as done</span>
                        </button>
                    </div>
                </div>
            </div>
            ${arrow}`;
    }).join('');
}

function renderExtensionDetail() {
    const root = document.getElementById('extension-detail-root');
    if (!root) return;

    const id = getExtIdFromUrl();
    const ext = (typeof extensions !== 'undefined') ? extensions.find(e => e.id === id) : null;

    if (!ext) {
        renderExtNotFound(root);
        lucide.createIcons();
        return;
    }

    currentExt = ext;
    document.title = `${ext.title} - Angkon Kar`;

    const gallery = (ext.gallery && ext.gallery.length) ? ext.gallery : [ext.image];

    const galleryThumbs = gallery.length > 1 ? `
        <div class="flex gap-3 mt-4 overflow-x-auto pb-2">
            ${gallery.map((src, i) => `
                <button onclick="setExtMainImage('${src}')" class="flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 ${i === 0 ? 'border-blue-500' : 'border-transparent'} hover:border-blue-400 transition-colors">
                    <img src="${src}" class="w-full h-full object-cover">
                </button>`).join('')}
        </div>` : '';

    const techBadges = (ext.technologies || []).map(tech =>
        `<span class="bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300 px-4 py-1.5 rounded-full text-sm font-medium border border-blue-200 dark:border-blue-800">${tech}</span>`
    ).join('');

    const storeBtn = ext.storeLink
        ? `<a href="${ext.storeLink}" target="_blank" class="flex-1 text-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-all flex items-center justify-center"><i data-lucide="store" class="w-5 h-5 mr-2"></i> ${ext.storeName || 'View in Store'}</a>`
        : '';

    const downloadBtn = ext.downloadLink
        ? `<a href="${ext.downloadLink}" download class="flex-1 text-center px-6 py-3 bg-gray-800 hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600 text-white font-bold rounded-xl transition-all flex items-center justify-center"><i data-lucide="download" class="w-5 h-5 mr-2"></i> Download ZIP</a>`
        : '';

    const steps = ext.setupSteps || [];
    stepDone = loadProgress(ext, steps.length);

    const setupSection = steps.length ? `
        <div class="glow-card bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl mt-10">
            <div class="flex items-center justify-between mb-6">
                <h3 class="text-xl font-bold text-gray-900 dark:text-white flex items-center">
                    <i data-lucide="list-checks" class="w-5 h-5 mr-2 text-purple-500"></i> Setup Guide
                </h3>
                <button type="button" onclick="resetSteps()" class="text-xs text-gray-500 dark:text-gray-400 hover:text-red-500 flex items-center gap-1 transition-colors">
                    <i data-lucide="rotate-ccw" class="w-3.5 h-3.5"></i> Reset
                </button>
            </div>

            <div class="mb-8">
                <div class="flex justify-between text-xs text-gray-500 dark:text-gray-400 mb-2">
                    <span id="setup-progress-label"></span>
                    <span>Install flow</span>
                </div>
                <div class="h-2 rounded-full bg-gray-200 dark:bg-gray-700 overflow-hidden">
                    <div id="setup-progress-bar" class="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full transition-all duration-500" style="width:0%"></div>
                </div>
            </div>

            <div class="mb-10">${buildFlowchart(steps)}</div>

            <div>${buildStepCards(steps)}</div>
        </div>` : '';

    root.innerHTML = `
        <h1 class="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-6">${ext.title}</h1>

        <div class="glow-card bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl overflow-hidden mb-6">
            <img id="ext-gallery-main-img" src="${gallery[0]}" alt="${ext.title}" class="w-full h-72 md:h-96 object-cover">
        </div>
        ${galleryThumbs}

        <div class="glow-card bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl mt-8">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <i data-lucide="info" class="w-5 h-5 mr-2 text-blue-500"></i> Overview
            </h3>
            <p class="text-gray-700 dark:text-gray-400 leading-relaxed" style="white-space: pre-line;">${ext.longDescription || ext.shortDescription}</p>
        </div>

        ${techBadges ? `
        <div class="glow-card bg-white dark:bg-gray-800 p-8 rounded-2xl border border-gray-200 dark:border-gray-700 shadow-xl mt-6">
            <h3 class="text-xl font-bold text-gray-900 dark:text-white mb-4 flex items-center">
                <i data-lucide="code" class="w-5 h-5 mr-2 text-green-500"></i> Built With
            </h3>
            <div class="flex flex-wrap gap-3">${techBadges}</div>
        </div>` : ''}

        <div class="flex flex-col sm:flex-row gap-4 mt-8">
            ${storeBtn}
            ${downloadBtn}
        </div>

        ${setupSection}
    `;

    lucide.createIcons();
    if (steps.length) updateSetupUI();
}

document.addEventListener('DOMContentLoaded', renderExtensionDetail);