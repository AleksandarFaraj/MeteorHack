Meteor.methods({
    setUsername: function (username) {
        Meteor.users.update({
            _id: Meteor.userId()
        }, {
            $set: {username: username}
        });
    }
});