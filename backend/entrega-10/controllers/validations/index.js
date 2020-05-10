const Joi = require('@hapi/joi');

// New entry
const entrySchema = Joi.object().keys({
  place: Joi.string()
    .max(100)
    .required()
    .error(
      new Error(
        'El campo place es obligatorio y no puede tener más de 100 caracteres'
      )
    ),
  description: Joi.string()
    .max(1000)
    .required()
    .error(
      new Error(
        'El campo description es obligatorio y non puede tener más de 1000 caracteres'
      )
    )
});

const voteSchema = Joi.object().keys({
  vote: Joi.number()
    .min(1)
    .max(5)
    .integer()
    .required()
    .error(new Error('El campo voto debe existir y ser un número entre 1 y 5'))
});

const searchSchema = Joi.string()
  .min(2)
  .required()
  .error(new Error('El campo de búsqueda debe de ser de más de 2 caracteres'));

// Validate login and registre
const userSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(new Error('The provided email is not well formed.')),
  password: Joi.string()
    .min(6)
    .max(100)
    .required()
    .error(new Error('The password must be between 6 and 100 characters.'))
});

const editUserSchema = Joi.object().keys({
  email: Joi.string()
    .email()
    .required()
    .error(new Error('The provided email is not well formed.')),
  realName: Joi.string()
    .max(255)
    .error(new Error('Real name must be more than 255 characteres'))
});
module.exports = {
  entrySchema,
  voteSchema,
  searchSchema,
  userSchema,
  editUserSchema
};
