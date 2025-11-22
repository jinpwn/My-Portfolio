// --- Parallax ---
const bg = document.getElementById('parallaxBg');
const shape1 = document.querySelector('.shape-1');
const shape2 = document.querySelector('.shape-2');
let targetX = 0, targetY = 0, currentX = 0, currentY = 0;

function animateParallax() {
    const smoothFactor = 0.1;
    currentX += (targetX - currentX) * smoothFactor;
    currentY += (targetY - currentY) * smoothFactor;
    bg.style.transform = `translate(${currentX}px, ${currentY}px) translateZ(0)`;
    shape1.style.transform = `translate(${currentX * 2}px, ${currentY * 2}px)`;
    shape2.style.transform = `translate(${currentX * 1.5}px, ${currentY * 1.5}px) rotate(45deg)`;
    requestAnimationFrame(animateParallax);
}
animateParallax();

document.addEventListener('mousemove', (e) => {
    targetX = (window.innerWidth - e.pageX * 2) / 100;
    targetY = (window.innerHeight - e.pageY * 2) / 100;
});

function handleOrientation(event) {
    const x = event.gamma; const y = event.beta;
    if (x !== null && y !== null) { targetX = x * 0.5; targetY = (y - 45) * 0.5; }
}

const requestMotionPermission = async () => {
    if (typeof DeviceOrientationEvent !== 'undefined' && typeof DeviceOrientationEvent.requestPermission === 'function') {
        try {
            const response = await DeviceOrientationEvent.requestPermission();
            if (response === 'granted') window.addEventListener('deviceorientation', handleOrientation);
        } catch (e) { console.log("Motion permission denied"); }
        document.removeEventListener('click', requestMotionPermission);
    }
};
document.addEventListener('click', requestMotionPermission);
if (window.DeviceOrientationEvent && typeof DeviceOrientationEvent.requestPermission !== 'function') {
    window.addEventListener('deviceorientation', handleOrientation);
}

// --- Theme Toggle ---
const toggleBtn = document.getElementById('themeToggle');
const html = document.documentElement;
const savedTheme = localStorage.getItem('theme') || 'dark';
html.setAttribute('data-theme', savedTheme);
toggleBtn.addEventListener('click', () => {
    const current = html.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', next);
    localStorage.setItem('theme', next);
});

// --- PDF Modal ---
const pdfModal = document.getElementById('pdfModal');
const pdfFrame = document.getElementById('pdfFrame');
function openPdf(path) { pdfFrame.src = path; pdfModal.classList.add('active'); document.body.style.overflow = 'hidden'; }
function closePdf() { pdfModal.classList.remove('active'); setTimeout(() => { pdfFrame.src = ''; }, 200); document.body.style.overflow = 'auto'; }

// --- Copy Email ---
function copyEmail(btn) {
    const email = "grant.tricking711@passfwd.com";
    const textarea = document.createElement('textarea');
    textarea.value = email;
    textarea.style.position = 'fixed';
    textarea.style.opacity = '0';
    document.body.appendChild(textarea);
    textarea.select();
    try {
        if (document.execCommand('copy')) {
            const floating = document.createElement('span');
            floating.innerText = email; floating.className = 'floating-email-anim';
            btn.appendChild(floating);
            setTimeout(() => { if(btn.contains(floating)) btn.removeChild(floating); }, 1500);
        }
    } catch (err) { alert('Please manually copy: ' + email); }
    document.body.removeChild(textarea);
}

// --- Marker Animation Trigger ---
window.addEventListener('load', () => {
    const markerBtn = document.querySelector('.btn-marker');
    if (markerBtn) {
        setTimeout(() => {
            markerBtn.classList.add('draw-active');
        }, 500);
    }
});

window.addEventListener('click', (e) => { if(e.target === pdfModal) closePdf(); });
document.addEventListener('keydown', (e) => { if(e.key === 'Escape') closePdf(); });
