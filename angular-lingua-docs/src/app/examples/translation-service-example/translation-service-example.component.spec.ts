import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationServiceExampleComponent } from './translation-service-example.component';

describe('TranslationServiceExampleComponent', () => {
  let component: TranslationServiceExampleComponent;
  let fixture: ComponentFixture<TranslationServiceExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationServiceExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationServiceExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
