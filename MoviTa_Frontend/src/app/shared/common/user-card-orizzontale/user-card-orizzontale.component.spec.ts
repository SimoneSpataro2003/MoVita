import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserCardOrizzontaleComponent } from './user-card-orizzontale.component';

describe('UserCardOrizzontaleComponent', () => {
  let component: UserCardOrizzontaleComponent;
  let fixture: ComponentFixture<UserCardOrizzontaleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserCardOrizzontaleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserCardOrizzontaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
