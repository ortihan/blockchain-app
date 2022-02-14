import { Component, OnDestroy, OnInit } from '@angular/core';
import { Transaction } from '../model/model';
import { Subscription } from 'rxjs';
import { AppService } from '../app.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-transaction-pool',
  templateUrl: './transaction-pool.component.html',
  styleUrls: ['./transaction-pool.component.css']
})
export class TransactionPoolComponent implements OnInit, OnDestroy {

  transactionPool: Transaction[] =[];
  subscription = new Subscription();
  expandOutputs: boolean[] = [];
  isLoading = false;

  constructor(private service: AppService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.service.getTransactionPool().subscribe(transactionPool => {
        this.transactionPool = transactionPool;
        this.transactionPool.forEach(() => {
          this.expandOutputs.push(false);
        });
      })
    );
  }

  mineBlock() {
    this.isLoading = true;
    this.subscription.add(
      this.service.mineBlock().subscribe(blockchain => {
        this.blockMinedMessage();
        this.transactionPool = [];
        this.isLoading = false;
      })
    );
  }

  blockMinedMessage(): void {
    this.message.create('success', 'You successfully mined a new block!');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
