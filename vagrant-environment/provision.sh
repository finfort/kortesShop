#!/bin/bash
CONF_DIR=//vagrant/vagrant-environment/conf
QUIET_APT=-qq

sudo apt-get update --yes $QUIET_APT
sudo apt-get install --reinstall  -y --force-yes -o Dpkg::options::=--force-confold $QUIET_APT git nodejs nodejs-legacy npm

#install and setup meteor
curl https://install.meteor.com/ | sh
meteor remove blaze-html-templates
meteor remove ecmascript
meteor npm install --save angular angular-meteor angular-ui-router
meteor add angular-templates pbastowski:angular-babel

#Instead of simply running meteor app - do some prepairments first.
#It's due to meteor app is in Vagrant shared folder.
#See http://stackoverflow.com/questions/25712468/cant-create-working-meteor-js-project-on-a-vagrant-box
mkdir -p /home/vagrant/kortesMeteorApp/.meteor/local
sudo mount --bind /home/vagrant/kortesMeteorApp/.meteor/local/ /vagrant/kortesMeteorApp/.meteor/local/
cd /vagrant/kortesMeteorApp
meteor
