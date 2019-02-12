var repoOwner = process.argv[2]
var repoName = process.argv[3]


var secret = require('./secret.js');
var request = require('request');
var fs = require('fs');

console.log('Welcome to the GitHub Avatar Downloader!');

function getRepoContributors(repoOwner, repoName, cb) {
  if(repoOwner === undefined || repoName === undefined){
    console.log('Error! The repository owner and repository name must be provided')
  } else {
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
      downloadImageByURL(eachUser.avatar_url, './avatars/' + eachUser.login + ".jpg" )
    });
  });
  }
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

getRepoContributors(repoOwner, repoName, function(err, result) {
  if(err) throw err
});


