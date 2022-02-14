import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlockchainComponent } from './blockchain/blockchain.component';
import { WalletComponent } from './wallet/wallet.component';
import { TransactionPoolComponent } from './transaction-pool/transaction-pool.component';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'wallet', component: WalletComponent },
  { path: 'blockchain', component: BlockchainComponent },
  { path: 'pool', component: TransactionPoolComponent },
  { path: '', component: HomeComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
