var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs');

var images = [];

request('https://www.pexels.com/search/cat/', function(err, res, body) {
    if(!err && res.statusCode === 200) {
        var $ = cheerio.load(body);
        $('img.photo-item__img').each(function() {
            var img = $(this).attr('src');
            images.push(img);
        })
        for (var i = 0; i < images.length; i++) {
            request(images[i]).pipe(fs.createWriteStream('images/cat-' + i + '.jpg'));
        }
    }
})