const expressAsyncHandler = require("express-async-handler");
const {
  ProductController,
} = require("../http/controllers/admin/product/product.controller");


const router = require("express").Router();

router.get("/list", expressAsyncHandler(ProductController.getListOfFlights));

router.get("/:id", expressAsyncHandler(ProductController.getFlightById));
module.exports = {
  productRoutes: router,
};
