const TITLES = ['Mr', 'Mrs', 'Miss', 'Ms', 'Dr', 'Drs','Prof','Mister']

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
const Person = function () {
    return {
        title: "",
        first_name: "",
        initial: "",
        last_name: ""
    }
};

module.exports.parseSinglePerson = parseSinglePerson;