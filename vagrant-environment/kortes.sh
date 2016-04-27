 
sudo mkdir -p /home/vagrant/kortesMeteorApp/.meteor/local
 
sudo mount --bind /home/vagrant/kortesMeteorApp/.meteor/local/ /vagrant/kortesMeteorApp/.meteor/local/ 

 sudo mount --bind /home/vagrant/kortesMeteorApp/.meteor/local/ /vagrant/kortesMeteorApp/.meteor/local/ 


 cd /vagrant/kortesMeteorApp/

 
 sudo meteor npm install --no-bin-links

 
 sudo meteor run
