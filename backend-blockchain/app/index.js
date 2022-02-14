const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const Blockchain = require('../blockchain');
const P2pServer = require('./p2p-server');
const Wallet = require('../wallet');
const TransactionPool = require('../wallet/transaction-pool');
const Miner = require('./miner');

const HTTP_PORT = process.env.HTTP_PORT || 3001;

const app = express();
const bc = new Blockchain();
const wallet = new Wallet();
const tp = new TransactionPool();
const p2pServer = new P2pServer(bc, tp, wallet);
const miner = new Miner(bc, tp, wallet, p2pServer);
const corsOptions = {
  origin: ['http://localhost:4200', 'http://localhost:4201', 'http://localhost:4202'],
  optionsSuccessStatus: 200
}

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.get('/blocks', (req, res) => {
  res.json(bc.chain);
});

app.post('/mine', (req, res) => {
  const block = bc.addBlock(req.body.data);
  console.log(`New block added: ${block.toString()}`);

  p2pServer.syncChains();

  res.redirect('/blocks');
});

app.get('/transactions', (req, res) => {
  res.json(tp.transactions);
});

app.post('/transact', (req, res) => {
  const { recipient, amount } = req.body;
  const transaction = wallet.createTransaction(recipient, amount, bc, tp);

  p2pServer.broadcastTransaction(transaction);
  res.redirect('/transactions');
});

app.get('/mine-transactions', (req, res) => {
  const block = miner.mine();

  if (block) {
    console.log(`New block added: ${block.toString()}`);
    res.redirect('/blocks');
  } else {
    console.log('Transaction pool is empty! Cannot mine a block with no transactions.');
  }
});

app.get('/public-key', (req, res) => {
  res.json({ publicKey: wallet.publicKey });
});

app.get('/wallet', (req, res) => {
  res.json(wallet);
});

app.listen(HTTP_PORT, () => console.log(`Listening on port ${HTTP_PORT}`));
p2pServer.listen();

