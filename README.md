# README's Content Table
1. [Project Introduction; National-React](#national-react)
2. [Manual for Developer Users](#manual-of-the-developer-user)
3. [Database aspects](#database-aspects-of-the-project)
4. [Project Prototype](#project-prototype) 



# National-React
----------------
Cross-country collaborative progressive web app project for educational purposes within the month of March, year 2022.

The idea behind the project is to create a geographic app that looks appealing and easy to use for users at a new, unknown place (for the moment, only at Gran Canaria island)
and helps them have somewhere well-known place to go.

This projects makes use of ReactJS as frontend, NodeJS as Backend and Google Firebase as a web hosting service.



# Manual of the Developer User

Project's setup is easy to follow, and variation of material versions used should be a big deal. The following are sets of materials, requirements and steps to get this working, made as clear and brief as possible.

### Materials for Project Definition and Project Setup (Respectively)

* ZenHub          - Productivity Management tool used to distribute project work between all teammates (other team organization tools can be used)
* Justinmind      - User Interface Design tool used for the making of the Project's prototype.
* DIA             - Diagram Design tool used for the making of the Database's structure
* Visual Paradigm - Diagram Design tool used for the making of User Cases.

* Visual Studio Code - Mainly used IDE (Integrated Development Environment) for development (other IDEs can be used).
* NodeJS             - Features a server for local deployment, templates and structure used by ReactJS.
* ReactJS            - Main development & frontend framework.
* Google Firebase    - Global deployment and database management backend API.


### Material's Official Page for downloading (Respectively)

Optional software or not, you can check the Official Page we provide to you so you can visualize how they work.

#### These four are totally optional;
* ZenHub          - https://www.zenhub.com/
* Justinmind      - https://github.com/jesper54321/National-React.git
* DIA             - http://dia-installer.de/index.html.en
* Visual Paradigm - https://www.visual-paradigm.com/

#### Last two do not require any download;
* Visual Studio Code              - https://code.visualstudio.com/
* NodeJS                          - https://nodejs.org/en/
* ReactJS' Official Page          - https://reactjs.org/         (JavaScript library)
* Google Firebase's Official Page - https://firebase.google.com/ (registered google account required for database management)


### Setup;
1. Create an empty folder to contain this Guthub Repository's project.
2. (if downloading the ZIP source folder) Move the compressed file to the created folder & extract all files.
3. Open the folder with any compatible Integrated Development Environment (IDE), such as Visual Studio Code.
4. Open a new Git Bash terminal.
5. (if pulling remotely from Github) use 'git clone https://github.com/jesper54321/National-React.git' to obtain the project files.
6. On the Terminal, write 'npm install' to download project dependencies (around 500 megabytes of space required)
7. On the Terminal, write 'npm start', a page with URL 'localhost:3000' should pop up.
8. Enjoy the Application!

Note: The firebase account this project is linked to (which also manages database data) might not work when this project is given a try. If this happens, consider changing the piece of code within the project's source that relates to said firebase account.



# Database Aspects Of The Project
---------------------------------

The project makes use of up to 5 entities, all related to the others in a certain way. ManyToMany, ManyToOne and OneToOne types of relationships are contained within.


### Entity & Relation Diagram and Database Description

The following image has been made to reflect the associations between the tables;

![3fb35679-7ec1-45d0-a9a4-56681d68dfcb](https://user-images.githubusercontent.com/71889035/157854553-ece6b706-ba47-4b46-b9d8-f105d8d76c1f.jpg)

Description of tables and fields are the following..;

User (Management of registered users into the Firebase database);
* id_user  - Primary Key number (Identifier made for ease of management, but username also works (and also avoids users with same usernames))
* username - Variable text (Users will have this text displayed on the chats they comment into and at the top of most application screens)
* password - Variable text (Firebase's process of signing in gives this field a long, encripted text value, decoded on their loggin in process)
* profile  - Variable text (Contains a link (route) of a static image between the project's public folder)

1..1
 to
0..N
with

Comment (Messages created by users, which are saved on the database for the not-live place chats);
* id_comment - Primary Key number (Identifies an exact message)
* id_user    - Numeric field (Contains the value of 'id_user' from the User table this record belongs to)
* id_place   - Numeric field (Contains the value of 'id_place' from the Place table this record belongs to (Every place has its own not-live chat))
* content    - Variable text (Contains the message that the user at the field id_user has wrote)

0..1
 to
1..1
with

Place (Data related to a place that's used in the Place View screen for users to consult)
* id_place    - Primary Key number (Identifies an exact place (Name also works as there aren't two same places (two countries, towns, etc..) with same names))
* name        - Variable text (Contains the words this place has been named by)
* description - Variable text (Contains the definition of the place in a text up to 255 characters length)

1..1
 to
1..N
with

Image (Records for every place's gallery)
* id_image - Primary Key number (Identifies an exact image)
* id_place - Numeric field (Contains the value of 'id_place' from the Place table that this image belongs to)
* link     - Variable text (Contains the route of a static image saved within the project's public folder)


Next table is born by the ManyToMany relationship between a user and a place (0..N to 0..N)

Visited (Tells which places an user has visited);
* id_user  - Primary Key number (Identifies an user that visited the place indicated on id_place field of this table (Which value is that of a Place table record's id_place)
* id_place - Primary Key number (Identifies a place that was visited by the user indicated on id_user field of this table (Which value is that of an User table record's id_user))


### Project's Use Cases Diagram

From since the project was started, we decided to allow unregistered (guest) users to enter the app, but at the cost of few action permissions (allowing them only the basics of the app).

This user difference has been drawn into the next diagram, made using Visual Paradigm's 30 days evaluation version. Below it, an explanation has been provided;

![Riddlehunt project's Use Cases](https://user-images.githubusercontent.com/71889035/158565683-6f2378b0-f47d-44b7-8afa-93eb1c745d17.PNG)

#### Guest and Logged users are allowed in almost every screen the app contains and aspects, excepting..;
* Contact Screen            - As for the early version of the app we are making, an user should be logged in to make use of their Email & Username data.
* Live Chat Screen          - This feature is not required for the application's purpose itself, so it's supposed to be locked for them.
* Non-live Chat interaction - Seeing review comments made about each place can be understood as required, however, messaging on these isn't.
* The User's visit status   - We require Users to be logged so we can keep track of places they visit by making use of mapping API's and our database. For ease of development, this feature was not thought for Guest Users (There are practices such as using device Cookies to get this to work, for example).



# Project Prototype
-------------------

Between the files of this repository's root folder, a file of VP extension can be found, it's content is the prototype of this project and can be opened using the 'Justinmind' designer tool

* The prototype's look and the final project's look might be different, as the prototype here serves as the 'main goal' the developers are going for.

* Most imagery used here is supposed to be free for any use, excepting those like the map of the main screen and the background of the list view; We are not responsible of the wrong use of non-free-of-use imagery within the project's application.

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

![app-live-chat@1x](https://user-images.githubusercontent.com/71889035/158077271-440f68cb-3aae-48f9-bf3f-66d0e6e4e1c5.png)



### App; Place View Screen

Probably the most considered view along with the main screen, this screen shows images of the place, a description up to 255 characters, a button to initialise Google App with a route towards the place and a Chat (Not the Live Chat).

Unlikely the Live Chat, the chat of this screen is saved on a database and exclusively relates to the place (so other places will also have their own small chat), messages ever wrote here by any user will be loaded here for the user.

![app-place-view@1x](https://user-images.githubusercontent.com/71889035/158077352-da4a3133-9988-4ae2-80ab-520214236712.png)


### App; Place List Screen

As the name says, this screen shows a list of the 'boxes' that would appear on the main screen within its map in an user-friendly interface and through the use of a carrousel.

* Each of the 'cards' with the different places sends the user to its Place View page upon click/press.

* For this project's future, an idea was brought into reality that this screen would have tabs to select a municipality (and before municipalities, options for different countries and so on), so only places belonging to it will appear (and the carrousel of the image list wouldn't be needed to avoid infinite-like scrolling). This idea is discarded for the moment in order to save time to work on the most important part of the criteria that's going to be used to evaluate the project.

![app-place-list@1x](https://user-images.githubusercontent.com/71889035/157851110-a2a98a99-4ff5-49df-81a0-af374fb82bc5.png)


### App; Info Screen

Made in case the user feels lost using the app, this screen explains the user how things work here.

* This screen was thought to be mixed with the Contact Screen (next one) as both have a 'similar nature'. The idea has not been implemented on the prototipe and is unknown to ever be on the final project.

![app-info@1x](https://user-images.githubusercontent.com/71889035/158077380-a1d46b5d-dde1-4ac4-a4fb-cf3b0ad4f5f1.png)


### App; Contact Screen

Merely made for the user's good and following the structure of official websites, this screen is thought to provide the user with contact info from us as a company.

* However, at the current time, we are a team of students, and this aspect would only matter if we were an organization of some kind..

* This screen was thought to be mixed with the Info Screen (previous one) as both have a 'similar nature'. The idea has not been implemented on the prototipe and is unknown to ever be on the final project.

![app-contact@1x](https://user-images.githubusercontent.com/71889035/158077393-31486148-f18c-4998-ba10-420cfa7247d5.png)
