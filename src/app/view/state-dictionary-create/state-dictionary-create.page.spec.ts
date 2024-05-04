import {ComponentFixture, TestBed} from '@angular/core/testing';
import {StateDictionaryCreatePage} from './state-dictionary-create.page';

describe('StateDictionaryCreatePage', () => {
  let component: StateDictionaryCreatePage;
  let fixture: ComponentFixture<StateDictionaryCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(StateDictionaryCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
