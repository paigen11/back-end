#Janus - Organize Your Life
---

##[Live Demo](http://janus.paigeniedringhaus.com/#)
---

##Contents
---
  * What It Is
  * What We Used
  * Challenges and Solutions
  * MVP
  * Our Stretch Goals
  * Authors
  * Screenshots
  * Github Link
  * Code Examples

##What It Is
---
This is a group project where we made an organization app utilizing our full-stack skills in five days' time in an agile fashion. 

We built a mobile-friendly note organization app where users can make and save notes for themselves to stay organized. Users can create, edit and delete notes, as well as change the colors of the notes as the need arises to create accounts and save what's important to them.

The site runs on MySql, Python and Flask on the back-end, and AngularJS, HTML5, CSS3 (styled through SASS), Bootstrap, JavaScript, and AJAX on the front-end, plus the Masonry plugin to create the responsive cards.

##What We Used
---
The following languages and frameworks were used:
  * HTML5
  * CSS3 / SASS
  * Bootstrap
  * JavaScript
  * AJAX
  * AngularJS
  * Flask
  * Python
  * MySQL
  * Masonry (JS library)
  * ngMask (AngularJS plugin)
  * bcrypt (password hashing module)

##Challenges and Solutions
---
This project had challenges from the beginning. Here's a few of the obstacles we encountered and how we overcame them.

  * Challenge #1: Deciding how to serve up page views (Flask & Jinja to render templates versus Angular's ngRoutes)

  	We had two ways to render page views based on our technology stack. On the front end, Angular's ngRoutes uses /views to render views. On the back end, Flask uses templates to render views with its render_templates module. In the end, we decided to go with Angular's ngRoutes to serve up pages instead of Flask, and in order to send data forward to Angular we'd need from the MySQL database, we'd use Flask's send_file() function to push it forward.     

  * Challenge #2: Getting AngularJS to play nice with Masonry JavaScript library

    To create the card look and feel we were going for in our project, we found a great JavaScript cascading grid layout libary called Masonry. However, since the note cards were being loaded through Angular's `ng-repeat` function each time a user logged in or created a new one, the Masonry library was running too quickly in the success callback. To fix this, we set a timeout function of just 400 milliseconds, which gives Angular's ng-repeat enough time to run and queue up the posts correctly, and then Masonry executes and optimizes the cards in the vertical space of the browser window.

  * Challenge #3: Setting up a user demo to walk users through the site functions
  
    We wanted to have some kind a tutorial for new users when they first came to the site's dashboard. We did some research, found some - what seemed like - very useful demo plugins. Three hours, lots of documentation, numerous new file downloads and headaches later, we'd made no headway in getting these 'super simple and easy to use' demo plugins to work. Angular views and Bootstrap just weren't having it. So the walkthrough demo was scrapped and we tried Bootstrap's popovers - those came with their own set of headaches: popping up at the right tims, only showing to new users, etc. It wasn't working. Finally we found a solution, as soon as a new user registered and landed on the dashboard page, a modal dropped down welcoming them and outlining how to use Janus. Once the user dismissed the box, the backend was updated the user had seen the tutorial and so it wouldn't be shown again.

  * Challenge #4: Source control

    This very same thing was a challenge in our first group project as well. Before, every update and addition to our front-end project was pushed directly to the master file. That was not a smart way to approach it. So from the beginning, we created a production branch where our combined code would live, and only when we were ready to go live, would we push the production branch to the master. Once that was set up, all four of us created our own individual branches so we could work on files simultaneously and each time we were ready to update the production branch we'd warn the others and everyone would pull it down locally afterwards. This certainly helped overcome merge conflicts, but at times, pieces of code were still lost in future iterations. Luckily, we were able to go back to our commit history and find the missing pieces and replace them within the code fixing features that had broken.

  * Challenge #5: HTML repopulation in notes

    The issue was that stray characters like empty spaces and returns showed up in the unicode version when included in the title or contents section of notes. Initial plans were to parse out the HTML from the string and reformat it properly, but upon further research, we discovered Angular has a dependency for this situation. Using ngSanitize as our dependency we were able to use `ng-html-bind`, which allowed it to reformat the HTML correctly thereby putting in the appropriate divs and ignoring the non-breaking spaces.

##MVP (Minimum Viable Product)
---
The MVP for this project was achieved about a day before the weeklong deadline was up, so we were able to push it slightly beyond our baseline goals, which are outlined below.

Our first MVP iteration included: 
  * Creating a user register / login system so users are stored in our MySQL database on the backend  
  * Building a notes dashboard where users can create, save, update and edit their notes
  * A user tutorial explaining to new users how to best utilize the site
  * Make it mobile friendly / responsive

Since we met our MVP a day early, we pushed on to some of the features mentioned below, and there are more we'd like to add on in the future.

##Our Stretch Goals
---
Because we lost a bit of time going down fruitless, rabbit holes, we only accomplished one of our extra features in the short time frame we had to make our site. 

Here's what we set as our second IVP (intermediate viable product) features.
  * Allowing the user to change the color of the note cards. (accomplished)
  * Inviting other Janus users / friends to collaborate on specific notes.
  * Upgrading note search options: search by tag, by dates, by users, etc.
  * Adding tags users could add to notes
  * Upgrading the user dashboard to display different views: see everything, see all collaborators, see tags, etc.

##Authors
---
  * [Eric Ettensohn](https://github.com/ericettensohn)
  * [Paige Niedringhaus](https://github.com/paigen11/)
  * [David Pirie](https://github.com/PirieD704)
  * [JT Townsend](https://github.com/jttwnsnd)

##Github Link
---
[Github](https://github.com/paigen11/back-end) 

##Screenshots
---
Landing page screen new users see first
![alt text](https://github.com/paigen11/back-end/blob/master/screenshots/home-screen.png 'home-screen.png')

Register dropdown menu for new users
![alt text](https://github.com/paigen11/back-end/blob/master/screenshots/login.png 'login.png')

Tutorial modal for new users letting them know how the dashboard works
![alt text](https://github.com/paigen11/back-end/blob/master/screenshots/tutorial.png)

Dashboard view of a user, and where to create a new note
![alt text](https://github.com/paigen11/back-end/blob/master/screenshots/new-note.png 'new-note.png')

Edit / delete note modal for already existing notes
![alt text](https://github.com/paigen11/back-end/blob/master/screenshots/edit-note.png 'edit-note.png')

Sample of our Git GUI client, Gitkraken and how we practiced version control by immediately branching the master to a production branch and then having an individual branch for each contributor to work on
![alt text](https://github.com/paigen11/back-end/blob/master/screenshots/gitkraken-start.png 'gitkraken-start.png')

Final sample of Gitkraken showing our final pushes to the production branch and then committing the whole thing to the master in one final push - very clean and compact 
![alt text](https://github.com/paigen11/back-end/blob/master/screenshots/gitkraken-end.png 'gitkraken-end.png') 

##Code Examples
---
AngularJS code run when new users register with Janus
```javascript
    $scope.register = function(){
      if($scope.password != $scope.password2){
        $scope.passwordNoMatch = true;
        $timeout(function(){
            $scope.passwordNoMatch = false;
        }, 1500);
      }else{
        $http.post(path + 'register_submit', {
          username: $scope.username,
          firstname: $scope.firstName,
          lastname: $scope.lastName,
          email: $scope.email,
          password: $scope.password,
          phone: $scope.phone
        }).then(function successCallback(response){
          if(response.data == 'reg successful'){
            $scope.regSuccessful = true;
            $scope.login();
            // console.log('i did ittttt')
            setTimeout(function(){
              $('#inputTutorialModal').modal();
            }, 1000);
          }
          else if(response.data = 'username taken'){
            $scope.loggedIn = false;
            $scope.usernameTaken = true;
            $timeout(function(){
              $scope.usernameTaken = false;
          }, 1500);
          }
        })
      } 
    }
```

HTML modal that pops up when a user wants to update or delete an already existing note
```html
    <div class="modal fade" id="inputModal" tabindex="-1">
      <div class="modal-dialog" role="document">
        <div class="modal-content" ng-style="{'background-color': noteColor}">
            <div class="modal-header">
              <h4 contenteditable class="modal-title" ng-model="title">SOME TITLE</h4>
            </div>
            <div class="modal-body">
              <p contenteditable="true" ng-model="content">SOMETHING HERE</p>
            </div>
          <div class="modal-footer">
            <div class="row">
              <div class="col-sm-5 color-selector-wrapper">
                    <a href=""><div class="color-selector" ng-click="setColor('#ffffff')"></div></a>
                    <a href=""><div class="color-selector" ng-click="setColor('#fd8b83')"></div></a>
                    <a href=""><div class="color-selector" ng-click="setColor('#fffe94')"></div></a>
                    <a href=""><div class="color-selector" ng-click="setColor('#84d8fd')"></div></a>
                    <a href=""><div class="color-selector" ng-click="setColor('#cdfd95')"></div></a>
                  </div>
                  <div class="col-sm-5 col-sm-offset-2">
                    <button type="button" class="btn btn-success" data-dismiss="modal" ng-click="editNote()">Save Note</button>
                    <button type="button" class="btn btn-danger" data-dismiss="modal" ng-click="deleteNote()">Delete Note</button>
                  </div>
                </div>
          </div>
        </div>
      </div>
    </div>
  ``` 

Python and MySQL queries to display the user's notes stored in the database on the backend on the Angular front-end.
```python
    @app.route('/get_notes', methods=['POST'])
    def get_posts(): 
      data = request.get_json() 
      username = data['username'] 
     
      get_user_id_query = "SELECT id FROM user WHERE username = '%s'" % username 
      cursor.execute(get_user_id_query) 
      user_id = cursor.fetchone() 
      get_notes_query = "SELECT n.title, n.contents, n.time, n.id, n.color, u.first_name, u.last_name FROM notes AS n INNER JOIN user AS u on u.id = n.user_id WHERE u.id = {0} ORDER BY time DESC".format(user_id[0]) 
     
      cursor.execute(get_notes_query) 
      get_notes_result = cursor.fetchall() 
      conn.commit() 
      return jsonify(get_notes_result)
``` 

Python and MySQL queries to check that the username and bcrypt-enhanced password match
```python 
    @app.route('/login_submit', methods=['POST'])
    def login_submit():
      data = request.get_json()
      username = data['username']
      password = data['password']
      session['username'] = username

      check_password_query = "SELECT username, password FROM user WHERE username = '%s'" % username
      cursor.execute(check_password_query)
      check_password_result = cursor.fetchone()
      print check_password_result[1]

      if bcrypt.hashpw(password.encode('utf-8'), check_password_result[1].encode('utf-8')) == check_password_result[1].encode('utf-8'):
        #we have a match
        print 'login success'
        return 'login successful'
      else:
        print 'no match'
        return 'no match'            
```        
