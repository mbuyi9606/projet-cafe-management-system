import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialsComponentComponent } from './materials-component.component';

describe('MaterialsComponentComponent', () => {
  let component: MaterialsComponentComponent;
  let fixture: ComponentFixture<MaterialsComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MaterialsComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MaterialsComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
