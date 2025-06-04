import { Component, DestroyRef, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { WeatherService } from './weather.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  imports:[FormsModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  city: string = '';
  weather: any;
  errorMessage: string = '';
  private destroyRef = inject(DestroyRef)

  constructor(private weatherService: WeatherService) {}

  getWeather() {
    this.weather = null;
    this.errorMessage = '';

    const subscription= this.weatherService.getWeather(this.city).subscribe({
      next: data => this.weather = data,
      error: err => this.errorMessage = err.message
    });

    this.destroyRef.onDestroy(()=>{
      subscription.unsubscribe()
    })
  }

  clearData() {
  this.city = '';
  this.weather = null;
  this.errorMessage = '';
}
}
