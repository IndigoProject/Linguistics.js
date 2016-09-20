const readline = require('readline');

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const path = require("path");
const _eventEmitter = require("events");
const events = new _eventEmitter();

var fileIsRead = false;

//name: index
const names = {
    "infinitive": 0,
    "1st singular present": 1,
    "2nd singular present": 2,
    "3rd singular present": 3,
    "present plural": 4,
    "present participle": 5,
    "1st singular past": 6,
    "2nd singular past": 7,
    "3rd singular past": 8,
    "past plural": 9,
    "past": 10,
    "past participle": 11
};

var verbs = {};
var reversed_infinitives = {};

/*
 * Initializes a verbs file to the library
 */
var initialize = function() {

    //initialize the linereader module from node
    var lineReader = require('readline').createInterface({
        input: require('fs').createReadStream(path.join(__dirname, "corpus", "verbs.txt"))
    }); //TODO: configurable path

    //do something every line
    lineReader.on('line', (line) => {
        var arr = line.split(",");
        var infinitive = arr[0];

        verbs[infinitive] = arr; //[infinitive] = verb array

        //so we can get the infinitve with a tense
        for (var i = 0; i < arr.length; i++) {
            if(arr[i] === "") continue; //don't push empty strings
            reversed_infinitives[arr[i]] = infinitive;
        }

    }).on('close', () => {
        if(!fileIsRead) {
            fileIsRead = true;
            events.emit("ready"); //emit that we are ready with loading the verbfile
        }
    });
};

initialize();

var recursiveAsyncReadLine = () => {
    rl.question('Verb form: ', (answer) => {
        // TODO: Log the answer in a database
        console.log('Infinitive: ', getInfinitive(answer));

        recursiveAsyncReadLine();
    });
};

/*
 * Gets a raw verb array, more info on how these are structured in README#corpus
 */
function getRawVerb(infin) {
    return verbs[infin];
}

/*
 * Gets an infinitive with a tense
 */
function getInfinitive(tense) {
    return reversed_infinitives[tense.toLowerCase()];
}

/*
 * Returns whether string is a verb
 */
function isVerb(tense) {
    return reversed_infinitives[tense.toLowerCase()] !== undefined;
}

module.exports.events = events;
module.exports.init = initialize;
module.exports.isVerb = isVerb;
module.exports.getInfinitive = getInfinitive;
