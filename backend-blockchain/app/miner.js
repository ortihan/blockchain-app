const Transaction = require('../wallet/transaction');
const Wallet = require('../wallet');

class Miner {
  constructor(blockchain, transactionPool, wallet, p2pServer) {
    this.blockchain = blockchain;
    this.transactionPool = transactionPool;
    this.wallet = wallet;
    this.p2pServer = p2pServer;
  }

  mine() {
    if (this.transactionPool.empty()) {
      console.log('Cannot mine a block with no transactions.');
      return false;
    }

    const validTransactions = this.transactionPool.validTransactions();
    if (validTransactions.length !== 0) {
      validTransactions.push(Transaction.rewardTransaction(this.wallet, Wallet.blockchainWallet()));

      const block = this.blockchain.addBlock(validTransactions);

      this.wallet.calculateBalance(block);

      this.p2pServer.syncChains();
      this.transactionPool.clear();
      this.p2pServer.broadcastClearTransactions();
      this.p2pServer.broadcastCalculateBalance(block);

      return block;
    }
  }
}

module.exports = Miner;