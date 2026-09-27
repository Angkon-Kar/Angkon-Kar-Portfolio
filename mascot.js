// ==========================================
// Interactive Mascot
//
// Looks for <div id="mascot-hero-mount"> (only present in index.html's
// hero section) and mounts a large (180px) mascot there. On every other
// page (no hero mount found) it creates its own small (90px) floating
// widget fixed to a corner of the screen.
//
// Assets expected (slice your two reference sheets into these):
//   assets/mascot/direction/center.png, up.png, down.png, left.png, right.png,
//                           up-left.png, up-right.png, down-left.png, down-right.png
//   assets/mascot/reaction/love.png, amazed.png, shocked.png, star-eyes.png,
//                          blush.png, sleepy.png, dizzy.png, laugh.png
// ==========================================

(function () {
    const DIR_BASE = 'assets/mascot/direction/';
    const REACTION_BASE = 'assets/mascot/reaction/';
    const REACTIONS = ['love.png', 'amazed.png', 'shocked.png', 'star-eyes.png', 'blush.png', 'sleepy.png', 'dizzy.png', 'laugh.png'];
    const DEAD_ZONE = 40; // px — how close to center counts as "looking straight at you"
    const REACTION_DURATION = 1800; // ms the reaction face stays before returning to normal

    function directionFileFor(dx, dy) {
        let vCat = 'mid', hCat = 'mid';
        if (dy < -DEAD_ZONE) vCat = 'up';
        else if (dy > DEAD_ZONE) vCat = 'down';
        if (dx < -DEAD_ZONE) hCat = 'left';
        else if (dx > DEAD_ZONE) hCat = 'right';

        if (vCat === 'mid' && hCat === 'mid') return 'center.png';
        if (vCat === 'mid') return `${hCat}.png`;
        if (hCat === 'mid') return `${vCat}.png`;
        return `${vCat}-${hCat}.png`;
    }

    function initMascot(container, size) {
        const img = document.createElement('img');
        img.src = DIR_BASE + 'center.png';
        img.alt = "Angkon's mascot";
        img.draggable = false;
        img.style.width = size + 'px';
        img.style.height = size + 'px';
        img.style.objectFit = 'contain';
        img.style.cursor = 'pointer';
        img.style.userSelect = 'none';
        img.style.transition = 'transform 0.15s ease';
        img.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))';
        container.appendChild(img);

        let reacting = false;
        let reactionTimer = null;

        function updateDirection(clientX, clientY) {
            if (reacting) return;
            const rect = img.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            img.src = DIR_BASE + directionFileFor(clientX - cx, clientY - cy);
        }

        window.addEventListener('mousemove', (e) => updateDirection(e.clientX, e.clientY));

        img.addEventListener('click', () => {
            reacting = true;
            clearTimeout(reactionTimer);

            const pick = REACTIONS[Math.floor(Math.random() * REACTIONS.length)];
            img.src = REACTION_BASE + pick;
            img.style.transform = 'scale(1.15)';
            setTimeout(() => { img.style.transform = 'scale(1)'; }, 180);

            reactionTimer = setTimeout(() => {
                reacting = false;
                img.src = DIR_BASE + 'center.png';
            }, REACTION_DURATION);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const heroMount = document.getElementById('mascot-hero-mount');

        if (heroMount) {
            // Home page — bigger mascot embedded inside the hero section
            initMascot(heroMount, 180);
        } else {
            // Every other page — small floating widget, bottom-left corner
            const floatContainer = document.createElement('div');
            floatContainer.id = 'mascot-float';
            floatContainer.className = 'fixed bottom-6 left-6 z-40';
            document.body.appendChild(floatContainer);
            initMascot(floatContainer, 90);
        }
    });
})();