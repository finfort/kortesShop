import { Mongo } from 'meteor/mongo';

// Using address schema from schema.org
// https://schema.org/PostalAddress
const additionalUserInfo = {
  fullName: 'Ivanov Ivan Ivanovich',
  dealerGroup: 'Consumers',
  isActive: true,
  phone: "099 114 82 51",
  internalNotes: "some notes",
  addressLocality: 'Seattle',
  addressRegion: 'WA',
  postalCode: '98052',
  streetAddress: "20341 Whitworth Institute 405 N. Whitworth"
};

// Meteor.users.update(Meteor.user()._id, {
export function updateUser() {
  Meteor.users.update(Meteor.userId(), {
    $set: {
      additionalUserInfo: additionalUserInfo
    }
  });
}
Meteor.methods({
  updateUser
});
//http://docs.meteor.com/#/full/meteor_users if no autopublish