#!/bin/bash

#Reaction Keeper Updater

echo "Reaction Keeper Updater Script by Haidawe."

sleep 1

echo "Type Install to install the latest version of reaction keeper, and Exit to exit. Warning: Do not run this as root user! If you are running it as root, stop the script and run this as your user."
read Idea
echo

# If install is chosen
if [[ $Idea == Install ]]; then
cd
 cd Downloads
mkdir RK
 cd RK
curl -OL http://moomoohk.github.io/assets/bin/reactionkeeper/reactionkeeperJAR.zip
tar -xf reactionkeeperJAR.zip
 echo "Congrats! You have obtained the newest version of Reaction Keeper! If it happens to be the same version, just remove it, this is intended for when you know there is a new version. The .jar is located in /Downloads/RK, enjoy!"
sleep 12

# If exit is chosen
elif [[ $Idea == Exit ]]; then
 echo "Exiting..."

#If there is unrecognized input
else 
 echo "Input not recognized, returning to main menu..."
sleep 3
bash RKUpdaterOSX.command

 fi   
