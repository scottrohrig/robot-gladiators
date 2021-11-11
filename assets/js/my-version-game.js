var playerName = '';
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;


var enemies = ["Roborto", "Amy Android", "Robo Trumble"];

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;
var round = 1;
var shouldContinue = '';
const skipFightFee = 2;

const exits = ['exit','stop'];
const skipOptions = ['skip', 'run', 'flee']
const fightOptions = ['fight','battle','engage','attack']

const print = (...data) => console.log(...data) ;

const displayGame = (player, enemy) => {
    // print(`${playerName} has ${playerHealth} \n${enemyName} has ${enemyHealth}`);
    // window.alert(`Round: ${round}\n${playerName} has ${playerHealth} \n${enemyName} has ${enemyHealth}`);
    
};

const fight = () => {

    // ask player if they want to fight or run
    shouldContinue = window.prompt("Want to fight? Type: ['FIGHT'] or ['RUN']").toLowerCase().trim().replace('!','');

    // if player wants to 'exit' the game, return early
    if (exits.includes(shouldContinue)) { return }

    // otherwize initialize fight/skip variables
    let shouldFight = shouldContinue === 'fight';
    let shouldSkip = skipOptions.includes(shouldContinue);

    // if player wants to 'skip' or 'run'. and has enough money
    if ( shouldSkip && playerMoney > skipFightFee ) {
        //  confirm player wants to skip
        const confirmSkip = window.confirm("Are you sure you want to skip?");

        // if true, leave fight
        if ( confirmSkip ) {
            // subtract money from player
            playerMoney -= skipFightFee;
            // alert player
            window.alert(`You successfully ran from the fight! But you lost some money 😢. ${playerName} has ${playerMoney} coins remaining.`);
            return;
        }
    }

    // if the player wants to fight
    if (shouldFight) {

        enemyHealth -= playerAttack;
        
        playerHealth -= enemyAttack;

    } else {
        window.alert("Type: ['FIGHT'] or ['SKIP']");
        fight();

    }
    
};

const battle = function(enemy) {
    enemyNames.forEach(fight())
}

const fightEnemy = function(enemy) {
    // do fight stuff
}

const isGameOver = () => {
    if (!running()) {
        // check for exit call, or out of coins
        window.alert(`${enemyName} defeated ${playerName}`)
    }
};

/**
 * 
 * @returns Player's health goes below 0. no more enemies, or player chooses to exit. 
 */
const running = () => (
    playerHealth >= 0 && enemies.length >= 0 && !exits.includes(shouldContinue)
    );


const main = () => {

    // initialize game
    // Show Welcome Message
    window.alert("Welcome to Robot Gladiators!")

    // Get player name from input
    playerName = window.prompt("What is your robot's name?");

    // show the player's status
    displayGame();

    // play the game
    while (running()) {

        round++;

        fight();
        
        if (running()) {
            displayGame();
        }

        isGameOver();
    }
}

main();