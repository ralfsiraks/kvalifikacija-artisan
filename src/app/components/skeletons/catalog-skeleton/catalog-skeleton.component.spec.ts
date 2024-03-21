import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatalogSkeletonComponent } from './catalog-skeleton.component';

describe('CatalogSkeletonComponent', () => {
  let component: CatalogSkeletonComponent;
  let fixture: ComponentFixture<CatalogSkeletonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CatalogSkeletonComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CatalogSkeletonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
