export interface Block {
  timestamp: Date;
  lastHash: string;
  hash: string;
  data: Transaction[];
  nonce: string;
  difficulty: number;
}

export interface Transaction {
  id: string;
  input: Input;
  outputs: Output[];
}

export interface Input {
  timestamp: Date;
  amount: number;
  address: string;
  signature: string;
}

export interface Output {
  amount: number;
  address: string;
}

export interface Wallet {
  balance: number;
  publicKey: string;
}
