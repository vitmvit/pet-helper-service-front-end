import {ComponentFixture, TestBed} from '@angular/core/testing';
import {PedigreePage} from './pedigree.page';

describe('PedigreePage', () => {
  let component: PedigreePage;
  let fixture: ComponentFixture<PedigreePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PedigreePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
