import app from './app';
import logger from './config/logger';

app.listen(process.env.PORT, () => {
  logger.debug(`Running on port ${process.env.PORT}`);
});
