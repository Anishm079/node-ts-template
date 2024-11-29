import app from "./app/app";
import logger from "./app/config/logger.config";
import { PORT } from "./app/constants";

app.listen(PORT, () => {
  logger.info(`app is running on PORT: ${PORT}`);
});
