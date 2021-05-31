#!/bin/bash

#give permission for everything in the devops_projects directory
sudo chmod -R 777 /home/ubuntu/devops_projects

#navigate into our working directory where we have all our github files
cd /home/ubuntu/devops_projects

#add npm and node to path
export NVM_DIR="$HOME/.nvm"	
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # loads nvm	
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # loads nvm bash_completion (node is in path now)

#install node modules
exho "Installing dependencies..."
npm install
npm install nodemon -g

#start our node app
exho "Starting server..."
npm run start
