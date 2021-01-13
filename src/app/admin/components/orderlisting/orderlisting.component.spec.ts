import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderlistingComponent } from './orderlisting.component';

describe('OrderlistingComponent', () => {
  let component: OrderlistingComponent;
  let fixture: ComponentFixture<OrderlistingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderlistingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderlistingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
