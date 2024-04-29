import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PedigreeCreatePage} from './pedigree-create.page';

describe('PedigreeCreatePage', () => {
  let component: PedigreeCreatePage;
  let fixture: ComponentFixture<PedigreeCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedigreeCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
