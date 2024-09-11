const Controller = require("../../controller");
const { StatusCodes: HttpStatus } = require("http-status-codes");
const mongoose = require("mongoose");
const {
  copyObject,
  deleteInvalidPropertyInObject,
} = require("../../../../../utils/functions");
const createHttpError = require("http-errors");
const { FlightTypeSchemaModel } = require("../../../../models/flightType");
const { ProductModel } = require("../../../../models/product");
const {
  addProductSchema,
  updateProductSchema,
} = require("../../../validators/admin/product.schema");

class ProductController extends Controller {
  async addNewFlight(req, res) {
    await addProductSchema.validateAsync(req.body);
    const {
      flightNumber,
      airline,
      departure,
      arrival,
      duration,
      price,
      availableSeats,
      status,
      flightType,
    } = req.body;

    const product = await ProductModel.create({
      flightNumber,
      airline,
      departure,
      arrival,
      duration,
      price,
      availableSeats,
      status,
      flightType,
    });
    if (!product?._id)
      throw createHttpError.InternalServerError("Flight  was not registered");
    return res.status(HttpStatus.CREATED).json({
      statusCode: HttpStatus.CREATED,
      data: {
        message: "Product successfully created",
        product,
      },
    });
  }

  async getListOfFlights(req, res) {
    let dbQuery = {};
    const user = req.user;
    const {
      search,
      airline,
      departureCity,
      departureAirport,
      departureDateTime,
      arrivalCity,
      arrivalAirport,
      arrivalDateTime,
      price,
      status,
      page = 1,
      limit = 10,
      sort,
      flightType,
    } = req.query;

    if (search) {
      dbQuery["$text"] = { $search: search };
    }

    if (flightType) {
      const flightTypes = flightType.split(",");
      const flightTypeIds = [];
      for (const item of flightTypes) {
        const { _id } = await FlightTypeSchemaModel.findOne({
          englishTitle: item,
        });
        flightTypeIds.push(_id);
      }
      dbQuery["flightType"] = {
        $in: flightTypeIds,
      };
    }

    if (airline) {
      dbQuery["airline"] = airline;
    }
    if (departureCity) {
      dbQuery["departure.city"] = departureCity;
    }
    if (departureAirport) {
      dbQuery["departure.airport"] = departureAirport;
    }
    if (departureDateTime) {
      dbQuery["departure.dateTime"] = departureDateTime;
    }
    if (arrivalCity) {
      dbQuery["arrival.city"] = arrivalCity;
    }
    if (arrivalAirport) {
      dbQuery["arrival.airport"] = arrivalAirport;
    }
    if (arrivalDateTime) {
      dbQuery["arrival.dateTime"] = arrivalDateTime;
    }
    if (price) {
      dbQuery["price.economy"] = { $lte: price };
    }
    if (status) {
      dbQuery["status"] = status;
    }

    const sortQuery = {};
    if (!sort) sortQuery["createdAt"] = 1;
    if (sort) {
      if (sort === "latest") sortQuery["createdAt"] = -1;
      if (sort === "earliest") sortQuery["createdAt"] = 1;
      if (sort === "popular") sortQuery["likes"] = -1;
    }

    // Calculate skip and limit
    const skip = (page - 1) * limit;

    // Fetch products with pagination
    const products = await ProductModel.find(dbQuery, { reviews: 0 })
      .sort(sortQuery)
      .skip(skip)
      .limit(parseInt(limit));

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        products: products,
      },
    });
  }

  async getFlightById(req, res) {
    const { id: productId } = req.params;
    await this.findFlightById(productId);

    const flight = await ProductModel.findById(productId);
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        flight,
      },
    });
  }

  async updateFlight(req, res) {
    const { id } = req.params;
    await this.findFlightById(id);
    await updateProductSchema.validateAsync(req.body);
    const data = copyObject(req.body);
    deleteInvalidPropertyInObject(data, ["createdAt", "updatedAt"]);

    const updateFlightResult = await ProductModel.updateOne(
      { _id: id },
      {
        $set: data,
      }
    );

    if (!updateFlightResult.modifiedCount) {
      throw new createHttpError.InternalServerError(
        "Updating the flight was not successful"
      );
    }

    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "Flight successfully updated",
      },
    });
  }

  async removeFlight(req, res) {
    const { id } = req.params;
    await this.findProductById(id);
    const deleteResult = await ProductModel.deleteOne({ _id: id });
    if (deleteResult.deletedCount == 0)
      throw createError.InternalServerError(
        "Product deletion was not performed"
      );
    return res.status(HttpStatus.OK).json({
      statusCode: HttpStatus.OK,
      data: {
        message: "Product successfully deleted",
      },
    });
  }

  async findFlightById(id) {
    if (!mongoose.isValidObjectId(id))
      throw createHttpError.BadRequest("The sent product ID is incorrect");
    const product = await ProductModel.findById(id);
    if (!product) throw createHttpError.NotFound("No product found.");
    return product;
  }
}

module.exports = {
  ProductController: new ProductController(),
};
