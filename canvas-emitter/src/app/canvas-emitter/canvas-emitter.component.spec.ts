import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CanvasEmitterComponent } from './canvas-emitter.component';

describe('CanvasEmitterComponent', () => {
  let component: CanvasEmitterComponent;
  let fixture: ComponentFixture<CanvasEmitterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CanvasEmitterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CanvasEmitterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
