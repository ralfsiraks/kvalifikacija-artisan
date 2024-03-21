import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartSkeletonComponent } from './cart-skeleton.component';

describe('CartSkeletonComponent', () => {
  let component: CartSkeletonComponent;
  let fixture: ComponentFixture<CartSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CartSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
