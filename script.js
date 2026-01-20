
document.addEventListener('DOMContentLoaded', () => {

    // --- NEW: Added Gemini 1.5 Flash page data ---
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
		
            `
        },
		videos: {
            title: "Retro Gaming Archive",
            image: "https://images.pexels.com/photos/735911/pexels-photo-735911.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
            intro: `<p>Welcome to my collection of classic and retro game clips. This channel is dedicated to preserving gaming history, one moment at a time. Here are a few highlights:</p>`,
            videoList: [
                { title: "PS1 Emulator (DuckStation) - Air Combat [Hard] (Longplay)", videoId: "_lPGVdE__tc?si=vfKSK361wA9joT4T" },
                { title: "PS1 Emulator (DuckStation) - Ace Combat 2 [Hard] (Longplay)", videoId: "88CGhXFs5UA?si=iYLLaIPWT3wXjSsr" },
                { title: "PS1 Emulator (DuckStation) - Sidewinder 2 [Hard] (Longplay)", videoId: "bFZ-fx2ivsc?si=DCttmFGP7PLd2N8r" },
				{ title: "PS1 Emulator (DuckStation) - Ace Combat 3: Electrosphere [Hard] (Part 1/5)", videoId: "mqsrsvp90mg?si=SWRh75DpKMfh41an" }
            ]
        },
        // --- NEW ---
        gemini: {
            title: "Connect with Gemini 1.5 Flash",
            image: "https://images.pexels.com/photos/8566472/pexels-photo-8566472.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2", // A futuristic AI-themed image
            content: `
                <p>Interact directly with a powerful AI. Ask complex questions, get help with code, brainstorm ideas, or translate languages. This interface is connected to the Gemini 1.5 Flash model via a secure backend.</p>
                <div id="gemini-container">
                    <textarea id="gemini-prompt" placeholder="Enter your prompt for Gemini..."></textarea>
                    <button id="gemini-submit-btn">Send to AI</button>
                    <div id="gemini-response">The AI's response will appear here...</div>
                </div>
            `
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

     // --- CHATBOT FUNCTIONALITY ---
    const chatbotToggleBtn = document.getElementById('chatbot-toggle-btn');
    const chatbotPopup = document.getElementById('chatbot-popup');
    const chatbotCloseBtn = document.getElementById('chatbot-close-btn');
    const chatbotMessages = document.getElementById('chatbot-messages');
    const chatbotInput = document.getElementById('chatbot-input');
    const chatbotSendBtn = document.getElementById('chatbot-send-btn');

    // **UPDATED**: Toggle the 'active' class to show/hide the popup with animation
    chatbotToggleBtn.addEventListener('click', () => {
        chatbotPopup.classList.toggle('active');
        
        // Add a welcome message only if the chat is empty and the popup is being opened
        if (chatbotPopup.classList.contains('active') && chatbotMessages.children.length === 0) {
            setTimeout(() => {
                addMessage("Hello! I'm CipherBot. You can ask me about Cipher, his projects, or the videos on this site.", 'bot');
            }, 300); // Delay to allow the popup to animate in
        }
    });

    // **UPDATED**: Remove the 'active' class to hide the popup
    chatbotCloseBtn.addEventListener('click', () => {
        chatbotPopup.classList.remove('active');
    });

    chatbotSendBtn.addEventListener('click', handleUserMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            handleUserMessage();
        }
    });

    function handleUserMessage() {
        const message = chatbotInput.value.trim();
        if (message) {
            addMessage(message, 'user');
            chatbotInput.value = '';
            getBotResponse(message);
        }
    }

    function addMessage(message, sender) {
        const messageElement = document.createElement('div');
        messageElement.classList.add('chatbot-message', `${sender}-message`);
        messageElement.innerHTML = message; // Use innerHTML to allow for links
        chatbotMessages.appendChild(messageElement);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    // This is your original hard-coded chatbot. We will leave it as is.
    function getBotResponse(userMessage) {
        const lowerCaseMessage = userMessage.toLowerCase();
        let botMessage;

        if (lowerCaseMessage.includes('hello') || lowerCaseMessage.includes('hi')) {
            botMessage = "Hello! I'm CipherBot. How can I help you today?";
        } else if (lowerCaseMessage.includes('your name')) {
            botMessage = "You can call me CipherBot. I'm here to help you learn about this website.";
        } else if (lowerCaseMessage.includes('how are you')) {
            botMessage = "I'm a set of scripts and code, but I'm functioning perfectly! Thanks for asking. How can I assist you?";
        } else if (lowerCaseMessage.includes('help') || lowerCaseMessage.includes('what can i ask')) {
            botMessage = "You can ask me about Cipher, his web development projects, his video archives, or specific games like 'Mega Man' and 'Ace Combat'.";
        } else if (lowerCaseMessage.includes('cipher')) {
            botMessage = "Cipher is a web developer and digital archivist, passionate about creating new web experiences and preserving classic video games.";
        } else if (lowerCaseMessage.includes('mega man')) {
            botMessage = "Cipher has created two fan websites for the Mega Man Star Force series. You can find links to them on the 'Websites' page.";
        } else if (lowerCaseMessage.includes('ace combat')) {
            botMessage = "There's an immersive, story-focused website for 'Ace Combat Zero: The Belkan War' in the showcase. He also has longplays of several Ace Combat games in the 'Videos' section.";
        } else if (lowerCaseMessage.includes('mechwarrior')) {
            botMessage = "Yes, there is a retro-themed tribute site for 'MechWarrior 2: 31st Century Combat'. It even has the classic MIDI soundtrack!";
        } else if (lowerCaseMessage.includes('website') || lowerCaseMessage.includes('project')) {
            botMessage = "Cipher has worked on several projects, including websites for Mega Man Star Force, Ace Combat Zero, and MechWarrior 2. You can navigate to the 'Websites' page to see them all.";
        } else if (lowerCaseMessage.includes('video')) {
            botMessage = "You can find a collection of retro gaming longplays and clips on the 'Videos' page. The archive includes games like Air Combat, Ace Combat 2, and more.";
        } else if (lowerCaseMessage.includes('skill') || lowerCaseMessage.includes('technolog')) {
            botMessage = "Cipher specializes in front-end web development, creating dynamic and intelligent websites. The projects showcase skills in HTML, CSS, JavaScript, and UI/UX design.";
        } else if (lowerCaseMessage.includes('contact') || lowerCaseMessage.includes('email')) {
            botMessage = "I don't have access to Cipher's personal contact information. For now, the best way to see his work is by exploring this website.";
        } else if (lowerCaseMessage.includes('thank')) {
            botMessage = "You're welcome! Let me know if there is anything else I can help with.";
        } else if (lowerCaseMessage.includes('bye') || lowerCaseMessage.includes('goodbye')) {
            botMessage = "Goodbye! Feel free to ask if you have more questions.";
        } else {
            botMessage = "I'm not sure how to respond to that. Try asking about 'Cipher', 'websites', 'videos', or 'help'.";
        }

        setTimeout(() => {
            addMessage(botMessage, 'bot');
        }, 500);
    }

    // --- NEW: GEMINI 1.5 FLASH API FUNCTIONALITY ---
    async function handleGeminiPrompt() {
        const promptInput = document.getElementById('gemini-prompt');
        const responseContainer = document.getElementById('gemini-response');
        const submitBtn = document.getElementById('gemini-submit-btn');

        const prompt = promptInput.value.trim();
        if (!prompt) {
            responseContainer.textContent = "Please enter a prompt before sending.";
            return;
        }

        // Disable button and show loading state
        submitBtn.disabled = true;
        submitBtn.textContent = "THINKING...";
        responseContainer.textContent = "Connecting to the AI, please wait...";

        try {
            // This fetch call goes to YOUR backend server, which then securely calls Google
            const response = await fetch('https://954927c1-6f5f-4500-a6c4-b6c653965ac8-00-2f1g5gu0csdjw.pike.replit.dev/api/gemini', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ prompt: prompt }),
            });

            if (!response.ok) {
                // This will catch errors returned from your server (e.g., status 500)
                throw new Error(`Server error! Status: ${response.status}`);
            }

            const data = await response.json();
            responseContainer.textContent = data.response;

        } catch (error) {
            console.error('Error fetching Gemini response:', error);
            responseContainer.textContent = 'An error occurred. Please make sure the backend server is running and try again.';
        } finally {
            // Re-enable the button regardless of success or failure
            submitBtn.disabled = false;
            submitBtn.textContent = "Send to AI";
        }
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

    // --- NEW: Event listener for dynamically added Gemini button ---
    // We use event delegation on the contentArea since the button doesn't exist on page load.
    contentArea.addEventListener('click', (event) => {
        // Check if the clicked element is our Gemini submit button
        if (event.target.id === 'gemini-submit-btn') {
            handleGeminiPrompt();
        }
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




