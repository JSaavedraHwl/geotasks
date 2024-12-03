import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AutenticacionPage } from './autenticacion.page';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

describe('AutenticacionPage', () => {
  let component: AutenticacionPage;
  let fixture: ComponentFixture<AutenticacionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AutenticacionPage],
      imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(AutenticacionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
