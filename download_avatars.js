var secret = require('./secret.js')
var request = require('request');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  var options = {
    url: "https://api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers: {
      'User-Agent': 'request',
      'Authorization' : 'token ' + secret.GITHUB_TOKEN
    }
  };

  request(options, function(err, res, body) {
    var userList = JSON.parse(body);
    cb(err, userList);

    userList.forEach(function(eachUser){
      console.log(eachUser.avatar_url);
    })
  });
}






getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});


