(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(['ramda'], factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory(require('../..'));
    } else {
        // Browser globals (root is window)
        root.returnExports = factory(root.ramda);
    }
}(this, function(R) {


    function createInstance(proto) {
        function Ctor() {}
        Ctor.prototype = proto;
        return new Ctor();
    }

    function getInstance(self, constructor) {
        return self instanceof constructor
            ? self
            : createInstance(constructor.prototype);
    }

    function create() {
        var fields = [].slice.apply(arguments);
        var Tuple = function() {
            var self = getInstance(this, Tuple), i;
            if (arguments.length != fields.length) {
                throw new TypeError('Expected ' + fields.length + ' arguments, got ' + arguments.length);
            }
            for (i = 0; i < fields.length; i++) {
                self[fields[i]] = arguments[i];
            }
            return self;
        }
        Tuple._length = fields.length;

        Tuple.of = function() {
            
        return wrapped;
    }



}));
