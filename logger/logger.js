const bunyan = require('bunyan');

const { safeCycles } = bunyan;
const packageJ = require('../package.json');
const logConf = require('config').get('logger.config');


/**
 *Method to intercept log entry
 *
 * @param {Object} stream log entry stream
 * @returns {void}
 */
function ModifiedLogLevelStream(stream) {
    this.stream = stream;
}

ModifiedLogLevelStream.prototype.write = function write(rec) {
    // Change log level number to name
    const logRecord = rec;
    logRecord.level = bunyan.nameFromLevel[logRecord.level];
    const str = `${JSON.stringify(logRecord, safeCycles())}\n`;
    this.stream.write(str);
};


const internalLogger = bunyan.createLogger({
    name: packageJ.name,
    level: logConf.level,
    streams: [
        {
            type: 'raw',
            stream: new ModifiedLogLevelStream(new bunyan.RotatingFileStream(logConf)),
        },
    ],
});



/**
 * Object to be used for logging
 * @returns {void}
 */
function Logger() { }

Object.keys(bunyan.levelFromName).forEach((name) => {
    Logger.prototype[name] = function getFunc(error, ...any) {
        if (!error) return internalLogger[name]();
        return internalLogger[name](error, ...any);
    };
});

module.exports = new Logger();
