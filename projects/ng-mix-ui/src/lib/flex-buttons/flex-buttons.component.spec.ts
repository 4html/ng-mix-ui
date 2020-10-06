import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlexButtonsComponent } from './flex-buttons.component';

describe('FlexButtonsComponent', () => {
  let component: FlexButtonsComponent;
  let fixture: ComponentFixture<FlexButtonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FlexButtonsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FlexButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
