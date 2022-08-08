# HackUp

HackUp is a website clone, inspired by Meetup. HackUp can be used to find groups and individuals interested in programming and technology. HackUp users can also find events, such as hackathons and webinars, where they can test their skills or learn more technologies. It is ideal for all members of the tech industry, from beginner programmers to experienced developers.

**Live Site:** [HackUp](https://api-meetup-clone.herokuapp.com/)

## Wiki Links
- [API Documentation](https://github.com/AZensky/meetup-clone/wiki/API-Documentation)
- [Database Schema](https://github.com/AZensky/meetup-clone/wiki/Database-Schema)
- [Feature List](https://github.com/AZensky/meetup-clone/wiki/Feature-List)
- [Redux State Shape](https://github.com/AZensky/meetup-clone/wiki/Redux-State-Shape)

## Tech Stack

Frameworks, Platforms, and Libraries:

![JavaScript](https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E) ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![HTML5](https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white) ![CSS3](https://img.shields.io/badge/css3-%231572B6.svg?style=for-the-badge&logo=css3&logoColor=white) ![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)

Database: 

![SQLite](https://img.shields.io/badge/sqlite-%2307405e.svg?style=for-the-badge&logo=sqlite&logoColor=white)

Hosting:

![Heroku](https://img.shields.io/badge/heroku-%23430098.svg?style=for-the-badge&logo=heroku&logoColor=white)

## Landing Page

![image](https://user-images.githubusercontent.com/95510710/181406991-7a1af07d-2631-4f29-9faa-a0d6682aac6b.png)

## Events Page

![image](https://user-images.githubusercontent.com/95510710/181407609-ff84eccb-3023-415f-be36-b1e058dc8150.png)

## Groups Page

![image](https://user-images.githubusercontent.com/95510710/181407667-98a9bc50-5631-49f3-a7d1-cf198d7881ed.png)

## Event Details Page

![image](https://user-images.githubusercontent.com/95510710/181407786-a514f6ab-8109-4e0b-ada5-c525e4600d3e.png)

## Group Details Page

![image](https://user-images.githubusercontent.com/95510710/181407890-afc09d79-46f4-480c-be8c-6671b76ee827.png)

## Run Locally

- Clone the repo
- Open up two terminals, one for the backend, and one for the frontend
- In the first terminal, cd into the backend folder, run npm install to install the necessary dependencies, and then run npm start
- In the second terminal, cd into the frontend folder, run npm install to install the necessary dependencies, and then run npm start

### Environment Variables

To run this project, you need to add the following enviroment variables to your .env file in your backend folder.

```
PORT=8000
DB_FILE=db/dev.db
JWT_SECRET=«generate_strong_secret_here»
JWT_EXPIRES_IN=604800
```

### Database setup

To deploy this project run

```
npx dotenv sequelize db:migrate
npx dotenv sequelize db:seed:all
```

## To-do-list

- Images feature
- Event Attendees feature
- Group Members feature
- Venues feature

All to-do features have fully functional database tables and API routes. Only the UI is left to implement.

