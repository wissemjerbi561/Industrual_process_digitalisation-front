import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RapportAuditComponent } from './rapport-audit.component';

describe('RapportAuditComponent', () => {
  let component: RapportAuditComponent;
  let fixture: ComponentFixture<RapportAuditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RapportAuditComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RapportAuditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
