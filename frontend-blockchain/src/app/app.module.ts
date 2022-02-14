import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { HeaderComponent } from './header/header.component';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzCardModule } from 'ng-zorro-antd/card';
import { WalletComponent } from './wallet/wallet.component';
import { BlockchainComponent } from './blockchain/blockchain.component';
import { TransactionPoolComponent } from './transaction-pool/transaction-pool.component';
import { NzSpaceModule } from 'ng-zorro-antd/space';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzTreeViewModule } from 'ng-zorro-antd/tree-view';
import { HomeComponent } from './home/home.component';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzNotificationService } from 'ng-zorro-antd/notification';
import { NzMessageService } from 'ng-zorro-antd/message';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    WalletComponent,
    BlockchainComponent,
    TransactionPoolComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NzLayoutModule,
    NzMenuModule,
    NzCardModule,
    NzSpaceModule,
    NzButtonModule,
    NzTableModule,
    NzDropDownModule,
    NzBadgeModule,
    NzIconModule,
    NzDividerModule,
    NzTimelineModule,
    NzTreeViewModule,
    NzEmptyModule,
    ReactiveFormsModule,
    NzFormModule,
    NzInputModule,
    NzAlertModule,
    BrowserAnimationsModule,
    FormsModule
  ],
  providers: [NzNotificationService, NzMessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
