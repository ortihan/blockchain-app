import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Block, Transaction, Wallet } from './model/model';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  url = '';
  peerName = '';

  constructor(private http: HttpClient) {}

  getBlockchain(): Observable<Block[]> {
    return this.http.get<Block[]>(this.url + '/blocks');
  }

  getTransactionPool(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.url + '/transactions');
  }

  mineBlock(): Observable<Block[]> {
    return this.http.get<Block[]>(this.url + '/mine-transactions');
  }

  getWallet(): Observable<Wallet> {
    return this.http.get<Wallet>(this.url + '/wallet');
  }

  newTransaction(recipient: string, amount: number): Observable<Transaction[]> {
    return this.http.post<Transaction[]>(this.url + '/transact', {
      recipient: recipient,
      amount: amount
    });
  }

  setUrlAndName(serverUrl: string, peerName: string) {
    this.url = serverUrl;
    this.peerName = peerName;
  }

  getName() {
    return this.peerName;
  }
}
