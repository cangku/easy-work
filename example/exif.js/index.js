var ExifImage = require('exif').ExifImage;

function exifImage(img) {
    new ExifImage({ image: img }, function (error, exifData) {
        if (error)
            console.log(`${img} Error: ` + error.message);
        else
            console.log(img, 'Orientation', exifData ? exifData.image.Orientation : '没有信息'); // Do something with your data!
    });
}

try {
    // exifImage('00.jpg');
    // exifImage('01.jpeg');
    // exifImage('02.jpg');
    exifImage('03.jpg');
    exifImage('04.jpg');
} catch (error) {
    console.log('Error: ' + error.message);
}
