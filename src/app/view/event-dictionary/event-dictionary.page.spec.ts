import {ComponentFixture, TestBed} from '@angular/core/testing';
import {EventDictionaryPage} from './event-dictionary.page';

describe('EventDictionaryPage', () => {
  let component: EventDictionaryPage;
  let fixture: ComponentFixture<EventDictionaryPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDictionaryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
