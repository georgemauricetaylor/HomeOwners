const CONJUNCTIONS = ['and', '&', 'AND'];
const TITLES = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Drs', 'Prof', 'Mister'];

const parseNames = (homeOwners) => {
    let results = []
    homeOwners.forEach(row => {
        if (CONJUNCTIONS.some(el => row.homeowner.includes(el))) {
            const splitOut = row.homeowner.trim().split(" ");
            const names = parseTwoPeople(splitOut);
            results.push(names[0], names[1]);
        } else {
            const person = parseSinglePerson(row.homeowner);
            results.push(person);
        }
    });
    return checkForInitial(results);
}

const checkForInitial = (results) => {
    results.forEach(homeowner => {
        if (homeowner.initial) {
            return;
        }
        if (homeowner.first_name.replace(".", "").length === 1) {
            homeowner.initial = homeowner.first_name;
            homeowner.first_name = "";
        }
    })
    return results;
};

const parseSinglePerson = (name) => {
    const homeowner = name.split(" ");
    const person = new Person();

    if (TITLES.includes(homeowner[0])) {
        person.title = homeowner.shift();
    }
    if (homeowner.length === 3) {
        person.first_name = homeowner.shift();
        person.initial = homeowner.shift();
        person.last_name = homeowner.shift();
    } else if (homeowner.length === 2) {
        person.first_name = homeowner.shift();
        person.last_name = homeowner.shift();
    } else if (homeowner.length === 1) {
        person.last_name = homeowner.shift();
    }
    return person;
}

const parseTwoPeople = (homeowner) => {
    const first_person = new Person();
    const second_person = new Person();
    if (TITLES.includes(homeowner[0])) {
        first_person.title = homeowner.shift();
    }
    if (hasTitleThenTitle(homeowner)) {
        homeowner.shift();
        second_person.title = homeowner.shift();
        if (homeowner.length === 1) {
            addLastName(homeowner, first_person, second_person)
        } else if (homeowner.length === 2) {
            second_person.first_name = homeowner.shift();
            addLastName(homeowner, first_person, second_person)
        } else {
            second_person.first_name = homeowner.shift()
            second_person.initial = homeowner.shift()
            addLastName(homeowner, first_person, second_person)
        }
    } else {
        if (hasThreePartName(homeowner)) {
            first_person.first_name = homeowner.shift();
            first_person.initial = homeowner.shift();
            first_person.last_name = homeowner.shift();
            homeowner.shift();
            second_person.title = homeowner.shift();
        } else {
            first_person.first_name = homeowner.shift();
            first_person.last_name = homeowner.shift();
            homeowner.shift();
            second_person.title = homeowner.shift();
        }
        if (hasThreePartName(homeowner)) {
            second_person.first_name = homeowner.shift();
            second_person.initial = homeowner.shift();
            second_person.last_name = homeowner.shift();
            homeowner.shift();
        } else {
            second_person.first_name = homeowner.shift();
            second_person.last_name = homeowner.shift();
            homeowner.shift();
        }
    }
    return [first_person, second_person];
}

const hasThreePartName = (homeowner) => {
    if (homeowner.length < 3) {
        return false;
    }
    return !(TITLES.includes(homeowner[2]) || CONJUNCTIONS.includes(homeowner[2]));
}

const hasTitleThenTitle = (homeowner) => {
    return CONJUNCTIONS.includes(homeowner[0]);
}

const addLastName = (homeowner, first_person, second_person) => {
    first_person.last_name = homeowner[0];
    second_person.last_name = homeowner.shift()
}

const Person = function () {
    return {
        title: "",
        first_name: "",
        initial: "",
        last_name: ""
    }
};

module.exports.parseSinglePerson = parseSinglePerson;
module.exports.parseTwoPeople = parseTwoPeople;
module.exports.parseNames = parseNames;
module.exports.checkForInitial = checkForInitial;