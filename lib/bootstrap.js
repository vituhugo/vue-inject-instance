const fs = require('fs');

let paths = {
    scripts: 'resources/assets/js/',
    instances: 'instances/',
    current: 'node_modules/vue-inject-instance/',
};

paths.instances = paths.scripts+paths.instances;

export default {
    make(instances_path, file_result) {

        instances_path = instances_path || paths.instances;
        file_result = file_result || paths.scripts+'/VueInstanceInject.vendor.js';

        if (["\\","/"].indexOf(instances_path.split('').reverse()[0]) === -1) {
            instances_path += "/"
        }

        if (["\\","/"].indexOf(file_result.split('').reverse()[0]) === -1) {
            file_result += "/"
        }

        fs.readdir(
            paths.instances,
            (err, files) => {
                if (err) {
                    return console.log(err);
                }

                let raw = files
                    .map(fileName => 'require("'+instances_path+fileName+'")')
                    .join(",\r\n\t");

                fs.readFile(
                    paths.current+'lib/VueInstanceInject.vendor.example.js',
                    'utf8',
                    function(err, data) {
                        if (err) {
                            return console.log(err);
                        }

                        data = data.replace("//!!REQUIRES!!", raw);

                        fs.writeFile(file_result,
                            data,
                            function (err) {
                                if (err) return console.log(err);
                                console.info("Create Vue instance vendor file");
                            }
                        );
                    }
                );
            }
        );
    }
}