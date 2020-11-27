import { NgModule } from "@angular/core";
import { BrowserModule } from "@angular/platform-browser";
import { FormsModule } from "@angular/forms";

import { AppComponent } from "./app.component";
import { RouterModule } from "@angular/router";

import { HttpClientModule } from "@angular/common/http";
import { OAuthModule } from "angular-oauth2-oidc";

import { AuthConfig, OAuthStorage } from "angular-oauth2-oidc";

export const authCodeFlowConfig: AuthConfig = {
  // Url of the Identity Provider
  issuer: "https://demo.identityserver.io",

  // URL of the SPA to redirect the user to after login
  redirectUri: window.location.origin + "/index.html",

  // The SPA's id. The SPA is registerd with this id at the auth-server
  // clientId: 'server.code',
  clientId: "interactive.public",

  // Just needed if your auth server demands a secret. In general, this
  // is a sign that the auth server is not configured with SPAs in mind
  // and it might not enforce further best practices vital for security
  // such applications.
  // dummyClientSecret: 'secret',

  responseType: "code",

  // set the scope for the permissions the client should request
  // The first four are defined by OIDC.
  // Important: Request offline_access to get a refresh token
  // The api scope is a usecase specific one
  scope: "openid profile email api offline_access",

  showDebugInformation: true
};

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    OAuthModule.forRoot(),
    RouterModule
  ],
  declarations: [AppComponent],
  bootstrap: [AppComponent],
  providers: [{ provide: OAuthStorage, useValue: localStorage }]
})
export class AppModule {}
