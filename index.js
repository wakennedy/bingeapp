const searchForm = document.getElementsByClassName("input-group")[0]
const myshowbtn= document.getElementById("my-shows")
const parent = document.getElementById("show")
const searchResults = document.getElementsByClassName("div search-result")[0]
const logoutbtn=document.getElementById("logout")
const seasonSelector = document.getElementById("formControlSelect")



myshowbtn.addEventListener("click", event => showUserShows())
searchForm.addEventListener("submit", event => handleSearch(event))

showUserShows()

myshowbtn.addEventListener("click", () => {
  collapseParent.classList.add('hidden')
  showUserShows()})
searchForm.addEventListener("submit", event => {
  collapseParent.classList.add('hidden')
  handleSearch(event)
})

//handles the search bar input
function handleSearch(e) {
  e.preventDefault()
  fetch(`http://api.tvmaze.com/search/shows?q=${e.target.title.value}`)
  .then(resp => resp.json())
  .then(resp => {parent.innerText = ""
  console.log(resp)
    resp.forEach(title => {
    console.log(title)
     makeCard(title)
  })
})
  .catch((error) => {
    console.error('Error:', error);
  })
}

//HANDLE CASE OF NO IMAGE AVAILABLE
function makeCard(title) {
  console.log(title)
  let card = document.createElement('div')
  card.className = "col-md-4 card-tvshow"
  let div1=document.createElement('div')
  div1.className="container-fluid"
  let div2=document.createElement('div')
  div2.className="row"
  if (title.show.image){
    div2.innerHTML =`
          <div class="col-sm-12 cardimage">
            <img src="${title.show.image.original}" alt="">
          </div>`
  }
  else {
    div2.innerHTML =`
          <div class="col-sm-12 cardimage">
            <img src="img/tv-2268952_1280.png" alt="">
          </div>`
  }

  let div3=document.createElement('div')
  div3.className="container information-box"
  let div4=document.createElement('div')
  div4.className="row"

  if (title.show.network && title.show.premiered){
  div4.innerHTML =`
      <div class="col-sm-6 information-left">
        <h3>${title.show.name}</h3>
        <h6>${title.show.network.name} - ${title.show.premiered}</h6>
      </div>`
  }
  else{
    div4.innerHTML =`
        <div class="col-sm-6 information-left">
          <h3>${title.show.name}</h3>
        </div>`
    }

  let follow=document.createElement('div')
  follow.className="col-sm-6 information-right"
  follow.innerHTML =`
        <div class="">
          <div class="follow" style= "cursor: pointer">
              <img src="img/plus.png" alt="">
        </div>`

  div4.append(follow)
  div3.appendChild(div4)
  div2.appendChild(div3)
  div1.appendChild(div2)
  card.appendChild(div1)
  parent.appendChild(card)
  follow.addEventListener('click', event => handleFollow(event, title))
}

//TO DO
function handleFollow(e,object){ 
  let data ={ "user_id": sessionStorage.getItem("user"),
                  "api_id": object.show.id,
                  "title": object.show.name
                  }
      fetch('http://localhost:3000/user_shows', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      })
      .then(response => response.json())
      .then(data => {
        showUserShows()
        console.log('Success:', data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
      
}

function showUserShows() {
  parent.innerText = ""
  fetch(`http://localhost:3000/user_shows/${sessionStorage.getItem("user")}`)
  .then(resp=> resp.json())
  .then(resp=>{
    resp.forEach(usershow => getAPIshow(usershow))})
}

function getAPIshow(usershow){
  fetch(`http://api.tvmaze.com/shows/${usershow.show.api_id}`)
  .then(resp => resp.json())
  .then(resp=> makeusercards(resp, usershow))
}

function makeusercards(title, usershow){
  let card = document.createElement('div')
  card.className = "col-md-4 card-tvshow"
  let div1=document.createElement('div')
  div1.className="container-fluid"
  let div2=document.createElement('div')
  div2.className="row"
  div2.innerHTML =`
        <div class="col-sm-12 cardimage">
          <img src="${title.image.original}" alt="">
        </div>`
  let div3=document.createElement('div')
  div3.className="container information-box"
  let div4=document.createElement('div')
  div4.className="row"
  div4.innerHTML =`
      <div class="col-sm-6 information-left">
        <h3>${title.name}</h3>
        <h6>${title.network.name} - ${title.premiered}</h6>
        <img src="img/seo-and-web.png" alt="">
      </div>`

  let follow=document.createElement('div')
  follow.className="col-sm-6 information-right"
  follow.innerHTML =`
        <div class="">
          <div class="follow" style= "cursor: pointer">
          <span class="remove"> <img id="remove" src="img/delete.png" alt=""> </span>
        </div>`
  let info=document.createElement('div')
  info.className="col-sm-6 information-right"
  info.innerHTML =`     
      <div class="information-button">
        <a data-toggle="collapse" href="#collapseExample" role="button" aria-expanded="false" aria-controls="collapseExample">
          <img src="img/Information.png" alt="">
        </a>  
      </div>`

  div4.append(follow,info)
  div3.appendChild(div4)
  div2.appendChild(div3)
  div1.appendChild(div2)
  card.appendChild(div1)
  parent.appendChild(card)
  info.addEventListener('click',event => showInfo(title, usershow))
  follow.addEventListener('click', event => handleDelete(usershow, card))
}

function handleDelete(usershow, card){
      fetch(`http://localhost:3000/user_shows/${usershow.id}`, {
        method: 'DELETE',
      })
      .then(card.remove()) 
}

function showInfo(title, usershow){
  collapseParent.classList.remove('hidden')
  parent.innerText = ""
  makeusercards(title)
  buildBetterShowCard(title)
  fetch(`http://localhost:3000/episodes/${usershow.show_id}`)
  .then(resp => resp.json())
  .then(resp=> buildBetterEpisodeCards(title ,resp))
}

function addEpisodes(episodes) {
let div= document.getElementsByClassName("col-sm-12")[1]

episodes.forEach(ep => {
  let li =document.createElement('li')
  li.innerText=`name: ${ep.name}- season: ${ep.season}`
  div.appendChild(li)
})
}

//USER LOGIN STUFF
start()
function start() {
//IF NOT SIGNED IN SHOW LOGIN HTML
if (!sessionStorage.getItem("user")){
  let body=document.getElementsByTagName('body')[0]
  body.innerText=""
  let loginbtn=document.createElement('button')
  loginbtn.innerText="LOGIN"
  let signupbtn=document.createElement('button')
  signupbtn.innerText="SIGNUP"
  body.append(loginbtn,signupbtn)
  signupbtn.addEventListener('click', ()=> signuporlogin(event, true))
  loginbtn.addEventListener('click', ()=> signuporlogin(event, false))
}

//SIGN UP
  function signuporlogin(event, signup){
    let body=document.getElementsByTagName('body')[0]
    body.innerHTML=""
    let form=document.createElement("form")
    form.innerHTML=  `<label for="uname"><b>Username</b></label>
    <input type="text" placeholder="Enter Username" name="uname" required>
    <label for="uname"><b>Location</b></label>
    <input type="text" placeholder="Enter Location" name="location" required>
    <button type="submit">Signup</button>`
    body.append(form)
    form.addEventListener('submit', (event)=>{
      event.preventDefault()
      let username=event.target.uname.value
      let location=event.target.location.value
      signup? makeUser(username, location): findUser(username, location)
    })
  }
}
  function makeUser(uname, loc){
    const data = { username: uname, 
                  location: loc };
                 
    fetch('http://localhost:3000/users', {
      method: 'POST', // or 'PUT'
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      sessionStorage.setItem("user", data.id)
      console.log(data, sessionStorage.getItem("user"))
      console.log('Success:', data)
      location.reload()
    })
    .catch((error) => {
      console.error('Error:', error)
})
  }

  function findUser(uname, loc){
    fetch('http://localhost:3000/users')
    .then(resp=> resp.json())
    .then(resp=>{
      user=resp.find(user => user.username==uname && user.location==loc)
      if (user)
      {
        sessionStorage.setItem("user", user.id)
        location.reload()
      }
      else {
        location.reload()
      }
    })
  }

logoutbtn.addEventListener("click", () => {
  sessionStorage.clear()
  location.reload()
} 
)

function buildBetterShowCard(show) {
  let showName = document.getElementById("showName")
  showName.innerText = `${show.name}`

  let showNetwork = document.getElementById("showNetwork")
  showNetwork.innerText = `${show.network.name}`

  let showSummary = document.getElementById("showSummary")
  showSummary.innerHTML = `${show.summary}`

  let showAired = document.getElementById("showAired")
  showAired.innerText = `${show.premiered}`

  let showStatus = document.getElementById("showStatus")
  showStatus.innerText = `${show.status}`

  seasonSelector.addEventListener('change', function(event) {selectSeason(event.target.value, show)})
}

function buildBetterEpisodeCards(title, episodes) {
  fetch(`http://localhost:3000/user_episodes/${sessionStorage.getItem("user")}`)
  .then(resp => resp.json())
  .then(resp=> { let newresp=resp.map(resp=> resp.episode.id)

  episodes.forEach(episode => {
  let episodeRow = document.getElementById("episodeRow")

  let totalDiv = document.createElement('div')
  totalDiv.id = "episodeee"
  totalDiv.className = "col-md-3"
  episodeRow.appendChild(totalDiv)

  let div2 = document.createElement('div')
  div2.className = "container-fluid"
  totalDiv.appendChild(div2)

  let div3 = document.createElement('div')
  div3.className = "row"
  div2.appendChild(div3)

  let imgDiv = document.createElement('div')
  imgDiv.className = "col-md-12 episode-image"
  div3.appendChild(imgDiv)
  let img = document.createElement('img')
  img.src = `${episode.image_url}`
  imgDiv.appendChild(img)

  let infoDiv = document.createElement('div')
  infoDiv.className = "episode-title"
  // infoDiv.className = "col-sm-12 watched"
  // icon.innerHTML = ` <img src="img/interface (1).png" alt="">`

  if (newresp.includes(episode.id)){
    infoDiv.classList.toggle("seen")
    }

  div3.appendChild(infoDiv)

  let titleh5 = document.createElement('h5')
  titleh5.innerText = `${episode.name}`
  infoDiv.appendChild(titleh5)

  let airh6 = document.createElement('h6')
  airh6.innerText = `Episode Airdate goes here`
  infoDiv.appendChild(airh6)

  let icon = document.createElement('div')
  icon.className = "col-sm-12 watched"
  icon.innerHTML = ` <img src="img/hide.png" alt="">`
  div3.appendChild(icon)
  icon.addEventListener('click', ()=> handleSeen(event, episode, infoDiv))

  })})
}


function handleSeen (event, episode, infoDiv) {
  if (!infoDiv.classList.contains("seen")){
    let data ={ "user_id": sessionStorage.getItem("user"),
    "episode_id": episode.id
    }
    fetch('http://localhost:3000/user_episodes', {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
    infoDiv.classList.toggle("seen")
    infoDiv.nextSibling.getElementsByTagName("img")[0].src="img/visibility-button.png"
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    })
  }
  else {
    infoDiv.classList.toggle("seen")
    infoDiv.nextSibling.getElementsByTagName("img")[0].src="img/interface (1).png"
  }
}

//_____________TO DO__________________
//add episode info(img, airdate) to db
//add episode info(img, airdate) to db

function selectSeason(seasonNumber, show) {
  buildBetterEpisodeCards(show.filter())

}

