let statsone = {
    levels: {
        "Agility": 1,
        "Attack": 1,
        "Construction": 1,
        "Cooking": 1,
        "Crafting": 1,
        "Defence": 1,
        "Farming": 1,
        "Firemaking": 1,
        "Fishing": 1,
        "Fletching": 1,
        "Herblore": 1,
        "Hitpoints": 10,
        "Hunter": 1,
        "Magic": 1,
        "Mining": 1,
        "Prayer": 1,
        "Ranged": 1,
        "Runecraft": 1,
        "Slayer": 1,
        "Smithing": 1,
        "Strength": 1,
        "Thieving": 1,
        "Woodcutting": 1
    }
}
let statstwo = {
    levels: {
        "Agility": 1,
        "Attack": 1,
        "Construction": 1,
        "Cooking": 1,
        "Crafting": 1,
        "Defence": 1,
        "Farming": 1,
        "Firemaking": 1,
        "Fishing": 1,
        "Fletching": 1,
        "Herblore": 1,
        "Hitpoints": 10,
        "Hunter": 1,
        "Magic": 1,
        "Mining": 1,
        "Prayer": 1,
        "Ranged": 1,
        "Runecraft": 1,
        "Slayer": 1,
        "Smithing": 1,
        "Strength": 1,
        "Thieving": 1,
        "Woodcutting": 1
    }
}

function setcombat(x){
    let def = x.levels.Defence
    let hit = x.levels.Hitpoints
    let pra = x.levels.Prayer
    let att = x.levels.Attack
    let str = x.levels.Strength
    let mag = x.levels.Magic
    let ran = x.levels.Ranged

let base = 1/4 * (def + hit + Math.floor(pra * 1/2))
let melee = 13/40 * (att+str)
let range = 13/40 * Math.floor(ran * 3/2)
let mage = 13/40 * Math.floor(mag * 3/2)
let final = Math.floor(base + Math.max(melee,range,mage))
return final

}
function getStats(selector) {
    let addentum = document.querySelector(`#leagues${selector}`).checked == true ? '/SHATTERED_RELICS_LEAGUE' : '';
    let name = document.querySelector(`#name${selector}`);
    fetch(`https://sync.runescape.wiki/runelite/player/${name.value || 'First Odinn'}${addentum}`)
    .then((response) => {
        if (response.status >= 200 && response.status <= 299) {
          return response.json();
        } else {
          throw Error(response.statusText);
        }
      })
        .then(data => {
            if (selector == "one") {
                statsone = data
            } else {
                statstwo = data
            }
            render()
        })
        .catch((error) => {
            // Handle the error

            console.log('ERROR: could not get player data');
          })
}

function render() {
    let total = 0;
    for (const skill in statsone.levels) {
        document.querySelectorAll(`.${skill}`)[0].querySelector('P').innerHTML = statsone.levels[skill]
        total += statsone.levels[skill]
    }
    document.querySelectorAll('.name-combat')[0].innerHTML = `${statsone.username}: ${setcombat(statsone)}`
    document.querySelectorAll('.total')[0].querySelector('P').innerHTML = total
    
    total = 0;
    for (const skill in statstwo.levels) {
        document.querySelectorAll(`.${skill}`)[1].querySelector('P').innerHTML = statstwo.levels[skill]
        total += statstwo.levels[skill]
    }
    document.querySelectorAll('.name-combat')[1].innerHTML = `${statstwo.username}: ${setcombat(statstwo)}`
    document.querySelectorAll('.total')[1].querySelector('P').innerHTML = total
    
}

document.addEventListener('DOMContentLoaded', (event) => {
 render()
});