const validate = ({ data, name, instance }) => {
    const { payload, meta } = data;
    if (typeof payload !== 'object') {
        throw new Error(`${name}: payload should be an object`);
    }

    if (!payload.hasOwnProperty('name')) {
        throw new Error(`${name}: payload should have required field name`);
    }

    if (!payload.name) {
        throw new Error(`${name}: payload.name should not be empty`);
    }

    if (typeof payload.name !== 'string') {
        throw new Error(`${name}: payload.name should should be a string`);
    }

    if (!payload.hasOwnProperty('email')) {
        throw new Error(`${name}: payload should have required field email`);
    }

    if (!payload.email) {
        throw new Error(`${name}: payload.email should not be empty`);
    }

    if (typeof payload.email !== 'string') {
        throw new Error(`${name}: payload.email should should be a string`);
    }

    if (!payload.hasOwnProperty('password')) {
        throw new Error(`${name}: payload should have required field password`);
    }

    if (!payload.password) {
        throw new Error(`${name}: payload.password should not be empty`);
    }

    if (typeof payload.password !== 'string') {
        throw new Error(`${name}: payload.password should should be a string`);
    }
};

const validateFields = ({ data, name, instance }) => {
    const allowedFields = [
        'payload',
        'name',
        'email',
        'password',
        'meta',
        'source',
        'algorithm'
    ];

    for (const key in data) {
        if (data.hasOwnProperty(key) && typeof data[key] !== 'object') {
            const isExist = allowedFields.some(field => field === key);

            if (!isExist) {
                throw new Error(
                    `${name}: data contains not allowed field — ${key}`
                );
            }
        } else {
            const isExist = allowedFields.some(field => field === key);

            if (!isExist) {
                throw new Error(
                    `${name}: data contains not allowed field — ${key}`
                );
            }
            validateFields({ data: data[key], name, instance });
        }
    }
};

module.exports = { validate, validateFields };
