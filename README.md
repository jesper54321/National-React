# README's Content Table
1. [Project Introduction; National-React](#national-react)
2. [Project Prototype](#project-prototype) 
3. [Database aspects](#entity-&-relation-diagram-and-database-description)


# National-React
----------------
Cross-country collaborative progressive web app project for educational purposes.

The idea behind the project is to create a geographic app that looks appealing and easy to use for users at a new, unknown place (for the moment, only at Gran Canaria island)
and helps them have somewhere well-known place to go.

This projects makes use of ReactJS as frontend, NodeJS as Backend and Google Firebase as a web hosting service.



# Database Of The Project

The project makes use of up to 5 entities, all related to the others in a certain way. ManyToMany, ManyToOne and OneToOne types of relationships are contained within.


### Entity & Relation Diagram and Database Description

The following image has been made to reflect the associations between the tables;

![3fb35679-7ec1-45d0-a9a4-56681d68dfcb](https://user-images.githubusercontent.com/71889035/157854553-ece6b706-ba47-4b46-b9d8-f105d8d76c1f.jpg)

Description of tables and fields are the following..;

User (Management of registered users into the Firebase database);
* id_user  - Primary Key number (Every user has their own (made for ease of record management, but username also works (and also avoids users with same usernames)))
* username - Variable text (users will have this text displayed on the chats they comment into and at the top of most application screens)
* password - Variable text (through firebase's process of signing in, this field's content becomes a long, encripted text value that's decode upon their loggin in process)
* profile  - Variable text (Contains a link (route) of a static image between the project's public folder)

1..1
 to
0..N

Comment (Messages created by users, which are saved on the database for the not-live place chats);
* id_comment - Primary Key number (Identifies an exact message)
* id_user    - Numeric field (Contains the value of 'id_user' from the User table that this record belongs to)
* id_place   - Numeric field (Contains the value of 'id_place' from the Place table that this record belongs to (remember, every place has its own not-live chat))
* content    - Variable text (Contains the message that the user at the field id_user has wrote)

0..1
 to
1..1

Place (Data related to a place that's used in the Place View screen for users to consult)
* id_place    - Primary Key number (Identifies an exact place)
* name        - Variable text (Contains the words this place has been named by)
* description - Variable text (Contains the definition of the place in a text up to 255 characters length)

1..1
 to
1..N

Image (Records for every place's gallery)
* id_image - Primary Key number (Identifies an exact image)
* id_place - Numeric field (Contains the value of 'id_place' from the Place table that this image belongs to)
* link     - Variable text (Contains the route of a static image saved within the project's public folder)


Next table is born by the ManyToMany relationship between a user and a place (0..1 to 0..1)

Visited (Tells which places an user has visited);
* id_user  - Primary Key number (Identifies an user that visited the place indicated on id_place field of this table (Which value is that of a Place table record's id_place)
* id_place - Primary Key number (Identifies a place that was visited by the user indicated on id_user field of this table (Which value is that of an User table record's id_user))



# Project Prototype
-------------------

Between the files of this repository's root folder, a file of VP extension can be found, it's content is the prototype of this project and can be opened using the 'Justinmind' designer tool

* The prototype's look and the final project's look might be different, as the prototype here serves as the 'main goal' the developers are going for.

* Most imagery used here is free to use, excepting only the map of the main screen of the app and the background of the list view of available places; We are not responsible of the wrong use of the map image that does not take part on the project's application.

The project initially contains up to 9 different, related views, from most to least important views, these are;


### User; Credentials screen

Initial view of the app, where the user can choose to log in or be a guest. The logo and words below are up to be changed.

![user-credentials@1x](https://user-images.githubusercontent.com/71889035/157842180-6222c794-b0a4-4874-8d9f-41735da04ed8.png)


### User; Log in screen

Where the user gives their data in order to access the app with their own information, such as account profile and username.

![user-log-in@1x](https://user-images.githubusercontent.com/71889035/157844662-1c3e23ef-4287-4aa9-a8df-2bca71a048b2.png)


### User; Register screen

Where the user, in order to create an account and access into the app, gives username, password and email data. Email is thought to be used for account verification purposes.

![user-register@1x](https://user-images.githubusercontent.com/71889035/157845053-45a1e779-2927-448d-8e97-b32e286b000b.png)


### App; Main screen

Screen that appears just after the successful user account definition (with both guest and logged in status). This screen makes a slight imitation of Google Maps' Interface
where the map can be zoomed in and out, and the user can swipe the screen to move through it. Places available by the project are thought to appear as little boxes all over the map.

The up and down bars are locked within the device's screen, allowing the user to (from up left to down right) have a look at their info, close the user's session, go to the main screen
(which is this one), go to Live Chat, see a list of the available places added to the project, consult information (as what's this app about), and finally, the contact page.

![app-main@1x](https://user-images.githubusercontent.com/71889035/157846993-c6943833-430c-41be-93e1-4392f00af8ef.png)


### App; Live Chat Screen

Where different users connected to the app can remotely speak with each other. This chat's content is not saved on the database, so it is empty for the user that just entered the app.

This screen isn't required for the grades upon the project's evaluation, so there's a chance this view doesn't get added at the final project structure.

This screen has not been designed inside the prototipe file just yet.. Wait for an update of this someday on the month of March (project deadline is marked down at day 26).


### App; Place View Screen

Probably the most considered view along with the main screen, this screen shows images of the place, a description up to 255 characters, a button to initialise Google App with a route towards the place and a Chat (Not the Live Chat).

Unlikely the Live Chat, the chat of this screen is saved on a database and exclusively relates to the place (so other places will also have their own small chat), messages ever wrote here by any user will be loaded here for the user.

![app-place-view@1x](https://user-images.githubusercontent.com/71889035/157850106-16267322-5061-4fd3-b0d0-985570f78d5a.png)


### App; Place List Screen

As the name says, this screen shows a list of the 'boxes' that would appear on the main screen within its map in an user-friendly interface and through the use of a carrousel.

* Each of the 'cards' with the different places sends the user to its Place View page upon click/press.

* For this project's future, an idea was brought into reality that this screen would have tabs to select a municipality (and before municipalities, options for different countries and so on), so only places belonging to it will appear (and the carrousel of the image list wouldn't be needed to avoid infinite-like scrolling). This idea is discarded for the moment in order to save time to work on the most important part of the criteria that's going to be used to evaluate the project.

![app-place-list@1x](https://user-images.githubusercontent.com/71889035/157851110-a2a98a99-4ff5-49df-81a0-af374fb82bc5.png)


### App; Info Screen

Made in case the user feels lost using the app, this screen explains the user how things work here.

* This screen was thought to be mixed with the Contact Screen (next one) as both have a 'similar nature'. The idea has not been implemented on the prototipe and is unknown to ever be on the final project.

* This screen is being worked on, an earlier version of this screen is shown in the following image;

![app-info@1x](https://user-images.githubusercontent.com/71889035/157851698-8562ee51-0ca6-446b-ac10-a0a16937c7a8.png)


### App; Contact Screen

Merely made for the user's good and following the structure of official websites, this screen is thought to provide the user with contact info from us as a company.

* However, at the current time, we are a team of students, and this aspect would only matter if we were an organization of some kind..

* This screen was thought to be mixed with the Info Screen (previous one) as both have a 'similar nature'. The idea has not been implemented on the prototipe and is unknown to ever be on the final project.

* This screen is being worked on, an earlier version of this screen is shown in the following image;

![app-contact@1x](https://user-images.githubusercontent.com/71889035/157853016-2276d97f-895f-4351-bfa5-996fb9ff5d58.png)



