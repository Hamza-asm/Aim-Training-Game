$(document).ready(function() {
    let score = 0;
    let timeLeft = 50; 
    let gameInterval;
    let countdownInterval;
    let targetSpeed = 1500; 
    let containerWidth = '40vw'; 
    let containerHeight = '40vh'; 

    const gameContainer = $(".game-container");
    const target = $("#target");
    
    let gameStarted = false; 

    // Set difficulty based on the button clicked
    $(".easy").on("click", function() {
        targetSpeed = 1700; 
        containerWidth = '40vw'; 
        containerHeight = '40vh';
        setActiveButton($(this));
    });

    $(".normal").on("click", function() {
        targetSpeed = 1300; 
        containerWidth = '60vw'; 
        containerHeight = '60vh';
        setActiveButton($(this));
    });

    $(".hard").on("click", function() {
        targetSpeed = 900; 
        containerWidth = '85vw'; 
        containerHeight = '60vh';
        setActiveButton($(this));
    });
    //Buttons Active Indicator
    function setActiveButton(button) {
        $(".button").removeClass("active"); 
        button.addClass("active"); 
    }

    // Function to show the target at a random position
    function showTarget() {
        const targetSize = target.width();
        const randomX = Math.random() * (gameContainer.width() - targetSize);
        const randomY = Math.random() * (gameContainer.height() - targetSize);

        target.css({
            left: randomX + "px",
            top: randomY + "px",
            display: "block"
        });

        // Hide the target after 1 second if not clicked
        setTimeout(() => {
            target.fadeOut();
        }, 1000);
    }

    // Function to spawn targets based on targetSpeed
    function spawnTargets() {
        gameInterval = setInterval(showTarget, targetSpeed);
    }

    // Timer countdown
    function startCountdown() {
        countdownInterval = setInterval(function() {
            timeLeft--;
            $("#timer").text("Time left: " + timeLeft + "s");

            if (timeLeft <= 0) {
                clearInterval(countdownInterval);  
                clearInterval(gameInterval);       
                target.hide();                     
                alert("Time's up! Your final score is: " + score);
                gameStarted = false;               
            }
        }, 1000);
    }

    // When the target is clicked, increase the score and hide the target
    target.on("click", function() {
        score++;
        $("#score").text("Score: " + score);
        $(this).hide();
        
        var audio=new Audio("./sounds/yellow.mp3");
         audio.play();
    });

    // Start the game with the selected difficulty and countdown
    $(".start").on("click", function() {
        if (!gameStarted) {
            resetGame();  
            gameStarted = true;  
            spawnTargets();
            startCountdown();
            setActiveButton2($(this));
        }
    });

    // Reset the game
    $(".reset").on("click", function() {
        resetGame();
        gameStarted = false;
        setActiveButton2($(this));

    });

    // Function to reset the game with default settings
    function resetGame() {
        clearInterval(gameInterval); 
        clearInterval(countdownInterval); 
        score = 0;
        timeLeft = 50;
        $("#score").text("Score: " + score);
        $("#timer").text("Time left: 50s");
        target.hide(); 
        gameContainer.css({
            width: containerWidth,
            height: containerHeight
        });
    }
});
function setActiveButton2(button) {
    $(".button").removeClass("active2"); 
    button.addClass("active2"); 
}



