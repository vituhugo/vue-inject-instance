const fs = require('fs');

class VueInstanceInject {
    constructor(options) {
        options = options || {};
        this.path = {
            current: 'node_modules/vue-inject-instance/',
            instance: options.instance_path || 'resources/assets/js/instances',
            output: "node_modules/vue-inject-instance/instances.js"
        };

    }

    apply(compiler) {
        let instances_path = this.path.instance;
        let file_result = this.path.output;

        if (["\\","/"].indexOf(instances_path.split('').reverse()[0]) === -1) {
            instances_path += "/"
        }

        if (["\\","/"].indexOf(file_result.split('').reverse()[0]) === -1) {
            file_result += "/"
        }

        fs.readdir(
            instances_path,
            (err, files) => {
                if (err) {
                    return console.error(err);
                }

                let raw = files
                    .map(fileName => 'require("/'+instances_path+fileName+'")')
                    .join(",\r\n\t");

                fs.readFile(
                    this.path.current+'lib/VueInstanceInject.vendor.example.js',
                    'utf8',
                    function(err, data) {
                        if (err) {
                            return console.error(err);
                        }

                        data = data.replace("//!!REQUIRES!!", raw);

                        fs.writeFile(file_result,
                            data,
                            function (err) {
                                if (err) {
                                    return console.error(err);
                                }
                            }
                        );
                    }
                );
            }
        );
    }
}

module.exports = VueInstanceInject;