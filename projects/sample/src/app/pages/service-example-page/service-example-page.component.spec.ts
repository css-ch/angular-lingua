import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import {TranslationModule} from 'angular-lingua';

import { ServiceExamplePageComponent } from './service-example-page.component';

describe('ServiceExamplePageComponent', () => {
  let component: ServiceExamplePageComponent;
  let fixture: ComponentFixture<ServiceExamplePageComponent>;

  beforeEach(waitForAsync(() => {
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
