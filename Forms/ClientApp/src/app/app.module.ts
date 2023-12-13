import { BrowserModule } from '@angular/platform-browser';
import { NgModule, ViewChild } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HomeComponent } from './home/home.component';
import { CounterComponent } from './counter/counter.component';
import { FetchDataComponent } from './fetch-data/fetch-data.component';
import { RegisterComponent } from '../register/register.component';
import { AuthService } from './services/auth.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './services/auth.guard';
import { ViewCoursesComponent } from './view-courses/view-courses.component';

import { NavComponent } from './nav/nav.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { AddCoursesComponent } from './popups/add-courses/add-courses.component';
import { CommonModule, NgClass } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSelectModule } from '@angular/material/select';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { AddSchedulesComponent } from './popups/add-schedules/add-schedules.component';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { MatTableModule } from '@angular/material/table';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CustomTimePipe } from './custom-time.pipe';
import { ViewSchedComponent } from './view-sched/view-sched.component';
import { StudentProfileComponent } from './Profiles/student-profile/student-profile.component';
import { MatStepperModule } from '@angular/material/stepper';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { DatePipe } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    CounterComponent,
    FetchDataComponent,
    RegisterComponent,
    LoginComponent,
    NavComponent,
    SideNavComponent,
    AddCoursesComponent,
    AddSchedulesComponent,
    ViewCoursesComponent,
    CustomTimePipe,
    ViewSchedComponent,
    StudentProfileComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    NgClass,
    MatInputModule,
    NgxMatTimepickerModule,
    MatFormFieldModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatDialogModule,
    MatNativeDateModule,
    MatIconModule,
    ReactiveFormsModule,
    MatStepperModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent, pathMatch: 'full', canActivate: [AuthGuard] },
      { path: 'signin', component: LoginComponent },
      { path: 'signup', component: RegisterComponent },
      { path: 'signin/courses', component: ViewCoursesComponent },
      { path: 'signin/schedules', component: ViewSchedComponent },
      { path: 'signin/profile', component: StudentProfileComponent }
    ])
  ],
  providers: [AuthService, DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }

