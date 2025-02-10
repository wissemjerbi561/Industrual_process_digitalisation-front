import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RedactionRapportSignalisationComponent } from './redaction-rapport-signalisation.component';

describe('RedactionRapportSignalisationComponent', () => {
  let component: RedactionRapportSignalisationComponent;
  let fixture: ComponentFixture<RedactionRapportSignalisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RedactionRapportSignalisationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RedactionRapportSignalisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
