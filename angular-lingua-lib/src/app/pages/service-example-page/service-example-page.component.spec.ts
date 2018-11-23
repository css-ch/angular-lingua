import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {MatIconModule} from '@angular/material';
import {TranslationModule} from '../../../../projects/angular-lingua-lib/src/lib/translation.module';

import { ServiceExamplePageComponent } from './service-example-page.component';

describe('ServiceExamplePageComponent', () => {
  let component: ServiceExamplePageComponent;
  let fixture: ComponentFixture<ServiceExamplePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ServiceExamplePageComponent ],
      imports: [TranslationModule.forRoot('deu'), MatIconModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ServiceExamplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
