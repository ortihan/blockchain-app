const Transaction = require('./transaction');

class TransactionPool {
  constructor() {
    this.transactions = [];
  }

  updateOrAddTransaction(transaction) {
    let transactionWithId = this.transactions.find(tran => tran.id === transaction.id);

    if (transactionWithId) {
      this.transactions[this.transactions.indexOf(transactionWithId)] = transaction;
    } else {
      this.transactions.push(transaction);
    }
  }

  existingTransaction(address) {
    return this.transactions.find(t => t.input.address === address);
  }

  validTransactions() {
    return this.transactions.filter(transaction => {
      if (!Transaction.verifyTransaction(transaction)) {
        console.log(`Invalid signature from ${transaction.input.address}.`);
        return;
      }
      return transaction;
    });
  }

  empty() {
    return this.transactions.length === 0;
  }

  clear() {
    this.transactions = [];
  }
}

module.exports = TransactionPool;