const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const {
  FlightTypeController,
} = require("../../http/controllers/admin/flightType/flightType");

router.post("/add", expressAsyncHandler(FlightTypeController.addNewFlightType));
router.patch(
  "/update/:id",
  expressAsyncHandler(FlightTypeController.updateFlightType)
);
router.delete(
  "/remove/:id",
  expressAsyncHandler(FlightTypeController.removeFlightType)
);

module.exports = {
  flightTypeAdminRoutes: router,
};
