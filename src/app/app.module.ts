import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeFileComponent } from './home-file/home-file.component';
import { SideBarComponent } from './side-bar/side-bar.component';
import { OutPutTextComponent } from './out-put-text/out-put-text.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeFileComponent,
    SideBarComponent,
    OutPutTextComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
