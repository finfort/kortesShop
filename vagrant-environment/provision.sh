#!/bin/bash
CONF_DIR=//vagrant/vagrant-environment/conf
QUIET_APT=-qq

echo "Installing GIT, nodejs, npm..."
sudo apt-get update --yes $QUIET_APT
sudo apt-get install --reinstall  -y --force-yes -o Dpkg::options::=--force-confold $QUIET_APT git nodejs nodejs-legacy npm dos2unix

echo "Installing and setting up meteor (be patient, takes several minutes)..."
#curl -s https://install.meteor.com/ | sh &> /dev/null
curl -s https://install.meteor.com/ | sh

echo "Finished box provisioning. To start meteor app - login and run 'dos2unix /vagrant/vagrant-environment/kortes.sh && bash /vagrant/vagrant-environment/kortes.sh'"