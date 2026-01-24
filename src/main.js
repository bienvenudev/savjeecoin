const { Blockchain, Transaction } = require("./blockchain");

const sajveeCoin = new Blockchain();
sajveeCoin.createTransaction(new Transaction("address1", "address2", 100));
sajveeCoin.createTransaction(new Transaction("address2", "address1", 50));

console.log("\n Starting the miner...");
sajveeCoin.minePendingTransactions("bens-address");

console.log(
  "\nBalance of ben is",
  sajveeCoin.getBalanceofAddress("bens-address"),
);

console.log("\n Starting the miner again...");
sajveeCoin.minePendingTransactions("bens-address");

console.log(
  "\nBalance of ben is",
  sajveeCoin.getBalanceofAddress("bens-address"),
);
