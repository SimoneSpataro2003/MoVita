import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarouselEventImageComponent } from './carousel-event-image.component';

describe('CarouselEventImageComponent', () => {
  let component: CarouselEventImageComponent;
  let fixture: ComponentFixture<CarouselEventImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarouselEventImageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarouselEventImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
