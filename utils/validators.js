import Joi from 'joi';

/**
 * Validates user registration data.
 * @param {Object} userData - User registration data.
 * @param {string} userData.username - The username of the user (min 3 chars, required).
 * @param {string} userData.email - The email of the user (valid email format, required).
 * @param {string} userData.password - The password of the user (min 6 chars, required).
 * @returns {Object} - A Joi validation result object.
 */
const validateUserRegistration = (userData) => {
    const schema = Joi.object({
        username: Joi.string()
            .trim()
            .min(3)
            .required()
            .messages({
                'string.base': 'Username must be a string',
                'string.empty': 'Username is required',
                'string.min': 'Username must be at least 3 characters long',
                'any.required': 'Username is required',
            }),
        email: Joi.string()
            .trim()
            .email({ tlds: { allow: false } })
            .required()
            .messages({
                'string.base': 'Email must be a string',
                'string.empty': 'Email is required',
                'string.email': 'Email must be a valid email address',
                'any.required': 'Email is required',
            }),
        password: Joi.string()
            .trim()
            .min(6)
            .required()
            .messages({
                'string.base': 'Password must be a string',
                'string.empty': 'Password is required',
                'string.min': 'Password must be at least 6 characters long',
                'any.required': 'Password is required',
            }),
    });

    const { error, value } = schema.validate(userData, { abortEarly: false });

    if (error) {
         console.error('User registration validation error:', error.details.map(err => err.message).join(', '));
    }
    return { error, value };
};


/**
 * Validates user login data.
 * @param {Object} userData - User login data.
 * @param {string} userData.username - The username of the user (min 3 chars, required) or email.
 * @param {string} userData.password - The password of the user (min 6 chars, required).
 * @returns {Object} - A Joi validation result object.
 */
const validateUserLogin = (userData) => {
    const schema = Joi.object({
        username: Joi.string()
            .trim()
            .min(3)
            .messages({
                'string.base': 'Username must be a string',
                 'string.min': 'Username must be at least 3 characters long',
            })
            .when('email',{
                is: Joi.exist(),
                then: Joi.forbidden(),
                otherwise: Joi.required(),
            }),
           email: Joi.string()
            .trim()
            .email({ tlds: { allow: false } })
               .messages({
                   'string.base': 'Email must be a string',
                   'string.email': 'Email must be a valid email address',
                }).when('username',{
                is: Joi.exist(),
                then: Joi.forbidden(),
                 otherwise: Joi.required(),
            }),
        password: Joi.string()
            .trim()
            .min(6)
            .required()
            .messages({
                'string.base': 'Password must be a string',
                'string.empty': 'Password is required',
                'string.min': 'Password must be at least 6 characters long',
                'any.required': 'Password is required',
            }),
    }).or('username','email');
    const { error, value } = schema.validate(userData, { abortEarly: false });

    if (error) {
         console.error('User login validation error:', error.details.map(err => err.message).join(', '));
    }
    return { error, value };
};


/**
 * Validates goal data.
 * @param {Object} goalData - Goal data.
 * @param {string} goalData.description - The description of the goal (min 3 chars, required).
 * @param {number} goalData.target - The target value of the goal (positive number, required).
 * @param {number} goalData.progress - The current progress of the goal (non-negative number, required).
 * @returns {Object} - A Joi validation result object.
 */
const validateGoal = (goalData) => {
    const schema = Joi.object({
        description: Joi.string()
            .trim()
            .min(3)
            .required()
            .messages({
                'string.base': 'Description must be a string',
                'string.empty': 'Description is required',
                'string.min': 'Description must be at least 3 characters long',
                'any.required': 'Description is required',
            }),
        target: Joi.number()
            .positive()
            .required()
            .messages({
                'number.base': 'Target must be a number',
                'number.positive': 'Target must be a positive number',
                'any.required': 'Target is required',
            }),
        progress: Joi.number()
            .min(0)
            .required()
             .messages({
                 'number.base': 'Progress must be a number',
                'number.min': 'Progress must be a non-negative number',
                 'any.required': 'Progress is required',
            }),
    });
    const { error, value } = schema.validate(goalData, { abortEarly: false });

    if (error) {
         console.error('Goal validation error:', error.details.map(err => err.message).join(', '));
    }
    return { error, value };
};


export { validateUserRegistration, validateUserLogin, validateGoal };