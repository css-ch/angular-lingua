import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationEditFormComponent } from './translation-edit-form.component';

describe('TranslationFormComponent', () => {
  let component: TranslationEditFormComponent;
  let fixture: ComponentFixture<TranslationEditFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationEditFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationEditFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
