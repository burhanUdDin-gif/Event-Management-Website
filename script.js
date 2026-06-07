const now = new Date();
document.querySelector('.year').innerHTML = now.getFullYear();

const eventArray = JSON.parse(localStorage.getItem('events')) || [];

const nameEnter = document.querySelector('.js-event-name');
const dateEnter = document.querySelector('.js-event-date');
const textAreaEnter = document.querySelector('.js-event-textarea');

nameEnter.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') dateEnter.focus();
});
dateEnter.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') textAreaEnter.focus();
});
textAreaEnter.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') addEventFunction();
});

const addEventButton = document.querySelector('.add-event-button');
addEventButton.addEventListener('click', () => {
    addEventFunction();
})

function addEventFunction() {
    const eventName = document.querySelector('.js-event-name').value;
    const eventDate = document.querySelector('.js-event-date').value;
    const eventDescription = document.querySelector('.js-event-textarea').value;

    const errorMessage = document.querySelector('.error-message-generator');
    if(eventName.trim() === '' || eventDate.trim() === '' || eventDescription.trim() === '') {
        errorMessage.innerHTML = `<i class="fa-solid fa-triangle-exclamation"></i> Please fill all fields before adding an event`;
        errorMessage.style.display = 'block';
        return;
    }
    errorMessage.style.display = 'none';

    const event = {
        name: eventName.trim(),
        date: eventDate.trim(),
        description: eventDescription.trim()
    };

    eventArray.push(event);
    localStorage.setItem('events', JSON.stringify(eventArray));

    document.querySelector('.js-event-date').value = '';
    document.querySelector('.js-event-name').value = '';
    document.querySelector('.js-event-textarea').value = '';

    showComingEvent();
}

showComingEvent();
function showComingEvent() {
    const today = new Date();
    

    let pastEvent = '';
    let upcomingEvent = '';
    for(let i = 0; i < eventArray.length; i++) {
        eventsManager = eventArray[i];
        const eventObjDate = new Date(eventsManager.date)
        if(eventObjDate < today) {
            pastEvent += `
                <div class="js-past-event-box js-box-for-event">
                    <h4>${eventsManager.name}</h4>
                    <p class="js-date-pa">${eventsManager.date}</p>
                    <p class="js-description-pa">${eventsManager.description}</p>
                    <button onclick="deleteByButtonFunction(${i})" class="js-delete-button"><i class="fa-solid fa-trash-can"></i> Delete</button>
                </div>
            `;
        }else {
            upcomingEvent += `
                <div class="js-upcoming-event-box js-box-for-event">
                    <h4>${eventsManager.name}</h4>
                    <p class="js-date-pa">${eventsManager.date}</p>
                    <p class="js-description-pa">${eventsManager.description}</p>
                    <button onclick="deleteByButtonFunction(${i})" class="js-delete-button"><i class="fa-solid fa-trash-can"></i> Delete</button>
                </div>
            `;
        }

    }

    document.querySelector('.paste-event-box').innerHTML = pastEvent;
    document.querySelector('.event-box-shower').innerHTML = upcomingEvent;
}

function deleteByButtonFunction(index) {
    eventArray.splice(index, 1);
    localStorage.setItem('events', JSON.stringify(eventArray));

    showComingEvent();
}

const searchEnter = document.querySelector('.search-input');
searchEnter.addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        searchByNameFunction();
    }
})

function searchByNameFunction() {
    const searchBar = document.querySelector('.search-input').value;
    if(searchBar.trim() === ''){
        showComingEvent();
        return;
    } 

    let searchDetail = '';
    
        eventArray.filter((element, i) => {
            if(element.name.toLowerCase().includes(searchBar.toLowerCase())) {
                searchDetail += `
                    <div class="js-past-event-box js-box-for-event">
                        <h4>${element.name}</h4>
                        <p class="js-date-pa">${element.date}</p>
                        <p class="js-description-pa">${element.description}</p>
                        <button onclick="deleteByButtonFunction(${i})" class="js-delete-button"><i class="fa-solid fa-trash-can"></i> Delete</button>
                    </div>
                `;

            }
        })
    document.querySelector('.event-box-shower').innerHTML = searchDetail;

    document.querySelector('.search-input').value = ''
}