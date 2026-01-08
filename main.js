const SHA256 = require("crypto-js/sha256");

class Block {
  constructor(index, timestamp, data, previousHash = "") {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.data)
    ).toString();
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  createGenesisBlock() {
    return new Block(0, "01/01/2026", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    return this.chain.push(newBlock);
  }

  isValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) return false;

      if (currentBlock.previousHash !== previousBlock.hash) return false; // how does this check if blocks are properly linked?

    }
    return true;
  }
}

const sajveeCoin = new Blockchain();
sajveeCoin.addBlock(new Block(1, "02/01/2026", { amount: 8 }));
sajveeCoin.addBlock(new Block(2, "02/01/2026", { amount: 4 }));
sajveeCoin.addBlock(new Block(3, "04/01/2026", { amount: 15 }));
console.log("blockchain is valid:", sajveeCoin.isValid());

sajveeCoin.chain[1].data = { amount: 100 };
sajveeCoin.chain[1].hash = sajveeCoin.chain[1].calculateHash(); 

console.log("blockchain is valid:", sajveeCoin.isValid());

// console.log(JSON.stringify(sajveeCoin, null, 4));
