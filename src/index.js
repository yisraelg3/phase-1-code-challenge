//Global Variables and Event Listeners
const characterBarDiv = document.querySelector('div#character-bar')
const characterInfoDiv = document.querySelector('div#detailed-info')
    const characterNameP = characterInfoDiv.querySelector('p#name')
    const characterImg = characterInfoDiv.querySelector('img#image')
    const characterCaloriesSpan = characterInfoDiv.querySelector('span#calories')

const calorieForm = document.querySelector('form#calories-form')
    const charIdInput = calorieForm.querySelector('input#characterId')  
calorieForm.addEventListener('submit', (event) => {
    newCalorieAmt = parseInt(event.target.calories.value) + parseInt(characterCaloriesSpan.textContent)
    setCalories(newCalorieAmt, event)
    })

const resetButton = document.querySelector('button#reset-btn')
resetButton.addEventListener('click', (event) => {
    newCalorieAmt = 0
    setCalories(newCalorieAmt, event)
    })

getAllCharacters ()

//Fetch Functions
function getAllCharacters () {
    fetch ('http://localhost:3000/characters')
    .then(res => res.json())
    .then((characterArray) => {
        characterArray.forEach((characterObj) => showCharacter(characterObj))
    })
}

function getCalories(id) {
    fetch (`http://localhost:3000/characters/${id}`)
    .then(res => res.json())
    .then((characterObj) => {
        characterCaloriesSpan.textContent = characterObj.calories
    })
}

function setCalories(newCalorieAmt, event) {
    event.preventDefault()
    console.log(charIdInput.value)
    //console.log(newCalorieAmt)
    fetch (`http://localhost:3000/characters/${charIdInput.value}`,
    {method: 'PATCH',
    headers : {
        "Content-Type" : "application/json"
    },
    body : JSON.stringify({calories : newCalorieAmt})
    })
    .then(res => res.json())
    .then((charObj) => {
        characterCaloriesSpan.textContent = charObj.calories 
        calorieForm.reset()
    })
}

//DOM Manipulation functions
function showCharacter(characterObj) {
    const charNameSpan = document.createElement('span')
    charNameSpan.textContent = characterObj.name
    characterBarDiv.append(charNameSpan)
    charNameSpan.addEventListener('click', (event) => showCharDetails(characterObj))
}

function showCharDetails(characterObj){
    characterNameP.textContent = characterObj.name
    nameEditButton = document.createElement('button')
    nameEditButton.value = 'Edit Name'
    characterNameP.append(nameEditButton)
    characterImg.src = characterObj.image
    charIdInput.value = characterObj.id
    getCalories(characterObj.id)
}

