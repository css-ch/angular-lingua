import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationDirectiveExampleComponent } from './translation-directive-example.component';

describe('TranslationDirectiveExampleComponent', () => {
  let component: TranslationDirectiveExampleComponent;
  let fixture: ComponentFixture<TranslationDirectiveExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationDirectiveExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationDirectiveExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
