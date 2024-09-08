const createError = require("http-errors");
const Joi = require("joi");

const addProductSchema = Joi.object({
  flightType: Joi.string()
    .required()
    .error(createError.BadRequest("flightType is not valid")),
  flightNumber: Joi.string()
    .required()
    .min(3)
    .max(10)
    .error(createError.BadRequest("Flight number is not valid")),
  airline: Joi.string()
    .required()
    .min(2)
    .max(50)
    .error(createError.BadRequest("Airline name is not valid")),
  departure: Joi.object({
    airport: Joi.string()
      .required()
      .min(3)
      .max(50)
      .error(createError.BadRequest("Departure airport code is not valid")),
    city: Joi.string()
      .required()
      .min(2)
      .max(50)
      .error(createError.BadRequest("Departure city is not valid")),
    dateTime: Joi.date()
      .iso()
      .required()
      .error(createError.BadRequest("Departure date and time are not valid")),
  }).required(),
  arrival: Joi.object({
    airport: Joi.string()
      .required()
      .min(3)
      .max(50)
      .error(createError.BadRequest("Arrival airport code is not valid")),
    city: Joi.string()
      .required()
      .min(2)
      .max(50)
      .error(createError.BadRequest("Arrival city is not valid")),
    dateTime: Joi.date()
      .iso()
      .required()
      .error(createError.BadRequest("Departure date and time are not valid")),
  }).required(),
  duration: Joi.number()
    .required()
    .positive()
    .error(createError.BadRequest("Duration must be a positive number")),
  price: Joi.object({
    economy: Joi.number()
      .required()
      .positive()
      .error(createError.BadRequest("Economy price must be a positive number")),
    business: Joi.number()
      .required()
      .positive()
      .error(
        createError.BadRequest("Business price must be a positive number")
      ),
  }).required(),
  availableSeats: Joi.object({
    economy: Joi.number()
      .required()
      .integer()
      .positive()
      .error(
        createError.BadRequest(
          "Available economy seats must be a positive integer"
        )
      ),
    business: Joi.number()
      .required()
      .integer()
      .positive()
      .error(
        createError.BadRequest(
          "Available business seats must be a positive integer"
        )
      ),
  }).required(),
  status: Joi.string()
    .required()
    .valid("scheduled", "canceled", "delayed")
    .error(
      createError.BadRequest(
        "Status must be 'scheduled', 'canceled', or 'delayed'"
      )
    ),
});

const updateProductSchema = Joi.object({
  flightNumber: Joi.string()
    .min(3)
    .max(10)
    .error(createError.BadRequest("Flight number is not valid")),
  airline: Joi.string()
    .min(2)
    .max(50)
    .error(createError.BadRequest("Airline name is not valid")),
  departure: Joi.object({
    airport: Joi.string()
      .min(3)
      .max(5)
      .error(createError.BadRequest("Departure airport code is not valid")),
    city: Joi.string()
      .min(2)
      .max(50)
      .error(createError.BadRequest("Departure city is not valid")),
    dateTime: Joi.date().error(
      createError.BadRequest("Departure date and time are not valid")
    ),
  }),
  arrival: Joi.object({
    airport: Joi.string()
      .min(3)
      .max(5)
      .error(createError.BadRequest("Arrival airport code is not valid")),
    city: Joi.string()
      .min(2)
      .max(50)
      .error(createError.BadRequest("Arrival city is not valid")),
    dateTime: Joi.date().error(
      createError.BadRequest("Arrival date and time are not valid")
    ),
  }),
  duration: Joi.number()
    .positive()
    .error(createError.BadRequest("Duration must be a positive number")),
  price: Joi.object({
    economy: Joi.number()
      .positive()
      .error(createError.BadRequest("Economy price must be a positive number")),
    business: Joi.number()
      .positive()
      .error(
        createError.BadRequest("Business price must be a positive number")
      ),
  }),
  availableSeats: Joi.object({
    economy: Joi.number()
      .integer()
      .positive()
      .error(
        createError.BadRequest(
          "Available economy seats must be a positive integer"
        )
      ),
    business: Joi.number()
      .integer()
      .positive()
      .error(
        createError.BadRequest(
          "Available business seats must be a positive integer"
        )
      ),
  }),
  status: Joi.string()
    .valid("scheduled", "canceled", "delayed")
    .error(
      createError.BadRequest(
        "Status must be 'scheduled', 'canceled', or 'delayed'"
      )
    ),
});

module.exports = {
  addProductSchema,
  updateProductSchema,
};
