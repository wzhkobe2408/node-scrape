var request = require('request'),
    cheerio = require('cheerio'),
    fs = require('fs'),
    jimp = require('jimp');

var images = [];

request('https://www.pexels.com/search/mountain/', function(err, res, body) {
    if(!err && res.statusCode === 200) {
        var $ = cheerio.load(body);
        $('img.photo-item__img').each(function() {
            var img = $(this).attr('src');
            images.push(img);
        })
        for (let i = 0; i < images.length; i++) {
            let fileName = 'images/mountain-' + i + '.jpg'
            request(images[i]).pipe(fs.createWriteStream(fileName))
                .on('close', function() {
                    jimp.read(fileName, function (err, img) {
                        if (err) throw err;
                        img.quality(60)
                            .greyscale()
                            .write("images/mountain-grey-" + i + ".jpg");
                    });
                })
        }
    }
})
