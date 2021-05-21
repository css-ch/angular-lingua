import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import {TranslationModule} from 'angular-lingua';

import { DirectiveExamplePageComponent } from './directive-example-page.component';

describe('DirectiveExamplePageComponent', () => {
  let component: DirectiveExamplePageComponent;
  let fixture: ComponentFixture<DirectiveExamplePageComponent>;

  beforeEach(waitForAsync(() => {
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
