const {log, table} = console;

const logLevel = {
    info: {
        aliases: ['i']
    },
    error: {
        aliases: ['e']
    },
    debug: {
        aliases: ['d']
    },
    warning: {
        aliases: ['w']
    }
}

// TODO improve and add table

const partsDelimiter = ' - ';
const defaultLevel = 'info';

const obtainLevel = function (levelOrAlias) {
    const levels = Object.keys(logLevel);
    if (levels.indexOf(levelOrAlias) !== -1) return levelOrAlias;
    const aliasLevels = levels.filter((level) => {
        let {aliases = []} = logLevel[level];
        return aliases.indexOf(levelOrAlias) !== -1
    })
    return aliasLevels.length ? aliasLevels[0] : defaultLevel;
}

const doLog = function (msg = '', level = defaultLevel, data = undefined) {
    let isoDate = new Date().toISOString();
    level = obtainLevel(level).toUpperCase();
    log([isoDate, level, msg].join(partsDelimiter));
}

const stringify = function (json) {
    return JSON.stringify(json, undefined, 4);
}

const logJson = function (text, json, divider = ' : ') {
    doLog(text + divider + stringify(json))
}

const logLine = function (lineElem = '-', length = 31) {
    doLog(lineElem.repeat(length))
}

const lib = {
    log: doLog, logJson, logLine, logTable: function (data = []) {
        table(data)
    }
}

module.exports = lib;

