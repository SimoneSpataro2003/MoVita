import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardFriendComponent } from './card-friend.component';

describe('CardFriendComponent', () => {
  let component: CardFriendComponent;
  let fixture: ComponentFixture<CardFriendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardFriendComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardFriendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
