const accessToken = "053d734704d4ff7478b5ad4d9776a747";

let score1 = 0;
let score2 = 0;
let countdownInterval;

async function getHero(id) {
    const response = await fetch(`https://www.superheroapi.com/api.php/${accessToken}/${id}`);
    const hero = await response.json();
    return hero;
}

async function loadHeroes() {
    const heroId1 = Math.floor(Math.random() * 731) + 1;
    const heroId2 = Math.floor(Math.random() * 731) + 1;

    const hero1 = await getHero(heroId1);
    const hero2 = await getHero(heroId2);

    displayHero(hero1, 1);
    displayHero(hero2, 2);

    compareStats(hero1.powerstats, hero2.powerstats);
}

function displayHero(hero, heroNumber) {
    document.getElementById(`name${heroNumber}`).innerText = hero.name;
    document.getElementById(`image${heroNumber}`).src = hero.image.url;
    
    const stats = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];
    stats.forEach(stat => {
        const value = hero.powerstats[stat] || 0;
        document.getElementById(`${stat}${heroNumber}`).innerText = value;
        document.getElementById(`${stat}-bar${heroNumber}`).style.width = `${value}%`;
    });
}

function compareStats(hero1Stats, hero2Stats) {
    const stats = ['intelligence', 'strength', 'speed', 'durability', 'power', 'combat'];
    
    let hero1Score = 0;
    let hero2Score = 0;

    stats.forEach(stat => {
        const stat1 = parseInt(hero1Stats[stat]) || 0;
        const stat2 = parseInt(hero2Stats[stat]) || 0;

        if (stat1 > stat2) {
            hero1Score++;
            document.getElementById(`hero1`).classList.add('winner');
            document.getElementById(`hero2`).classList.remove('winner');
        } else if (stat2 > stat1) {
            hero2Score++;
            document.getElementById(`hero2`).classList.add('winner');
            document.getElementById(`hero1`).classList.remove('winner');
        }
    });

    if (hero1Score > hero2Score) {
        score1++;
        document.getElementById('score1').innerText = score1;
    } else if (hero2Score > hero1Score) {
        score2++;
        document.getElementById('score2').innerText = score2;
    }
}

function resetGame() {
    score1 = 0;
    score2 = 0;
    document.getElementById('score1').innerText = score1;
    document.getElementById('score2').innerText = score2;
    loadHeroes();
}

function startCountdown() {
    let countdown = 12;
    document.getElementById('countdown').innerText = countdown;
    
    clearInterval(countdownInterval);
    
    countdownInterval = setInterval(() => {
        countdown--;
        document.getElementById('countdown').innerText = countdown;

        if (countdown === 0) {
            loadHeroes();
            startCountdown(); 
        }
    }, 1000);
}

function determineWinner() {    
    const winnerCard = document.getElementById("hero1"); 
    winnerCard.classList.add("winner"); 
}

window.onload = () => {
    loadHeroes();
    startCountdown();
};