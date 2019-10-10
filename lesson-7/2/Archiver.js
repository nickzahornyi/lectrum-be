const fs = require('fs');
const { pipeline } = require('stream');
var zlib = require('zlib');

class Archiver {
	constructor(path, options) {
		this.path = path;
		this.options = options;
		this.allowedAlgorithms = ['gzip', 'deflate'];
		this.init();
	}

	init() {
		this._validatePath();
		this._validateOptions();
		this._validateAlgorithm();
	}

	archive() {
		const archiver = this._getArchiveMethod();
		const rs = fs.createReadStream(this.path);
		const ws = fs.createWriteStream(`${this.path}.gz`);

		pipeline(rs, archiver, ws, error => {
			if (error) {
				console.error('Archive failed: ', error);
			} else {
				console.log('Archive succeeded');
			}
		});
	}

	extract() {
		const extracter = this._getExtractMethod();
		const rs = fs.createReadStream(`${this.path}.gz`);
		const ws = fs.createWriteStream(this.path);

		pipeline(rs, extracter, ws, error => {
			if (error) {
				console.error('Extract failed: ', error);
			} else {
				console.log('Extract succeeded');
			}
		});
	}

	_getArchiveMethod() {
		switch (this.options.algorithm) {
			case 'gzip':
				return zlib.createGzip();
			case 'deflate':
				return zlib.createDeflate();
			default:
				break;
		}
	}

	_getExtractMethod() {
		switch (this.options.algorithm) {
			case 'gzip':
				return zlib.createGunzip();
			case 'deflate':
				return zlib.createInflate();
			default:
				break;
		}
	}

	_validatePath() {
		fs.access(this.path, fs.constants.F_OK, error => {
			if (error) {
				throw new Error(`The file does not exist`);
			}
		});
	}

	_validateOptions() {
		if (!this.options.hasOwnProperty('algorithm')) {
			throw new Error(`Algorithm field is required!`);
		}
		if (Object.keys(this.options).length > 1) {
			throw new Error(`Options should contain only algorithm field`);
		}
	}

	_validateAlgorithm() {
		if (typeof this.options.algorithm !== 'string') {
			throw new Error(`Algorithm must be one of "${this.allowedAlgorithms.toString()}"`);
		}
		if (!this.allowedAlgorithms.some(algorithm => algorithm === this.options.algorithm)) {
			throw new Error(`Algorithm must be one of "${this.allowedAlgorithms.toString()}"`);
		}
	}
}

module.exports = Archiver;
