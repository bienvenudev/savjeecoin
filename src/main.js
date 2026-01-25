const { Blockchain, Transaction } = require("./blockchain");
const EC = require("elliptic").ec;
const ec = new EC("secp256k1");

// Create wallets
const benKey = ec.genKeyPair();
const benWallet = benKey.getPublic("hex");

const princeKey = ec.genKeyPair();
const princeWallet = princeKey.getPublic("hex");

const coin = new Blockchain();

console.log("=== 1. INITIAL STATE ===");
console.log("Ben:", coin.getBalanceofAddress(benWallet));
console.log("Prince:", coin.getBalanceofAddress(princeWallet));

// Ben mines to get coins
console.log("\n=== 2. BEN MINES ===");
coin.minePendingTransactions(benWallet);
coin.minePendingTransactions(benWallet); // Mine again to confirm reward
console.log("Ben:", coin.getBalanceofAddress(benWallet)); // Should be 100

// Ben sends to Prince
console.log("\n=== 3. BEN → PRINCE (60 coins) ===");
const tx1 = new Transaction(benWallet, princeWallet, 60);
tx1.signTransaction(benKey);
coin.addTransaction(tx1);
coin.minePendingTransactions(princeWallet); // Prince mines
console.log("Ben:", coin.getBalanceofAddress(benWallet)); // 140
console.log("Prince:", coin.getBalanceofAddress(princeWallet)); // 60

// Prince tries to overspend (should fail)
console.log("\n=== 4. PRINCE TRIES TO OVERSPEND (1000 coins) ===");
try {
  const badTx = new Transaction(princeWallet, benWallet, 1000);
  badTx.signTransaction(princeKey);
  coin.addTransaction(badTx);
} catch (e) {
  console.log("❌ REJECTED:", e.message);
}

// Valid transaction
console.log("\n=== 5. PRINCE → BEN (30 coins) ===");
const tx2 = new Transaction(princeWallet, benWallet, 30);
tx2.signTransaction(princeKey);
coin.addTransaction(tx2);
coin.minePendingTransactions(benWallet);
console.log("Ben:", coin.getBalanceofAddress(benWallet)); // 170
console.log("Prince:", coin.getBalanceofAddress(princeWallet)); // 130

// Validate chain
console.log("\n=== 6. CHAIN VALIDATION ===");
console.log("Valid?", coin.isChainValid()); // true

// Tamper with a transaction
// console.log("\n=== 7. TAMPERING TEST ===");
// coin.chain[3].transactions[0].amount = 9999;

// console.log("After tampering, valid?", coin.isChainValid()); // false
