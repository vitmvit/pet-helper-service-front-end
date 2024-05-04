import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StateDictionaryPage} from './state-dictionary.page';

describe('StateDictionaryPage', () => {
  let component: StateDictionaryPage;
  let fixture: ComponentFixture<StateDictionaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StateDictionaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
