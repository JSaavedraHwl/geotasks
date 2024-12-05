import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ConfiguracionPage } from './configuracion.page';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

describe('ConfiguracionPage', () => {
  let component: ConfiguracionPage;
  let fixture: ComponentFixture<ConfiguracionPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ConfiguracionPage],
      imports: [
        CommonModule,
        IonicModule,
        FormsModule,
        ReactiveFormsModule,
        HttpClientModule
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ConfiguracionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
