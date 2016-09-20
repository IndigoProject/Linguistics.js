const verb = require("../verbs");
const events = verb.events;

const testSubject = "The port of Rotterdam is the largest cargo port in Europe and the 10th largest in the world Rotterdams logistic success is based on its strategic location on the North Sea directly at the mouth of the Nieuwe Maas channel leading into the Rhine–Meuse–Scheldt delta";

verb.init();

console.log("Testing the following sentence: \n" + testSubject);

events.on("ready", function() {
    var input = testSubject.split(" ");

    for (var i = 0; i < input.length; i++) {
        input[i];
        if(verb.isVerb(input[i])) console.log("found verb:" + input[i] + " -> " + verb.getInfinitive(input[i]))
    }
});
