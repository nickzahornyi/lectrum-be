const validateFilter = filter => {
	if (!filter) {
		throw new Error('Filter is required');
	}
	const allowedMainFields = ['name', 'phone', 'address', 'email'];
	const allowedNameFields = ['first', 'last'];
	const allowedAddressFields = ['zip', 'city', 'country', 'street'];

	for (let key in filter) {
		if (typeof filter[key] !== 'string' && typeof filter[key] !== 'object') {
			throw new Error('Wrong type');
		}
		if (typeof filter[key] === 'string' && !allowedMainFields.some(item => item === key)) {
			throw new Error(`${key} field isn't allowed`);
		}
		if (typeof filter[key] === 'object' && key !== 'name' && key !== 'address') {
			throw new Error(`${key} field isn't allowed`);
		}
		if (key === 'name') {
			for (let nameKey in filter[key]) {
				if (typeof filter[key][nameKey] !== 'string') {
					throw new Error(`Wrong type of ${nameKey} field`);
				}
				if (!allowedNameFields.some(item => item === nameKey)) {
					throw new Error(`${nameKey} field isn't allowed in name object`);
				}
			}
		}
		if (key === 'address') {
			for (let addressKey in filter[key]) {
				if (typeof filter[key][addressKey] !== 'string') {
					throw new Error(`Wrong type of ${addressKey} field`);
				}
				if (!allowedAddressFields.some(item => item === addressKey)) {
					throw new Error(`${addressKey} field isn't allowed in address object`);
				}
			}
		}
	}

	return filter;
};

const validateMeta = meta => {
	if (!meta) {
		return;
	}
	const { format, archive } = meta;
	if (format && format !== 'csv') {
		throw new Error('Format must be csv');
	}
	if (archive && typeof archive !== 'boolean') {
		throw new Error('Archive must be boolean');
	}

	return meta;
};

const findUser = (file, filter) => {
	let result = file;
	for (const key in filter) {
		if (key === 'name' || key === 'address') {
			for (const elem in filter[key]) {
				result = result.filter(item => {
					return item[key][elem].includes(filter[key][elem]);
				});
			}
		} else {
			result = result.filter(item => {
				return item[key].includes(filter[key]);
			});
		}

		if (result.length === 0) {
			result = "Couldn't find a suitable user";
			break;
		}
	}

	return result;
};

module.exports = { validateFilter, validateMeta, findUser };
