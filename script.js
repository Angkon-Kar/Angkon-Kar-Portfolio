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