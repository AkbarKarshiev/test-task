import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileControlsComponent } from './profile-controls.component';

describe('ProfileControlsComponent', () => {
  let component: ProfileControlsComponent;
  let fixture: ComponentFixture<ProfileControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProfileControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProfileControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
