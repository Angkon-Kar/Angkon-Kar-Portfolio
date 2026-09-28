// ==========================================
// Shared Extension Data
// Used by: extensions.html, extension-detail.html
// Add a new extension by adding one object below — no other file needs
// editing, extension-detail.html builds its page automatically.
//
// gallery: 2-3 screenshot paths (assets/extensions/<name>/1.png etc.)
// storeLink: direct link on Microsoft Edge Add-ons / Chrome Web Store / etc.
// downloadLink: direct .zip download path (put the zip in assets/extensions/)
// setupSteps: step-by-step install guide. Add an "image" path to a step
// once you have a screenshot for it — leave it out for now and add later,
// every extension can follow the same steps structure.
// ==========================================

const extensions = [
    {
        id: 1,
        title: "Deep Focus Timer",
        shortDescription: "A Pomodoro-based focus timer with a built-in to-do list and session analytics.",
        longDescription: `Deep Focus Timer helps you stay productive with a Pomodoro-based focus timer, a built-in to-do list, and visual session analytics — all in one lightweight extension.

Key features include:
- Pomodoro timer with automatic short/long break cycles
- Stopwatch mode for open-ended work sessions
- Simple to-do list saved locally in your browser
- Weekly stats chart showing your completed focus sessions
- Customizable session lengths and break intervals
- Desktop notifications when a session or break ends
- Three color themes (Dark Night, Ocean Blue, Forest Green)

All your tasks, settings, and stats stay on your device — nothing is sent to any server. No account or sign-up required.`,
        image: "assets/extensions/DeepFocus/DeepFocus.png",
        gallery: [
            "assets/extensions/DeepFocus/DeepFocus.png"
        ],
        storeName: "Microsoft Edge Add-ons",
        storeLink: "https://microsoftedge.microsoft.com/addons/detail/deep-focus-timer/cpkapfgbhpcckbpgebffkfacoblpbkkk",
        downloadLink: "assets/extensions/DeepFocus/deep-focus-timer.zip",
        technologies: ["JavaScript", "Manifest V3", "HTML", "CSS"],
        setupSteps: [
            {
                title: "Download",
                icon: "download",
                description: "Click the \"Download ZIP\" button above, or grab it from the store link, and save the file somewhere you can find it.",
                image: ""
            },
            {
                title: "Extract ZIP",
                icon: "folder-open",
                description: "Right-click the downloaded .zip file and choose \"Extract All\" (Windows) or double-click it (Mac) to unzip it into its own folder.",
                tip: "Remember where you extracted it — the browser reads the extension from this folder, so don't delete it later.",
                image: ""
            },
            {
                title: "Open Extensions",
                icon: "settings",
                description: "Open your browser's extensions page (paste the address below into a new tab), then turn on \"Developer mode\" using the toggle in the corner.",
                copy: "edge://extensions",
                tip: "Using Chrome? Use chrome://extensions instead.",
                image: ""
            },
            {
                title: "Load Unpacked",
                icon: "upload",
                description: "Click \"Load unpacked\", then select the folder you extracted in step 2. The extension will now appear in your toolbar.",
                image: ""
            },
            {
                title: "Pin & Enjoy",
                icon: "pin",
                description: "Click the puzzle-piece icon in your browser toolbar and pin the extension so it's always visible. You're ready to use it!",
                image: ""
            }
        ]
    }
];