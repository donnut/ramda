var assert = require('assert');
var types = require('./types');
var R = require('../../..');

var Maybe = require('../Maybe');

describe('Maybe', function() {
    var m = Maybe.Just(1);
    var maybeNull = Maybe.Nothing();

    it('is a Functor', function() {
        var fTest = types.functor;
        assert.equal(true, fTest.iface(m));
        assert.equal(true, fTest.id(m));
        assert.equal(true, fTest.compose(m, R.multiply(2), R.add(3)));
        assert.equal(true, fTest.iface(maybeNull));
        assert.equal(true, fTest.id(maybeNull));
        assert.equal(true, fTest.compose(maybeNull, R.multiply(2), R.add(3)));
    });

    it('is an Apply', function() {
        var aTest = types.apply;
        var appA = Maybe.fromNullable(R.multiply(10));
        var appU = Maybe.fromNullable(R.add(7));
        var appV = Maybe.Just(10);

        assert.equal(true, aTest.iface(appA));
        assert.equal(true, aTest.compose(appA, appU, appV));
        assert.equal(true, aTest.iface(maybeNull));
    });

    it('is an Applicative', function() {
        var aTest = types.applicative;
        var app1 = Maybe.Just(101);
        var app2 = Maybe.Just(-123);
        var appF = Maybe.fromNullable(R.multiply(3));

        assert.equal(true, aTest.iface(app1));
        assert.equal(true, aTest.id(app1, app2));
        assert.equal(true, aTest.id(app1, maybeNull));
        assert.equal(true, aTest.homomorphic(app1, R.add(3), 46));
        assert.equal(true, aTest.interchange(app2, appF, 17));

        assert.equal(true, aTest.iface(maybeNull));
        assert.equal(true, aTest.id(maybeNull, Maybe.fromNullable(null)));
        assert.equal(true, aTest.homomorphic(maybeNull, R.add(3), 46));
        assert.equal(true, aTest.interchange(maybeNull, appF, 17));

    });

    it('is a Chain', function() {
        var cTest = types.chain;
        var f1 = function(x) {return Maybe.fromNullable(3 * x);};
        var f2 = function(x) {return Maybe.fromNullable(5 + x);};
        var fNull = function() {return Maybe.fromNullable(null);};
        assert.equal(true, cTest.iface(m));
        assert.equal(true, cTest.associative(m, f1, f2));
        assert.equal(true, cTest.iface(maybeNull));
        assert.equal(true, cTest.associative(m, fNull, f2));
        assert.equal(true, cTest.associative(m, f1, fNull));
        assert.equal(true, cTest.associative(m, fNull, fNull));
    });

    it('is a Monad', function() {
        var mTest = types.monad;
        assert.equal(true, mTest.iface(m));
    });

});
