import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { NzTableComponent } from 'ng-zorro-antd/table';
import { Block } from '../model/model';
import { AppService } from '../app.service';


@Component({
  selector: 'app-blockchain',
  templateUrl: './blockchain.component.html',
  styleUrls: ['./blockchain.component.css']
})
export class BlockchainComponent implements OnInit, OnDestroy {

  constructor(private service: AppService) {}

  blockchain!: Block[]
  subscription = new Subscription();
  @ViewChild('virtualTable', { static: false }) nzTableComponent?: NzTableComponent<Block>;

  ngOnInit(): void {
    this.subscription.add(
      this.service.getBlockchain().subscribe(blockchain => {
        this.blockchain = blockchain;
      })
    );
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }
}
