import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PetPropertiesPage} from './pet-properties.page';

describe('PetPropertiesPage', () => {
  let component: PetPropertiesPage;
  let fixture: ComponentFixture<PetPropertiesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PetPropertiesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
