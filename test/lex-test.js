var buster = require("buster");
var assert = buster.referee.assert;
var lex = require("../lib/lex.js");

buster.testCase("Lex trivial", {
    "at least plain list of emoji should be parsed": function () {
    	var sampleSet = "( 😁🙏✂➰🚀🛀 Ⓜ 🅰🉑0⃣9⃣™㊙🀄🗿😀😶🚁🛅🌍🕧1️⃣🔹🇬🇧🏠🌽🎍🌊🐶💭😄😊😟🔢🐷😺⚇)";
    	var result = lex.parse(sampleSet);
        assert(result.type==='Program');
        assert(result.body.length===1);
        assert(result.body[0].type==='List');
        assert(result.body[0].contents.length>10); // at least
    }
});
