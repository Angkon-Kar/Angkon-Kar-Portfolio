// ==========================================
// DevTools / Right-Click Guard
//
// - Right-click is disabled site-wide, but instead of silently doing
//   nothing, it shows a friendly toast (via toast.js) so it doesn't
//   look broken.
// - Elements marked with class="allow-context-menu" (e.g. the code
//   blocks on the Blog page) are exempt, so visitors can still use
//   the browser's own "Copy" from the right-click menu if they want,
//   on top of the Copy button.
// - A few common "view source" keyboard shortcuts are also blocked.
// - NOTE: the old debugger-freeze trap has been removed on purpose —
//   it froze the whole tab whenever DevTools was open, which looks
//   like a broken site to anyone checking (recruiters included), and
//   fighting visitors this hard isn't the point of a portfolio site.
// ==========================================

document.addEventListener('contextmenu', function (e) {
    if (e.target.closest('.allow-context-menu')) return; // let code blocks work normally
    e.preventDefault();
    if (typeof showToast === 'function') {
        showToast('Right-click is disabled on this site — for demo purposes only.', {
            emoji: '🖱️',
            type: 'info'
        });
    }
});

document.addEventListener('keydown', function (e) {
    const isViewSourceShortcut =
        e.key === 'F12' ||
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) ||
        (e.ctrlKey && (e.key === 'U' || e.key === 'u'));

    if (isViewSourceShortcut) {
        e.preventDefault();
        if (typeof showToast === 'function') {
            showToast('This shortcut is disabled here.', {
                emoji: '🔒',
                type: 'warning'
            });
        }
    }
});