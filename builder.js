const fs = require('fs');

class Builder {
    constructor(options) {
        options = options || {};
        this.path = {
            current: 'node_modules/vue-inject-instance/',
            instance: options.instance_path || 'resources/assets/js/instances',
            output: "node_modules/vue-inject-instance/dist/instances.js"
        };

    }

    apply() {
        let instances_path = this.path.instance;
        let file_result = this.path.output;

        if (["\\","/"].indexOf(instances_path.split('').reverse()[0]) === -1) {
            instances_path += "/"
        }

        let filelist = fs.readdirSync(instances_path)

        let raw = filelist
            .map(fileName => 'require("../../../'+instances_path+fileName+'").default')
            .join(",\r\n\t");

        let data = fs.readFileSync(this.path.current+'lib/VueInstanceInject.vendor.example.js', 'utf8')
            .replace("//!!REQUIRES!!", raw);

        fs.writeFileSync(file_result, data);
    }
}

let builder = new Builder();
builder.apply();