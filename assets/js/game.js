var playerName = '';
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyName = "Roborto";
var enemyHealth = 50;
var enemyAttack = 12;
var round = 1;
var shouldContinue = ''

const exits = ['exit','run','stop']

const print = (...data) => console.log(...data) 

const displayGame = () => {
    // print(`${playerName} has ${playerHealth} \n${enemyName} has ${enemyHealth}`);
    window.alert(`Round: ${round}\n${playerName} has ${playerHealth} \n${enemyName} has ${enemyHealth}`);
    
}

const fight = () => {

    shouldContinue = window.prompt("Want to fight? Type: ['FIGHT'] or ['SKIP']").toLowerCase();
    if (exits.includes(shouldContinue)) { return }
    let shouldFight = shouldContinue === 'fight';
    let shouldSkip = shouldContinue === 'skip';

    if (shouldFight && (playerMoney > 0)) {

        enemyHealth -= playerAttack;
        
        playerHealth -= enemyAttack;

    } else if (shouldSkip) {
        const confirmSkip = window.confirm("Are you sure you want to skip?")
        if (confirmSkip) {
            playerMoney -= 2;
            window.alert(`You skipped the fight this round but lost 2 coins. ${playerMoney} coins remaining`)
            
        }

    } else {
        window.alert("Type: ['FIGHT'] or ['SKIP']");
        fight();

    }
    
};

const isGameOver = () => {
    if (!running()) {
        // check for exit call, or out of coins
        (enemyHealth > 0) ? window.alert(`${enemyName} defeated ${playerName}`) : window.alert(`${playerName} defeated ${enemyName}`);
    }
};

/**
 * 
 * @returns Entities health goes below 0
 */
const running = () => (playerHealth >= 0 && enemyHealth >= 0 && !exits.includes(shouldContinue));


const main = () => {
    window.alert("Welcome to Robot Gladiators!")
    playerName = window.prompt("What is your robot's name?");
    displayGame();

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