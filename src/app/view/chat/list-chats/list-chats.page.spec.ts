import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ListChatsPage} from './list-chats.page';

describe('ListChatsPage', () => {
  let component: ListChatsPage;
  let fixture: ComponentFixture<ListChatsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListChatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
