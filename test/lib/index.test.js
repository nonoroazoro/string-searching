const mocha = require("mocha");
const should = require("should");

const ss = require("../../");

describe("lib/index", () =>
{
    describe("1.boyer-moor", () =>
    {
        it("should find string ", (done) =>
        {
            console.log(ss.boyer_moore("HERE IS A SIMPLE EXAMPLE", "EXAMPLE"));
            done();
        });
    });
});