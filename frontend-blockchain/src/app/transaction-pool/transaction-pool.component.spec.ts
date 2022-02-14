import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionPoolComponent } from './transaction-pool.component';

describe('TransactionPoolComponent', () => {
  let component: TransactionPoolComponent;
  let fixture: ComponentFixture<TransactionPoolComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionPoolComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionPoolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
