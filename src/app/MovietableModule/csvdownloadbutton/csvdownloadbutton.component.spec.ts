import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CsvdownloadbuttonComponent } from './csvdownloadbutton.component';

describe('CsvdownloadbuttonComponent', () => {
  let component: CsvdownloadbuttonComponent;
  let fixture: ComponentFixture<CsvdownloadbuttonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CsvdownloadbuttonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CsvdownloadbuttonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
