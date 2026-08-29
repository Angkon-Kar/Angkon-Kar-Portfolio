// ১. Right-Click বন্ধ করা
document.addEventListener('contextmenu', event => event.preventDefault());

// ২. Keyboard Shortcuts বন্ধ করা (আধুনিক পদ্ধতি)
document.addEventListener('keydown', function(e) {
    if (
        e.key === 'F12' || 
        (e.ctrlKey && e.shiftKey && ['I', 'J', 'C', 'i', 'j', 'c'].includes(e.key)) || // Ctrl+Shift+I/J/C
        (e.ctrlKey && (e.key === 'U' || e.key === 'u')) // Ctrl+U
    ) {
        e.preventDefault();
    }
});

// ৩. Debugger Trap (DevTools ওপেন থাকলে পেজ ফ্রিজ করবে)
setInterval(function() {
    (function() { return false; }['constructor']('debugger')());
}, 50);