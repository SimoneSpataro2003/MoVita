import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorieFiltroComponent } from './categorie-filtro.component';

describe('CategorieFiltroComponent', () => {
  let component: CategorieFiltroComponent;
  let fixture: ComponentFixture<CategorieFiltroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CategorieFiltroComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CategorieFiltroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
