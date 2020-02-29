const cryptoHash = require("./crypto-hash");

describe("cryptoHash()", ()=>{
    it("generates a sha-256 hashs output", ()=>{
        expect(cryptoHash("abc")).toEqual("ba7816bf8f01cfea414140de5dae2223b00361a396177a9cb410ff61f20015ad");
    });
    it("produces the same hash with the same arg in any order", ()=>{
        expect(cryptoHash("a1", "a2", "a3")).toEqual(cryptoHash("a2", "a3", "a1"));
    });
});