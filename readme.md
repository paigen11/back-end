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
  * CSS / SASS
  * Bootstrap
  * JavaScript
  * AJAX
  * AngularJS
  * Flask
  * Python
  * MySQL

##Challenges and Solutions
---
This project had challenges from the beginning. Here's a few of the obstacles we encountered and how we overcame them.

  * Challenge #1: Deciding how to serve up page views (Flask & Jinja to render templates versus Angular's ngRoutes)

  	We had two ways to render page views based on our technology stack. On the front end, Angular's ngRoutes uses /views to render views. On the back end, Flask uses templates to render views with its render_templates module. In the end, we decided to go with Angular's ngRoutes to serve up pages instead of Flask, and in order to send data forward to Angular we'd need from the MySQL database, we'd use Flask's send_file() function to push it forward.     
