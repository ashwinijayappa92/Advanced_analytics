import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MicrobiologyComponent } from './microbiology.component';

describe('MicrobiologyComponent', () => {
  let component: MicrobiologyComponent;
  let fixture: ComponentFixture<MicrobiologyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MicrobiologyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MicrobiologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
