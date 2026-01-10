const certifications = [
    {
        title: "Cloud Security Essentials for Executives",
        issuer: "AWS Skill Builder",
        image: "assets/AWSCloudSecurityEssentialsforExecutives.png",
        link: "assets/AWSCloudSecurityEssentialsforExecutives.pdf",
        linkText: "View PDF",
        isPdf: true,
        category: "Executive Education"
    },
    {
        title: "Data For Executives",
        issuer: "AWS Skill Builder",
        image: "assets/DataForExecutives.png",
        link: "assets/DataForExecutives.pdf",
        linkText: "View PDF",
        isPdf: true,
        category: "Executive Education"
    },
    {
        title: "Cloud For Risk and Compliance Executives",
        issuer: "AWS Skill Builder",
        image: "assets/CloudforriskandcomplianceExecutices.png",
        link: "assets/CloudforriskandcomplianceExecutices.pdf",
        linkText: "View PDF",
        isPdf: true,
        category: "Executive Education"
    },
    {
        title: "Generative AI for Executives",
        issuer: "AWS Skill Builder",
        image: "assets/GenerativeAIforExecutives.png",
        link: "assets/GenerativeAIforExecutivesq.pdf",
        linkText: "View PDF",
        isPdf: true,
        category: "Executive Education"
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
    },
    {
        title: "Youth Club of Bangladesh - Conference 2025",
        issuer: "Youth Club of Bangladesh",
        image: "assets/YouthClubofBangladesh_Conference.jpg",
        link: "assets/YouthClubofBangladeshConference.pdf",
        linkText: "View PDF",
        isPdf: true,
        category: "Conferences"
    }
];

function renderCertifications() {
    const container = document.getElementById('certifications-container');
    if (!container) return;
    container.innerHTML = '';

    const grouped = certifications.reduce((acc, cert) => {
        const cat = cert.category || 'Other';
        if (!acc[cat]) acc[cat] = [];
        acc[cat].push(cert);
        return acc;
    }, {});

    for (const category in grouped) {
        // Category Heading
        const catSection = document.createElement('div');
        catSection.className = 'mb-16';
        catSection.innerHTML = `<h3 class="text-3xl font-bold text-gray-200 text-center mb-8">${category}</h3>`;

        const grid = document.createElement('div');
        grid.className = 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8';

        grouped[category].forEach((cert, index) => {
            const icon = cert.isPdf ? 'file-text' : 'external-link';
            const linkColor = cert.isPdf ? 'bg-gray-600 hover:bg-gray-700' : 'bg-purple-600 hover:bg-purple-700';
            
            // ৩টির বেশি হলে 'hidden' ক্লাস যোগ হবে
            const isHidden = index >= 3 ? 'hidden extra-cert' : '';

            grid.innerHTML += `
                <div class="glow-card bg-gray-800 p-6 rounded-xl border border-gray-700 flex flex-col h-full shadow-lg ${isHidden}">
                    <img src="${cert.image}" alt="${cert.title}" class="w-full h-40 object-cover rounded-md mb-4 border border-gray-500">
                    <h3 class="text-xl font-semibold text-white mb-2 flex-grow">${cert.title}</h3>
                    <p class="text-gray-400 text-sm mb-3">Issued by: ${cert.issuer}</p>
                    <div class="mt-auto">
                        <a href="${cert.link}" target="_blank" class="inline-flex items-center px-4 py-2 ${linkColor} text-white font-medium rounded-lg transition-all w-full justify-center">
                            ${cert.linkText} <i data-lucide="${icon}" class="w-4 h-4 ml-2"></i>
                        </a>
                    </div>
                </div>`;
        });

        catSection.appendChild(grid);

        // যদি ৩টির বেশি সার্টিফিকেট থাকে তবে বাটন যোগ হবে
        if (grouped[category].length > 3) {
            const btnContainer = document.createElement('div');
            btnContainer.className = 'text-center mt-8';
            const seeMoreBtn = document.createElement('button');
            seeMoreBtn.className = 'px-6 py-2 bg-blue-600/20 text-blue-400 border border-blue-400/50 rounded-full hover:bg-blue-600 hover:text-white transition-all font-semibold';
            seeMoreBtn.textContent = 'See More...';
            
            seeMoreBtn.onclick = () => {
                const extras = grid.querySelectorAll('.extra-cert');
                const isShowing = extras[0].classList.contains('hidden');
                
                extras.forEach(el => el.classList.toggle('hidden'));
                seeMoreBtn.textContent = isShowing ? 'See Less' : 'See More...';
            };
            
            btnContainer.appendChild(seeMoreBtn);
            catSection.appendChild(btnContainer);
        }

        container.appendChild(catSection);
    }
    lucide.createIcons();
}

document.addEventListener('DOMContentLoaded', renderCertifications);