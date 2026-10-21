// Homework 8: Advanced JavaScript Interactivity
// This file uses arrays, loops, conditionals, comparators, and DOM manipulation.

// -------------------- Step 1: Add skills from the form --------------------
const skillForm = document.getElementById("skillForm");
const skillInput = document.getElementById("skillInput");
const skillsList = document.getElementById("skillsList");
const skillMessage = document.getElementById("skillMessage");

skillForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newSkill = skillInput.value.trim();
    if (newSkill === "") {
        skillMessage.textContent = "Please enter a skill first.";
        return;
    }

    // Avoid adding the same skill twice (case-insensitive).
    const existingSkills = skillsList.querySelectorAll("li");
    for (let i = 0; i < existingSkills.length; i++) {
        if (existingSkills[i].textContent.toLowerCase() === newSkill.toLowerCase()) {
            skillMessage.textContent = "That skill is already on the list.";
            skillInput.focus();
            return;
        }
    }

    const listItem = document.createElement("li");
    listItem.className = "list-group-item";
    listItem.textContent = newSkill;
    skillsList.appendChild(listItem);

    skillMessage.textContent = `Added "${newSkill}" to your skills.`;
    skillForm.reset();
    skillInput.focus();
});

// -------------------- Step 2 and 3: Projects, loop, and status comparison --------------------
// The assignment asks for three separate arrays: titles, descriptions, and deadlines.
// Dates are placeholders for portfolio examples and can be edited to match real projects.
const projectTitles = [
    "Portfolio Website",
    "JavaScript Skills Tracker",
    "CS Capstone Prototype"
];

const projectDescriptions = [
    "Built a responsive personal portfolio using HTML, CSS, Bootstrap, and JavaScript.",
    "Practicing form handling, arrays, loops, comparison operators, and DOM updates.",
    "Exploring a prototype for a localized networking layout for mobile applications."
];

const projectDeadlines = [
    "2026-09-15", // Past date: will display Completed.
    "2026-12-15", // Future date: will display Ongoing.
    "2027-05-01"  // Future date: will display Ongoing.
];

function displayProjects() {
    const projectList = document.getElementById("projectList");
    projectList.replaceChildren();

    // Compare date-only values to today's date without time-of-day differences.
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let i = 0; i < projectTitles.length; i++) {
        const deadlineDate = new Date(projectDeadlines[i] + "T00:00:00");
        let status;

        if (deadlineDate > today) {
            status = "Ongoing";
        } else if (deadlineDate < today) {
            status = "Completed";
        } else {
            // A deadline on today's date is not in the past, so it remains ongoing.
            status = "Ongoing";
        }

        const column = document.createElement("div");
        column.className = "col-12 col-md-6 col-xl-4";

        const card = document.createElement("article");
        card.className = "card h-100 shadow-sm hover-card";

        const cardBody = document.createElement("div");
        cardBody.className = "card-body d-flex flex-column";

        const title = document.createElement("h3");
        title.className = "h5 card-title fw-bold";
        title.textContent = projectTitles[i];

        const description = document.createElement("p");
        description.className = "card-text body-font flex-grow-1";
        description.textContent = projectDescriptions[i];

        const deadline = document.createElement("p");
        deadline.className = "mb-2";
        deadline.textContent = `Deadline: ${projectDeadlines[i]}`;

        const statusBadge = document.createElement("span");
        statusBadge.className = status === "Ongoing"
            ? "badge bg-primary align-self-start"
            : "badge bg-success align-self-start";
        statusBadge.textContent = status;

        cardBody.append(title, description, deadline, statusBadge);
        card.appendChild(cardBody);
        column.appendChild(card);
        projectList.appendChild(column);
    }
}

displayProjects();

// -------------------- Step 4: Resume download counter --------------------
let resumeDownloadCount = 0;
const downloadButton = document.getElementById("downloadBtn");
const downloadCountDisplay = document.getElementById("downloadCount");

downloadButton.addEventListener("click", function () {
    // The browser's normal download action is not prevented.
    resumeDownloadCount++;
    downloadCountDisplay.textContent = resumeDownloadCount;
});

// -------------------- Step 5: Build Experience and Education tables --------------------
const educationEntries = [
    {
        school: "Northern Arizona University",
        degree: "Bachelor of Science in Computer Science",
        start: "2026",
        end: "Present",
        status: "In Progress"
    },
    {
        school: "Coconino Community College",
        degree: "Associate's Degree in General Studies - Science",
        start: "Completed",
        end: "2026",
        status: "Completed"
    },
    {
        school: "Coconino High School",
        degree: "High School Diploma",
        start: "Completed",
        end: "Completed",
        status: "Completed"
    }
];

const experienceEntries = [
    {
        company: "Dish/EchoStar",
        role: "Remote Field Technician",
        start: "May 2026",
        end: "Present"
    },
    {
        company: "NovaKinetics Aerosystems",
        role: "Composite Technician",
        start: "Jan 2024",
        end: "Feb 2026"
    },
    {
        company: "TriState Communications",
        role: "Cable Technician",
        start: "Aug 2021",
        end: "Dec 2023"
    },
    {
        company: "Legacy Beverage / Kalil Bottling Co.",
        role: "Merchandiser",
        start: "Apr 2020",
        end: "Jul 2021"
    },
    {
        company: "Arizona Central Credit Union",
        role: "Teller",
        start: "Jul 2017",
        end: "Jun 2018"
    }
];

function createDataTable(containerId, headings, entries, keys) {
    const container = document.getElementById(containerId);
    const table = document.createElement("table");
    table.className = "table table-hover table-striped align-middle border";

    const thead = document.createElement("thead");
    thead.className = "table-secondary text-uppercase font-xs";
    const headerRow = document.createElement("tr");

    for (let i = 0; i < headings.length; i++) {
        const th = document.createElement("th");
        th.scope = "col";
        th.textContent = headings[i];
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    tbody.className = "body-font text-secondary";

    // Loop through each entry and create a row and its cells.
    for (let i = 0; i < entries.length; i++) {
        const row = document.createElement("tr");
        for (let j = 0; j < keys.length; j++) {
            const cell = document.createElement("td");
            cell.textContent = entries[i][keys[j]];
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }

    table.appendChild(tbody);
    container.replaceChildren(table);
}

createDataTable(
    "educationTable",
    ["School / University", "Degree", "Start Date", "End Date", "Status"],
    educationEntries,
    ["school", "degree", "start", "end", "status"]
);

createDataTable(
    "experienceTable",
    ["Company", "Job Title / Role", "Start Date", "End Date"],
    experienceEntries,
    ["company", "role", "start", "end"]
);

// -------------------- Bonus: Theme, font size, and background controls --------------------
const themeToggle = document.getElementById("themeToggle");
let darkThemeEnabled = false;

themeToggle.addEventListener("click", function () {
    darkThemeEnabled = !darkThemeEnabled;
    document.body.classList.toggle("dark-theme", darkThemeEnabled);
    themeToggle.textContent = darkThemeEnabled ? "Switch to Light Theme" : "Switch to Dark Theme";
});

document.getElementById("fontSizeInput").addEventListener("change", function (event) {
    document.body.style.fontSize = event.target.value;
});

document.getElementById("backgroundInput").addEventListener("input", function (event) {
    if (!darkThemeEnabled) {
        document.body.style.backgroundColor = event.target.value;
    }
});
