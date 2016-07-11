import { Meteor } from 'meteor/meteor';
import { Products } from '../api/products/';

Meteor.startup(() => {
  // if (Products.find().count() === 0) {
  //   const products = [{
  //     'name': 'Dubstep-Free Zone',
  //     'description': 'Fast just got faster with Nexus S.'
  //   }, {
  //     'name': 'All dubstep all the time',
  //     'description': 'Get it on!'
  //   }, {
  //     'name': 'Savage lounging',
  //     'description': 'Leisure suit required. And only fiercest manners.'
  //   }];

  //   products.forEach((product) => {
  //     Products.insert(product)
  //   });
  // }
  if (Meteor.users.find().count() === 0) {
    var users = [
      { name: "Normal User", email: "normal@example.com", roles: ["user"] },
      { name: "View-Secrets User", email: "view@example.com", roles: ['view-secrets'] },
      { name: "Manage-Users User", email: "manage@example.com", roles: ['manage-users'] },
      { name: "Admin User", email: "admin@example.com", roles: ['admin'] }
    ];

    _.each(users, function (user) {
      var id;

      id = Accounts.createUser({
        email: user.email,
        password: "apple1",
        fullName: user.name
      });

      // email verification
      Meteor.users.update({ _id: id }, { $set: { 'emails.0.verified': true } });

      if (user.roles.length > 0) {
        // Need _id of existing user record so this call must come
        // after `Accounts.createUser` or `Accounts.onCreate`
        Roles.addUsersToRoles(id, user.roles,  Roles.GLOBAL_GROUP);
      }

    });
  }
});