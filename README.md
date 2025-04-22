# React-Booklist

## Description

This is the react front end for the booklist application.

## Installation and Setup

1. Fork the project (repository) first so that you have a copy of the project in your account.
2. Find the project you just forked in the list of projects under your account, and then clone the project down and run npm install to install node modules.
3. Add a remote repository with this command `git remote add fcc https://github.com/FreeCodeCamp-SLC/react-booklist`
   1. After you have added the remote repository, you can pull down the latest changes with the following command: `git pull fcc main`
   1. This is to ensure you are still able to pull down the latest changes from the original project. If you're new to using Git/GitHub and pushing/pulling, just ask one of the project leaders or ask during a meetup to go over this.
4. Create a .env file in the root of this project, go ahead and add the first one down below "ESLINT_NO_DEV_ERRORS". There is also 3 other key/value pairs you'll need here, message Alex Puhl on the UtahJS Slack to get this.
   1. ESLINT_NO_DEV_ERRORS=true
   2. REACT_APP_AUTH0_DOMAIN=MESSAGE_ALEX_FOR_VALUE (make sure it doesn't have a '/' at the end. Results in 404)
   3. REACT_APP_AUTH0_CLIENTID=MESSAGE_ALEX_FOR_VALUE
   4. REACT_APP_AUTH0_AUDIENCE=MESSAGE_ALEX_FOR_VALUE
5. Run `npm install` to install dependencies.

## Available Scripts

### `npm start`

Runs the app in whatever mode NODE_ENV is set to, by default that should be 'development'.
