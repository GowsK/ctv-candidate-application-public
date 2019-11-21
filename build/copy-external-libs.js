var fs = require('fs');

function copyFile(source, target) {
    var rd = fs.createReadStream(source);
    var wr = fs.createWriteStream(target);
    
    return new Promise(function(resolve, reject) {
        rd.on('error', reject);
        wr.on('error', reject);
        wr.on('finish', function(){
            console.log(`File copied to ${target}`);
            resolve()
        });
        rd.pipe(wr);
    }).catch(function(err) {
        rd.destroy();
        wr.end();
        throw err;
    });
}

copyFile('node_modules/axios/dist/axios.js', 'public/js/libs/axios.js');
copyFile('node_modules/axios/dist/axios.map', 'public/js/libs/axios.map');
copyFile('node_modules/bootstrap/dist/css/bootstrap.css', 'public/styles/bootstrap.css');
copyFile('node_modules/bootstrap/dist/css/bootstrap.css.map', 'public/styles/bootstrap.css.map');