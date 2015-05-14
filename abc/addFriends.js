Meteor.methods({
    addFriend: function (friendId) {

        Meteor.users.update({
            _id: Meteor.userId()
        }, {
            $push: {'profile.friends': friendId}
        });
    }
});