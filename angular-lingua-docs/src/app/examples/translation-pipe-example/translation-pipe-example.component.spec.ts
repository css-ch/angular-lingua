import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TranslationPipeExampleComponent } from './translation-pipe-example.component';

describe('TranslationPipeExampleComponent', () => {
  let component: TranslationPipeExampleComponent;
  let fixture: ComponentFixture<TranslationPipeExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TranslationPipeExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslationPipeExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
