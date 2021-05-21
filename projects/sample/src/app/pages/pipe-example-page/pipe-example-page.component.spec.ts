import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import {TranslationModule} from 'angular-lingua';

import { PipeExamplePageComponent } from './pipe-example-page.component';

describe('PipeExamplePageComponent', () => {
  let component: PipeExamplePageComponent;
  let fixture: ComponentFixture<PipeExamplePageComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PipeExamplePageComponent ],
      imports: [TranslationModule.forRoot('deu'), MatIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PipeExamplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
