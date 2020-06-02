const userURL = "https://randomuser.me/api/";
const gallery = document.querySelector("#gallery");
const body = document.querySelector("body");


/**
 * Handle fetch request
 * @param {string} url - The url of random user API  
 */
async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}

/**
 * Get 12 random people from random user API
 * @param {string} url - The url of random user API 
 */
async function getRandomPeople(url) {
  const bag = [];
  for (let i = 0; i < 12; i++) {
    const item = await getJSON(url);
    bag.push(item.results[0]);
  }
  return Promise.all(bag);
}

/**
 * Create html for user card and modal
 * @param {array} data - Array of user object 
 */
function generateHTML(data) {
  data.map(person => {
    const div = document.createElement('div');
    div.className = "card";
    gallery.appendChild(div);
    div.innerHTML = `
        <div class="card-img-container">
            <img class="card-img" src=${person.picture.large} alt="profile picture">
        </div>
        <div class="card-info-container">
            <h3 id="${person.name.first}${person.name.last}" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>        
      `;

    /**
     * Event listener for creating modal
     */
    div.addEventListener('click', (event) => {
      const modalContainer = document.createElement('div');
      body.appendChild(modalContainer);
      modalContainer.className = "modal-container";
      modalContainer.innerHTML = `
                <div class="modal">
                    <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
                    <div class="modal-info-container">
                        <img class="modal-img" src=${person.picture.large} alt="profile picture">
                        <h3 id="${person.name.first}${person.name.last}" class="modal-name cap">${person.name.first} ${person.name.last}</h3>
                        <p class="modal-text">${person.email}</p>
                        <p class="modal-text cap">${person.location.city}</p>
                        <hr>
                        <p class="modal-text">${person.cell}</p>
                        <p class="modal-text">${person.location.street.number} ${person.location.street.name}, ${person.location.state}, ${person.location.country} ${person.location.postcode}</p>
                        <p class="modal-text">Birthday: ${person.dob.date.substring(0, 10)}</p>
                    </div>
                </div>
                `;
      const closeButton = document.querySelector("#modal-close-btn");
      /**
       * Event listner for closing modal
       */
      closeButton.addEventListener('click', () => {
        modalContainer.remove();
      });


    })
  });
}

getRandomPeople(userURL)
  .then(generateHTML)
  .catch(e => console.error(e));

