Songs = new Mongo.Collection("songs");

if (Meteor.isServer) {
    Meteor.publish("songs", function () {
        return Songs.find({toId:this.userId});
    });
}

Meteor.methods({
    sendSong: function (toId, songId) {
        Songs.insert({
            toId: toId,
            songId: songId,
            from: {name: Meteor.user().profile.name, picture: Meteor.user().profile.picture}
        });
    }
});
