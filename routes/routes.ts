import { Router } from "express";
import userRouter from "./authRouter";
import productRouter from "./productsRouter";
import ProviderRouter from "./providersRoutes";
import RequestRouter from "./requestRouter";
import productRequestRouter from "./productRequestRouter";
import cartRouter from "./cartRouter";

const routes = Router();

routes.use("/api", userRouter);
routes.use("/api", productRouter);
routes.use("/api", ProviderRouter);
routes.use("/api", RequestRouter);
routes.use("/api", productRequestRouter);
routes.use("/api", cartRouter);

export default routes;
