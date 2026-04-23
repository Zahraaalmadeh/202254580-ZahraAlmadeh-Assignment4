const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

const themeButton = document.getElementById("themeToggle");
const htmlTag = document.documentElement;

function updateThemeButton(theme) {
    if (themeButton) {
        themeButton.textContent = theme === "dark" ? "☀️" : "🌙";
    }
}

const savedTheme = localStorage.getItem("theme") || "light";
htmlTag.setAttribute("data-theme", savedTheme);
updateThemeButton(savedTheme);

if (themeButton) {
    themeButton.addEventListener("click", function () {
        const currentTheme = htmlTag.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";
        htmlTag.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateThemeButton(newTheme);
    });
}

const contactForm = document.getElementById("contactForm");
const statusText = document.getElementById("formStatus");

function showStatus(message, color) {
    if (!statusText) return;
    statusText.textContent = message;
    statusText.style.color = color;

    setTimeout(function () {
        statusText.textContent = "";
    }, 4000);
}

if (contactForm && statusText) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault();

        const name = contactForm.elements["name"].value.trim();
        const email = contactForm.elements["email"].value.trim();
        const message = contactForm.elements["message"].value.trim();

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

        if (!name || !email || !message) {
            showStatus("Please fill in all fields before submitting.", "crimson");
            return;
        }

        if (!emailPattern.test(email)) {
            showStatus(
                "Please enter a valid email address, for example: name@example.com",
                "orange"
            );
            return;
        }

        if (message.length < 10) {
            showStatus("Your message should be at least 10 characters long.", "orange");
            return;
        }

        showStatus("✅ Message sent successfully!", "green");
        contactForm.reset();
    });
}

const filterButtons = document.querySelectorAll(".filter-btn");
const projectsGrid = document.getElementById("projectsGrid");
const sortProjects = document.getElementById("sortProjects");
const emptyMessage = document.getElementById("emptyMessage");

let currentFilter = "all";
let defaultOrder = [];

function getProjectCards() {
    return Array.from(projectsGrid.querySelectorAll(".project-card"));
}

function applyFilterAndSort() {
    const cards = getProjectCards();

    cards.forEach(function (card) {
        const category = card.getAttribute("data-category");
        const matches = currentFilter === "all" || category === currentFilter;
        card.style.display = matches ? "block" : "none";
    });

    const visibleCards = cards.filter(function (card) {
        return card.style.display !== "none";
    });

    const sortValue = sortProjects ? sortProjects.value : "default";

    if (sortValue === "default") {
        visibleCards.sort(function (a, b) {
            return defaultOrder.indexOf(a) - defaultOrder.indexOf(b);
        });
    } else {
        visibleCards.sort(function (a, b) {
            const nameA = a.getAttribute("data-name").toLowerCase();
            const nameB = b.getAttribute("data-name").toLowerCase();
            const dateA = new Date(a.getAttribute("data-date"));
            const dateB = new Date(b.getAttribute("data-date"));

            if (sortValue === "name-asc") {
                return nameA.localeCompare(nameB);
            }

            if (sortValue === "name-desc") {
                return nameB.localeCompare(nameA);
            }

            if (sortValue === "date-new") {
                return dateB - dateA;
            }

            if (sortValue === "date-old") {
                return dateA - dateB;
            }

            return 0;
        });
    }

    visibleCards.forEach(function (card) {
        projectsGrid.appendChild(card);
    });

    if (emptyMessage) {
        emptyMessage.style.display = visibleCards.length === 0 ? "block" : "none";
    }
}

filterButtons.forEach(function (button) {
    button.addEventListener("click", function () {
        currentFilter = button.getAttribute("data-filter");

        filterButtons.forEach(function (btn) {
            btn.classList.remove("active");
        });

        button.classList.add("active");
        applyFilterAndSort();
    });
});

if (sortProjects) {
    sortProjects.addEventListener("change", applyFilterAndSort);
}

const spotlightButton = document.getElementById("spotlightProject");

if (spotlightButton && projectsGrid) {
    spotlightButton.addEventListener("click", function () {
        const visibleCards = getProjectCards().filter(function (card) {
            return card.style.display !== "none";
        });

        if (visibleCards.length === 0) {
            showStatus("No visible projects to highlight right now.", "orange");
            return;
        }

        const randomIndex = Math.floor(Math.random() * visibleCards.length);
        const selectedCard = visibleCards[randomIndex];

        getProjectCards().forEach(function (card) {
            card.classList.remove("spotlight");
        });

        selectedCard.classList.add("spotlight");
        selectedCard.scrollIntoView({ behavior: "smooth", block: "center" });
    });
}

const welcomeMessage = document.getElementById("welcomeMessage");
let savedVisitorName = localStorage.getItem("visitorName");

if (!savedVisitorName) {
    savedVisitorName = prompt("Enter your name for a personalized welcome:");
    if (savedVisitorName) {
        localStorage.setItem("visitorName", savedVisitorName);
    }
}

if (welcomeMessage && savedVisitorName) {
    welcomeMessage.textContent = `Welcome back, ${savedVisitorName}!`;
}

const visitTimer = document.getElementById("visitTimer");
let secondsOnSite = 0;

setInterval(function () {
    secondsOnSite++;
    if (visitTimer) {
        visitTimer.textContent = `⏱ Time on site: ${secondsOnSite}s`;
    }
}, 1000);

const githubStatus = document.getElementById("githubStatus");

function createGitHubCard(repo) {
    const article = document.createElement("article");
    article.className = "card project-card";
    article.setAttribute("data-category", "github");
    article.setAttribute("data-name", repo.name);
    article.setAttribute("data-date", repo.updated_at);

    article.innerHTML = `
        <div class="project-body">
            <div class="project-top">
                <span class="project-tag">GitHub</span>
                <span class="project-date">${new Date(repo.updated_at).toLocaleDateString()}</span>
            </div>
            <h3>${repo.name}</h3>
            <p class="muted">${repo.description || "No description available."}</p>
            <div class="project-links">
                <a class="link" href="${repo.html_url}" target="_blank" rel="noopener">View Repo</a>
            </div>
        </div>
    `;

    return article;
}

fetch("https://api.github.com/users/Zahraaalmadeh/repos")
    .then(function (response) {
        if (!response.ok) {
            throw new Error("Failed to fetch GitHub repositories.");
        }
        return response.json();
    })
    .then(function (repos) {
        if (githubStatus) {
            githubStatus.textContent = "GitHub repositories loaded successfully.";
        }

        repos.slice(0, 3).forEach(function (repo) {
            const card = createGitHubCard(repo);
            projectsGrid.appendChild(card);
        });

        defaultOrder = getProjectCards();
        applyFilterAndSort();
    })
    .catch(function () {
        if (githubStatus) {
            githubStatus.textContent = "Unable to load GitHub repositories right now.";
            githubStatus.style.color = "crimson";
        }
    });

defaultOrder = getProjectCards();
applyFilterAndSort();