import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EventDictionaryCreatePage} from './event-dictionary-create.page';

describe('EventDictionaryCreatePage', () => {
  let component: EventDictionaryCreatePage;
  let fixture: ComponentFixture<EventDictionaryCreatePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDictionaryCreatePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
