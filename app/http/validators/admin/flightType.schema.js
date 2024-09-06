const Joi = require("joi");
const createHttpError = require("http-errors");

const addFlightTypechema = Joi.object({
  title: Joi.string()
    .required()
    .min(3)
    .max(100)
    .error(
      createHttpError.BadRequest(
        "The Persian title of the FlightType category is not valid"
      )
    ),
  englishTitle: Joi.string()
    .required()
    .min(3)
    .max(100)
    .error(
      createHttpError.BadRequest(
        "The English title of the FlightType category is not valid"
      )
    ),
  type: Joi.string()
    .required()
    .min(3)
    .max(100)
    .valid("flightType", "post", "comment", "ticket")
    .error(
      createHttpError.BadRequest(
        "The type of the FlightType category is not valid"
      )
    ),
});

const updateFlightTypeSchema = Joi.object({
  title: Joi.string()
    .min(3)
    .max(100)
    .error(
      createHttpError.BadRequest(
        "The Persian title of the category is not valid"
      )
    ),
  englishTitle: Joi.string()
    .min(3)
    .max(100)
    .error(
      createHttpError.BadRequest(
        "The English title of the category is not valid"
      )
    ),
  type: Joi.string()
    .required()
    .min(3)
    .max(100)
    .valid("flightType", "post", "comment", "ticket")
    .error(createHttpError.BadRequest("The category type is not valid")),
});

module.exports = {
  addFlightTypechema,
  updateFlightTypeSchema,
};
