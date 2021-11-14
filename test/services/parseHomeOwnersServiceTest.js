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
    describe('parseTwoPeople', function() {
        it('should be able to split a name with two full names', function() {
            const homeowner = 'Mr Tom Staff and Mr John Doe'.split(" ");
            const expectedResult = [{
                title: "Mr",
                first_name:"Tom",
                initial:"",
                last_name: "Staff"
            },{
                title: "Mr",
                first_name:"John",
                initial:"",
                last_name: "Doe"
            }];

            const names = parseHomeOwnersService.parseTwoPeople(homeowner);
            assert.deepEqual(names,expectedResult);
        });
        it('should be able to split a name with two full names with initial ', function() {
            const homeowner = 'Mr Tom J Staff and Mr John P Doe'.split(" ");
            const expectedResult = [{
                title: "Mr",
                first_name:"Tom",
                initial:"J",
                last_name: "Staff"
            },{
                title: "Mr",
                first_name:"John",
                initial:"P",
                last_name: "Doe"
            }];

            const names = parseHomeOwnersService.parseTwoPeople(homeowner);
            assert.deepEqual(names,expectedResult);
        });
        it('should be able to split a name with titles at the front', function() {
            const homeowner = 'Mr and Mr John Doe'.split(" ");
            const expectedResult = [{
                title: "Mr",
                first_name:"",
                initial:"",
                last_name: "Doe"
            },{
                title: "Mr",
                first_name:"John",
                initial:"",
                last_name: "Doe"
            }];

            const names = parseHomeOwnersService.parseTwoPeople(homeowner);
            assert.deepEqual(names,expectedResult);
        });
        it('should be able to split a name with titles at the front and only last name', function() {
            const homeowner = 'Mr and Dr Doe'.split(" ");
            const expectedResult = [{
                title: "Mr",
                first_name:"",
                initial:"",
                last_name: "Doe"
            },{
                title: "Dr",
                first_name:"",
                initial:"",
                last_name: "Doe"
            }];

            const names = parseHomeOwnersService.parseTwoPeople(homeowner);
            assert.deepEqual(names,expectedResult);
        });
        it('should be able to split a name with titles at the front and initial ', function() {
            const homeowner = 'Mr and Dr Robert J Doe'.split(" ");
            const expectedResult = [{
                title: "Mr",
                first_name:"",
                initial:"",
                last_name: "Doe"
            },{
                title: "Dr",
                first_name:"Robert",
                initial:"J",
                last_name: "Doe"
            }];

            const names = parseHomeOwnersService.parseTwoPeople(homeowner);
            assert.deepEqual(names,expectedResult);
        });
        it('should be able to split a name with titles at the front and initial ', function() {
            const homeowner = 'Mr and Dr J Doe'.split(" ");
            const expectedResult = [{
                title: "Mr",
                first_name:"",
                initial:"",
                last_name: "Doe"
            },{
                title: "Dr",
                first_name:"J",
                initial:"",
                last_name: "Doe"
            }];

            const names = parseHomeOwnersService.parseTwoPeople(homeowner);
            assert.deepEqual(names,expectedResult);
        });
    });
});