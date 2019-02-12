var secret = require('./secret.js')
var request = require('request');
var fs = require('fs');             //do i need this?

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


function downloadImageByURL(url, filePath) {
  request.get(url)
       .on('error', function (err) {
         throw err;
       })
       .on('response', function (response) {
         console.log('Response Status Code: ', response.statusCode);
       })
       .on('end', function () {
         console.log('Download complete.');
       })
       .pipe(fs.createWriteStream(filePath));
}

downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "avatars/kvirani.jpg")

getRepoContributors("jquery", "jquery", function(err, result) {
  console.log("Errors:", err);
  console.log("Result:", result);
});


