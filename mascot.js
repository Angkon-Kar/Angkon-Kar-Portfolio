// ==========================================
// Interactive Mascot (fast version)
//
// Why this version is faster on a live site:
//  - Every pose is created up-front as its own <img> and PRELOADED.
//    Changing pose just toggles which one is visible — the browser never
//    has to download or decode anything while you move the mouse.
//  - The center pose loads first; the other poses load right after the
//    page finishes loading, so the mascot never slows down the page.
//  - A pose that hasn't finished loading yet is skipped (the current pose
//    stays) instead of showing a blank/flickering image.
//  - Mouse moves are throttled with requestAnimationFrame and the DOM is
//    only touched when the direction actually changes.
//
// Looks for <div id="mascot-hero-mount"> (Home hero) -> big 180px mascot.
// On every other page -> small 90px floating widget, bottom-left.
//
// Assets expected:
//   assets/mascot/direction/center.png, up.png, down.png, left.png, right.png,
//                           up-left.png, up-right.png, down-left.png, down-right.png
//   assets/mascot/reaction/love.png, amazed.png, shocked.png, star-eyes.png,
//                          blush.png, sleepy.png, dizzy.png, laugh.png
// (Tip: resize each to ~360px wide and save as .webp for a much faster load —
//  if you switch format, change the EXT constant below.)
// ==========================================

(function () {
    const EXT = 'png';
    const DIR_BASE = 'assets/mascot/direction/';
    const REACTION_BASE = 'assets/mascot/reaction/';

    const DIRECTIONS = ['center', 'up', 'down', 'left', 'right', 'up-left', 'up-right', 'down-left', 'down-right'];
    const REACTIONS = ['love', 'amazed', 'shocked', 'star-eyes', 'blush', 'sleepy', 'dizzy', 'laugh'];

    const DEAD_ZONE = 40;           // px - how close to center counts as "looking straight at you"
    const REACTION_DURATION = 1800; // ms the reaction face stays before returning to normal

    function directionKeyFor(dx, dy) {
        let vCat = 'mid', hCat = 'mid';
        if (dy < -DEAD_ZONE) vCat = 'up';
        else if (dy > DEAD_ZONE) vCat = 'down';
        if (dx < -DEAD_ZONE) hCat = 'left';
        else if (dx > DEAD_ZONE) hCat = 'right';

        if (vCat === 'mid' && hCat === 'mid') return 'center';
        if (vCat === 'mid') return hCat;
        if (hCat === 'mid') return vCat;
        return `${vCat}-${hCat}`;
    }

    function initMascot(container, size) {
        if (container.id !== 'mascot-float'){
            container.style.position = 'relative';
        }
        container.style.width = size + 'px';
        container.style.height = size + 'px';
        container.style.cursor = 'pointer';
        container.style.userSelect = 'none';
        container.style.transition = 'transform 0.15s ease';
        container.style.filter = 'drop-shadow(0 8px 16px rgba(0,0,0,0.25))';

        const poses = {}; // key -> <img>

        function makePose(key, url) {
            const img = document.createElement('img');
            img.alt = key === 'center' ? "Angkon's mascot" : '';
            img.draggable = false;
            img.decoding = 'async';
            img.style.cssText =
                'position:absolute;inset:0;width:100%;height:100%;object-fit:contain;' +
                'opacity:0;visibility:hidden;pointer-events:none;';
            img.src = url;
            container.appendChild(img);
            poses[key] = img;
            return img;
        }

        function isReady(key) {
            const img = poses[key];
            return !!img && img.complete && img.naturalWidth > 0;
        }

        let activeKey = null;
        function show(key) {
            if (key === activeKey || !isReady(key)) return; // never switch to an unloaded image
            if (activeKey && poses[activeKey]) {
                poses[activeKey].style.opacity = '0';
                poses[activeKey].style.visibility = 'hidden';
            }
            poses[key].style.opacity = '1';
            poses[key].style.visibility = 'visible';
            activeKey = key;
        }

        // 1) Center pose first, so the mascot appears immediately
        const center = makePose('center', `${DIR_BASE}center.${EXT}`);
        const showCenterWhenReady = () => show('center');
        if (center.complete) showCenterWhenReady();
        else center.addEventListener('load', showCenterWhenReady, { once: true });

        // 2) Everything else preloads after the page has finished loading
        function loadRest() {
            DIRECTIONS.filter(k => k !== 'center').forEach(k => makePose(k, `${DIR_BASE}${k}.${EXT}`));
            REACTIONS.forEach(k => makePose('r-' + k, `${REACTION_BASE}${k}.${EXT}`));
        }
        if (document.readyState === 'complete') loadRest();
        else window.addEventListener('load', loadRest, { once: true });

        // --- mouse tracking (throttled to one update per animation frame) ---
        let reacting = false;
        let reactionTimer = null;
        let lastX = 0, lastY = 0, ticking = false;

        function update() {
            ticking = false;
            if (reacting) return;
            const rect = container.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            show(directionKeyFor(lastX - cx, lastY - cy));
        }

        window.addEventListener('mousemove', (e) => {
            lastX = e.clientX;
            lastY = e.clientY;
            if (!ticking) {
                ticking = true;
                requestAnimationFrame(update);
            }
        }, { passive: true });

        // --- click reaction ---
        container.addEventListener('click', () => {
            const ready = REACTIONS.filter(k => isReady('r-' + k));
            if (!ready.length) return; // reactions still loading - ignore click instead of lagging

            reacting = true;
            clearTimeout(reactionTimer);

            show('r-' + ready[Math.floor(Math.random() * ready.length)]);
            container.style.transform = 'scale(1.15)';
            setTimeout(() => { container.style.transform = 'scale(1)'; }, 180);

            reactionTimer = setTimeout(() => {
                reacting = false;
                update(); // snap back to whichever way the mouse is now
            }, REACTION_DURATION);
        });
    }

    document.addEventListener('DOMContentLoaded', () => {
        const heroMount = document.getElementById('mascot-hero-mount');

        if (heroMount) {
            // Home page - bigger mascot embedded inside the hero section
            initMascot(heroMount, 180);
        } else {
            // Every other page - small floating widget, bottom-left corner
            const floatContainer = document.createElement('div');
            floatContainer.id = 'mascot-float';
            floatContainer.className = 'fixed bottom-6 left-6 z-40';
            document.body.appendChild(floatContainer);
            initMascot(floatContainer, 90);
        }
    });
})();