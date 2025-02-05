import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventiSimiliComponent } from './eventi-simili.component';

describe('EventiSimiliComponent', () => {
  let component: EventiSimiliComponent;
  let fixture: ComponentFixture<EventiSimiliComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EventiSimiliComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EventiSimiliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
