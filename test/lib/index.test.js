const mocha = require("mocha");
const should = require("should");

const stringSearching = require("../../lib");

describe.only("lib/index", () =>
{
    describe("1.boyer-moor", () =>
    {
        it("should not find string ", (done) =>
        {
            const nullString = null;
            const emptyString = "";
            const arrayString = [1, 2];
            const okString = "example";

            stringSearching.boyer_moore(nullString, arrayString).should.equal(-1);
            stringSearching.boyer_moore(nullString, okString).should.equal(-1);
            stringSearching.boyer_moore(arrayString, nullString).should.equal(-1);
            stringSearching.boyer_moore(arrayString, okString).should.equal(-1);
            stringSearching.boyer_moore(okString, nullString).should.equal(-1);
            stringSearching.boyer_moore(okString, arrayString).should.equal(-1);
            stringSearching.boyer_moore(okString, emptyString).should.equal(-1);
            stringSearching.boyer_moore(emptyString, okString).should.equal(-1);
            done();
        });

        const targetIndex1 = 17;
        const pattern1 = "EXAMPLE";
        const text1 = "HERE IS A SIMPLE EXAMPLE";
        it(`should find string "${pattern1}" in "${text1}" \n\t and the index is ${targetIndex1}`, (done) =>
        {
            stringSearching.boyer_moore(text1, pattern1).should.equal(targetIndex1);
            done();
        });

        const targetIndex2 = [13, 21];
        const pattern2 = "PLE";
        const text2 = "HERE IS A SIMPLE EXAMPLE";
        it(`should find string "${pattern2}" in "${text2}" \n\t and the index is ${targetIndex2}`, (done) =>
        {
            stringSearching.boyer_moore(text2, pattern2, true).should.deepEqual(targetIndex2);
            done();
        });
    });
});