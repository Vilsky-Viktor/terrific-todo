const config = {
    service_name: process.env.SERVICE_NAME || 'todo-service',
    service_port: parseInt(process.env.SERVICE_PORT || '5100', 10),
    log_level: process.env.LOG_LEVEL || 'info',
    mongo_uri: process.env.MONGO_URI || 'mongodb://localhost:27017/todos',
};

export default config;