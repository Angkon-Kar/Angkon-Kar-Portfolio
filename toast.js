// ==========================================
// Toast Notification System
// Include this file on every page (before script.js) and call:
//     showToast("Copied to clipboard!", { emoji: "📋", type: "success" });
// from anywhere (e.g. a "Copy Code" button, the devtools guard, etc.)
//
// options:
//   emoji    - any emoji shown on the left (default 🔔)
//   type     - "info" | "success" | "warning" | "error" (controls the accent color)
//   duration - milliseconds before auto-dismiss (default 3000)
// ==========================================

(function () {
    function ensureStyles() {
        if (document.getElementById('toast-styles')) return;
        const style = document.createElement('style');
        style.id = 'toast-styles';
        style.textContent = `
            @keyframes toast-in {
                from { transform: translateX(120%); opacity: 0; }
                to   { transform: translateX(0);    opacity: 1; }
            }
            @keyframes toast-out {
                from { transform: translateX(0);    opacity: 1; }
                to   { transform: translateX(120%); opacity: 0; }
            }
            .toast-item { animation: toast-in 0.35s ease forwards; }
            .toast-item.toast-leave { animation: toast-out 0.3s ease forwards; }
        `;
        document.head.appendChild(style);
    }

    function ensureContainer() {
        let c = document.getElementById('toast-container');
        if (!c) {
            c = document.createElement('div');
            c.id = 'toast-container';
            c.className = 'fixed bottom-6 right-6 z-[9999] flex flex-col gap-3 items-end pointer-events-none';
            document.body.appendChild(c);
        }
        return c;
    }

    const TYPE_BORDER = {
        info: 'border-l-4 border-blue-500',
        success: 'border-l-4 border-green-500',
        warning: 'border-l-4 border-yellow-500',
        error: 'border-l-4 border-red-500'
    };

    window.showToast = function (message, opts) {
        opts = opts || {};
        const emoji = opts.emoji || '🔔';
        const type = opts.type || 'info';
        const duration = opts.duration || 3000;

        ensureStyles();
        const container = ensureContainer();

        const toast = document.createElement('div');
        toast.className = `toast-item pointer-events-auto flex items-center gap-3 bg-white dark:bg-gray-800 ${TYPE_BORDER[type] || TYPE_BORDER.info} shadow-2xl rounded-xl px-4 py-3 min-w-[240px] max-w-sm cursor-pointer`;
        toast.innerHTML = `
            <span class="text-xl leading-none">${emoji}</span>
            <span class="text-sm font-medium text-gray-800 dark:text-gray-200">${message}</span>
        `;
        container.appendChild(toast);

        const remove = () => {
            toast.classList.add('toast-leave');
            toast.addEventListener('animationend', () => toast.remove(), { once: true });
        };

        const timer = setTimeout(remove, duration);

        // click a toast to dismiss it early
        toast.addEventListener('click', () => {
            clearTimeout(timer);
            remove();
        });
    };
})();