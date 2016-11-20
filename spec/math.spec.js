var math = require('../src/math');
describe ('math', function(){
    describe('add', function() {
        it('1+2 should equal 3', function () {
            expect(math.add(1, 2)).toEqual(3);
        });
        it('2+3 should equal 5', function () {
            expect(math.add(2, 3)).toEqual(5);
        })
    });
});
