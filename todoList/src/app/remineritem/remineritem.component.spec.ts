import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RemineritemComponent } from './remineritem.component';

describe('RemineritemComponent', () => {
  let component: RemineritemComponent;
  let fixture: ComponentFixture<RemineritemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RemineritemComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RemineritemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
