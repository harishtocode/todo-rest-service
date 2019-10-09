// config which are overriden for {this} environment
module.exports = {
   
    logger: {
        config:
        {
            level: 'info',
            path: `${(process.env.LOG_DIR) ? process.env.LOG_DIR : './log'}/logs.log`, // log to a file
            period: '1d', // daily rotation
            count: 10, // keep 10 back copies
        },
    },
};
