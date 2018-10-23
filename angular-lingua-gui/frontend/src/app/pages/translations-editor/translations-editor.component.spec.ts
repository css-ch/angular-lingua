import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationsEditorComponent } from './translation-editor.component';

describe('TranslationEditorComponent', () => {
  let component: TranslationsEditorComponent;
  let fixture: ComponentFixture<TranslationsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
