#!/bin/bash

echo "$(date) - Starting script" 

echo "$(date) - Changed directory to $(pwd)" 

if [ -d "node_modules" ]
then
  echo "$(date) - node_modules folder found, starting app" 
  npm start  
else
  echo "$(date) - node_modules folder not found, installing dependencies" 
  npm i  
  echo "$(date) - Dependencies installed, starting app" 
  npm start  
fi

echo "$(date) - UI Script finished" 






