import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreationRapportNcComponent } from './creation-rapport-nc.component';

describe('CreationRapportNcComponent', () => {
  let component: CreationRapportNcComponent;
  let fixture: ComponentFixture<CreationRapportNcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreationRapportNcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreationRapportNcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
