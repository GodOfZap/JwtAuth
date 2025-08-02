import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoardModerator } from './board-moderator';

describe('BoardModerator', () => {
  let component: BoardModerator;
  let fixture: ComponentFixture<BoardModerator>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BoardModerator]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoardModerator);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
