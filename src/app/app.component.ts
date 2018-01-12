import { Component, Injectable, OnInit} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from "angular4-social-login";
import { FacebookLoginProvider } from "angular4-social-login";
import { SocialUser } from "angular4-social-login";

@Injectable()
export class WindowRef {
    constructor() {}

    getNativeWindow() {
        return window;
    }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers:[WindowRef]
})
export class AppComponent implements OnInit {
    
   
  private user: SocialUser;
  nativeWindow: any
  title = 'app';

  constructor( private winRef: WindowRef,private http: HttpClient,private authService: AuthService) { 
       this.nativeWindow = winRef.getNativeWindow();
   }


    ngOnInit(): void {
      var httpClient = this.http;
       this.nativeWindow.onmessage = function(e){
         console.log(e);
         if(e.data.oauturl){

           var urlWithCode = e.data.oauturl.toString();
           var idx = urlWithCode.lastIndexOf("code=");
           var code = urlWithCode.substring(idx+5).replace('#','');

            console.log(code);
            if(code){
              httpClient.get('http://localhost:8080/tokens?code='+code).subscribe(data=>{
              console.log(data );
            });
          }
        }
       }
      }

    googleSignIN(){
      this.http.get('http://localhost:8080/GoogleUrl').subscribe(data=>{
       
         //var newWindow = this.nativeWindow.open(data.url);
      })
    }

    

    faceSignIn(){
      this.authService.signIn(FacebookLoginProvider.PROVIDER_ID);

      this.authService.authState.subscribe((user) => {
        this.user = user;
        console.log(this.user);
      });
    }
 
}
