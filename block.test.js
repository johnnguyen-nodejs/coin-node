const Block = require("./block");
const {GENESIS_DATA} = require("./config")
const cryptoHash = require("./crypto-hash");

describe('Block', ()=>{
    const timestamp = 'a-date';
    const lastHash = 'foo-hash';
    const hash = 'bar-hash';
    const data = ['blockchain', 'data'];
    const block = new Block({ timestamp, lastHash, hash, data });

    it("it has timestamp, lastHash, hash and data property", ()=>{
        expect(block.timestamp).toEqual(timestamp);
        expect(block.lastHash).toEqual(lastHash);
        expect(block.hash).toEqual(hash);
        expect(block.data).toEqual(data);
    });

    describe('genesis()', ()=>{
        const genesisBlock = Block.genesis();

        it("return a Block instance", ()=>{
            expect(genesisBlock instanceof Block).toBe(true);
        })
        it("return the genesis data", ()=>{
            expect(genesisBlock).toEqual(GENESIS_DATA);
        })
    })
    describe('mineBlock()', ()=>{
        const lastBlock = Block.genesis();
        const data = "mined data";
        const mineBlock = Block.mineBlock({ lastBlock, data});

        it("return a Block instance", ()=>{
            expect(mineBlock instanceof Block).toBe(true);
        })
        it("sets the `lastHash` to be the hash of the lashBlock", ()=>{
            expect(mineBlock.lastHash).toEqual(lastBlock.hash);
        })
        it("sets the `data`", ()=>{
            expect(mineBlock.data).toEqual(data);
        })
        it("sets the `timestamp`", ()=>{
            expect(mineBlock.timestamp).not.toEqual(undefined); 
        })
        it("creates a SHA-256 `hash` based on the proper inputs", ()=>{
            expect(mineBlock.hash)
                .toEqual(cryptoHash(mineBlock.timestamp, lastBlock.hash, data)); 
        })
    })
})