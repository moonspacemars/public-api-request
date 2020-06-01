const userURL = "https://randomuser.me/api/";
const gallery =document.querySelector("#gallery");
const body = document.querySelector("body"); 


async function getJSON(url){
    try{
      const response = await fetch(url);
      return await response.json();
    }catch (error){
      throw error;
    }
}

// console.log(getJSON(userURL));
const bag=[];
async function getRandomPeople(url){
    
    for(let i=0; i<12; i++){
        const item = await getJSON(url);
        bag.push(item.results[0]);
    }
    return Promise.all(bag);
}


function generateHTML(data) {
    data.map( person => {
      const div= document.createElement('div');
      div.className="card";
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
      div.addEventListener('click', (event) =>{

        const modalContainer=document.createElement('div');
        body.appendChild(modalContainer);
        modalContainer.className="modal-container";
        modalContainer.innerHTML=`
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
                        <p class="modal-text">Birthday: ${person.dob.date}</p>
                    </div>
                </div>
                `;
        const closeButton =document.querySelector("#modal-close-btn");
        closeButton.addEventListener('click',()=>{
          modalContainer.remove();
        });

          
      })
    });
  }


// console.log(getRandomPeople(userURL));
getRandomPeople(userURL)
  .then(generateHTML);



// gallery.addEventListener('click', (event) =>{
//     event.preventDefault();
//     if (event.target.className != "gallery"){
//         // const person = bag.find(p=>p.name===)
//         console.log(event.target.classList);
//     }
// });
