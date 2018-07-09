const fs = require('fs');

let paths = {
    scripts: '/resources/assets/js/',
    instances: '/resources/assets/js/instances/'
};

fs.readdir(paths.instances, (err, files) => {
    if (err) {
        return console.log(err);
    }

    let raw = files.map(fileName => 'require("'+paths.instances+fileName+'")').join(",\r\n\t");

    fs.readFile('./VueInstanceInject.vendor.example.js', 'utf8', function(err, data) {
        if (err) {
            return console.log(err);
        }

        data = data.replace("//!!REQUIRES!!", raw);

        fs.writeFile('./VueInstanceInject.vendor.js', data, function (err) {
            if (err) throw err;
        });
    });
});




