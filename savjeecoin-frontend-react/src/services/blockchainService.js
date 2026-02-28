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
    this.blockchainInstance.addTransaction(newTx);
  }

  getPendingTransactions() {
    return this.blockchainInstance.pendingTransactions;
  }

  mineTransactions() {
    this.blockchainInstance.minePendingTransactions(
      this.walletKeys[0].publicKey,
    );
  }

  getBalanceOfAddress(address) {
    return this.blockchainInstance.getBalanceOfAddress(address);
  }

  addressIsFromCurrentUser(address) {
    return address === this.walletKeys[0].publicKey;
  }

  getAllTransactionsForWallet(address) {
    return this.blockchainInstance.getAllTransactionsForWallet(address);
  }
}

export const blockchainService = new BlockchainService(); // why initializing this? does it mean that while exporting this fn it will always create a new instance of blockchainservice?
