const siteMeta = {
    home: { label: "Home", href: "index.html" },
    about: { label: "About", href: "about.html" },
    work: { label: "Work", href: "work.html" },
    fun: { label: "Fun", href: "fun.html" }
};

const footerCopy = `
    <div class="page-shell footer-grid">
        <article class="footer-card">
            <span class="section-label">Connected Map</span>
            <h3 class="section-title" style="font-size: clamp(1.7rem, 3vw, 2.4rem); margin-top: 0.9rem;">Generalist energy, sharpened into signal.</h3>
            <p class="footer-note">Built as a multi-page portfolio for roles and collaborations that sit between data, machine learning, AI systems, education, and creative curiosity.</p>
        </article>
        <article class="footer-card">
            <span class="section-label">Quick Links</span>
            <div class="contact-links" style="margin-top: 1rem;">
                <a class="contact-link" href="about.html"><span>About</span><span>Story and pivots</span></a>
                <a class="contact-link" href="work.html"><span>Work</span><span>Flagship projects</span></a>
                <a class="contact-link" href="fun.html"><span>Fun</span><span>Math, music, trivia, art</span></a>
            </div>
        </article>
    </div>
`;

function injectChrome() {
    const current = document.body.dataset.page;
    const headerHost = document.querySelector("[data-site-header]");
    const footerHost = document.querySelector("[data-site-footer]");

    if (headerHost) {
        const links = Object.entries(siteMeta).map(([key, item]) => `
            <a class="nav-link ${current === key ? "is-active" : ""}" href="${item.href}">${item.label}</a>
        `).join("");

        headerHost.innerHTML = `
            <header class="site-header">
                <div class="site-header-inner">
                    <a class="brand-link" href="index.html" aria-label="Go to home page">
                        <span class="brand-mark">N</span>
                        <span>Nithin George Mathew</span>
                    </a>
                    <nav class="nav-links" aria-label="Primary">
                        ${links}
                        <button class="nav-button" type="button" data-contact-open>Contact</button>
                    </nav>
                </div>
            </header>
        `;
    }

    if (footerHost) {
        footerHost.innerHTML = `<footer class="site-footer">${footerCopy}</footer>`;
    }

    document.body.insertAdjacentHTML("beforeend", `
        <div class="contact-modal" aria-hidden="true" data-contact-modal>
            <div class="contact-backdrop" data-contact-close></div>
            <section class="contact-panel" role="dialog" aria-modal="true" aria-labelledby="contact-title">
                <div style="display:flex; align-items:start; justify-content:space-between; gap:1rem;">
                    <div>
                        <span class="section-label">Contact</span>
                        <h2 id="contact-title" style="margin:0.85rem 0 0; font-size:2rem;" class="page-title">Let's build something with signal.</h2>
                    </div>
                    <button class="contact-close" type="button" aria-label="Close contact modal" data-contact-close>&times;</button>
                </div>
                <p class="body-copy">Open to roles, collaborations, and conversations around analytics, machine learning, AI products, and anything where strong explanation matters as much as technical depth.</p>
                <div class="contact-links">
                    <a class="contact-link" href="mailto:nithingm33@gmail.com"><span>nithingm33@gmail.com</span><span>Email</span></a>
                    <a class="contact-link" href="https://www.linkedin.com/in/nithin-george-87583137/" target="_blank" rel="noreferrer"><span>LinkedIn</span><span>Profile</span></a>
                    <a class="contact-link" href="https://github.com/nithingm" target="_blank" rel="noreferrer"><span>GitHub</span><span>Repos</span></a>
                    <div class="contact-link"><span>Tucson, Arizona</span><span>US-based</span></div>
                </div>
            </section>
        </div>
    `);
}

function initContactModal() {
    const modal = document.querySelector("[data-contact-modal]");
    if (!modal) return;

    const openers = document.querySelectorAll("[data-contact-open]");
    const closers = modal.querySelectorAll("[data-contact-close]");
    let lastTrigger = null;

    function openModal(event) {
        lastTrigger = event?.currentTarget || null;
        modal.classList.add("is-open");
        modal.setAttribute("aria-hidden", "false");
        const firstLink = modal.querySelector("a, button");
        firstLink?.focus();
    }

    function closeModal() {
        modal.classList.remove("is-open");
        modal.setAttribute("aria-hidden", "true");
        lastTrigger?.focus();
    }

    openers.forEach((button) => button.addEventListener("click", openModal));
    closers.forEach((button) => button.addEventListener("click", closeModal));

    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && modal.classList.contains("is-open")) {
            closeModal();
        }
    });
}

function initReveal() {
    const revealEls = document.querySelectorAll(".reveal");
    if (!revealEls.length) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            }
        });
    }, { threshold: 0.16 });

    revealEls.forEach((el) => observer.observe(el));
}

function initHomeMap() {
    const nodes = document.querySelectorAll("[data-map-node]");
    const previewTitle = document.querySelector("[data-map-title]");
    const previewCopy = document.querySelector("[data-map-copy]");
    if (!nodes.length || !previewTitle || !previewCopy) return;

    function setPreview(node) {
        nodes.forEach((item) => item.classList.remove("is-active"));
        node.classList.add("is-active");
        previewTitle.textContent = node.dataset.title;
        previewCopy.textContent = node.dataset.copy;
    }

    nodes.forEach((node) => {
        node.addEventListener("mouseenter", () => setPreview(node));
        node.addEventListener("focus", () => setPreview(node));
        node.addEventListener("click", () => setPreview(node));
    });

    setPreview(nodes[0]);
}

function initStoryTabs() {
    const tabGroups = document.querySelectorAll("[data-story-tabs]");
    tabGroups.forEach((group) => {
        const tabs = group.querySelectorAll("[data-story-target]");
        const cards = document.querySelectorAll("[data-story-card]");

        function activate(id) {
            tabs.forEach((tab) => tab.classList.toggle("is-active", tab.dataset.storyTarget === id));
            cards.forEach((card) => card.classList.toggle("is-active", card.dataset.storyCard === id));
        }

        tabs.forEach((tab) => tab.addEventListener("click", () => activate(tab.dataset.storyTarget)));
        if (tabs[0]) activate(tabs[0].dataset.storyTarget);
    });
}

function initTimelinePivots() {
    const pivots = document.querySelectorAll("[data-pivot-target]");
    const displays = document.querySelectorAll("[data-pivot-card]");
    if (!pivots.length) return;

    function activate(id) {
        pivots.forEach((pivot) => pivot.classList.toggle("is-active", pivot.dataset.pivotTarget === id));
        displays.forEach((card) => card.classList.toggle("is-active", card.dataset.pivotCard === id));
    }

    pivots.forEach((pivot) => pivot.addEventListener("click", () => activate(pivot.dataset.pivotTarget)));
    activate(pivots[0].dataset.pivotTarget);
}

function initWorkCases() {
    const overlay = document.querySelector("[data-case-overlay]");
    const panelContent = document.querySelector("[data-case-content]");
    if (!overlay || !panelContent) return;

    const openers = document.querySelectorAll("[data-case-open]");
    const closers = overlay.querySelectorAll("[data-case-close]");
    let lastTrigger = null;

    function openCase(event) {
        const targetId = event.currentTarget.dataset.caseOpen;
        const template = document.getElementById(targetId);
        if (!template) return;
        lastTrigger = event.currentTarget;
        panelContent.innerHTML = template.innerHTML;
        overlay.classList.add("is-open");
        overlay.setAttribute("aria-hidden", "false");
        overlay.querySelector(".case-close")?.focus();
    }

    function closeCase() {
        overlay.classList.remove("is-open");
        overlay.setAttribute("aria-hidden", "true");
        lastTrigger?.focus();
    }

    openers.forEach((button) => button.addEventListener("click", openCase));
    closers.forEach((button) => button.addEventListener("click", closeCase));
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && overlay.classList.contains("is-open")) {
            closeCase();
        }
    });
}

function initPatternBoard() {
    const board = document.querySelector("[data-pattern-board]");
    const remixButton = document.querySelector("[data-pattern-remix]");
    if (!board || !remixButton) return;

    const cells = [...board.querySelectorAll(".pattern-cell")];
    const patterns = [
        [0, 2, 4, 6, 8, 10, 12, 14, 16, 18, 20, 22, 24],
        [1, 3, 5, 7, 9, 11, 13, 15, 17, 19, 21, 23],
        [0, 4, 5, 6, 10, 12, 14, 18, 19, 20, 24],
        [2, 6, 8, 10, 12, 14, 16, 18, 22]
    ];

    function render(pattern) {
        cells.forEach((cell, index) => {
            cell.classList.toggle("is-on", pattern.includes(index));
        });
    }

    let current = 0;
    remixButton.addEventListener("click", () => {
        current = (current + 1) % patterns.length;
        render(patterns[current]);
    });

    cells.forEach((cell) => cell.addEventListener("click", () => cell.classList.toggle("is-on")));
    render(patterns[current]);
}

function initTriviaDeck() {
    const question = document.querySelector("[data-trivia-question]");
    const answer = document.querySelector("[data-trivia-answer]");
    const next = document.querySelector("[data-trivia-next]");
    if (!question || !answer || !next) return;

    const deck = [
        {
            question: "Why does trivia belong in a portfolio about data and ML?",
            answer: "Because broad recall and rapid association are the same instincts that help connect ideas across systems, domains, and projects."
        },
        {
            question: "What does teaching math add to an AI engineer's toolkit?",
            answer: "The ability to detect hidden assumptions, explain abstraction clearly, and design learning paths instead of dumping information."
        },
        {
            question: "What makes music relevant here?",
            answer: "Rhythm, pacing, listening, and structure. Those instincts show up in product flows, explanation, and model storytelling too."
        }
    ];

    let index = 0;
    function render() {
        question.textContent = deck[index].question;
        answer.textContent = deck[index].answer;
    }

    next.addEventListener("click", () => {
        index = (index + 1) % deck.length;
        render();
    });

    render();
}

document.addEventListener("DOMContentLoaded", () => {
    injectChrome();
    initContactModal();
    initReveal();
    initHomeMap();
    initStoryTabs();
    initTimelinePivots();
    initWorkCases();
    initPatternBoard();
    initTriviaDeck();
});
