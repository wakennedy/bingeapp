# BINGE

Binge is a TV show tracking application. It allows users to follow and save their tv shows as well as receive real-time analytics of their tv browsing habits.
​
​

### PURPOSE

We built this application to allow users to gain visibility on what shows they are watching, how much progress they have made for each show, and the pertinent information about each show. In the age when streaming has dominated the viewer industry, we realized it would be very engaging to allow users to gain access to their own streaming data. Users typically follow more than one show on Netflix, and it is a common occurrence for those shows to get lost. Binge fills in those gaps allowing users to keep track of their shows and their own progress so they never leave tv show behind. Binge ensures users are getting their money's worth out of streaming services like Netflix and Hulu so that they never forget a TV show again.
​

### TECHNOLOGY USED

- Ruby on Rails
- Javascript, HTML, CSS
- Online api from tvmaze.com
  ​
  ​

### FEATURES

- Login/Logout
  - User can sign up with a new account with username and location
  - User can login with an existing account with same credentials
  - If not logged in, sent to login page
  - User can logout
- TV Shows
  - Can search for a TV show (incomplete search)
  - Can save a show
  - Can see list of saved shows, with its information
  - Can remove show from list
- Episodes
  - Can see list of episodes
  - Can filter episodes by season
  - Can mark episode as seen
  - Can mark entire season as seen
- Analytics
  _ Can see number of shows saved, number of episodes seen, number of episodes seen that current day, total hours watched
  _ Can see number of people following that show \* Can see percentage completed of the show and the season
  ​
  ​

### HOW TO USE

To start, a user must signup with their username and location. After clicking submit, they will now have access to the web application and can login using the same credentials. After being redirected they are then greeted with a welcome of their username along with a search bar. A user can then search a query of a show they are watching into the search bar where a list of show cards will appear under after. They can scroll down and add their favorite shows using the plus button found in the show card directly underneath the image. After clicking the plus sign, they are then directed to their user page which compiles all the shows they are watching. The numbers displayed right under the welcome indicate the analytics for the user including the number of tv shows saved, number of episodes watched as well as the number of episodes watched that day. The user also has the option to click on the "i" button on each show card representing information. Upon clicking, the page will lengthen detailing the relevant information for that show. This includes seasons found in a drop down menu as well episodes on a grid. The episodes give the user ability to watch a show as seen which then updates the analytics immediately. When the user is done with the information, they can click it again and it will toggle it out. Lastly, a user can logout and be assured that

### VIDEO DEMO

Watch here: https://www.youtube.com/watch?v=APDFt2DpePc
