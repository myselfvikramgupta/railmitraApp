import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { HttpClient } from '@angular/common/http';
import { SpinnerDialog } from '@ionic-native/spinner-dialog';
import { InAppBrowser , InAppBrowserOptions  } from '@ionic-native/in-app-browser';
import { Network } from '@ionic-native/network';
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
blogs :any;
garray=[];

options : InAppBrowserOptions = {
    zoom : 'yes',//Android only ,shows browser zoom controls     
};



  constructor(
    public navCtrl: NavController , 
    public httpClient: HttpClient,
    private theInAppBrowser: InAppBrowser,
    private spinnerDialog: SpinnerDialog,
    private network: Network

    ) {

let disconnectSubscription = this.network.onDisconnect().subscribe(() => {
  console.log('network was disconnected :-(');
});
disconnectSubscription.unsubscribe();


// watch network for a connection
let connectSubscription = this.network.onConnect().subscribe(() => {
  console.log('network connected!');
  // We just got a connection but we need to wait briefly
   // before we determine the connection type. Might need to wait.
  // prior to doing any api requests as well.
  setTimeout(() => {
    if (this.network.type === 'wifi') {
      console.log('we got a wifi connection, woohoo!');
    }
  }, 3000);
});

// stop connect watch
connectSubscription.unsubscribe();


    

   this.getBlog()

  }

 getBlog()
 {
   this.spinnerDialog.show();
    this.blogs = this.httpClient.get('https://blog.railmitra.com/wp-json/wp/v2/posts?per_page=3');
    this.blogs
    .subscribe(data => {
      this.spinnerDialog.hide();
     this.blogs=data;
     for(var i=0;i<this.blogs.length;i++){
            this.garray.push({ title : data[i]['title']['rendered'] , date : data[i]['date'],img:data[i]['featured_image_url'],link:data[i]['link'] })


     	console.log(data)
     }
    })
 }
 singleBlog(url:string)
 {

 	 let target = "_self";
    this.theInAppBrowser.create(url,target,this.options);
 }
}
