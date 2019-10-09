// API server default configuration this will be common for all environments
const p = require('./../package.json');
const defer = require('config/defer').deferConfig;

const packageVersion = p.version.split('.').shift();
module.exports = {
    app: {
        name: p.name,
        description: p.description,
    },
    api: {
        ROOT_URI: '/',
        BASE_URI: defer((cfg) => {
            const ver = `/v${packageVersion}`;
            return cfg.api.ROOT_URI + (packageVersion > 0 ? ver : '');
        }),
    },
    env: {
        mode: process.env.NODE_ENV,
        host: process.env.HOST || 'localhost',
        port: process.env.PORT || 3000,
    },
   
    swagger: {
        enable: true,
    },
    logger: {
        config: {
            level: 'error',
            path: `${(process.env.LOG_DIR) ? process.env.LOG_DIR : './log'}/logs.log`, // log to a file
            period: '1d', // daily rotation
            count: 10, // keep 10 back copies
        },
    }
};
