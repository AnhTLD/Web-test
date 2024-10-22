import { Component, inject } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../service-api/api.service';
import { ChatService } from '../service-api/chat.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent {

  constructor(
    private fb: FormBuilder,
    private _router: Router,
    private _apiService:ApiService,
    private _chatService:ChatService
  ) {}
  checkPage:number = 3;
  fileMoment1:any = null;
  fileMoment2:any = null;
  open:boolean = false
  url:any = null;
  url2:any = null;
  res:any;
  engineList = [
    {
      name:"Đồ Thị Động Cơ 1"
    },
    {
      name:"Đồ Thị Động Cơ 2"
    }
]
  // _chatService:ChatService = inject(ChatService)
  mess:string = "";
  file = {
    base64:"",
    type:null
  }
  chatBoxMess :any =[
    // {
    //   AI:"Hello! How can I help you today?",
    //   user:""
    // }
  ]
  log(){
    this.checkPage = 3;
    // setTimeout(() =>{
    //   var a = document.getElementById("btnOptions")
    //   a?.click()
    // },300)
 

  }
  onFileMoment1(event: any) {
    const input = event.target as HTMLInputElement;
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.onconvertToBase64(file).then((base64String) => {
        this.fileMoment1 = base64String;
      });
    } else {
      input.value = ''; // Reset the input
      alert("Chỉ Được Phép Chọn File Hình");
    }

}

onFileMoment2(event: any) {
  const input = event.target as HTMLInputElement;
    const file = event.target.files[0];
    if (file && file.name.endsWith('.mat')) {
      this.onconvertToBase64(file).then((base64String) => {
        this.fileMoment2 = base64String;
        var img = this._apiService.converToImg()
        this.url2  = img.img1;
      }).catch(error => {
        console.error('Error converting file to Base64:', error);
      });
    } else {
      alert("The selected file is not a .mat file.");
      input.value = ''; // Reset the input
    }
}
add(){
  var count = this.engineList.length + 1
  var name = "Đồ Thị Động Cơ"+" "+ count ;
  this.engineList.push({name:name})
}
onconvertToBase64(file: any): Promise<string> {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
            const base64String = reader.result as string;
            this.url = base64String;
            const base64WithPrefix = base64String.split(',')[1];
            const mimeType = file.type;
            this.file = {
              base64 :base64WithPrefix,
              type:mimeType 
            }
            resolve(base64WithPrefix);
        };
        reader.onerror = (error) => {
            reject(error);
        };
        reader.readAsDataURL(file);
    });
}
onSubmit(){
  var apiMoment1 = "" ;
  var apiMoment2 = "" ;
  console.log(this.fileMoment1)
  var obj = {
    "name": "srcdoamain",
    "file": "sadasdasda"
  }
  this.res = this._apiService.srcDomain(obj)
  if(this.fileMoment1 != null && this.fileMoment2 != null ){
    // this._apiService.readyMoment1(this.fileMoment1).subscribe(res =>{
      
    // })
    //Đoạn lệnh thục hiện
  }
  if(this.fileMoment1 != null && this.fileMoment2 == null ){
    this._apiService.readyMoment1(this.fileMoment1).subscribe(res =>{
      
    })
  }
  if(this.fileMoment1 == null && this.fileMoment2 != null ){
    this._apiService.readyMoment2(this.fileMoment2).subscribe(res =>{
      
    })
  }
}
  logOut(){
    this._router.navigate(['login'])
  }
 async sendChat(){
    this.chatBoxMess.push(
      {
        user:this.mess,
        AI:""
      }
    )
    try {
      var AiChat = await this._chatService.vision(this.mess,this.file);
      this.chatBoxMess[this.chatBoxMess.length - 1].AI = AiChat.message;
     this.mess = '';
  } catch (error) {
      console.error('Error generating AI response:', error);
  }

  }
  sendWithFile(){
    console.log(this.file)
    this._chatService.vision(this.mess,this.file)
  }
}
