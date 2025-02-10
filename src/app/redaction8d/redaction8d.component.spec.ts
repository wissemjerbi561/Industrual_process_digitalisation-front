import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Redaction8dComponent } from './redaction8d.component';

describe('Redaction8dComponent', () => {
  let component: Redaction8dComponent;
  let fixture: ComponentFixture<Redaction8dComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ Redaction8dComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(Redaction8dComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
