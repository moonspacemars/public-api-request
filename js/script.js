const userURL = "https://randomuser.me/api/";
const gallery =document.querySelector("#gallery");

async function getJSON(url){
    try{
      const response = await fetch(url);
      return await response.json();
    }catch (error){
      throw error;
    }
}

// console.log(getJSON(userURL));
async function getRandomPeople(url){
    const bag=[];
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
            <h3 id="name" class="card-name cap">${person.name.first} ${person.name.last}</h3>
            <p class="card-text">${person.email}</p>
            <p class="card-text cap">${person.location.city}, ${person.location.state}</p>
        </div>        
      `;
    });
  }


// console.log(getRandomPeople(userURL));
getRandomPeople(userURL)
  .then(generateHTML);
