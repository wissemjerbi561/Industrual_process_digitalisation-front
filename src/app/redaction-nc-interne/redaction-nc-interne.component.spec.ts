import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactionNcInterneComponent } from './redaction-nc-interne.component';

describe('RedactionNcInterneComponent', () => {
  let component: RedactionNcInterneComponent;
  let fixture: ComponentFixture<RedactionNcInterneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedactionNcInterneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedactionNcInterneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
