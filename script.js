// Initialize Lucide icons
lucide.createIcons();

// Dynamically update the current year in the footer
document.getElementById('current-year').textContent = new Date().getFullYear();

// Data for the certifications
const certifications = [
    {
        title: "Cloud Security Essentials for Executives",
        issuer: "AWS Skill Builder",
        image: "assets/AWSCloudSecurityEssentialsforExecutives.png",
        link: "assets/AWSCloudSecurityEssentialsforExecutives.pdf",
        linkText: "View PDF",
        isPdf: true,
        category: "Cloud"
    },
    {
        title: "The Complete ChatGPT Guide From Zero to Hero - 2023",
        issuer: "Udemy",
        image: "assets/TheCompleteChatGPTGuideFromZerotoHero2023.png",
        link: "https://www.udemy.com/certificate/UC-10aa6b78-fe0e-4576-aa12-2791cd6306e3/",
        linkText: "Verify",
        isPdf: false,
        category: "AI & Machine Learning"
    },
    {
        title: "Intro to ChatGPT: The Essential Skills for Getting Started",
        issuer: "Udemy",
        image: "assets/IntrotoChatGPT.png",
        link: "https://www.udemy.com/certificate/UC-53a50882-6e01-4f8e-bf0f-01c508bf4623/",
        linkText: "Verify",
        isPdf: false,
        category: "AI & Machine Learning"
    },
    {
        title: "ChatGPT: Complete ChatGPT Guide For Beginners",
        issuer: "Udemy",
        image: "assets/CompleteChatGPTGuideForBeginners.png",
        link: "https://www.udemy.com/certificate/UC-a7013e36-04c1-4dbf-a6d1-920d15f67e06/",
        linkText: "Verify",
        isPdf: false,
        category: "AI & Machine Learning"
    },
    {
        title: "Learn CSS - For Beginners",
        issuer: "Udemy",
        image: "assets/LearnCSSForBeginners.png",
        link: "https://www.udemy.com/certificate/UC-3f8ebcf6-accb-4136-bba2-82d711c65b29/",
        linkText: "Verify",
        isPdf: false,
        category: "Web Development"
    },
    {
        title: "HTML and CSS for Beginners From Basic to Advance",
        issuer: "Udemy",
        image: "assets/HTMLandCSSforBeginnersFromBasictoAdvance.png",
        link: "https://www.udemy.com/certificate/UC-0812335c-1523-492c-b4e9-e491b6fcb5a6/",
        linkText: "Verify",
        isPdf: false,
        category: "Web Development"
    },
    {
        title: "Coding Basics: Gentle Intro to Computer Programming",
        issuer: "Udemy",
        image: "assets/CodingBasicsGentleIntrotoComputerProgramming.png",
        link: "https://www.udemy.com/certificate/UC-99966ae0-56e5-4830-a8bd-d2d0fdb028d9/",
        linkText: "Verify",
        isPdf: false,
        category: "Programming Basics"
    }
];

// Function to generate and render certification cards by category
function renderCertifications() {
    const certificationsContainer = document.getElementById('certifications-container');
    if (!certificationsContainer) {
        // This check prevents an error if the script runs on a page without this container
        return;
    }
    certificationsContainer.innerHTML = ''; // Clear previous content

    // Group certifications by category
    const groupedCertifications = certifications.reduce((acc, cert) => {
        const category = cert.category || 'Other';
        if (!acc[category]) {
            acc[category] = [];
        }
        acc[category].push(cert);
        return acc;
    }, {});

    // Render each category and its certifications
    for (const category in groupedCertifications) {
        if (groupedCertifications.hasOwnProperty(category)) {
            const certsInCategory = groupedCertifications[category];

            // Create a heading for the category
            const categoryHeading = document.createElement('div');
            categoryHeading.className = 'col-span-1 md:col-span-2 lg:col-span-3 text-center mt-10 mb-6';
            categoryHeading.innerHTML = `<h3 class="text-3xl font-bold text-gray-200">${category}</h3>`;
            certificationsContainer.appendChild(categoryHeading);

            // Create a new grid for the certificates in this category
            const categoryGrid = document.createElement('div');
            categoryGrid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

            certsInCategory.forEach(cert => {
                const icon = cert.isPdf ? 'file-text' : 'external-link';
                const linkColor = cert.isPdf ? 'bg-gray-600 hover:bg-gray-700' : 'bg-purple-600 hover:bg-purple-700';

                const certificationCard = `
                    <div class="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                        <img
                            src="${cert.image}"
                            alt="${cert.title} Certificate Image"
                            class="w-full h-40 object-cover rounded-md mb-4 border border-gray-500"
                            onerror="this.onerror=null;this.src='https://placehold.co/400x300/374151/d1d5db?text=Image+Not+Found';"
                        />
                        <h3 class="text-xl font-semibold text-white mb-2 flex-grow">
                            ${cert.title}
                        </h3>
                        <p class="text-gray-400 text-sm mb-3">Issued by: ${cert.issuer}</p>
                        <div class="mt-auto flex space-x-2">
                            <a
                                href="${cert.link}"
                                target="_blank"
                                rel="noopener noreferrer"
                                class="inline-flex items-center px-4 py-2 ${linkColor} text-white font-medium rounded-lg transition-colors duration-300 transform hover:scale-105 shadow-md"
                            >
                                ${cert.linkText} <i data-lucide="${icon}" class="w-4 h-4 ml-2"></i>
                            </a>
                        </div>
                    </div>
                `;
                categoryGrid.innerHTML += certificationCard;
            });
            certificationsContainer.appendChild(categoryGrid);
        }
    }
    
    // Re-render lucide icons after injecting new HTML
    lucide.createIcons();
}

// Check if the certifications page is being loaded and run the function
document.addEventListener('DOMContentLoaded', () => {
    // Check if the element exists before trying to render
    if (document.getElementById('certifications-container')) {
        renderCertifications();
    }
});


// Data for the projects
const projects = [
    {
        title: "Task Manager Web App 🚀",
        description: "A simple Task Management application built using HTML, CSS, and JavaScript with localStorage for data persistence. It is a real professional task manager: CRUD + search + filter + sort + edit + due date tracking + nice UI.",
        liveDemo: "https://aktaskmanage.netlify.app/",
        github: "https://github.com/Angkon-Kar/Task_Manager",
        technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "🔐 Register-Login Page",
        description: "A simple, responsive Register and Login Page built using HTML, CSS, and JavaScript. This project demonstrates basic frontend form handling, UI design, and client-side validation principles.",
        liveDemo: "https://akregisterloginpage1.netlify.app/",
        github: "https://github.com/Angkon-Kar/Register-Login-Page",
        technologies: ["HTML", "CSS", "JavaScript"]
    },
    {
        title: "Tic-Tac-Toe: Multi-Mode Game",
        description: "A classic Tic-Tac-Toe game built with HTML, CSS, and JavaScript, featuring three exciting game modes: Local 2-Player, Online 2-Player, and Player vs. Computer (AI).",
        liveDemo: "https://aktictactoegame.netlify.app/",
        github: "https://github.com/Angkon-Kar/Tic-Tac-Toe",
        technologies: ["HTML", "CSS", "JavaScript", "Firebase"]
    },
    {
        title: "Dot Connect Game",
        description: "This is a modern, web-based version of the classic childhood game, Dot Connect (also known as Dots and Boxes). The project is built to showcase a full-stack, real-time multiplayer experience. Players can enjoy local games, challenge an AI, or compete against friends online in a real-time multiplayer lobby.",
        liveDemo: "https://dotconnectgame.netlify.app/",
        github: "https://github.com/Angkon-Kar/Dot-Connect-Game",
        technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Express", "Socket.IO"]
    }
];

// Function to render projects
function renderProjects(filter = 'All') {
    const projectsContainer = document.getElementById('projects-container');
    const filtersContainer = document.getElementById('filters-container');

    if (!projectsContainer || !filtersContainer) {
        return; // Return if we are not on the projects page
    }

    // Clear previous content
    projectsContainer.innerHTML = '';

    // Get all unique technologies from the projects data
    const allTechnologies = projects.reduce((acc, project) => {
        project.technologies.forEach(tech => {
            if (!acc.includes(tech)) {
                acc.push(tech);
            }
        });
        return acc;
    }, ['All']); // Start with 'All' filter

    // Render filter buttons if they don't already exist
    if (filtersContainer.children.length === 0) {
        allTechnologies.forEach(tech => {
            const button = document.createElement('button');
            button.textContent = tech;
            button.classList.add(
                'px-4', 'py-2', 'rounded-full', 'font-semibold',
                'transition-colors', 'duration-300'
            );
            
            // Add click event listener to filter
            button.addEventListener('click', () => {
                renderProjects(tech); // Re-render projects with the new filter
                // Update active button style
                document.querySelectorAll('#filters-container button').forEach(btn => {
                    btn.classList.remove('bg-blue-600', 'text-white');
                    btn.classList.add('bg-gray-700', 'text-gray-300', 'hover:bg-gray-600');
                });
                button.classList.remove('bg-gray-700', 'text-gray-300', 'hover:bg-gray-600');
                button.classList.add('bg-blue-600', 'text-white');
            });
            filtersContainer.appendChild(button);
        });
    }

    // Filter the projects based on the selected technology
    const filteredProjects = projects.filter(project => {
        return filter === 'All' || project.technologies.includes(filter);
    });

    // Generate and render the filtered project cards
    filteredProjects.forEach(project => {
        // Create technology tags HTML
        const techTagsHtml = project.technologies.map(tech => `
            <span class="bg-gray-700 text-gray-300 text-sm font-medium px-2.5 py-0.5 rounded-full">
                ${tech}
            </span>
        `).join('');

        const projectCard = `
            <div class="bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-700 transform hover:-translate-y-2 transition-transform duration-300 flex flex-col">
                <h3 class="text-2xl font-semibold text-white mb-3">${project.title}</h3>
                <p class="text-gray-400 mb-4 flex-grow">${project.description}</p>
                <div class="flex flex-wrap gap-2 mb-4">
                    ${techTagsHtml}
                </div>
                <div class="flex space-x-4 mt-auto">
                    <a
                        href="${project.liveDemo}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-300 transform hover:scale-105 shadow-md"
                    >
                        Live Demo <i data-lucide="external-link" class="w-4 h-4 ml-2"></i>
                    </a>
                    <a
                        href="${project.github}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="inline-flex items-center px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white font-medium rounded-lg transition-colors duration-300 transform hover:scale-105 shadow-md"
                    >
                        GitHub <i data-lucide="github" class="w-4 h-4 ml-2"></i>
                    </a>
                </div>
            </div>
        `;
        projectsContainer.innerHTML += projectCard;
    });

    // Re-render lucide icons after injecting new HTML
    lucide.createIcons();
}

// Initial call to render projects and filters on page load
document.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('projects-container')) {
        renderProjects();
    }
});