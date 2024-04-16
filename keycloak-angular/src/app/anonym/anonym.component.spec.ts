import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AnonymComponent } from './anonym.component';

describe('AnonymComponent', () => {
  let component: AnonymComponent;
  let fixture: ComponentFixture<AnonymComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AnonymComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AnonymComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
