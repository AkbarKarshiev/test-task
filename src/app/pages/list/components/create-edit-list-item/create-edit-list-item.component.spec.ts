import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEditListItemComponent } from './create-edit-list-item.component';

describe('CreateEditListItemComponent', () => {
  let component: CreateEditListItemComponent;
  let fixture: ComponentFixture<CreateEditListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CreateEditListItemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CreateEditListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
