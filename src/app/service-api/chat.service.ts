import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  ChatSession,
  GenerativeModel,
  GoogleGenerativeAI,
  InlineDataPart,
} from '@google/generative-ai';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ChatService {
  chatSession!: ChatSession;


  constructor() {

  }
  genAI = new GoogleGenerativeAI('AIzaSyBGQYRxEW5FJtRozHDqFwHHqd9Jm015iZs');

 model!: GenerativeModel

  async generateText(message: string) {
    this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
    const result = await this.model.generateContent(message);
    const response = await result.response;
    const text = response.text();
    console.log(text);
    return {
      message: text,
      agent: 'chatbot',
    };
  }
  async vision(message: string, file?: any) {
    // var  genAI = new GoogleGenerativeAI("AIzaSyBGQYRxEW5FJtRozHDqFwHHqd9Jm015iZs");
    console.log(file.base64);
    if(file.base64 != ""){
      const imageDataPart: InlineDataPart = {
        inlineData: {
          data: file.base64,
          mimeType: file.type,
        },
      };
      this.model = this.genAI.getGenerativeModel({ model: "gemini-pro-vision" })
      const result = await this.model.generateContent([message, imageDataPart]);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      return {
        message: text,
        agent: 'chatbot',
      };
    }
    else{
      this.model = this.genAI.getGenerativeModel({ model: 'gemini-pro' });
      const result = await this.model.generateContent(message);
      const response = await result.response;
      const text = response.text();
      console.log(text);
      return {
        message: text,
        agent: 'chatbot',
      };
    }
  
  }
}

// generateText(mes:string){}
