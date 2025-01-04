const addBtns = document.querySelectorAll('.add-btn:not(.solid');
const saveitemBtns = document.querySelectorAll('.solid');
const additemContainer = document.querySelectorAll('.add-container');
const additems = document.querySelectorAll('.add-item');

const listColumns = document.querySelectorAll('.drag-item-list');
const backlogList = document.getElementById('backlog-list');
const progressList = document.getElementById('progress-list');
const completeList = document.getElementById('complete-list');
const onHoldList = document.getElementById('on-hold-list');

let updateOnLoad = false;

// initialize array

let backlogListArray = [];
let progressListArray = [];
let completeListArray = [];
let onHoldListArray = [];
let listArrays = [];

let draggedItem;
let currentColumn;

function getSavedColumns() {
    if (localStorage.getItem('backlogItems')) {
        backlogListArray = JSON.parse(localStorage.backlogItems);
        progressListArray = JSON.parse(localStorage.progressItems);
        completeListArray = JSON.parse(localStorage.completeItems);
        onHoldListArray = JSON.parse(localStorage.onHoldItems);   
    } else {
        backlogListArray = ['Release the course', 'sit back and relaxe'];
        progressListArray = ['work on project ', 'Listen the music'];
        completeListArray = ['Being Cool', 'Getting Stuff done'];
        onHoldListArray = ['Being Uncool'];
    }
}
// get local storage array
function updateSavedColumns() {
    listArrays = [backlogListArray, progressListArray, completeListArray, onHoldListArray];
    const arrayNames = ['backlog', 'progress', 'complete', 'onHold'];
    arrayNames.forEach((arrayName, index) => {
        localStorage.setItem(`${arrayName}Items`, JSON.stringify(listArrays[index]));
    });
}

// create DOM element for each list item

function createItemEl(columnEl, column, item, index) {
    const listEl = document.createElement('li');
    listEl.classList.add('drag-item');
    listEl.textContent = item;
    listEl.draggable = true;
    listEl.setAttribute('ondragstart', 'drag(event)');

    columnEl.appendChild(listEl);
    
} 

function updateDom() {
    if (!updateOnLoad) {
        getSavedColumns();
    }

    backlogList.textContent = '';
    backlogListArray.forEach((backlogItem, index) => {
        createItemEl(backlogList, 0, backlogItem, index);
    });

    progressList.textContent = '';
    progressListArray.forEach((progressItem, index) => {
        createItemEl(progressList, 0, progressItem, index);
    });

    completeList.textContent = '';
    completeListArray.forEach((completeItem, index) => {
        createItemEl(completeList, 0, completeItem, index);
    });

    onHoldList.textContent = '';
    onHoldListArray.forEach((onHoldItem, index) => {
        createItemEl(onHoldList, 0, onHoldItem, index);
    });
    
}

//when item start dragging

function drag(e) {
    draggedItem = e.target;
    console.log('draggedItem:', draggedItem);
    
}

//column allows for item to drop
function allowDrop(e) {
    e.preventDefault();
}

//when item enter column area

function dragEnter(column) {
    listColumns[column].classList.add('over');
    currentColumn = column;
}

//dropping item to column
function drop(e) {
    e.preventDefault();
    listColumns.forEach((column) => {
        column.classList.remove('over');
    });

    const parent = listColumns[currentColumn];
    parent.appendChild(draggedItem);


}
// onLoad

updateDom();





