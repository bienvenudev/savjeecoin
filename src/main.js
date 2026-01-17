const SHA256 = require("crypto-js/sha256");

class Transaction {
  constructor(fromAddress, toAddress, amount, fee = 0) {
    this.fromAddress = fromAddress;
    this.toAddress = toAddress;
    this.amount = amount;
    this.fee = fee;
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = "") {
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.previousHash = previousHash;
    this.nonce = 0;
    this.hash = this.calculateHash();
  }

  calculateHash() {
    return SHA256(
      this.index +
        this.previousHash +
        this.timestamp +
        JSON.stringify(this.transactions) +
        this.nonce,
    ).toString();
  }

  mineBlock(difficulty) {
    while (
      this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")
    ) {
      this.nonce++;
      this.hash = this.calculateHash();
    }

    console.log("BLOCK MINED:", this.hash);
  }
}

class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 3;
    this.miningReward = 100;
    this.pendingTransactions = [];
  }

  createGenesisBlock() {
    return new Block("01/01/2026", "Genesis block", "0");
  }

  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  minePendingTransactions(miningRewardAddress) {
    if (this.pendingTransactions.length === 0) {
      console.log("❌ No transactions to mine! (Empty block rejected)");
      return false;
    }

     if (this.pendingTransactions.length === 1 && this.pendingTransactions[0].fromAddress === null) {
    console.log("⚠️  Mining empty block (only reward transaction) - Missing out on fees!");
  }

    let totalFees = 0;
    for (const trans of this.pendingTransactions) {
      totalFees += trans.fee || 0;
    }

    let block = new Block(Date.now(), this.pendingTransactions);
    block.mineBlock(this.difficulty);

    console.log(
      `✅ Block mined! Earned: ${this.miningReward + totalFees} (${this.miningReward} reward + ${totalFees} fees)`,
    );
    this.chain.push(block);

    this.pendingTransactions = [
      new Transaction(null, miningRewardAddress, this.miningReward + totalFees),
    ];

    return true;
  }

  createTransaction(transaction) {
    this.pendingTransactions.push(transaction);
  }

  getBalanceofAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAddress === address) {
          balance -= tx.amount;
        }

        if (tx.toAddress === address) {
          balance += tx.amount;
        }
      }
    }
    return balance;
  }
}

console.log("=== SCENARIO 1: Greedy Miner (tries to mine empty blocks) ===\n");

const greedyCoin = new Blockchain();
greedyCoin.createTransaction(new Transaction("user1", "user2", 50, 5));

console.log("Greedy miner tries to mine with no transactions:");
greedyCoin.minePendingTransactions("greedy-miner");
greedyCoin.minePendingTransactions("greedy-miner");

console.log(
  "\n💰 Greedy miner balance:",
  greedyCoin.getBalanceofAddress("greedy-miner"),
);

console.log("\n=== SCENARIO 2: Smart Miner (includes transactions) ===\n");

const smartCoin = new Blockchain();

// Users create transactions with fees
smartCoin.createTransaction(new Transaction("user1", "user2", 50, 5));
smartCoin.createTransaction(new Transaction("user3", "user4", 30, 3));
smartCoin.createTransaction(new Transaction("user2", "user1", 20, 2));

console.log("Smart miner mines block with 3 transactions:");
smartCoin.minePendingTransactions("smart-miner");

console.log("Smart miner mines their reward:");
smartCoin.minePendingTransactions("smart-miner");

console.log(
  "\n💰 Smart miner balance:",
  smartCoin.getBalanceofAddress("smart-miner"),
);

console.log("\n=== COMPARISON ===");
console.log(
  `Greedy miner (empty blocks): ${greedyCoin.getBalanceofAddress("greedy-miner")} coins`,
);
console.log(
  `Smart miner (with transactions): ${smartCoin.getBalanceofAddress("smart-miner")} coins`,
);
console.log(
  `\n📊 Smart miner earned ${smartCoin.getBalanceofAddress("smart-miner") - greedyCoin.getBalanceofAddress("greedy-miner")} MORE by including transactions!`,
);

console.log("\n=== SCENARIO 3: Competition (multiple miners) ===\n");

const competitiveCoin = new Blockchain();

// Many users create transactions
competitiveCoin.createTransaction(new Transaction("userA", "userB", 100, 10));
competitiveCoin.createTransaction(new Transaction("userC", "userD", 200, 20));
competitiveCoin.createTransaction(new Transaction("userE", "userF", 50, 5));

console.log("Miner Alice mines the block with all high-fee transactions:");
competitiveCoin.minePendingTransactions("alice");

console.log(
  "\nMiner Bob tries to mine empty block (too late, no transactions left):",
);
competitiveCoin.minePendingTransactions("bob");

console.log(
  "\n💰 Alice's balance:",
  competitiveCoin.getBalanceofAddress("alice"),
);
console.log("💰 Bob's balance:", competitiveCoin.getBalanceofAddress("bob"));

console.log(
  "\n🎓 LESSON: In competitive mining, you MUST include transactions to:",
);
console.log("  1. Earn transaction fees (extra profit)");
console.log("  2. Beat other miners who are doing the same");
console.log("  3. Justify the electricity costs of mining");
