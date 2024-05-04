import {ComponentFixture, TestBed} from '@angular/core/testing';
import {ListMedicalChatsPage} from './list-medical-chats.page';

describe('ListMedicalChatsPage', () => {
  let component: ListMedicalChatsPage;
  let fixture: ComponentFixture<ListMedicalChatsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMedicalChatsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
