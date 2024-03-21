# WordQuest - A Game About Words!
This full-stack project is an interactive guessing game app where the player can guess
a 5-letter word within three attempts. The player can input the guesses through the interface provided.
It is possible to play Solo or in a group:
- Option to play the game solo or;
- Invite friends to join groups to play together.

This feature adds a social element to the game, allowing for friendly competition.
Each round of the game gives the player three attempts to guess the correct word. The player will need to think critically, considering possible word combinations, and use the letters revealed after each attempt as clues to make up their guesses.
## Built With
- Express.js
- MySQL
- Sequelize
- Node.js
- JavaScript
- React
- React Router DOM
- Tailwind CSS
- Axios
## Setup
### Node.js
To access correctly this project, ensure to have Node.js correctly installed.
Run `node -v` in your terminal to check your Node.js version. If Node.js is not installed,
you can do so [here](https://nodejs.org/en).
### Dependencies
- Run `npm install` in your project directory. This will install server-related dependencies such as `express`.
- `cd client`and run `npm install`. This will install the client dependencies (React and React-Router).
### Database Prep
- Access the MySQL interface in your terminal by running `mysql -u YOUR-MYSQL-USERNAME -p`
- Add a `.env` file to the project folder of this repository containing the MySQL authentication information for MySQL user. For example:
```bash
  DB_HOST=localhost
  DB_USER=YOUR-MYSQL-USERNAME
  DB_NAME=WORDQUEST
  DB_PASS=YOUR-MYSQL-PASSWORD
  SUPER_SECRET=CREATE-PASSWORD
  EMAIL_USER=YOUR-GOOGLE-EMAIL
  EMAIL_PASS=YOUR-GOOGLEAPP-PASSWORD
```
> [!IMPORTANT]
> Please install dotenv (`npm install dotenv`).
- Run the following commands on your MySQL console and create a new database called wordquest: `create database wordquest`, then run `use wordquest`.
- Run 'npm run migrate' in your project directory. This will run the init.db file and initialize the database, meaning that this will create a table called 'wordquest' in your database.
- Make sure you understand how the table is constructed. In your MySQL console, you can run DESCRIBE tablename; to see the structure of the table. Please note that "tablename" in DESCRIBE tablename needs to be replaced by the name of the table that you want to describe.
### Development
- Run `npm start` in your project directory to start the Express Server on port 4000. It's recommended to use Nodemon for automatic server restarts during development. If you don't have Nodemon installed, you can install it globally using npm install -g Nodemon.
- In another terminal, do `cd client` and run `npm run dev` to start the client in development mode with hot reloading in port 5173.
### APIs
This application works with a free external API which does not require API keys (`https://random-word-api.vercel.app/api?words=10&length=5`).
## Database Design
https://drawsql.app/teams/shrudhi-priya/diagrams/games
## Possible Future Features
- Sending notifications directly to the user, without using the email function;
- Adding a payment method for a subscription plan to access unique features;
- Create your own game avatar/emoji;
- Social media platform, where the user can: add friends and leave comments on group sessions.❤
️
_This is a group project that was created at [CodeOp](http://codeop.tech), a full stack development bootcamp in Barcelona, Spain._
