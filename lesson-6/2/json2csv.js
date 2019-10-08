const fs = require("fs");
const os = require("os");
const path = require("path");

class Json2csv {
    constructor({ fields }) {
        this.fields = fields;
    }

    convert(filePath) {
        this._validatePath(filePath);

        const fileName = path.basename(filePath).replace(/.json/, ".csv");
        const dirName = path.dirname(filePath);
        const readStream = fs.createReadStream(filePath);
        const writeStream = fs.createWriteStream(path.join(dirName, fileName));
        let streamData = "";

        readStream.on("data", chunk => {
            streamData += chunk.toString();
        });
        readStream.on("error", error => console.log(error));
        readStream.on("end", () => {
            const data = JSON.parse(streamData);

            let str = this._createCSVHeaders(data[0]);
            str += this._parseCSVData(data);

            writeStream.write(str, "utf-8");
            writeStream.on("error", error => console.log(error));
            writeStream.end();
        });
    }

    _createCSVHeaders(object) {
        this._validateFields(object);

        const keys = Object.keys(object).filter(item => this.fields.some(i => i === item));
        return keys.join(";") + os.EOL;
    }

    _parseCSVData(data) {
        const convertedData = data.map(item => {
            for (const key in item) {
                if (!this.fields.some(i => i === key)) {
                    delete item[key];
                }
                if (typeof item[key] === "string") {
                    item[key] = item[key].replace(/(\r\n|\n)/g, " ");
                }
            }
            return Object.values(item).join(";");
        });
        return convertedData.join(os.EOL);
    }

    _validatePath(filePath) {
        if (!filePath || typeof filePath !== "string") {
            throw new Error("Path to file is required and must be a string");
        }
        if (path.extname(filePath) !== ".json") {
            throw new Error(`The extension of file must be .json`);
        }
        fs.access(filePath, fs.constants.F_OK, error => {
            if (error) {
                throw new Error(`The file does not exist`);
            }
        });
    }

    _validateFields(object) {
        this.fields.forEach(field => {
            if (!field) {
                throw new Error(`The field can't be blank`);
            }
            if (!object.hasOwnProperty(field)) {
                throw new Error(`There isn't field with name - ${field}`);
            }
        });
    }
}

module.exports = Json2csv;
