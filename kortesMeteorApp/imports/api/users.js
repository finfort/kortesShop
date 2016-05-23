import { Meteor } from 'meteor/meteor';
 
if (Meteor.isServer) {
  Meteor.publish('users', function() {
    return Meteor.users.find({}, {
      // fields: {
      //   emails: 1,
      //   profile: 1
      // }
    });
  });
  
   Meteor.users.allow({
    insert(userId) {
        return true;
    },
    update(userId, user, fields, modifier) {
       return true;//userId === user._id; 
    },
    remove(userId) {
        return userId;
    }
});

}


// Meteor.publish('MeteorUsers', function(){
//   return Meteor.users.find({});
// })