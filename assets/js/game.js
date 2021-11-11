var playerName = window.prompt("What is your robot's name?");
var playerHealth = 100;
var playerAttack = 10;
var playerMoney = 10;

var enemyNames = ['Roborto', 'Amy Android', 'Robo Trumble'];
var enemyHealth = 50;
var enemyAttack = 12;

const skipOptions = ['skip', 's']

// console.log(enemyNames);
// console.log(enemyNames.length);
// console.log(enemyNames[0]);
// console.log(enemyNames[3]);

// fight function (now with parameter for enemy's name)
var fight = function(enemyName) {
  while (playerHealth > 0 && enemyHealth > 0) {
    // ask player if they'd like to fight or run
    var promptFight = window.prompt('Would you like to FIGHT or SKIP this battle? Enter "FIGHT" or "SKIP" to choose.');
    
    if (promptFight) {
      promptFight = promptFight.toLowerCase().trim();
    }

    // if player picks "skip" confirm and then stop the loop
    if (skipOptions.includes(promptFight)) {
      // confirm player wants to skip
      var confirmSkip = window.confirm("Are you sure you'd like to quit?");

      // if yes (true), leave fight
      if (confirmSkip) {
        window.alert(playerName + ' has decided to skip this fight. Goodbye!');
        // subtract money from playerMoney for skipping
        playerMoney = Math.max(0, playerMoney - 10);
        console.log("playerMoney", playerMoney);
        break;
      }
    }

    // generate random damage value based on player's attack power
    var damage = randomNumber(playerAttack - 3, playerAttack)
    // remove enemy's health by subtracting the amount set in the playerAttack variable
    enemyHealth = Math.max(0, enemyHealth - damage);
    console.log(
      playerName + ' attacked ' + enemyName + '. ' + enemyName + ' now has ' + enemyHealth + ' health remaining.'
    );

    // check enemy's health
    if (enemyHealth <= 0) {
      window.alert(enemyName + ' has died!');

      // award player money for winning
      playerMoney = playerMoney + 20;

      // leave while() loop since enemy is dead
      break;

    } else {
      window.alert(enemyName + ' still has ' + enemyHealth + ' health left.');
    }

    var damage = randomNumber(enemyAttack - 3, enemyAttack);

    // remove players's health by subtracting the amount set in the enemyAttack variable
    playerHealth = Math.max(0, playerHealth - damage);
    console.log(
      enemyName + ' attacked ' + playerName + '. ' + playerName + ' now has ' + playerHealth + ' health remaining.'
    );

    // check player's health
    if (playerHealth <= 0) {
      window.alert(playerName + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerName + ' still has ' + playerHealth + ' health left.');
    }
  }
};

const randomNumber = (min, max) => ( Math.floor( Math.random() * ( max-min + 1 ) ) + min );

// Pseudo code for adding the shop & replay features
const startGame = function() {
  // game logic

  // reset player stats
  playerHealth = 100;
  playerAttack = 10;
  playerMoney = 10;

  // fight each enemy-robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyNames.length; i++) {
    // if player is still alive, keep fighting
    if (playerHealth > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyName = enemyNames[i];

      // reset enemyHealth before starting new fight
      // enemyHealth = 50;
      enemyHealth = randomNumber(40, 60 );

      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemyName parameter
      fight(pickedEnemyName);

      // if we're not at the last enemy in the array, enter the shop
      if (playerHealth > 0 && i < enemyNames.length - 1 ) {
        shopConfirm();
      }
    }
    // if player isn't alive, stop the game
    else {
      window.alert('You have lost your robot in battle! Game Over!');
      break;
    }
  }

  // when the player is defeated or defeats all enemies
  endGame();

  // while there are still enemies, but the fight is over or fled, ask player to shop
  // if no, skip to the game
  // otherwise show the shop 
};


const endGame = function() {
  // show end game message, based on win condition
  if ( playerHealth > 0 ) {
    window.alert(`You defeated all the robots and saved us all from the singularity! Check you out! You rich! Coins: ${playerMoney}`);
  } else {
    window.alert("Bummeroosky, your bot got bought (as in the farm...).");
  }
  // show player stats 
  const playAgain = window.confirm("Do it all over?")
  // ask player to play again?
  if (playAgain) {
    // restart
    startGame();
  } else {
    window.alert("Thanks a billion! Come back for more robot carnage! Same bot time, same bot channel.")
  }
}


const displayStats = () => {
  window.alert(`${playerName} has ${playerHealth} health, ${playerAttack} attack, & ${playerMoney} coins.`)
}


const shopConfirm = function() {
  if (window.confirm("Enter the Shop?")) {
    shop();
  }
}

function shop() {
  console.log("Entered the Shop!")
  // options: refill health, upgrade attack, leave shop
  var shopOptionPrompt = window.prompt(
    "Choose one: 'REFILL' health, 'UPGRADE' attack, or 'LEAVE' shop."
  )

  if (!shopOptionPrompt) {
    shop();
  } else {
    shopOptionPrompt = shopOptionPrompt.toLowerCase();
  }



  switch(shopOptionPrompt) {

    // if refill => subtract money and add health
    // fall-through case: doesn't have a break;
    case 'Refill':
    case 'REFILL':
    case 'refill':
      // refill player health
      playerHealth += 20;
      // reduce player money
      playerMoney -= 7;
      // show player stats
      window.alert("Refilling player's health by 20 for 7 dollars.");
      displayStats();
      break;
      
      // if upgrade => subtract money and add attack
    case 'upgrade':
      // increase player attack
      playerAttack += 6;
      // reduce player money
      playerMoney -= 7;
      // show player stats
      window.alert("Upgrading player's attack by 6 for 7 dollars.");
      displayStats();
      break;
        
        // if leave => goodbye msg, leave shop function
    case 'leave':
      displayStats();
      window.alert("Leaving the store.");
      break;

      // invalid response => call shop() again.
    default:
      // error alert
      window.alert("You did not pick a valid option. Try again.");
      // start again...
      shop();
      break;
  }
  
  
}


startGame();