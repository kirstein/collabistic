define(function() {
    var config = window.config,
        log    = config.log,
        Logger;

    function _formatDate() {
        var date  = new Date(),
            fmt   = log.dateFormat;

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

        return console[type].apply(console, args);
    }

    Logger = function() {
        this.info('Logger started');
    };

    Logger.prototype.log = function() {
        if(log.level < 1) {
            return _log('log', arguments);
        }
    };
    Logger.prototype.debug = function() {
        if(log.level < 2) {
            return _log('debug', arguments);
        }
    };
    Logger.prototype.info = function() {
        if(log.level < 3) {
            return _log('info', arguments);
        }
    };
    Logger.prototype.warn = function() {
        if(log.level < 4) {
            return _log('warn', arguments);
        }
    };
    Logger.prototype.error = function() {
        if(log.level < 5) {
            return _log('error', arguments);
        }
    };

    return Logger;
});