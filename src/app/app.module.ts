import { AppRoutingModule } from './app.routing';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { AdminComponent } from './users/admin/admin.component'
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './angular-material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { DataEditorComponent } from './users/data-editor/data-editor.component';
import { ChefComponent } from './users/chef/chef.component';
import { UserComponent } from './users/user/user.component';
import { CommonUserComponent } from './users/commonuser/commonuser.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    ChefComponent,
    UserComponent,
    ConfirmDialogComponent,
    DataEditorComponent,
    CommonUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    FlexLayoutModule,
    ReactiveFormsModule
  ],
  providers: [CookieService,
    ConfirmDialogComponent,
    DataEditorComponent,
    AdminComponent,
    ChefComponent,
    UserComponent,
    CommonUserComponent],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  entryComponents: [ConfirmDialogComponent, DataEditorComponent]
})

export class AppModule { }