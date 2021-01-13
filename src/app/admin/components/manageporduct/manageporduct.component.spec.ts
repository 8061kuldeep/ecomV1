import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageporductComponent } from './manageporduct.component';

describe('ManageporductComponent', () => {
  let component: ManageporductComponent;
  let fixture: ComponentFixture<ManageporductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageporductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageporductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
