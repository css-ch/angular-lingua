import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationNewFormComponent } from './translation-new-form.component';

describe('TranslationNewFormComponent', () => {
  let component: TranslationNewFormComponent;
  let fixture: ComponentFixture<TranslationNewFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationNewFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationNewFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
