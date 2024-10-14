// Variables to track the game state
let score = 0;
let timeLeft = 60; // 60 seconds timer
let gameActive = false; // Tracks if the game is currently running
let timerStarted = false; // Tracks if the timer has started
let timerInterval; // To hold the timer interval
let leaderboard = []; // Array to store leaderboard scores
let userName = ''; // Will store the user's randomly generated name

// Pre-load click sound
const clickSound = new Audio('click.mp3');

// Fetch the IP and assign the username
getIPAddress().then(ip => {
    userName = generateRandomName(ip); // Function from nameGenerator.js
    document.getElementById('user-name').innerText = `Hello, ${userName}`;
}).catch(() => {
    // Fallback to "Guest" if IP fetching fails
    userName = 'Guest';
    document.getElementById('user-name').innerText = `Hello, ${userName}`;
});

// Load leaderboard from localStorage if it exists
function loadLeaderboard() {
    const storedLeaderboard = localStorage.getItem('leaderboard');
    if (storedLeaderboard) {
        leaderboard = JSON.parse(storedLeaderboard); // Parse and load the leaderboard
        displayLeaderboard();
    }
}

// Save leaderboard to localStorage
function saveLeaderboard() {
    localStorage.setItem('leaderboard', JSON.stringify(leaderboard)); // Store the leaderboard array in localStorage
}

// Reset leaderboard (manual reset option for admin)
function resetLeaderboard() {
    leaderboard = []; // Clear the leaderboard array
    saveLeaderboard(); // Save empty leaderboard to localStorage
    displayLeaderboard(); // Refresh the leaderboard display
}

// Function to start the game (starts the timer)
function startTimer() {
    if (!timerStarted) { // Prevent multiple timers
        timerStarted = true;
        gameActive = true; // Set game as active
        timerInterval = setInterval(updateTimer, 1000); // Timer updates every second
        console.log("Timer started!"); // Debug log
    }
}

// Function to update the timer
function updateTimer() {
    if (timeLeft > 0) {
        timeLeft--;
        console.log("Time left:", timeLeft); // Debug log for remaining time
        document.getElementById('timer').innerText = timeLeft; // Update timer display
    } else {
        endGame(); // End the game when the timer reaches 0
    }
}

// Function to increment the score
function incrementScore() {
    console.log("Button clicked!"); // Debug log for button clicks
    if (!timerStarted) {
        startTimer(); // Start the timer on the first button click
    }

    if (timeLeft > 0) {
        score++; // Increment score
        console.log("Score:", score); // Debug log for score updates
        document.getElementById('score').innerText = 'Score: ' + score; // Update score display

        // Play click sound
        playClickSound();
    }
}

// Function to play click sound
function playClickSound() {
    clickSound.play(); // Play preloaded click sound
}

// Function to end the game
function endGame() {
    clearInterval(timerInterval); // Stop the timer
    gameActive = false; // Set game as inactive
    timerStarted = false; // Reset the timer state

    // Add the current score to the leaderboard
    updateLeaderboard(score);

    alert('Time’s up! Your final score is: ' + score);

    // Reset the game state for a new round
    resetGame();
}

// Function to update the leaderboard
function updateLeaderboard(newScore) {
    leaderboard.push({ name: userName, score: newScore }); // Store both name and score
    leaderboard.sort((a, b) => b.score - a.score); // Sort by score
    displayLeaderboard(); // Update the displayed leaderboard
    saveLeaderboard(); // Save the updated leaderboard to localStorage
}

// Function to display the leaderboard
function displayLeaderboard() {
    const leaderboardElement = document.getElementById('leaderboard');

    // Clear existing leaderboard entries
    leaderboardElement.innerHTML = `
        <div class="leaderboard-title">Weekly Leaderboard</div>
    `;

    // Display the top 5 scores with usernames
    leaderboard.slice(0, 5).forEach((entry, index) => {
        const leaderboardEntry = document.createElement('div');
        leaderboardEntry.className = 'leaderboard-entry';
        leaderboardEntry.innerText = `${index + 1}. ${entry.name} - ${entry.score} clicks`;
        leaderboardElement.appendChild(leaderboardEntry);
    });
}

// Function to reset the game
function resetGame() {
    timerStarted = false;
    gameActive = false;
    timeLeft = 60;
    score = 0;
    document.getElementById('timer').innerText = '60'; // Reset timer display
    document.getElementById('score').innerText = 'Score: 0'; // Reset score display
}

// Load the leaderboard when the page loads
loadLeaderboard();

// Check if the user is an admin and show the reset button if they are
const isAdmin = localStorage.getItem('isAdmin');
if (isAdmin === 'true') {
    const resetBtn = document.getElementById('reset-leaderboard-btn');
    const logoutBtn = document.getElementById('logout-btn');
    if (resetBtn && logoutBtn) {
        resetBtn.style.display = 'block'; // Show the reset button for admins
        logoutBtn.style.display = 'block'; // Show logout button for admins
    }
}

// Logout functionality (clear admin status)
const logoutBtn = document.getElementById('logout-btn');
if (logoutBtn) {
    logoutBtn.addEventListener('click', () => {
        localStorage.removeItem('isAdmin'); // Clear admin status
        window.location.href = 'index.html'; // Redirect to reload the page
    });
}

// Event listener for the reset leaderboard button
const resetLeaderboardBtn = document.getElementById('reset-leaderboard-btn');
if (resetLeaderboardBtn) {
    resetLeaderboardBtn.addEventListener('click', resetLeaderboard);
}

// The button will handle starting the game and score increment
document.getElementById('button').addEventListener('click', incrementScore);

// Function to get IP Address
function getIPAddress() {
    return fetch('https://api.ipify.org?format=json')
        .then(response => response.json())
        .then(data => data.ip)
        .catch(error => {
            console.error('Error fetching IP:', error);
            return '127.0.0.1'; // Default IP fallback in case of error
        });
}
