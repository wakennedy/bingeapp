const searchForm = document.getElementsByClassName("input-group")[0]
const myshowbtn= document.getElementById("my-shows")
const parent = document.getElementById("show")
const searchResults = document.getElementsByClassName("div search-result")[0]
const logoutbtn=document.getElementById("logout")
const seasonSelector = document.getElementById("formControlSelect")
const collapseParent = document.getElementById("collapseExample")

myshowbtn.addEventListener("click", event => showUserShows())
searchForm.addEventListener("submit", event => handleSearch(event))

showUserShows()
start()

myshowbtn.addEventListener("click", () => {
  collapseParent.innerHTML=""
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
    resp.forEach(title => {
     makeCard(title)
  })
})
  .catch((error) => {
    console.error('Error:', error);
  })
}

function makeCard(title) {
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

function handleFollow(e,object){ 
  let data ={ "user_id": sessionStorage.getItem("user"),
                  "api_id": object.show.id,
                  "title": object.show.name
                  }
      fetch('http://localhost:8008/user_shows', {
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
      })
}

function showUserShows() {
  parent.innerText = ""
  fetch(`http://localhost:8008/user_shows/${sessionStorage.getItem("user")}`)
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
  if (title.network){
  div4.innerHTML =`
      <div class="col-sm-6 information-left">
        <h3>${title.name}</h3>
        <h6>${title.network.name} - ${title.premiered}</h6>
        <img src="img/seo-and-web.png" alt="">
      </div>`
  }
  else {
    div4.innerHTML =`
    <div class="col-sm-6 information-left">
    <h3>${title.name}</h3>
    <img src="img/seo-and-web.png" alt="">
  </div>`
  }
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
  info.addEventListener('click',event => buildBetterShowCard(title, usershow))
  follow.addEventListener('click', event => handleDelete(usershow, card))
}

function handleDelete(usershow, card){
      fetch(`http://localhost:8008/user_shows/${usershow.id}`, {
        method: 'DELETE',
      })
      .then(card.remove()) 
}

function buildBetterShowCard(show, usershow, season) {
  collapseParent.classList.remove('hidden')
  parent.innerHTML=""
  collapseParent.innerHTML=""
  makeusercards(show)
  el= document.createElement('div')
  el.innerHTML=`
  <div class="card card-body" id="all-informations">
  <div class="col-sm-6 informations-one">
    <h3 id="showName">${show.name}</h3>
    <img id="showImage"src="img/seo-and-web.png" alt="">
    <h6>18555</h6>
  </div>
  <div class="col-sm-12" id="showSummary">
    <p>${show.summary}</p>
  </div>
  <div class="col-sm-6 tableinformation">
    <table class="table">
      <tbody>
        <tr>
          <th scope="row">Aired</th>
          <td id="showAired">${show.premiered}</td>
        </tr>
        <tr>
          <th scope="row">Status</th>
          <td id="showStatus">${show.status}</td>
        </tr>
       </tbody>
    </table>
  </div>
  <div class="select-season">
          <div class="container">
            <div class="row">
              <div class="col-md-6">
                <div class="form-group">
                   <select class="form-control" id="formControlSelect">
                    <option>Season</option>
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>
              <div class="col-md-6">
                <button class="checksesion">Mark season 2 as watched</button>
              </div>
            </div>
          </div>
        </div>
          <div class="container">
            <div id="episodeRow" class="row">
            </div>
          </div>
      </div>
    </div>
  </div>
</div>  
  `
  collapseParent.prepend(el)
  document.getElementById("formControlSelect").addEventListener("change", (event)=>  {
    event.preventDefault()
    buildBetterShowCard(show, usershow, event.target.value)
  })
 
  fetch(`http://api.tvmaze.com/shows/${show.id}/episodes`)
  .then(resp => resp.json())
  .then(resp=> {
    buildBetterEpisodeCards(resp, season)})
} 

function buildBetterEpisodeCards(episodes, season) {
  let episodeRow = document.getElementById("episodeRow")
  episodeRow.innerHTML=''
  fetch(`http://localhost:8008/user_episodes/${sessionStorage.getItem("user")}`)
  .then(resp => resp.json())
  .then(resp=> { console.log(resp)
    let newresp=resp.map(resp=> resp.episode_id)
    if (season){
      episodes=episodes.filter(ep => ep.season == season)
    }
    episodes.forEach(episode => {
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
    
    img.src = episode.image? `${episode.image.medium}`: 'img/tv-2268952_1280.png'
    imgDiv.appendChild(img)

    let infoDiv = document.createElement('div')
    infoDiv.className = "episode-title"

    div3.appendChild(infoDiv)

    let titleh5 = document.createElement('h5')
    titleh5.innerText = `${episode.name}`
    infoDiv.appendChild(titleh5)

    let airh6 = document.createElement('h6')
    airh6.innerText = `Air Date: ${episode.airdate}`
    infoDiv.appendChild(airh6)

    let icon = document.createElement('div')
    icon.className = "col-sm-12 watched"
    icon.innerHTML = ` <img src="img/hide.png" alt="">`
    if (newresp.includes(episode.id)){
      infoDiv.classList.toggle("seen")
      icon.innerHTML = ` <img src="img/visibility-button.png" alt="">`
      }
    div3.appendChild(icon)
    icon.addEventListener('click', ()=> handleSeen(episode, infoDiv))
    })})

}

function handleSeen (episode, infoDiv) {
  if (!infoDiv.classList.contains("seen")){
    let data ={ "user_id": sessionStorage.getItem("user"),
    "episode_id": episode.id
    }
    fetch('http://localhost:8008/user_episodes', {
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
    infoDiv.nextSibling.getElementsByTagName("img")[0].src="img/hide.png"
  }
}

//USER LOGIN STUFF
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
                   
      fetch('http://localhost:8008/users', {
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
      fetch('http://localhost:8008/users')
      .then(resp=> resp.json())
      .then(resp=>{
        user=resp.find(user => user.username==uname && user.location==loc)
        if (user) {
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
