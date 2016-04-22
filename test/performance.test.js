const mocha = require("mocha");
const should = require("should");

const stringSearching = require("../");
const text = require("./performance.test.json").content;

describe.only("performance-test", () =>
{
    const pattern = "工艺";
    const targetIndex = 5790;

    it("should finish performance-test with: boyer_moore", (done) =>
    {
        const time = process.hrtime();
        const index = stringSearching.boyer_moore(text, pattern);
        const diff = process.hrtime(time);
        console.log("\tsearch took %d microseconds", (diff[0] * 1e9 + diff[1]) / 1e3);

        targetIndex.should.equal(index);
        done();
    });

    it("should finish performance-test with: indexOf", (done) =>
    {
        const time = process.hrtime();
        const index = text.indexOf(pattern);
        const diff = process.hrtime(time);
        console.log("\tsearch took %d microseconds", (diff[0] * 1e9 + diff[1]) / 1e3);

        targetIndex.should.equal(index);
        done();
    });
});