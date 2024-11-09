// app.config.ts
import { ApplicationConfig } from '@angular/core';


// main.ts
import { bootstrapApplication } from '@angular/platform-browser';
import { AppComponent } from './app.component';


bootstrapApplication(AppComponent)
  .catch(err => console.error(err));