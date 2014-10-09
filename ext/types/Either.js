// Copyright (c) 2013-2014 Quildreen Motta <quildreen@gmail.com>
//
// Permission is hereby granted, free of charge, to any person
// obtaining a copy of this software and associated documentation files
// (the "Software"), to deal in the Software without restriction,
// including without limitation the rights to use, copy, modify, merge,
// publish, distribute, sublicense, and/or sell copies of the Software,
// and to permit persons to whom the Software is furnished to do so,
// subject to the following conditions:
//
// The above copyright notice and this permission notice shall be
// included in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
// EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
// NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
// LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
// OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

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

    function F() {}

    function inherit(Parent, Child) {
        if (Object.create) {
            Child.prototype = Object.create(Parent.prototype);
        } else {
            F.prototype = Parent.prototype;
            Child.prototype = new F();
            Child.prototype.constructor = Child;
        }
        return Child;
    }

    function Either(left, right) {
        switch (arguments.length) {
            case 0:
                throw new TypeError('no arguments to Either');
            case 1:
                return function(right) {
                    return right == null ? Left(left) : Right(right);
                };
            default:
                return right == null ? Left(left) : Right(right);
        }
    }

    function Right(value) {
        if (!(this instanceof Right)) {
            return new Right(value);
        }
        this.value = value;
    }
    function Left(value) {
        if (!(this instanceof Left)) {
            return new Left(value);
        }
        this.value = value;
    }

    function returnThis() { return this; }

    Either.Right = Right;
    Either.Left = Left;

    Either.prototype.map = returnThis;
    Either.of = Either.prototype.of = function(value) { return new Right(value); };
    Either.prototype.chain = returnThis; // throw
    Either.equals = Either.prototype.equals = function(that) {
        return this.constructor === that.constructor && this.value === that.value;
    };

    inherit(Either, Right);
    inherit(Either, Left);

    Right.prototype.map = function(fn) { return new Right(fn(this.value)); };
    Right.prototype.ap = function(that) { return that.map(this.value); };
    Right.prototype.chain = function(f) { return f(this.value); };

    Left.prototype.ap = function(that) { return that; };

    return Either;
}));

