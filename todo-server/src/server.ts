import app from './app';
import logger from './config/logger';
import config from './config/settings';

app.listen(config.service_port, '0.0.0.0', () => {
    logger.info(`${config.service_name} is running on port ${config.service_port}`);
});
