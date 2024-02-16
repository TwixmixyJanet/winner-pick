# 🔥 WINNER PICK 🔥

Because it only counts if you pick the winner.

The goal of this app is to pick the winner of a series on a reality TV show. The MVP will be to have teams draft their players and for their player to be one of the winners for all the bragging rights.

For example, it will be based off of the reality TV show, Survivor.

### [Use Winner Pick Now!](https://TBD "WINNER PICK")<br />

![image of WINNER PICK](./client/src/assets/TBD.png "image of WINNER PICK")
| Technology Used | Resource URL |
| -------- | ------- |
| NodeJS | https://nodejs.org/en |
| Material Design for Bootstrap | https://mdbootstrap.com/ |
| JavaScript | https://developer.mozilla.org/en-US/docs/Web/JavaScript |
| Git | https://git-scm.com/ |
| GitHub | https://github.com/ |
| VSCode | https://code.visualstudio.com/ |
| Cloudinary | https://cloudinary.com/ |
| Heroku | https://www.heroku.com/ |
| MongoDB | https://www.mongodb.com/ |
| Mongoose | https://www.npmjs.com/package/mongoose |
| GraphQL | https://graphql.org/ |
| Apollo Server | https://www.apollographql.com/ |
| React | https://react.dev/ |
| Vite | https://vitejs.dev/ |

## Table of Contents

- [Description](#description)
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Authors](#authors)

## Description:

1. User must be able to login and have access to their dashboard
2. User must have the ability to create a group for other users to join
   - "Group" is the "league" basically... damn should have named it that.
   - "Game" will be the specific game that the "Group" then plays for that season
     - Group name
     - Short description of the fantasy game and rules
     - Number of cast members (those who are on the TV show)
     - Number of players (Users in Group)
     - Name of each cast member
     - How many sessions the game will last (this would be the same as how many cast members there are.)
3. Users must be able to join a Group for a fantasy reality TV Game
   - Any games created under the Group, the users will automatically be part of that game
4. Users in the Group must be able to draft Cast Members from the Game
   - Round-robin the Users can select a cast member, until all are selected
   - Should there be an element of random dice to determine selection order?
   - What do we do with leftovers who don't get picked? Does the computer get to play with them?
5. Each session one cast member goes home
   - The User no longer gains points from that cast member once they are eliminated
   - Need the ability to add a session to assign who was eliminated each session
   - Each session 1 point is awarded for cast members remaining in the game
     - further points can be determined once this is working

Data Structure:

- Users
  - many users to many groups
  - many users to many games
  - one user to one cast member
  - many users to many episodes??
- Groups
  - many groups to many users
  - one group to many games
- Games
  - one game to many cast members
  - one game to many episodes
  - many games to one group
- Cast Members
  - many cast members to one group
  - one cast member to one user
  - many cast members to many episodes
- Eliminations
  - many eliminations to many cast members

<br />

### How to use this app:

- Click on the deployed link above 'Use Winner Pick Now!'

  - Add steps

- Navigate to the "LOGIN" to sign up for more functionalities
  - Add steps

## Installation

1. Create a new repository on GitHub, to store this project.
2. Clone the repository to your computer.
3. Copy files to your own repository.
4. Follow the steps for "How to" above
5. Make changes to the code.
6. Commit the changes to the local repo.
7. Push the changes to the remote repo.

## Usage

If you would like to update and use the app follow the installation steps and curate it to your needs. If you would like to use this app, follow the steps under the description 'How to' above and click the link at the top of this page.

## License

MIT License
Copyright (c) 2023 Janet Webster

<hr />

## Authors

### Janet Webster

Full Stack MERN Software Engineer.

- [GitHub](https://github.com/TwixmixyJanet/)
- [LinkedIn](https://www.linkedin.com/in/twixmixy/)
- [Twitter](https://twitter.com/Twixmixy)
- [WakaTime](https://wakatime.com/@Twixmixy)
