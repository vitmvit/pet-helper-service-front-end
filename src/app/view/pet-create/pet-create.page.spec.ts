import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PetCreatePage} from './pet-create.page';

describe('PetCreatePage', () => {
  let component: PetCreatePage;
  let fixture: ComponentFixture<PetCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PetCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
