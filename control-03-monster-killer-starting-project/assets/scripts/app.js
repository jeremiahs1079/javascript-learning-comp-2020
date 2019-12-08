const ATTACK_VALUE = 10;
const STRONG_ATTACK_VALUE = 17;
const MONSTER_ATTACK_VALUE = 21;
const HEAL_VALUE = 20;

const STRONG_ATTACK = 'STRONG_ATTACK';
const REGULAR_ATTACK = 'REGULAR_ATTACK';

const LOG_EVENT_PLAYER_ATTACK = 'PLAYER_ATTACK';
const LOG_EVENT_PLAYER_STRONG_ATTACK = 'PLAYER_STRONG_ATTACK';
const LOG_EVENT_MONSTER_ATTACK = 'MONSTER_ATTACK';
const LOG_EVENT_PLAYER_HEAL = 'PLAYER_HEAL';
const LOG_EVENT_GAME_OVER = 'GAME_OVER'

const enteredValue = prompt('Max life for player and monster?', '100');

let chosenMaxLife = parseInt(enteredValue);

if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
    chosenMaxLife = 100;
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];
adjustHealthBars(chosenMaxLife);

function writeToLog() {

}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE);
    currentPlayerHealth -= playerDamage;

    if(currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus life saved you!');
        return;
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won!!!');
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost!!!!');
        reset();
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth < 0) {
        alert('Draw!!!');
        reset();
    }
}

function attackMonstor(mode) {
    let attackDamage;
    switch(mode) {
        case REGULAR_ATTACK:
            attackDamage = ATTACK_VALUE;
            break;
        case STRONG_ATTACK:
            attackDamage = STRONG_ATTACK_VALUE;
            break;
    }

    const damage = dealMonsterDamage(attackDamage);
    currentMonsterHealth -= damage;
}

function attackHandler() {
    attackMonstor(REGULAR_ATTACK);
    endRound();
}

function strongAttackHandler() {
    attackMonstor(STRONG_ATTACK);
    endRound();
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth + HEAL_VALUE >= chosenMaxLife){
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    currentPlayerHealth += healValue;
    increasePlayerHealth(healValue);
    endRound();
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);