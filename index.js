document.addEventListener("DOMContentLoaded", function() {
    
    
    let cards = [];
    let dealerCards = [];
    let sum = 0;
    let dealerSum = 0;
    let hasBlackJack = false;
    let isAlive = false;
    let message = "";
    let messageEl = document.getElementById("message-el");
    let sumEl = document.querySelector("#sum-el");
    let cardsEl = document.getElementById("cards-el");
    let dealercardsEl = document.getElementById("dealercards-el");
    let dealersumEl = document.getElementById("dealersum-el");
    let player = { name: "" };
    let chips = { Chips: 145, betAmount: 0 }; // Initialize betAmount to 0
    let playerEl = document.getElementById("player-el");
    let chipsEl = document.getElementById("chips-el");
    let betInput = document.getElementById("bet-input"); // New input field for bet amount

    if (messageEl && sumEl && cardsEl && dealercardsEl && dealersumEl && chipsEl && betInput) {
        // If all necessary elements are found, proceed with the game initialization
        chipsEl.textContent = "Chips: " + chips.Chips;

        function getRandomCard() {
            let randomNumber = Math.floor(Math.random() * 13) + 1;
            if (randomNumber > 10) {
                return 10;
            } else if (randomNumber === 1) {
                return 11;
            } else {
                return randomNumber;
            }
        }

        function startGame() {
         

            let betAmount = parseInt(betInput.value); // Get the bet amount entered by the player
            if (isNaN(betAmount) || betAmount <= 0 || betAmount > chips.Chips) {
                messageEl.textContent = "Please enter a valid bet amount within your chips range.";
                return;
            }
            chips.betAmount = betAmount;

            // Reset the game state
            isAlive = true;
            hasBlackJack = false;
            sum = 0;
            dealerSum = 0;
            cards = [];
            dealerCards = [];

            // Deal cards and start the game
            let firstCard = getRandomCard();
            let secondCard = getRandomCard();
            let dealerfirstCard = getRandomCard();
            let dealersecondCard = getRandomCard();
            cards = [firstCard, secondCard];
            dealerCards = [dealerfirstCard, dealersecondCard];
            sum = firstCard + secondCard;
            dealerSum = dealerfirstCard + dealersecondCard;

            // Render the game
            renderGame();
        }

        function renderGame() {
            cardsEl.textContent = "Cards: ";
            dealercardsEl.textContent = "Dealer: ";
            let maxLength = Math.max(cards.length, dealerCards.length);
             for (let i = 0; i < maxLength; i++) {
            if (cards[i] !== undefined) {
            cardsEl.textContent += cards[i] + " : ";
            }
            if (dealerCards[i] !== undefined) {
            dealercardsEl.textContent += dealerCards[i] + " : ";
            }
    }

            
        sumEl.textContent = "Sum: " + sum;
            dealersumEl.textContent = "Dealer Sum: " + dealerSum;
            if (isAlive) {
                if (sum <= 20) {
                    message = "Do you want to draw a new card or stay?";
                } else if (sum === 21) {
                    message = "Wohoo! You've got blackjack!";
                    playerStay();
                } else {
                    message = "You've busted, you lose!";
                    playerStay();
                }
            } else {
                message = " Game over!";
            }

            messageEl.textContent = message;
        }

        function newCard() {
            if (isAlive === true && hasBlackJack === false) {
                let card = getRandomCard();
                sum += card;
                cards.push(card);
                if (sum >21){
                    isAlive = false;
                }
                renderGame();
            }
        }

        function dealerTurn() {
            while (dealerSum < 17) {
                let card = getRandomCard();
                dealerSum += card;
                dealerCards.push(card);
            }
            renderGame();
            determineOutcome();
        }

        function determineOutcome() {
            if (dealerSum > 21) {
                message = "Dealer busted, you win!";
                chips.Chips += chips.betAmount; // Add bet amount to chips
            } else if (dealerSum >= sum) {
                message = "Dealer wins!";
                chips.Chips -= chips.betAmount; // Subtract bet amount from chips
            } else {
                message = "You win!";
                chips.Chips += chips.betAmount; // Add bet amount to chips
            }
            messageEl.textContent = message;
            isAlive = false;
            updateChipsDisplay();
        }

        function updateChipsDisplay() {
            chipsEl.textContent = "Chips: " + chips.Chips;
        }

        function playerStay() {
            dealerTurn();
        }

        // Add event listener to the start game button
        document.getElementById("start-btn").addEventListener("click", startGame);
        // Add event listener to the new card button
        document.getElementById("new-card-btn").addEventListener("click", newCard);
        // Add event listener to the stay button
        document.getElementById("stay-btn").addEventListener("click", playerStay);
    } else {
        console.error("One or more required HTML elements not found.");
    
    
    }
});


