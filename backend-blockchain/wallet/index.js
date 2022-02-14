const { INITIAL_BALANCE } = require('../config');
const ChainUtil = require('../chain-util');
const Transaction = require('./transaction');

class Wallet {
  constructor() {
    this.balance = INITIAL_BALANCE;
    this.keyPair = ChainUtil.genKeyPair();
    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  toString() {
    return `Wallet - 
      publicKey: ${this.publicKey.toString()}
      balance: ${this.balance}`;
  }

  sign(dataHash) {
    return this.keyPair.sign(dataHash);
  }

  createTransaction(recipient, amount, blockchain, transactionPool) {

    if (amount > this.balance) {
      console.log(`Amount: ${amount} exceeds current balance: ${this.balance}.`);
      return;
    }
    let transaction = transactionPool.existingTransaction(this.publicKey);

    if (transaction) {
      transaction.update(this, recipient, amount);
    } else {
      transaction = Transaction.newTransaction(this, recipient, amount);
      transactionPool.updateOrAddTransaction(transaction);
    }

    return transaction;
  }


  calculateBalance(block) {
    let transactions = [];
    let addAmount = 0;
    let subtractAmount = 0;

    block.data.forEach(transaction => {
      transactions.push(transaction);
    })

    const walletInputs = transactions.filter(transaction => transaction.input.address === this.publicKey);

    if (walletInputs.length > 0) {
      walletInputs.forEach(transaction => {
        transaction.outputs.forEach((output, index) => {
          if (index !== 0) {
            subtractAmount += parseInt(output.amount);
          }
        });
      });
    }

    transactions.forEach(transaction => {
      transaction.outputs.forEach((output, index) => {
        if (output.address === this.publicKey) {
          if (transaction.outputs.length === 1 || index !== 0) {
            addAmount += parseInt(output.amount);
          }
        }
      });
    });

    this.balance += addAmount;
    this.balance -= subtractAmount;
  }

  static blockchainWallet() {
    const blockchainWallet = new this();
    blockchainWallet.address = 'blockchain-wallet';
    return blockchainWallet;
  }
}

module.exports = Wallet;