// robot gladiators game

// helper function to show player health, attack and coins
const displayStats = () => {
  window.alert(`${playerInfo.name} has ${playerInfo.health} health, ${playerInfo.attack} attack, & ${playerInfo.money} coins.`)
}

// generates a random number between 2 given values.
const randomNumber = (min, max) => ( Math.floor( Math.random() * ( max-min + 1 ) ) + min );

const skipOptions = ['skip', 's', 'run', 'flee']


var getPlayerName = function() {
  var name = "";

  while (name.trim() === "" || name === null) {
    name = prompt("What is your robot's name?");
  }

  console.log("Your robot's name is " + name);
  return name;
};


/** fines the player and returns true if choosing to run from a fight, otherwise returns false
 * @returns 'skip' === true, else false */
const fightOrSkip = () => {

  // give player choice to fight or flee
  let shouldFight = window.prompt('Fight or Flee').trim();

  // validate null check return - recursive
  if ( !shouldFight ) {
    window.alert('Incorrect Response. Try again.');
    return fightOrSkip();
  }

  // convert to lowercase
  shouldFight = shouldFight.toLowerCase();

  // confirm player wants to run
  if ( confirmSkip() ) {
    // dsplay 'flee' msg 
    window.alert('Running from the fight.');
    // reduce player money
    playerInfo.money = Math.max(0, playerInfo.money - 10);
    // 
    return true;
  } else {
    return fightOrSkip();
  }
  // if skip is not set, then continue with the fight.
  return false;
}

const confirmSkip = () => {
  return window.confirm('Are you sure you want to run?')
}

// fight function (now with parameter for enemy object)
var fight = function(enemy) {
  while (playerInfo.health > 0 && enemy.health > 0) {
    // ask player if they'd like to fight or run
    // var promptFight = window.prompt('Would you like to FIGHT or FLEE this battle? Enter "FIGHT" or "FLEE" to choose.');
    if ( fightOrSkip() ) {
      return;
    }

    // generate random damage value based on player's attack power
    var damage = randomNumber(playerInfo.attack - 3, playerInfo.attack)
    // remove enemy's health by subtracting the amount set in the playerInfo.attack variable
    enemy.health = Math.max(0, enemy.health - damage);
    console.log(
      playerInfo.name + ' attacked ' + enemy.name + '. ' + enemy.name + ' now has ' + enemy.health + ' health remaining.'
    );

    // check enemy's health
    if (enemy.health <= 0) {
      window.alert(enemy.name + ' has died!');

      // award player money for winning
      playerInfo.money = playerInfo.money + 20;

      // leave while() loop since enemy is dead
      break;

    } else {
      window.alert(enemy.name + ' still has ' + enemy.health + ' health left.');
    }

    var damage = randomNumber(enemy.attack - 3, enemy.attack);

    // remove players's health by subtracting the amount set in the enemy.attack variable
    playerInfo.health = Math.max(0, playerInfo.health - damage);
    console.log(
      enemy.name + ' attacked ' + playerInfo.name + '. ' + playerInfo.name + ' now has ' + playerInfo.health + ' health remaining.'
    );

    // check player's health
    if (playerInfo.health <= 0) {
      window.alert(playerInfo.name + ' has died!');
      // leave while() loop if player is dead
      break;
    } else {
      window.alert(playerInfo.name + ' still has ' + playerInfo.health + ' health left.');
    }
  }
};

// running game logic
const startGame = function() {
  // game logic

  // reset player stats
  playerInfo.reset();

  // fight each enemy-robot by looping over them and fighting them one at a time
  for (var i = 0; i < enemyInfo.length; i++) {
    // if player is still alive, keep fighting
    if (playerInfo.health > 0) {
      // let player know what round they are in, remember that arrays start at 0 so it needs to have 1 added to it
      window.alert('Welcome to Robot Gladiators! Round ' + (i + 1));

      // pick new enemy to fight based on the index of the enemyNames array
      var pickedEnemyObj = enemyInfo[i];

      // reset enemyHealth before starting new fight
      // enemyHealth = 50;
      pickedEnemyObj.health = randomNumber(40, 60 );

      // use debugger to pause script from running and check what's going on at that moment in the code
      // debugger;

      // pass the pickedEnemyName variable's value into the fight function, where it will assume the value of the enemy.name parameter
      fight(pickedEnemyObj);

      // if we're not at the last enemy in the array, enter the shop
      if (playerInfo.health > 0 && i < enemyInfo.length - 1 ) {
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
};

// display end stats & message, ask to replay
const endGame = function() {
  // show end game message, based on win condition
  if ( playerInfo.health > 0 ) {
    window.alert(`You defeated all the robots and saved us all from the singularity! Check you out! You rich! Coins: ${playerInfo.money}`);
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

// get confirmation from player to enter shop or leave
const shopConfirm = function() {
  if (window.confirm("Enter the Shop?")) {
    shop();
  }
}

// Go to Shop between battles
function shop() {
  console.log("Entered the Shop!")
  // options: refill health, upgrade attack, leave shop
  var shopOptionPrompt = window.prompt(
    "Choose one: 'REFILL' health, 'UPGRADE' attack, or 'LEAVE' shop."
  ).trim();

  // can't exit game this goes back to the shop
  if (!shopOptionPrompt) {
    shop();
  }
  
  shopOptionPrompt = shopOptionPrompt.toLowerCase();

  switch(shopOptionPrompt) {

    // if refill => subtract money and add health
    // fall-through case: doesn't have a break;
    case 'refill':
      playerInfo.refillHealth();
      displayStats();
      break;
      
      // if upgrade => subtract money and add attack
    case 'upgrade':
      playerInfo.upgradeAttack();

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


// Initialize Player Object
var playerInfo = {
  name: getPlayerName(),
  health: 100,
  attack: 10,
  money: 10,
  reset: function() {
    this.health = 100;
    this.attack = 10;
    this.money = 10;
  },
  refillHealth: function() {
    if ( this.money > 7 ) {
      this.health += randomNumber( 15, 25 );
      this.money -= 7;
    
      window.alert("Refilling player's health by 15-25 HP for 7 coins.");
        
    }  else {
      window.alert("Light on the fundage..");
    }
  },
  upgradeAttack: function() {
    if ( this.money > 7 ) {
      this.attack += randomNumber( 6, 12 );
      this.money -= 7;
    
      window.alert("Upgrading player's attack by 6-12 points for 7 coins.");
        
    }  else {
      window.alert("Light on the fundage..");
    }
  }
}


// Initialize Enemies
var enemyInfo = [
  {
    name: 'Roborto Robot',
    attack: randomNumber(10, 14)
  },
  {
    name: 'Amy Android',
    attack: randomNumber(10, 14)
  },
  {
    name: 'Sandisk Sam',
    attac: randomNumber(10, 14)
  }


]


startGame();