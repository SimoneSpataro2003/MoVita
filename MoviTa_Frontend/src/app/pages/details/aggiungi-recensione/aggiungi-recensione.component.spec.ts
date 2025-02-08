import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AggiungiRecensioneComponent } from './aggiungi-recensione.component';

describe('AggiungiRecensioneComponent', () => {
  let component: AggiungiRecensioneComponent;
  let fixture: ComponentFixture<AggiungiRecensioneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AggiungiRecensioneComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AggiungiRecensioneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
