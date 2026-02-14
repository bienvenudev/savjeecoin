import { Blockchain } from "savjeecoin";
import EC from "elliptic";

class BlockchainService {
  blockchainInstance = new Blockchain();
  walletKeys = [];

  constructor() {
    this.blockchainInstance.difficulty = 1;
    this.blockchainInstance.minePendingTransactions("my-wallet-address"); // shouldn't i initialize this to 'this.walletKeys[0].publicKey'

    this.generateWalletKeys();
  }

  getBlocks() {
    return this.blockchainInstance.chain;
  }

  generateWalletKeys() {
    const ec = new EC.ec("secp256k1");
    const key = ec.genKeyPair();

    this.walletKeys.push({
      keyObj: key,
      publicKey: key.getPublic("hex"),
      privateKey: key.getPrivate("hex"),
    });
  }

  createTransaction(newTx) {
    console.log("here in create tx", newTx);
    this.blockchainInstance.addTransaction(newTx);
    console.log(
      "pending transactions array",
      this.blockchainInstance.pendingTransactions,
    );
  }

  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions;
  }

  mineTransactions() {
    this.blockchainInstance.minePendingTransactions(this.walletKeys[0].publicKey);
  }
}

export const blockchainService = new BlockchainService(); // why initializing this? does it mean that while exporting this fn it will always create a new instance of blockchainservice?
