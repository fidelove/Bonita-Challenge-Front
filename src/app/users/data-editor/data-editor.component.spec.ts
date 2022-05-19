import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataEditorComponent } from './data-editor.component';

describe('UserEditorComponent', () => {
  let component: DataEditorComponent;
  let fixture: ComponentFixture<UserEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserEditorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
