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
const LOG_EVENT_GAME_OVER = 'GAME_OVER';





function getMaxLifeValues() {
    const enteredValue = prompt('Max life for player and monster?', '100');
    let parsedValue = parseInt(enteredValue);

    if (isNaN(parsedValue) || parsedValue <= 0) {
        throw {message: 'Invalid user input: Not a valid number'};
    } 

    return parsedValue;
}

let chosenMaxLife;

try{
    chosenMaxLife = getMaxLifeValues(); 
} catch(error) {
    console.error(error);
    chosenMaxLife = 100; 
}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;
let battleLog = [];
adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {};
    switch (event) {
        case LOG_EVENT_PLAYER_ATTACK:
            logEntry = {
                event,
                value,
                monsterHealth,
                playerHealth,
                target: 'MONSTER',
            };
            break;
        case LOG_EVENT_PLAYER_STRONG_ATTACK:
            logEntry = {
                event,
                value,
                monsterHealth,
                playerHealth,
                target: 'MONSTER',
            };
            break;
        case LOG_EVENT_PLAYER_HEAL:
            logEntry = {
                event,
                value,
                monsterHealth,
                playerHealth,
                target: 'PLAYER',
            };
            break;
        case LOG_EVENT_MONSTER_ATTACK:
            logEntry = {
                event,
                value,
                monsterHealth,
                playerHealth,
                target: 'PLAYER',
            };
            break;
        case LOG_EVENT_GAME_OVER:
            logEntry = {
                event,
                value,
                monsterHealth,
                playerHealth,
                target: 'NONE',
            };
            break;
        default:
            logEntry = {
                event: 'UNKNOWN EVENT',
                value,
                monsterHealth,
                playerHealth,
                target: 'NONE',
            };
            break;
    }

    battleLog.push(logEntry);
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
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth,
    );

    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert('You would be dead but the bonus life saved you!');
        writeToLog(
            LOG_EVENT_PLAYER_HEAL,
            'PLAYER SAVE',
            currentMonsterHealth,
            currentPlayerHealth,
        );
        return;
    }

    if (currentMonsterHealth <= 0 && currentPlayerHealth > 0) {
        alert('You Won!!!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'PLAYER WON',
            currentMonsterHealth,
            currentPlayerHealth,
        );
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth > 0) {
        alert('You Lost!!!!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'PLAYER LOST',
            currentMonsterHealth,
            currentPlayerHealth,
        );
        reset();
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth < 0) {
        alert('Draw!!!');
        writeToLog(
            LOG_EVENT_GAME_OVER,
            'DRAW',
            currentMonsterHealth,
            currentPlayerHealth,
        );
        reset();
    }
}

function attackMonstor(mode) {
    let attackDamage;
    let logEvent;
    switch (mode) {
        case REGULAR_ATTACK:
            attackDamage = ATTACK_VALUE;
            logEvent = LOG_EVENT_PLAYER_ATTACK;
            break;
        case STRONG_ATTACK:
            attackDamage = STRONG_ATTACK_VALUE;
            logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
            break;
    }

    const damage = dealMonsterDamage(attackDamage);
    currentMonsterHealth -= damage;
    writeToLog(
        logEvent,
        attackDamage,
        currentMonsterHealth,
        currentPlayerHealth,
    );
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
    if (currentPlayerHealth + HEAL_VALUE >= chosenMaxLife) {
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }

    currentPlayerHealth += healValue;
    increasePlayerHealth(healValue);
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth,
    );
    endRound();
}

function printLogHandler() {
    
    let i = 0;
    for (const log of battleLog) {
        console.log('------------');
        console.log(`Log #${i}`);
        console.log('------------');
        for(const item in log) {
            console.log(`${item} => ${log[item]}`);
        }
        console.log('------------');
        i++;
    }
}

attackBtn.addEventListener('click', attackHandler);
strongAttackBtn.addEventListener('click', strongAttackHandler);
healBtn.addEventListener('click', healPlayerHandler);
logBtn.addEventListener('click', printLogHandler);
