const { ROLES } = require("../../../utils/constants");
const { authorize } = require("../../http/middlewares/permission.guard");
const { flightTypeAdminRoutes } = require("./flightType");
const { couponAdminRoutes } = require("./coupon");
const { paymentAdminRoutes } = require("./payment");
const { productsAdminRoutes } = require("./product");
const { userAdminRoutes } = require("./user");

const router = require("express").Router();

router.use("/flightType", authorize(ROLES.ADMIN), flightTypeAdminRoutes);
router.use("/product", authorize(ROLES.ADMIN), productsAdminRoutes);
router.use("/coupon", authorize(ROLES.ADMIN), couponAdminRoutes);
router.use("/user", authorize(ROLES.ADMIN), userAdminRoutes);
router.use("/payment", authorize(ROLES.ADMIN), paymentAdminRoutes);

module.exports = {
  adminRoutes: router,
};
