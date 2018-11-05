import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PipeExamplePageComponent } from './pipe-example-page.component';

describe('PipeExamplePageComponent', () => {
  let component: PipeExamplePageComponent;
  let fixture: ComponentFixture<PipeExamplePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PipeExamplePageComponent ]
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
