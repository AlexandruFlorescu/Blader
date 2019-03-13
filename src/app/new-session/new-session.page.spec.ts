import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSessionPage } from './new-session.page';

describe('NewSessionPage', () => {
  let component: NewSessionPage;
  let fixture: ComponentFixture<NewSessionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewSessionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSessionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
