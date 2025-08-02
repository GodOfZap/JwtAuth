import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardAdmin } from './board-admin';

describe('BoardAdmin', () => {
  let component: BoardAdmin;
  let fixture: ComponentFixture<BoardAdmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardAdmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardAdmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
