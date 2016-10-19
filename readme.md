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

  * Challenge #3: Setting up a user demo to walk users through the site functions
  
    We wanted to have some kind a tutorial for new users when they first came to the site's dashboard. We did some research, found some - what seemed like - very useful demo plugins. Three hours, lots of documentation, numerous new file downloads and headaches later, we'd made no headway in getting these 'super simple and easy to use' demo plugins to work. Angular views and Bootstrap just weren't having it. So the walkthrough demo was scrapped and we tried Bootstrap's popovers - those came with their own set of headaches: popping up at the right tims, only showing to new users, etc. It wasn't working. Finally we found a solution, as soon as a new user registered and landed on the dashboard page, a modal dropped down welcoming them and outlining how to use Janus. Once the user dismissed the box, the backend was updated the user had seen the tutorial and so it wouldn't be shown again.

    * Challenge #4: Source control

    This very same thing was a challenge in our first group project as well. Before, every update and addition to our front-end project was pushed directly to the master file. That was not a smart way to approach it. So from the beginning, we created a production branch where our combined code would live, and only when we were ready to go live, would we push the production branch to the master. Once that was set up, all four of us created our own individual branches so we could work on files simultaneously and each time we were ready to update the production branch we'd warn the others and everyone would pull it down locally afterwards. This certainly helped overcome merge conflicts, but at times, pieces of code were still lost in future iterations. Luckily, we were able to go back to our commit history and find the missing pieces and replace them within the code fixing features that had broken.

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

##Code Examples
---

      