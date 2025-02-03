import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PartecipantiEventoComponent } from './partecipanti-evento.component';

describe('PartecipantiEventoComponent', () => {
  let component: PartecipantiEventoComponent;
  let fixture: ComponentFixture<PartecipantiEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PartecipantiEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PartecipantiEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
