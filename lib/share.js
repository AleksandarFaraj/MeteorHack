Share = new Mongo.Collection("share");
if (Meteor.isServer) {
    Meteor.publish("share", function (ticket) {
        return Share.find({ticket:ticket});
    });
}
function makerandom()
{
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for( var i=0; i < 5; i++ )
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}

Meteor.methods({
    sendShare: function (songId) {
        var random = makerandom();
        Share.insert({
            ticket: random,
            songId: songId,
            from: {name: Meteor.user().profile.name, picture: Meteor.user().profile.picture}
        });
        return 'https://calm-sands-6408.herokuapp.com/s/'+random;
    }
});
