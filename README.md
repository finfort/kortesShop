# Kortes internet shop web app
## Project resources:
 * Repository:        https://bitbucket.org/zd333/kortesshop
 * Tracking system:   https://bitbucket.org/zd333/kortesshop/issues

## How to use Vagrant environment
### Install following apps:
 * Vitrualbox >=v5.0.4
 * Install Vagrant >=1.7.4
 * Install vagrant plugins "vagrant plugin install vagrant-vbguest"
### How to run:
 * From project root directory execute "vagrant up" command
 * (optional) After vagrant configuration updates - from project root directory execute "vagrant provision" command and restart box ("vagrant reload")

## Dev environment resources
### SSH box's credentials:
 * use "vagrant ssh" command from project root directory
 * phrase:
 * password: vagrant
### Frontend meteor app:
 * http://localhost:3000/
### Meteor app's build-in Mongodb:
 * localhost:3001/
