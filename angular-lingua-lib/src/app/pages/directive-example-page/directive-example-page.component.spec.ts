import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatIconModule} from '@angular/material';
import {TranslationModule} from '../../../../projects/angular-lingua-lib/src/lib/translation.module';

import { DirectiveExamplePageComponent } from './directive-example-page.component';

describe('DirectiveExamplePageComponent', () => {
  let component: DirectiveExamplePageComponent;
  let fixture: ComponentFixture<DirectiveExamplePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectiveExamplePageComponent ],
      imports: [TranslationModule.forRoot('deu'), MatIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectiveExamplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
