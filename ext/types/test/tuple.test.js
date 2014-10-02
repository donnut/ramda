var assert = require('assert');
var R = require('../../..');
var tuples = require('../Tuple');

describe('Tuples', function() {

   describe('Tuple2', function() {
        var Tuple2 = tuples.Tuple2;

        it('empty argument check', function() {
            assert.throws(function() {
                Tuple2();
            },'Expected 2 arguments, got 0');
        });

        it('missing argument check', function() {
            assert.throws(function() {
                Tuple2('Joe');
            },'Expected 2 arguments, got 1');
        });

        it('abdundant arguments check', function() {
            assert.throws(function() {
                Tuple2('Joe', 5, 7);
            },'Expected 2 arguments, got 3');
        });

        it('getting unknown argument', function() {
            assert.equal(Tuple2('Joe', 5)._3, undefined);
        });

        it('setting number values', function() {
            assert.equal(Tuple2(3,6)._1, 3);
            assert.equal(Tuple2(3,6)._2, 6);
        });

        it('setting string values', function() {
            assert.equal(Tuple2('Joe', 'Doe')._1, 'Joe');
            assert.equal(Tuple2('Joe', 'Doe')._2, 'Doe');
        });

        it('setting function values', function() {
            assert.equal(Tuple2(function() {return 1;}, function() {return 2;})._1(), 1);
            assert.equal(Tuple2(function() {return 1;}, function() {return 2;})._2(), 2);
        });

        it('setting object values', function() {
            assert.equal(Tuple2({name: 'Joe'}, {age: 44})._1.name, 'Joe');
            assert.equal(Tuple2({name: 'Joe'}, {age: 44})._2.age, 44);
        });

        it('setting mixed type values', function() {
            assert.equal(Tuple2('Joe', 44)._1, 'Joe');
            assert.equal(Tuple2('Joe', 44)._2, 44);
        });

        it('concating two Tuples', function() {
           var t1 = Tuple2(String, String);
           var t2 = Tuple2(String, String);
           var t3 = t1.concat(t2);
           assert.equal(t3._1, 6);
           assert.equal(t3._2, 8);
        });
   });

   describe('Tuple3', function() {
        var Tuple3 = tuples.Tuple3;
        it('abdundant arguments check', function() {
            assert.throws(function() {
                Tuple3('Joe', 5, 7, 4);
            },'Expected 3 arguments, got 4');
        });

        it('setting mixed type values', function() {
            assert.equal(Tuple3('Joe', 44, {color: 'red'})._1, 'Joe');
            assert.equal(Tuple3('Joe', 44, {color: 'red'})._2, 44);
            assert.deepEqual(Tuple3('Joe', 44, {color: 'red'})._3, {color: 'red'});
        });
   });

   describe('Tuple4', function() {
        var Tuple4 = tuples.Tuple4;
        it('abdundant arguments check', function() {
            assert.throws(function() {
                Tuple4('Joe', 5, 7, 4, 'Doe');
            },'Expected 4 arguments, got 5');
        });

        it('setting mixed type values', function() {
            assert.equal(Tuple4('Joe', 44, {color: 'red'}, 'Doe')._1, 'Joe');
            assert.equal(Tuple4('Joe', 44, {color: 'red'}, 'Doe')._2, 44);
            assert.deepEqual(Tuple4('Joe', 44, {color: 'red'}, 'Doe')._3, {color: 'red'});
            assert.equal(Tuple4('Joe', 44, {color: 'red'}, 'Doe')._4, 'Doe');
        });
   });

   describe('Tuple5', function() {
        var Tuple5 = tuples.Tuple5;
        it('abdundant arguments check', function() {
            assert.throws(function() {
                Tuple5('Joe', 5, 7, 4, 4, 3);
            },'Expected 5 arguments, got 6');
        });

        it('setting mixed type values', function() {
            assert.equal(Tuple5('Joe', 44, {color: 'red'}, 'Doe', 1)._1, 'Joe');
            assert.equal(Tuple5('Joe', 44, {color: 'red'}, 'Doe', 1)._2, 44);
            assert.deepEqual(Tuple5('Joe', 44, {color: 'red'}, 'Doe', 1)._3, {color: 'red'});
            assert.equal(Tuple5('Joe', 44, {color: 'red'}, 'Doe', 1)._4, 'Doe');
            assert.equal(Tuple5('Joe', 44, {color: 'red'}, 'Doe', 1)._5, 1);
        });
   });
});
