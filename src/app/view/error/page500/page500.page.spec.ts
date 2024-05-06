import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Page500Page } from './page500.page';

describe('Page500Page', () => {
  let component: Page500Page;
  let fixture: ComponentFixture<Page500Page>;

  beforeEach(() => {
    fixture = TestBed.createComponent(Page500Page);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
