var assert = require('assert');
const parseHomeOwnersService = require('../../libs/services/parseHomeOwnersService');

describe('parseHomeOwnerService', function() {

    describe('parseSinglePerson', function() {
        it('should be able to split HomeOwners field with initial', function() {
            const homeowner = 'Dr Robert J Doe';

            const results = parseHomeOwnersService.parseSinglePerson(homeowner);
            const expectedResult = {
                title: "Dr",
                first_name:"Robert",
                initial:"J",
                last_name: "Doe"
            };

            assert.deepEqual(results,expectedResult);
        });
        it('should be able to split HomeOwners field with initial and no first name', function() {
            const homeowner = 'Dr J Doe';

            const results = parseHomeOwnersService.parseSinglePerson(homeowner);
            const expectedResult = {
                title: "Dr",
                first_name:"J",
                initial:"",
                last_name: "Doe"
            };

            assert.deepEqual(results,expectedResult);
        });
        it('should be able to split HomeOwners field with first,last name', function() {
            const homeowner = 'Dr Robert Doe';

            const results = parseHomeOwnersService.parseSinglePerson(homeowner);
            const expectedResult = {
                title: "Dr",
                first_name:"Robert",
                initial:"",
                last_name: "Doe"
            };

            assert.deepEqual(results,expectedResult);
        });
        it('should be able to split HomeOwners field with last name', function() {
            const homeowner = 'Dr Doe';

            const results = parseHomeOwnersService.parseSinglePerson(homeowner);
            const expectedResult = {
                title: "Dr",
                first_name:"",
                initial:"",
                last_name: "Doe"
            };

            assert.deepEqual(results,expectedResult);
        });
    });
});