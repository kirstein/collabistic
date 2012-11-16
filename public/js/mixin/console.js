define(['module'], function(module) {
    console.debug('console mixin loaded:',module.config());

    var level       = module.config().logLevel,
        fmt         = module.config().dateFormat,
        realConsole = console;

    console = {};

    function _formatDate() {
        var date  = new Date();

        function pad(value) {
            return(value.toString().length < 2) ? '0' + value : value;
        }
        return fmt.replace(/%([a-zA-Z])/g, function(_, fmtCode) {
            switch(fmtCode) {
            case 'Y':
                return date.getUTCFullYear();
            case 'M':
                return pad(date.getUTCMonth() + 1);
            case 'd':
                return pad(date.getUTCDate());
            case 'H':
                return pad(date.getUTCHours());
            case 'm':
                return pad(date.getUTCMinutes());
            case 's':
                return pad(date.getUTCSeconds());
            default:
                throw new Error('Unsupported format code: ' + fmtCode);
            }
        });
    }

    function _log(type, args) {

        // Slice to array
        args = Array.prototype.slice.call(args);
        args.unshift(_formatDate());

        return realConsole[type].apply(realConsole, args);
    }

    console.log = function() {
        if(level <= 1) {
            return _log('log', arguments);
        }
    };
    console.debug = function() {
        if(level < 2) {
            return _log('debug', arguments);
        }
    };
    console.info = function() {
        if(level < 3) {
            return _log('info', arguments);
        }
    };
    console.warn = function() {
        if(level < 4) {
            return _log('warn', arguments);
        }
    };
    console.error = function() {
        if(level < 5) {
            return _log('error', arguments);
        }
    };
});