import { Component, OnInit, VERSION } from "@angular/core";
import { OAuthService, ReceivedTokens } from "angular-oauth2-oidc";
import { authCodeFlowConfig } from "./app.module";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent implements OnInit {
  name = "Angular " + VERSION.major;

  constructor(private oAuthService: OAuthService) {}
  ngOnInit(): void {
    this.oAuthService.configure(authCodeFlowConfig);
    this.oAuthService.setupAutomaticSilentRefresh();

    this.oAuthService.loadDiscoveryDocument().then((doc: object) => {
      if (this.oAuthService.hasValidIdToken()) {
        // Bypass on refresh with valid token
      } else {
        this.oAuthService.tryLogin({
          onTokenReceived: (info: ReceivedTokens): void => {
            // Do something when token is received
          }
        });
      }
    });
  }

  public get accessToken() {
    return this.oAuthService.getAccessToken();
  }
  public get identityClaims() {
    return this.oAuthService.getIdentityClaims();
  }
  public get idToken() {
    return this.oAuthService.getIdToken();
  }
}
