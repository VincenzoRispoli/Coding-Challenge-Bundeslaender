
let landAsJson;
let peopleAsJson;
let urlAsJson;
let stateNames = [];
let statesPopulation = [];
let urls = [];
let firstLetters = [];


async function init() {
    await getStateName();
    await getStatesPopulation();
    await getUrl();
    renderState();
}

async function getStateName() {
    let bundesland = await fetch('bundesland.json')
    landAsJson = await bundesland.json();
    for (let i = 0; i < landAsJson.length; i++) {
        let name = landAsJson[i]['name'];
        stateNames.push(name)
    }
}

async function getStatesPopulation() {
    let bundesland = await fetch('bundesland.json');
    peopleAsJson = await bundesland.json();
    for (let i = 0; i < peopleAsJson.length; i++) {
        let people = peopleAsJson[i]['population'];
        statesPopulation.push(people)
    }
}
async function getUrl() {
    let bundesland = await fetch('bundesland.json');
    urlAsJson = await bundesland.json();
    for (let i = 0; i < urlAsJson.length; i++) {
        let url = urlAsJson[i]['url']
        urls.push(url)
    }
}

function renderState() {
    let statesMainContainer = document.getElementById('state-main-container');
    statesMainContainer.innerHTML = /*html*/ `
    <header id="heading-container" class="heading-container">
      <h1 id="heading" class="heading">Bundesländer</h1>
    </header>
    <div id="state-container" class="state-container"></div>
    <div class="letters-and-button-cont">
       <div id="letters-container" class="letters-container"></div>
       <button onclick="renderState()" class="button">Zurück</button>
    </div>
    `
    getStateNameAndPopContainerHTML();
    getFirstLetters();

}

function getStateNameAndPopContainerHTML() {
    let stateContainer = document.getElementById('state-container');
    stateContainer.innerHTML = '';
    for (let i = 0; i < stateNames.length; i++) {
        let state = stateNames[i];
        let people = statesPopulation[i];
        let modPeople = formatPeople(people)
        let url = urls[i];
        setStateHTML(i, stateContainer, state, modPeople, url)
    }
}

function setStateHTML(i, stateContainer, state, modPeople, url){
    stateContainer.innerHTML +=
    `
    <a href="${url}" id="state${i}" class="state">
        <h2 id="state-name${i}" class="state-name">${state}</h2>
        <h3 id="population${i}" class="population">${modPeople} Milionen</h3>
    </a>
    `
}

function formatPeople(people) {
    let formattedPeople = people.toString().replace('.', ',');
    return formattedPeople;
}

function getFirstLetters() {
    for (let i = 0; i < stateNames.length; i++) {
        let letter = stateNames[i].charAt(0);
        if (!firstLetters.includes(letter))
            firstLetters.push(letter)
    }
    showFirstLetters();
}

function showFirstLetters() {
    let lettersContainer = document.getElementById('letters-container');
    for (let i = 0; i < firstLetters.length; i++) {
        let letter = firstLetters[i];
        lettersContainer.innerHTML += /*html*/ `
        <div onclick="searchState(${i})" id="letter-container${i}" class="letter-container">
             <span id="letter${i}" class="letter">${letter}</span>
         </div>
         `
    }
}

function searchState(i) {
    let letter = document.getElementById(`letter-container${i}`).innerText.toLowerCase();
    let searchedStatesCont = document.getElementById('state-container');
    searchedStatesCont.innerHTML = '';
    for (let i = 0; i < stateNames.length; i++) {
        let state = stateNames[i];
        let people = statesPopulation[i];
        let modPeople = formatPeople(people)
        let url = urls[i];
        let firstLetterState = state.charAt(0).toLowerCase();
        if (firstLetterState === letter) {
            showSearchedStatesHTML(i, searchedStatesCont, state, modPeople, url);
        }
    }
}

function showSearchedStatesHTML(i, searchedStatesCont, state, modPeople, url) {
    searchedStatesCont.innerHTML += `
    <a href="${url}" id="state${i}" class="state">
      <h2 id="state-name${i}" class="state-name">${state}</h2>
      <h3 id="population${i}" class="population">${modPeople} Milionen</h3>
    </a>
  `
}

async function includeHTML() {
    let includeElements = document.querySelectorAll('[w3-include-html]');
    for (let i = 0; i < includeElements.length; i++) {
        const element = includeElements[i];
        file = element.getAttribute("w3-include-html");
        let resp = await fetch(file);
        if (resp.ok) {
            element.innerHTML = await resp.text();
        } else {
            element.innerHTML = 'Page not found';
        }
    }
}