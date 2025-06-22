document.addEventListener('DOMContentLoaded', function () {
    const faders = document.querySelectorAll('.fade-in');
    const options = {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
    };
    const appearOnScroll = new IntersectionObserver(function (entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                return;
            } else {
                entry.target.classList.add('visible');
                appearOnScroll.unobserve(entry.target);
            }
        });
    }, options);
    faders.forEach(fader => {
        appearOnScroll.observe(fader);
    });
});

// Sidebar logic
const hamburger = document.getElementById('hamburger');
const sidebar = document.getElementById('sidebar');
const sidebarOverlay = document.getElementById('sidebarOverlay');
if (hamburger && sidebar && sidebarOverlay) {
    hamburger.addEventListener('click', () => {
        sidebar.classList.toggle('open');
        sidebarOverlay.classList.toggle('active');
        hamburger.classList.toggle('open');
    });
    sidebarOverlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        sidebarOverlay.classList.remove('active');
        hamburger.classList.remove('open');
    });
    sidebar.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            sidebar.classList.remove('open');
            sidebarOverlay.classList.remove('active');
            hamburger.classList.remove('open');
        });
    });
}

// --- Fun Fact Feature for fact.html ---
if (window.location.pathname.endsWith('fact.html')) {
    const facts = [
        "Coffee is the second most traded commodity in the world, after oil!",
        "The word 'coffee' comes from the Arabic word 'qahwa'.",
        "Finland is the world's highest coffee-consuming country per capita.",
        "Coffee beans are actually seeds from the coffee cherry.",
        "Espresso has less caffeine per serving than drip coffee.",
        "Beethoven was such a coffee lover he counted 60 beans per cup.",
        "The world's most expensive coffee is made from cat poop (Kopi Luwak).",
        "Instant coffee was invented in 1901 by Japanese-American chemist Satori Kato.",
        "Brazil produces about a third of the world's coffee supply.",
        "Coffee was originally chewed, not sipped!"
    ];
    const images = [
        "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1455470956270-4cbb357f7052?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1515442261605-cd4ce40f1d89?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1465101178521-c1a9136a3fdc?auto=format&fit=crop&w=600&q=80",
        "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
    ];
    let likeCount = 0;
    const factElem = document.getElementById('coffeeFact');
    const imgElem = document.getElementById('coffeeImg');
    const newFactBtn = document.getElementById('newFactBtn');
    const likeBtn = document.getElementById('likeBtn');
    const likeCountElem = document.getElementById('likeCount');
    const shareBtn = document.getElementById('shareBtn');
    const factSound = document.getElementById('factSound');
    function getRandomIndex(arr) {
        return Math.floor(Math.random() * arr.length);
    }
    function showRandomFact() {
        // Animate out
        factElem.classList.remove('fact-animate');
        imgElem.classList.remove('fact-animate');
        setTimeout(() => {
            const idx = getRandomIndex(facts);
            factElem.textContent = facts[idx];
            imgElem.src = images[idx];
            // Animate in
            factElem.classList.add('fact-animate');
            imgElem.classList.add('fact-animate');
            if (factSound) {
                factSound.currentTime = 0;
                factSound.play();
            }
        }, 100);
    }
    if (newFactBtn) {
        newFactBtn.addEventListener('click', showRandomFact);
    }
    if (likeBtn) {
        likeBtn.addEventListener('click', function () {
            likeBtn.classList.add('liked');
            likeCount++;
            likeCountElem.textContent = likeCount;
            setTimeout(() => likeBtn.classList.remove('liked'), 500);
        });
    }
    if (shareBtn) {
        shareBtn.addEventListener('click', function () {
            const factText = factElem.textContent;
            if (navigator.clipboard) {
                navigator.clipboard.writeText(factText + ' #CoffeeChronicles').then(() => {
                    shareBtn.textContent = '✅';
                    setTimeout(() => shareBtn.textContent = '🔗 Share', 1200);
                });
            } else {
                alert('Copy this fact: ' + factText);
            }
        });
    }
    // Initial animation
    factElem.classList.add('fact-animate');
    imgElem.classList.add('fact-animate');
} 