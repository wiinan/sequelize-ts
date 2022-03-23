import { sequelize } from "./models";
import server from "./index";

const port: any = process.env.PORT || 8000;

server.listen(port, async () => {
  await sequelize.sync();
  console.log(`server start at http://localhost:${port}`);
});
