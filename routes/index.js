'use strict';
var express = require('express');
var router = express.Router();

router.get('/express', function(req, res, next) {
  res.render('index', { title: 'React' });
});

var links = [];

router.get('/api/links', function(req, res, next) {
   res.json({ links: links });
});

router.post('/api/links', function(req, res, next) {
   var newLink = req.body;
   newLink.id = Date.now();
   links.push(newLink);
   res.json(newLink);
   console.log(newLink);
});

router.post('/api/del/links', function(req, res, next) {
   var newLink = req.body;
   newLink.id = Date.now();
   var dinks = JSON.stringify(links);
   var cut = dinks.indexOf(newLink.urlToDel.slice(7));
   var left = dinks.slice(0,cut);
   var right = dinks.slice(cut);
   left = left.replace(/({"title":"[a-zA-Z]+","url":"$)/, '');
   right = right.replace(/(^[a-zA-Z]*.com","id":\d*})/, '');
   var bound = left.concat(right);
   bound = bound.replace(/(,,)/g,',');
   bound = bound.replace(/(\[\,)/,'[');
   bound = bound.replace(/(\,\])/,']');
   bound = (JSON.parse(bound));
   links = bound;
   console.log({ link: newLink.urlToDel });
   res.json({ link: newLink.urlToDel });
});

router.post('/api/like/links', (req, res, next) => {
  console.log('in router', req.ip);
  let id = Number(req.body.id)
  let ip = req.ip;
  let foundLink = links.filter( link => {
    return link.id === id
  });
  if (!foundLink[0].likes){
    foundLink[0].likes = [ip]
  } else {
      if(foundLink[0].likes.indexOf(ip) > -1){
        console.log('IN THE REMOVE LIKE')
        var deleteI = foundLink[0].likes.indexOf(ip);
        foundLink[0].likes.splice(deleteI, 1);
      } else {
        foundLink[0].likes.push(ip)
      }
  }
  links = links.map(link => {
    if (link.id === foundLink[0].id){
      console.log(link.likes)
      return foundLink[0];
    } else {
      return link
    }
  })
  console.log(links)
  res.send(links)
})

module.exports = router;
