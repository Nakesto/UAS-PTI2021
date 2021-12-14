import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustombotComponent } from './custombot.component';

describe('CustombotComponent', () => {
  let component: CustombotComponent;
  let fixture: ComponentFixture<CustombotComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CustombotComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CustombotComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
