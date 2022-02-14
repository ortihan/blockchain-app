import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Wallet } from '../model/model';
import { AppService } from '../app.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.css']
})
export class WalletComponent implements OnInit, OnDestroy {

  subscription = new Subscription();
  wallet!: Wallet;
  showForm = false;
  transactionForm!: FormGroup;
  peerName?: string;

  constructor(private service: AppService, private message: NzMessageService) { }

  ngOnInit(): void {
    this.subscription.add(
      this.service.getWallet().subscribe( wallet => {
        this.wallet = wallet;
        this.transactionForm = new FormGroup({
          amount: new FormControl('', [Validators.required, Validators.min(0), Validators.max(this.wallet!.balance)]),
          recipient: new FormControl('', Validators.required)
        });
      })
    );

    this.peerName = this.service.getName();
  }

  toggleForm() {
    this.showForm = !this.showForm;
  }

  newTransaction() {
    this.subscription.add(
      this.service.newTransaction(this.transactionForm.controls['recipient'].value, this.transactionForm.controls['amount'].value).subscribe( transactionPool => {
        this.createdTransactionMessage();
        this.showForm = false;
        this.transactionForm.reset();
      })
    );
  }

  createdTransactionMessage(): void {
    this.message.create('success', 'Your transaction was submitted!');
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
