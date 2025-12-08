
document.addEventListener('DOMContentLoaded', () => {

    // --- DATA STORE ---
    const pageData = {
        home: {
            title: "Welcome to My Personal Website",
            image: "pexels-photo-546819.webp",
            content: `
                <p>I'm Cipher. By day, I architect the future of the web, fusing clean code with artificial intelligence to create intelligent, dynamic websites.</p>
                <p>By night, I'm a digital archivist, preserving the legacy of classic video games for a new generation. This space is the intersection of my two passions: building the new and celebrating the old. Explore my projects and my curated collection of gaming history.</p>
            `
        },
        websites: {
            title: "Web Development Showcase",
            image: "pexels-photo-1779487.webp",
            content: `
                <div class="project-card">
                    <h3>Mega Man Star Force 3</h3>
                    <p>A comprehensive and interactive fan-made website dedicated to the Nintendo DS classic. This project features details of Games, and character bios, all presented in a modern, futuristic interface that pays homage to the game's aesthetic.</p>
                    <a href="https://cipher95.github.io/Mega-Man-Star-Force-3/" target="_blank">View Project</a>
                </div>
                 <div class="project-card">
                    <h3>Mega Man Star Force Legacy Collection</h3>
                    <p>A conceptual promotional site for a hypothetical "Legacy Collection." This single-page application showcases a sleek design, animations, and an interactive timeline detailing the history of the Star Force series, demonstrating skills in modern front-end development and UI/UX design.</p>
                    <a href="https://cipher95.github.io/Mega-Man-Star-Force-Legacy-Collection/" target="_blank">View Project</a>
                </div>
                 <div class="project-card">
                    <h3>Ace Combat Zero: The Belkan War</h3>
                    <p>An immersive story-focused website that dives deep into the lore of Ace Combat Zero. It features detailed dossiers on legendary ace pilots, and a gallery of in-game aircraft, all woven together with a narrative-driven presentation.</p>
                    <a href="https://cipher95.github.io/Ace-Combat-Zero-The-Belkan-War/" target="_blank">View Project</a>
                </div>
                 <div class="project-card">
                    <h3>MechWarrior 2: 31st Century Combat</h3>
                    <p>A retro-themed tribute to the 1995 PC gaming titan. This site faithfully recreates the game's iconic 90s interface while providing detailed information on Mechs, Clan information, and weapon systems. It even includes an embedded MIDI player with the classic soundtrack.</p>
                    <a href="https://cipher95.github.io/MechWarrior-2-31st-Century-Combat/" target="_blank">View Project</a>
                </div>
		<div class="project-card">
                    <h3>MMSF3 Grand Tournament 2025</h3>
                    <p></p>
                    <a href="https://cipher95.github.io/MMSF3-Grand-Tournament-2025/" target="_blank">View Project</a>
                </div>
            `
        },
        
		videos: {
            title: "Retro Gaming Archive",
            image: "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            intro: `<p>Welcome to my collection of classic and retro game clips. This channel is dedicated to preserving gaming history, one moment at a time. Here are a few highlights:</p>`,
            videoList: [
                { title: "PS1 Emulator (DuckStation) - Air Combat [Hard] (Longplay)", videoId: "_lPGVdE__tc?si=vfKSK361wA9joT4T" },
                { title: "PS1 Emulator (DuckStation) - Ace Combat 2 [Hard]", videoId: "88CGhXFs5UA?si=iYLLaIPWT3wXjSsr" },
                { title: "PS1 Emulator (DuckStation) - Sidewinder 2 [Hard] (Longplay)", videoId: "bFZ-fx2ivsc?si=DCttmFGP7PLd2N8r" }
            ]
        }
    };

    // --- ELEMENT SELECTORS ---
    const contentArea = document.getElementById('content-area');
    const navLinks = document.querySelectorAll('.nav-link');
    const clockElement = document.getElementById('clock');
    const dateDayElement = document.getElementById('date-day');
    const backToTopBtn = document.getElementById('back-to-top-btn');

	 // --- FUNCTIONS ---

    /**
     * Builds and sets up the interactive video player.
     * @param {object} videoData - The video data object from pageData.
     */
    function setupVideoPlayer(videoData) {
        const videoDisplay = document.getElementById('video-display-area');
        if (!videoDisplay || !videoData.videoList || videoData.videoList.length === 0) return;

        // Create navigation buttons
        const navButtonsHTML = videoData.videoList.map((video, index) =>
            `<button class="video-nav-btn ${index === 0 ? 'active' : ''}" data-video-id="${video.videoId}">${video.title}</button>`
        ).join('');

        const firstVideoId = videoData.videoList[0].videoId;

        // Create the full player HTML
        const playerHTML = `
            <div class="video-nav-container">
                ${navButtonsHTML}
            </div>
            <div class="video-container">
                <iframe id="youtube-player" src="https://www.youtube.com/embed/${firstVideoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            </div>
        `;

        videoDisplay.innerHTML = playerHTML;

        // Add event listeners to the new buttons
        const videoNavButtons = videoDisplay.querySelectorAll('.video-nav-btn');
        videoNavButtons.forEach(button => {
            button.addEventListener('click', () => {
                const videoId = button.getAttribute('data-video-id');
                const playerFrame = document.getElementById('youtube-player');
                playerFrame.src = `https://www.youtube.com/embed/${videoId}`;

                // Update active state
                videoNavButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
            });
        });
    }

    /**
     * Switches the content displayed in the main area.
     * @param {string} pageKey - The key corresponding to the data in pageData.
     */
    function switchContent(pageKey) {
        const data = pageData[pageKey];
        if (!data) return;

        contentArea.classList.add('fade-out');

        setTimeout(() => {
            let contentHTML;
            // Special handling for the video page to include our dynamic area
            if (pageKey === 'videos') {
                contentHTML = `${data.intro}<div id="video-display-area"></div>`;
            } else {
                contentHTML = data.content;
            }

            const html = `
                <div class="content-wrapper">
                    <div class="content-image">
                        <img src="${data.image}" alt="${data.title}">
                    </div>
                    <div class="content-text">
                        <h2>${data.title}</h2>
                        ${contentHTML}
                    </div>
                </div>
            `;
            contentArea.innerHTML = html;

            // If it's the video page, initialize the player
            if (pageKey === 'videos') {
                setupVideoPlayer(data);
            }

            contentArea.classList.remove('fade-out');
        }, 300);
    }

    /**
     * Updates the clock and date display.
     */
    function updateClock() {
        const now = new Date();
        const timeOptions = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
        const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

        const timeString = now.toLocaleTimeString('en-US', timeOptions);
        const dateDayString = now.toLocaleDateString('en-US', dateOptions);

        clockElement.textContent = timeString;
        dateDayElement.textContent = dateDayString;
    }

    /**
     * Shows or hides the 'back to top' button based on scroll position.
     */
    function handleBackToTopButton() {
        if (window.scrollY > 200) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    /**
     * Smoothly scrolls the window to the top.
     */
    function scrollToTop() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    }

    /**
     * Initializes the application.
     */
    function initialize() {
        // Load the default page content ('home')
        switchContent('home');

        // Update the clock immediately and then every second
        updateClock();
        setInterval(updateClock, 1000);

        // Add event listeners for the back to top button
        window.addEventListener('scroll', handleBackToTopButton);
        backToTopBtn.addEventListener('click', scrollToTop);

        // Attempt to play audio on load
        playAudio();
    }

    // --- EVENT LISTENERS & INITIALIZATION ---

    // Set up navigation link clicks
    navLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            const page = link.getAttribute('data-page');
            switchContent(page);
        });
    });

    // --- BACKGROUND MUSIC HANDLER ---
    const backgroundMusic = document.getElementById('bg-music');

    function playAudio() {
        if (backgroundMusic && backgroundMusic.paused) {
            backgroundMusic.play().catch(error => {
                console.log("Autoplay was blocked by the browser. A user interaction is required to play audio.");
                document.body.addEventListener('click', playAudio, { once: true });
            });
        }
    }

    // Initialize the page
    initialize();

});



