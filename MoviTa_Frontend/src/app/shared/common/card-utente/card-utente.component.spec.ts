import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardUtenteComponent } from './card-utente.component';

describe('CardUtenteComponent', () => {
  let component: CardUtenteComponent;
  let fixture: ComponentFixture<CardUtenteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardUtenteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardUtenteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
