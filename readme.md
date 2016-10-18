#Janus 
---

##[Live Demo](TBD)
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
This is a group project where we made an organization app utilizing our full-stack skills. More as it comes alive...

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

##Challenges and Solutions
---
This project had challenges from the beginning. Here's a few of the obstacles we encountered and how we overcame them.

  * Challenge #1: Deciding how to serve up page views (Flask & Jinja to render templates versus Angular's ngRoutes)

  	We had two ways to render page views based on our technology stack. On the front end, Angular's ngRoutes uses /views to render views. On the back end, Flask uses templates to render views with its render_templates module. In the end, we decided to go with Angular's ngRoutes to serve up pages instead of Flask, and in order to send data forward to Angular we'd need from the MySQL database, we'd use Flask's send_file() function to push it forward.     

  * Challenge #2: Getting AngularJS to play nice with Masonry JavaScript library

    To create the card look and feel we were going for in our project, we found a great JavaScript cascading grid layout libary called Masonry. However, since the note cards were being loaded through Angular's `ng-repeat` function each time a user logged in or created a new one, the Masonry library was running too quickly in the success callback. To fix this, we set a timeout function of just 400 milliseconds, which gives Angular's ng-repeat enough time to run and queue up the posts correctly, and then Masonry executes and optimizes the cards in the vertical space of the browser window.