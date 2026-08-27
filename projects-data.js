// ==========================================
// Shared Project Data
// Used by: index.html, projects.html, project-detail.html
// Add a new project by adding one object below — no other file needs editing
// (project-detail.html builds itself from this data automatically).
// ==========================================

const projects = [
    {
        id: 1,
        title: "Task Manager Web App 🚀",
        description: "A simple Task Management application built using HTML, CSS, and JavaScript with localStorage for data persistence.",
        longDescription: `📝 Advanced Task Manager\n\nA modern, feature-rich Task Manager / To-Do List Web App built with HTML, CSS, and Vanilla JavaScript. This project goes beyond a simple to-do list, providing categories, priorities, recurrence, bulk actions, import/export, and progress tracking — all wrapped in a responsive and animated UI.\n\n✨ Features:\n🔧 Task Management: Add, Edit, Delete (with fade-out animation), and Mark complete.\n🏷️ Categories & Priorities: Work, Personal, Study with color-coded badges.\n📅 Smart Due Dates: Overdue highlights and sorting.\n📊 Productivity Tools: Progress Tracker and Bulk Actions.\n🔁 Recurring Tasks: Supports daily, weekly, and monthly recurrence.\n💾 Data Handling: LocalStorage persistence and JSON Import/Export.\n🖥️ UI & UX: Modern responsive layout with smooth animations.`,
        image: "assets/project-photo/task-management-photo.png",
        gallery: ["assets/project-photo/task-management-photo.png"],
        liveDemo: "https://aktaskmanage.netlify.app/",
        github: "https://github.com/Angkon-Kar/Task_Manager",
        technologies: ["HTML5", "CSS3", "Vanilla JavaScript(ES6)"],
        category: "Web Development"
    },
    {
        id: 2,
        title: "☕ Coffee Ordering System",
        description: "A feature-rich C++ console application simulating a real-world coffee shop checkout with cart management and dynamic pricing.",
        longDescription: `☕ Advanced Coffee Ordering System (C++)\n\nA comprehensive CLI application that demonstrates strong core programming logic, control structures, and robust user input validation. It simulates a complete cafe ordering experience.\n\n✨ Key Features (Version 5):\n☕ 8-Item Menu: Wide variety with size guides (Demi → Trenta).\n📐 Dynamic Pricing: 6 size options with automatic price upcharge.\n🥛 Customizations: Milk options (Soy/Regular/Almond) and Temperature (Hot/Iced).\n🛒 Cart Management: Add or remove items before final checkout.\n⭐ Loyalty System: Earn 1 pt per $1, redeemable every 50 pts.\n🎁 Offers: Bulk order rewards (>10 items = free small cup) & 10% Student Discount.\n🧾 Smart Checkout: Formatted receipt with unique Order ID and date.\n⏳ UI Polish: Animated barista progress bar in the console.\n✅ Bulletproof Input: Full input validation ensuring zero crashes on invalid user entries.`,
        image: "assets/project-photo/coffee-ordering-system-output.png",
        gallery: ["assets/project-photo/coffee-ordering-system-output.png"],
        liveDemo: "",
        github: "https://github.com/Angkon-Kar/Coffee-Ordering-System",
        technologies: ["C++", "CLI", "Data Structures", "OOP"],
        category: "C++ & DSA"
    },
    {
        id: 3,
        title: "🔐 Register-Login Page",
        description: "A simple, responsive Register and Login Page built using HTML, CSS, and JavaScript.",
        longDescription: "এই প্রোজেক্টটি মূলত ফ্রন্টএন্ড ফর্ম ভ্যালিডেশন এবং রেসপনসিভ ইউজার ইন্টারফেস ডিজাইনের ওপর ভিত্তি করে তৈরি। এতে পাসওয়ার্ড শো/হাইড ফিচার এবং ক্লায়েন্ট-সাইড ডাটা ভ্যালিডেশন চেক করা হয়েছে।",
        image: "assets/login-preview.png",
        gallery: ["assets/login-preview.png"],
        liveDemo: "https://akregisterloginpage1.netlify.app/",
        github: "https://github.com/Angkon-Kar/Register-Login-Page",
        technologies: ["HTML", "CSS", "JavaScript"],
        category: "Web Development"
    },
    {
        id: 4,
        title: "Tic-Tac-Toe: Multi-Mode Game",
        description: "A classic Tic-Tac-Toe game built with HTML, CSS, and JavaScript, featuring three exciting game modes.",
        longDescription: "ক্লাসিক টিক-ট্যাক-টো গেমের একটি আধুনিক সংস্করণ। এতে ৩টি মোড রয়েছে: ১. লোকাল মাল্টিপ্লেয়ার, ২. অনলাইন মাল্টিপ্লেয়ার (Firebase integration), এবং ৩. প্লেয়ার বনাম এআই (AI)।",
        image: "assets/tictactoe-preview.png",
        gallery: ["assets/tictactoe-preview.png"],
        liveDemo: "https://aktictactoegame.netlify.app/",
        github: "https://github.com/Angkon-Kar/Tic-Tac-Toe",
        technologies: ["HTML", "CSS", "JavaScript", "Firebase"],
        category: "Web Development"
    },
    {
        id: 5,
        title: "🎮 The Labyrinth Dream: Maze Game",
        description: "A procedural maze generator and game built with C++ and SFML, featuring multiple difficulty levels and DFS algorithm.",
        longDescription: `🎮 The Labyrinth Dream: A Procedural Maze Generator & Game\n\nA visually engaging 2D maze game developed using C++ and the SFML library. The game generates unique mazes procedurally using the Depth-First Search (DFS) algorithm, ensuring a new challenge every time.\n\n✨ Key Features:\n🧩 Procedural Generation: Unique mazes generated dynamically using DFS.\n🎚️ Multiple Difficulties: Choose from Easy, Medium, and Hard levels.\n🏃 Smooth Gameplay: Fluid player movement and collision detection.\n🏆 Game States: Clear visual feedback upon successfully escaping the maze.\n🖥️ Graphics: Clean 2D rendering utilizing the Simple and Fast Multimedia Library (SFML).\n🧠 Algorithmic Focus: Demonstrates practical application of graph traversal algorithms.`,
        image: "assets/project-photo/maze-game.png",
        gallery: ["assets/project-photo/maze-game.png"],
        liveDemo: "",
        github: "https://github.com/Angkon-Kar/Maze-Game",
        technologies: ["C++", "SFML", "DFS Algorithm", "OOP"],
        category: "C++ & DSA"
    },
    {
        id: 6,
        title: "Dot Connect Game",
        description: "Modern version of the classic childhood game, showcasing a full-stack, real-time multiplayer experience.",
        longDescription: "এটি একটি মাল্টিপ্লেয়ার গেম যা Socket.IO এবং Node.js ব্যবহার করে রিয়েল-টাইমে কাজ করে। ইউজাররা রুম কোড ব্যবহার করে বন্ধুদের সাথে অনলাইনে সরাসরি খেলতে পারেন।",
        image: "assets/dotconnect-preview.png",
        gallery: ["assets/dotconnect-preview.png"],
        liveDemo: "https://dotconnectgame.netlify.app/",
        github: "https://github.com/Angkon-Kar/Dot-Connect-Game",
        technologies: ["HTML", "CSS", "JavaScript", "Node.js", "Socket.IO"],
        category: "Full Stack"
    }
];