import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsigliEventoComponent } from './consigli-evento.component';

describe('ConsigliEventoComponent', () => {
  let component: ConsigliEventoComponent;
  let fixture: ComponentFixture<ConsigliEventoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConsigliEventoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConsigliEventoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
