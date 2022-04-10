# ProgBridge

This project was created by me as the Angular front-end framework course at Softuni. It represents a social media, networking platform for developers and technology enthusiasts. They can sign up, make posts, leave replies, like comments and posts, message each other and follow each other.

## Pages accessible to logged users
<ul>
    <li>Home page (Includes peoples' posts and the user's contacts)</li>
    <li>Profile pages for all users</li>
    <li>Messenger</li>
    <li>Find Friends page / Friend Suggestions page</li>
    <li>404 page</li>
</ul>

## Pages accessible to logged out users
<ul>
    <li>Log in page</li>
    <li>Register page</li>
    <li>404 page</li>
</ul>

## Backend Structure
### The project's backend is a locally hosted Express server, that is utilizing MongoDB as a database.

#### Database structure
<ul>
    <li>Users Schema</li>
    <li>Posts Schema</li>
    <li>Messages Schema</li>
    <li>Conversations Schema</li>
    <li>Comments Schema</li>
</ul>

#### Services
<ul>
    <li> CRUD Service </li>
    <li> User Service </li>
</ul>

## Messenger System
### The messenger system works, thanks to socket.io and the follow-unfollow system. 

<ul>
    <li>In an attempt to limit eventual harrassment on ProgBridge, a user cannot message anybody except for their followers. 
    <br>
        User A could follow user B, but    until user B doesn't follow user A, then user A would not be able to see and send user B any messages.
        The idea behind is simple, if two users have an interest in talking to each other, they will follow each other and thus harrassment is highly unlikely on ProgBridge.
    </li>
    <li> Upon sending a message, if the conversations between user A and user B doesn't exist in the database it is then created and then the message is sent. 
        <br> Thanks to Socket.io and a bit of DOM manipulation the messages sent are displayed in real-time, to the respective user. 
    </li>
</ul>

## Posts system

<ul>
    <li>All registered users can make, delete and edit their posts (the delete and edit functions are available to the owners only).</li>
    <li>All registered users can Like, Comment and Share any posts, including their own posts.</li>
    <li>All registered users can Like and Reply to each comment, on any post.</li>
    <li>The posts show the amount of likes and comments they have.</li>
    <li>The posts are ordered by the likes amount.</li>
    <li>Posts are stored in the application state, thanks to ngrx.</li>

</ul>

## Profile Page
### The profile page includes the following sub-categories
<ul>
    <li> Followers </li>
    <li> Following </li>
    <li> Feed </li>
    <li> Shares </li>
</ul>

#### Users can also change their profile pictures from their profile page. In addition to that, users can follow each other through their profile pages.

## Technology Stack 
<ul>
    <li>Bootstrap (NgBootstrap)</li>
    <li>Angular 13</li>
    <li>JavaScript</li>
    <li>HTML, CSS, SCSS</li>
    <li>ExpressJS, NodeJS</li>
    <li>TypeScript</li>
    <li>MongoDB, Mongoose</li>
    <li>Redux (ngrx)</li>
    <li>Socket.io</li>
    <li>Bcrypt</li>
</ul>
