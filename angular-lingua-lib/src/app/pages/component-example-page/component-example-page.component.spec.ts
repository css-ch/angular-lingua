import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComponentExamplePageComponent } from './component-example-page.component';

describe('ComponentExamplePageComponent', () => {
  let component: ComponentExamplePageComponent;
  let fixture: ComponentFixture<ComponentExamplePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComponentExamplePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComponentExamplePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
