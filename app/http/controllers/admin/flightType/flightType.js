const Controller = require("../../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const createHttpError = require("http-errors");
const {
  addFlightTypechema,
  updateFlightTypeSchema,
} = require("../../../validators/admin/flightType.schema");
const { FlightTypeSchemaModel } = require("../../../../models/flightType");

class FlightTypeController extends Controller {
  async getListOfFlightType(req, res) {
    const query = req.query;
    const flightType = await FlightTypeSchemaModel.find(query);
    if (!flightType)
      throw createHttpError.ServiceUnavailable("flightType not found");

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        flightType,
      },
    });
  }

  async addNewFlightType(req, res) {
    const { title, englishTitle, type } =
      await addFlightTypechema.validateAsync(req.body);
    await this.findFlightTypeWithTitle(englishTitle);
    const flightType = await FlightTypeSchemaModel.create({
      title,
      englishTitle,
      type,
    });

    if (!flightType)
      throw createHttpError.InternalServerError("Internal error");
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: {
        message: "flightType added successfully",
      },
    });
  }

  async findFlightTypeWithTitle(englishTitle) {
    const flightType = await FlightTypeSchemaModel.findOne({ englishTitle });
    if (flightType)
      throw createHttpError.BadRequest(
        "A flightType with this title already exists."
      );
  }

  async checkExistFlightType(id) {
    const flightType = await FlightTypeSchemaModel.findById(id);
    if (!flightType)
      throw createHttpError.BadRequest(
        "A category with this title does not exist."
      );
    return flightType;
  }

  async updateFlightType(req, res) {
    const { id } = req.params;
    const { title, englishTitle, type } = req.body;
    await this.checkExistFlightType(id);
    await updateFlightTypeSchema.validateAsync(req.body);
    const updateResult = await FlightTypeSchemaModel.updateOne(
      { _id: id },
      {
        $set: { title, englishTitle, type },
      }
    );
    if (updateResult.modifiedCount == 0)
      throw createError.InternalServerError("Update was not performed");
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "Update was successful",
      },
    });
  }

  async removeFlightType(req, res) {
    const { id } = req.params;
    const flightType = await this.checkExistFlightType(id);
    const deleteResult = await FlightTypeSchemaModel.deleteMany({
      $or: [{ _id: flightType._id }, { parentId: flightType._id }],
    });
    if (deleteResult.deletedCount == 0)
      throw createError.InternalServerError(
        "flightType deletion was not performed"
      );
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "flightType deletion was successful",
      },
    });
  }

  async getFlightTypeById(req, res) {
    const { id } = req.params;
    const flightType = await this.checkExistFlightType(id);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        flightType,
      },
    });
  }
}

module.exports = {
  FlightTypeController: new FlightTypeController(),
};
