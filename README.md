# Minecraft 1v1 Matchmaking API

## Pre requirements

- [nvm](https://github.com/nvm-sh/nvm)
- [Node.js](https://nodejs.org/en)
- [yarn](https://yarnpkg.com/)

## VS Code config

- Add this to your `settings.json`:

  ```json
  {
    ...
    "editor.codeActionsOnSave": {
        "source.fixAll.eslint": "explicit",
        "source.sortImports": "explicit"
    },
    ...
  }
  ```

- Install [ESLint's extension](https://marketplace.visualstudio.com/items?itemName=dbaeumer)

## Script Suggestion

We suggest you add a script to automatically switch to the correct node version. We got a solution on [this article](https://javascript.plainenglish.io/nvm-on-steroids-auto-switch-nodejs-version-in-your-terminal-without-typing-the-nvm-use-command-3a49c4b5c6e0).

### Zsh

Add the following to your `~/.zshrc`

```
nvm_autouse() {
PREV_PWD=$PWD
if [[ -f ".nvmrc" ]]; then
   nvm use 
   NVM_DIRTY=true
elif [[ $NVM_DIRTY = true ]]; then
   nvm use default
   NVM_DIRTY=false
fi
}
nvm_autouse &>/dev/null
chpwd_functions=(${chpwd_functions[@]} "nvm_autouse")
```

### Bash

Add the following to your `~/.bashrc` or `~/.bash_profile`

```
enter_directory() {
if [[ $PWD == $PREV_PWD ]]; then
 return
fi
PREV_PWD=$PWD
if [[ -f ".nvmrc" ]]; then
   nvm use
   NVM_DIRTY=true
elif [[ $NVM_DIRTY = true ]]; then
   nvm use default
   NVM_DIRTY=false
fi
}


export PROMPT_COMMAND=enter_directory
```

## More info

This repository hosts the Express and TypeScript-based API for the **Minecraft 1v1** matchmaking system. It is designed to facilitate one-on-one Minecraft battles by setting up and managing the infrastructure required to host Minecraft servers for each match. Key features and technologies include:

- **Logging**: Utilizes Morgan for HTTP request logging and Winston for comprehensive application logging, ensuring high visibility into the API's operations and performance.
- **Testing**: Employs Jest alongside Supertest to provide thorough testing coverage, ensuring reliability and stability.
- **Security**: Integrates Helmet to enhance security by hiding sensitive HTTP headers and employs express-rate-limit to mitigate brute force attacks, making our API robust against common vulnerabilities.
- **Response Handling**: Expects responses to be structured with the body message and status code placed in `res.locals.message` and `res.locals.status` respectively, followed by calling `next()` for streamlined and consistent API responses.

This API is the backbone of the **Minecraft 1v1** service, orchestrating the dynamic setup of Minecraft servers for players looking to challenge each other in a one-on-one battle environment. Our goal is to provide a seamless and competitive gaming experience, leveraging the best practices in modern API development.
