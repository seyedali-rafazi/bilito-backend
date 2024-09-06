const expressAsyncHandler = require("express-async-handler");
const {
  FlightTypeController,
} = require("../http/controllers/admin/flightType/flightType");

const router = require("express").Router();

router.get(
  "/list",
  expressAsyncHandler(FlightTypeController.getListOfFlightType)
);

router.get("/:id", expressAsyncHandler(FlightTypeController.getFlightTypeById));
module.exports = {
  flightTypeRoutes: router,
};
