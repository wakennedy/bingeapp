const searchForm = document.getElementsByClassName("input-group")[0]
const myshowbtn= document.getElementById("my-shows")
const parent = document.getElementById("show")
const searchResults = document.getElementsByClassName("div search-result")[0]
const logoutbtn=document.getElementById("logout")
const seasonSelector = document.getElementById("formControlSelect")
const collapseParent = document.getElementById("collapseExample")
let welcomeUser = document.getElementById(773)
let followerCount = document.getElementById(584)
let runtimeCount = document.getElementById(222)

myshowbtn.addEventListener("click", event => showUserShows())
searchForm.addEventListener("submit", event => handleSearch(event))

showUserShows()
start()

myshowbtn.addEventListener("click", () => {
  collapseParent.innerHTML=``
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
  .then(resp => {parent.innerText = ``
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
  follow.className="col-sm-12 information-right"
  follow.innerHTML =`<div class="follow" style= "cursor: pointer">
              <img src="img/plus.png" alt="">`

  div4.append(follow)
  div3.appendChild(div4)
  div2.appendChild(div3)
  div1.appendChild(div2)
  card.appendChild(div1)
  parent.appendChild(card)
  follow.addEventListener('click', event => handleFollow(event, title))
}

function handleFollow(e,object){ 
  let number=parseInt(followerCount.getElementsByTagName('h2')[0].innerText)
  followerCount.getElementsByTagName('h2')[0].innerText=number+1
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
      </div>`
  }
  else {
    div4.innerHTML =`
    <div class="col-sm-6 information-left">
    <h3>${title.name}</h3>
  </div>`
  }

  if (usershow){
   let el = document.createElement('h6')
   el.innerHTML= `<img src="img/seo-and-web.png" alt=""> ${usershow.show.users.length} followers`
   div4.getElementsByTagName('div')[0].appendChild(el)
  }
  let follow=document.createElement('div')
  follow.className="col-sm-6 information-right"
  follow.innerHTML =`
          <div class="follow" style= "cursor: pointer">
          <span class="remove"> <img id="remove" src="img/delete.png" alt=""> </span>`
  let info=document.createElement('div')
  info.className="col-sm-12 information-right"
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
      .then(changeWelcome()) 
}

function buildBetterShowCard(show, usershow, season) {
  collapseParent.classList.remove('hidden')
  parent.innerHTML=""
  collapseParent.innerHTML=`<div id="bar"></div>`
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
    <p>${show.summary }</p>
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
                  </select>
                </div>
              </div>
            </div>
            <div class="col-md-6 watchall" id="watchall">
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
  let seasonform=document.getElementById("formControlSelect")
  seasonform.addEventListener("change", (event)=>  {
    event.preventDefault()
    buildBetterShowCard(show, usershow, event.target.value)
  })
 
  fetch(`http://api.tvmaze.com/shows/${show.id}/episodes`)
  .then(resp => resp.json())
  .then(resp=> {
    let seasonnumber= resp[resp.length-1].season

    for(i=0; i< seasonnumber; i++) {
      let option=document.createElement('option')
      option.value=i+1
      option.innerText=`Season ${i+1}`
      if (option.value==season){
        option.setAttribute('selected', true)
      }
      seasonform.append(option)
    }
    buildBetterEpisodeCards(resp, season)})
} 

function buildBetterEpisodeCards(episodes, season) {
  let episodeRow = document.getElementById("episodeRow")
  episodeRow.innerHTML=''
  fetch(`http://localhost:8008/user_episodes/${sessionStorage.getItem("user")}`)
  .then(resp => resp.json())
  .then(resp=> { let newresp=resp.map(resp=> resp.episode_id)
    let counter=0
    if (season){
      episodes=episodes.filter(ep => ep.season == season)
      length=episodes.length
      let el=document.getElementsByClassName("watchall")[0]
      el.innerHTML=`<button class="checksesion">Mark season ${season} as watched</button>`
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
    infoDiv.innerHTML=`<h5>${episode.number}. ${episode.name}</h5> <h6>Air Date: ${episode.airdate}<br>Runtime: ${episode.runtime} min </h6>${episode.summary?episode.summary:""}`
      if (Date.parse(episode.airdate)<new Date()){
    let icon = document.createElement('div')
    icon.className = "col-sm-12 watched"
    icon.innerHTML = ` <img src="img/hide.png" alt="">`
    if (newresp.includes(episode.id)){
      counter++
      infoDiv.id=resp.find(user_ep=> user_ep.episode_id==episode.id).id
      infoDiv.classList.toggle("seen")
      infoDiv.parentNode.classList.toggle("seen")
      icon.innerHTML = ` <img src="img/visibility-button.png" alt="">`
      }
    div3.appendChild(icon)
    icon.addEventListener('click', ()=> handleSeen(episode, infoDiv, length))
    }
  
    })
    let percent=(counter/(episodes.length))*100
    makestatusbar(percent)
  })

}

function makestatusbar(percent){
  let statusbar= document.getElementById('bar')
  statusbar.innerHTML=`<h6 class="percent" id="${percent}"> Percent Completed: ${Math.round(percent)}%</h6><div class="progress-wrap progress" data-progress-percent="">
  <div class="progress-bar progress" style="height:24px;width:${percent}%"></div></div>`
  collapseParent.removeChild(statusbar)
  collapseParent.prepend(statusbar)
}

function handleSeen (episode, infoDiv, length) {
  let number=parseInt(runtimeCount.getElementsByTagName('h2')[0].innerText)
  
  let el=document.getElementsByClassName("percent")[0]

  if (!infoDiv.classList.contains("seen")){
    runtimeCount.getElementsByTagName('h2')[0].innerText=`${Math.round(number+(episode.runtime)/60)} hrs`
    let data ={ "user_id": sessionStorage.getItem("user"),
    "episode_id": episode.id,
    "runtime": episode.runtime
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
    infoDiv.parentNode.classList.toggle("seen")
    infoDiv.nextSibling.getElementsByTagName("img")[0].src="img/visibility-button.png"
    console.log('Success:', data);
    })
    .catch((error) => {
    console.error('Error:', error);
    })
  }
  else {
    runtimeCount.getElementsByTagName('h2')[0].innerText=`${Math.round(number-(episode.runtime)/60)} hrs`
    makestatusbar(parseInt(el.id)-((1/length)*100))
    handleDeleteUserEpisode(infoDiv)
  }
}

function handleDeleteUserEpisode(infoDiv){
  fetch(`http://localhost:3000/user_episodes/${infoDiv.id}`, {
    method: 'DELETE',
  })
  .then(()=>{
    infoDiv.classList.toggle("seen")
    infoDiv.parentNode.classList.toggle("seen")
    infoDiv.nextSibling.getElementsByTagName("img")[0].src="img/hide.png"
    changeWelcome()}) 
}

//USER LOGIN STUFF
function start() {
  //IF NOT SIGNED IN SHOW LOGIN HTML
  if (!sessionStorage.getItem("user")){
    let body=document.getElementsByTagName('body')[0]
    body.innerHTML=`    <div class="container">
    <div class="row">
        <div class="col-lg-3 col-md-2"></div>
        <div class="col-lg-6 col-md-8 login-box">
            <div class="col-lg-12 login-key">
                <i class="fa fa-key" aria-hidden="true"></i>
            </div>
            <div class="col-lg-12 login-title">
              WELCOME TO BINGE!
            </div>
            <div class="col-lg-12 login-form">
                <div class="col-lg-12 login-form">                        
                        <div class="col-lg-12 loginbttm">
                            <div class="col-lg-6 login-btm login-text">
                                <!-- Error Message -->
                            </div>
                            <div class="col-lg-6 login-btm login-button">
                                <button class="signup btn btn-outline-primary">SIGNUP</button>
                                <button class="btn btn-outline-primary">LOGIN</button>
                            </div>
                        </div>
                </div>
            </div>
            <div class="col-lg-3 col-md-2"></div>
        </div>
    </div>`
    console.log(document.getElementsByClassName("btn")[0])
    let loginbtn= document.getElementsByClassName("btn")[1]
    let signupbtn= document.getElementsByClassName("signup")[0]
    signupbtn.addEventListener('click', ()=> signuporlogin(event, true))
    loginbtn.addEventListener('click', ()=> signuporlogin(event, false))
  }
  //SIGN UP
    function signuporlogin(event, signup){
      let body=document.getElementsByTagName('body')[0]
      body.innerHTML=`    <div class="container">
      <div class="row">
          <div class="col-lg-3 col-md-2"></div>
          <div class="col-lg-6 col-md-8 login-box">
              <div class="col-lg-12 login-key">
                  <i class="fa fa-key" aria-hidden="true"></i>
              </div>
              <div class="col-lg-12 login-title">
                WELCOME TO BINGE!
              </div>
              <div class="col-lg-12 login-form">
                  <div class="col-lg-12 login-form">
                      <form>
                          <div class="form-group">
                              <label class="form-control-label">USERNAME</label>
                              <input type="text" class="form-control" id="input-login" name="uname">
                          </div>
                          <div class="form-group">
                              <label class="form-control-label">LOCATION</label>
                              <input type="text" class="form-control" id="input-login" name="location">
                          </div>
                          <div class="col-lg-12 loginbttm">
                              <div class="col-lg-6 login-btm login-text">
                                  <!-- Error Message -->
                              </div>
                              <div class="col-lg-6 login-btm login-button">
                                  <button type="submit" class="btn btn-outline-primary">SUBMIT</button>
                              </div>
                          </div>
                      </form>
                  </div>
              </div>
              <div class="col-lg-3 col-md-2"></div>
          </div>
      </div>`
      let form=document.getElementsByTagName("form")[0]
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

  //change welcome and tv-following count

changeWelcome()
function changeWelcome(){
  fetch(`http://localhost:8008/users/${sessionStorage.getItem("user")}`)
  .then(resp=> resp.json())
  .then(user=>{
  welcomeUser.innerHTML = `<h1> Hello, ${(user.username).charAt(0).toUpperCase() + (user.username).slice(1)}!</h1>`
  followerCount.innerHTML = `<h2>${user.shows.length}</h2>`
  fetch(`http://localhost:3000/user_episodes/${sessionStorage.getItem("user")}`)
  .then(resp=> resp.json())
  .then(resp=>{

   runtimeCount.innerHTML=`<h2>${Math.round(resp.reduce((sum, ep) => sum + ep.runtime, 0)/60)} hrs</h2>` 
  })
})
}
