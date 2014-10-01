(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define(factory);
    } else if (typeof exports === 'object') {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.returnExports = factory();
    }
}(this, function() {
    function Identity(x) {
        if (!(this instanceof Identity)) {
            return new Identity(x);
        }
        this.value = x;
    }

    Identity.of = function(x) {
        return new Identity(x);
    };

    // functor
    Identity.prototype.map = function(f) {
        return new Identity(f(this.value));
    };

    // apply
    // takes a Identity that wraps a function (`app`) and applies its `map`
    // method to this Identity's value, which must be a function.
    Identity.prototype.ap = function(m) {
        return typeof this.value !== 'function' ? new Identity(null) : m.map(this.value);
    };

    // applicative
    Identity.prototype.of = Identity.of;

    // chain
    //  f must be a function which returns a value
    //  f must return a value of the same Chain
    //  chain must return a value of the same Chain
    //
    Identity.prototype.chain = function(f) {
        return this.value == null ? this : f(this.value);
    };

    // monad
    // A value that implements the Monad specification must also implement the Applicative and Chain specifications.
    // see above.

    // equality method to enable testing
    Identity.prototype.equals = function(that) {
        return this.value === that.value;
    };

    return Identity;
}));
