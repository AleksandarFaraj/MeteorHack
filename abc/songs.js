Songs = new Mongo.Collection("songs");

Meteor.methods({
    sendSong: function (toId, songId) {
       Songs.insert({
            toId: toId,
           songId: songId,
           from: {name: Meteor.user.username, picture: Meteor.user.profile.picture}
        });
    }
});