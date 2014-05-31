'use strict';

app.controller('ProfileCtrl', function($scope, $routePrams, Post, User){
    $scope.user = User.findByUsername($routePrams.username);

    $scope.user.$on('loaded', populatePosts);

    function populatePosts () {
        $scope.posts = {};

        angular.forEach($scope.user.posts, function(postId){
            $scope.posts[postId] = Post.find(postId);
        });
    }

    function populateComments () {
        $scope.comments = {};

        angular.forEach($scope.user.comments, function(comment){
            var post = Post.find(comment.postId)

            Post.$on('loaded',function(){
                $scope.comments[comment.id] = post.$child('comments').$child(comment.id);
                $scope.commentedPost[comment.postId] = post;
            });
        });
    }
});