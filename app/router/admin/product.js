const router = require("express").Router();
const expressAsyncHandler = require("express-async-handler");
const {
  ProductController,
} = require("../../http/controllers/admin/product/product.controller");

router.post("/add", expressAsyncHandler(ProductController.addNewFlight));
router.delete(
  "/remove/:id",
  expressAsyncHandler(ProductController.removeFlight)
);
router.patch(
  "/update/:id",
  expressAsyncHandler(ProductController.updateFlight)
);

module.exports = {
  productsAdminRoutes: router,
};
