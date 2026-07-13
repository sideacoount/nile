/* =============================================
   MAIN.JS - Nile-Style University
   ============================================= */

// Navbar Scroll
const navbar = document.getElementById('mainNav');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Nav Toggle
function toggleMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.toggle('show');
}

// Back to Top
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 400) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Scroll Reveal
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.fade-up').forEach(el => observer.observe(el));

// =============================================
// COURSE FILTERING
// =============================================
let currentFaculty = 'all';
let visibleCount = 9;

function filterCourses() {
    const searchTerm = document.getElementById('courseSearch').value.toLowerCase();
    const cards = document.querySelectorAll('.course-card');
    let visible = 0;

    cards.forEach(card => {
        const name = card.getAttribute('data-name') || '';
        const faculty = card.getAttribute('data-faculty') || '';
        const matchesSearch = name.includes(searchTerm);
        const matchesFaculty = currentFaculty === 'all' || faculty === currentFaculty;

        if (matchesSearch && matchesFaculty) {
            visible++;
            if (visible <= visibleCount) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        } else {
            card.style.display = 'none';
        }
    });

    document.getElementById('noResults').style.display = visible === 0 ? 'block' : 'none';
    document.getElementById('loadMoreWrap').style.display = visible > visibleCount ? '' : 'none';
}

function filterByFaculty(el, faculty) {
    currentFaculty = faculty;
    visibleCount = 9;

    document.querySelectorAll('.filter-tag').forEach(tag => tag.classList.remove('active'));
    el.classList.add('active');

    filterCourses();
}

function loadMore() {
    visibleCount += 6;
    filterCourses();
}

// Close mobile nav on link click
document.querySelectorAll('.nav-mobile a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('mobileNav').classList.remove('show');
    });
});

console.log('Nile University Style Project Loaded');
