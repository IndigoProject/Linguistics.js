var path = require("path");
var _eventEmitter = require("events");
var events = new _eventEmitter();

//name: index
var names = {
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
        input: require('fs').createReadStream(path.join(__dirname, "corpus", "verbs_example.txt"))
    }); //TODO: configurable path

    //do something every line
    lineReader.on('line', function (line) {
        var arr = line.split(",");
        var infinitive = arr[0];

        verbs[infinitive] = arr; //[infinitive] = verb array

        //so we can get the infinitve with a tense
        for (var i = 0; i < arr.length; i++) {
            if(arr[i] === "") continue; //don't push empty strings
            reversed_infinitives[arr[i]] = infinitive;
        }

    }).on('close', function() {
        events.emit("ready"); //emit that we are ready with loading the verbfile
    });
};

events.on("ready", function() {
    console.log("Done!");
    console.log(getInfinitive("were"));
});

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
    return reversed_infinitives[tense];
}

/*
 * Returns whether string is a verb
 */
function isVerb(tense) {
    return reversed_infinitives[tense] !== undefined;
}

module.exports.init = initialize;
module.exports.isVerb = isVerb;
module.exports.getInfinitive = getInfinitive;
