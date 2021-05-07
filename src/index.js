//Global Variables and Event Listeners
const characterBarDiv = document.querySelector('div#character-bar')
const characterInfoDiv = document.querySelector('div.characterInfo')
const characterDetailDiv = document.querySelector('div#detailed-info')
    const characterNameP = characterDetailDiv.querySelector('p#name')
    const characterImg = characterDetailDiv.querySelector('img#image')
    const characterCaloriesSpan = characterDetailDiv.querySelector('span#calories')

const calorieForm = document.querySelector('form#calories-form')
    const charIdInput = calorieForm.querySelector('input#characterId')  
calorieForm.addEventListener('submit', (event) => {
    newCalorieAmt =  parseInt(characterCaloriesSpan.textContent) + (parseInt(event.target.calories.value) || 0)
    setCalories(newCalorieAmt, event)
    })

const resetButton = document.querySelector('button#reset-btn')
resetButton.addEventListener('click', (event) => {
    newCalorieAmt = 0
    setCalories(newCalorieAmt, event)
    })

//Creating Edit Name Form
editNameForm = document.createElement('form')
editNameForm.id = 'edit-name-form'
editNameForm.style['padding-top'] = '20px'
editNameForm.innerHTML = `<input type="text" placeholder="Enter New Name" id="newName"/>
<input type="submit" value="Change Name"/>`
characterInfoDiv.append(editNameForm)
editNameForm.addEventListener('submit', (event) => setName(event))

getAllCharacters ()
//addEditName()

//Fetch Functions
function getAllCharacters () {
    fetch ('http://localhost:3000/characters')
    .then(res => res.json())
    .then((characterArray) => {
        characterArray.forEach((characterObj) => showCharacter(characterObj))
    })
}

function getCaloriesAndName(id) {
    fetch (`http://localhost:3000/characters/${id}`)
    .then(res => res.json())
    .then((characterObj) => {
        characterCaloriesSpan.textContent = characterObj.calories
        characterNameP.textContent = characterObj.name
    })
}

function setCalories(newCalorieAmt, event) {
    event.preventDefault()
    //console.log(charIdInput.value)
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

function setName(event) {
    const newName = event.target.newName.value
    //console.log(newName)
    event.preventDefault()
    if (newName){
        fetch(`http://localhost:3000/characters/${charIdInput.value}`,
            {method : 'PATCH',
            headers : {"Content-Type" : "application/json"},
            body : JSON.stringify({name : newName})
        })
        .then(res => res.json())
        .then((charNameObj) => {
            const currentSpan = characterBarDiv.querySelectorAll('span')[charNameObj.id-1]
            characterNameP.textContent = charNameObj.name
            currentSpan.textContent = charNameObj.name
        })     
    } else {
        alert('No Name Entered!')
    }
}

//DOM Manipulation functions
function showCharacter(characterObj) {
    const charNameSpan = document.createElement('span')
    charNameSpan.textContent = characterObj.name
    characterBarDiv.append(charNameSpan)
    charNameSpan.addEventListener('click', (event) => showCharDetails(characterObj))
}

function showCharDetails(characterObj){
    characterImg.src = characterObj.image
    charIdInput.value = characterObj.id
    getCaloriesAndName(characterObj.id)
}

