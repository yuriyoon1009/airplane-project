import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from './../environments/environment';
import { Airplane } from './airplanes';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // Bringprice 제공한 가상 서버 url 할당
  appUrl = environment.apiUrl;
  // airPlane 맴버 변수 : json 데이터 할당
  airPlanes: any;
  airPlaneTime: string;
  constructor(public http: HttpClient) {
     // 서버 url
     console.log(`[appUrl]`, this.appUrl);
  }
  // 시작할때 getAirplanes 함수 실행
  ngOnInit() {
   this.getAirplanes();
  }
  // 항공 데이터 불러오는 함수
  getAirplanes() {
    this.http.get<Airplane>(this.appUrl, { observe: 'response' })
      .subscribe(res => {
        // request 요청 성공하면
        // 서버가 브라우저의 요청에 대해 응답을 반환 (res)
        // HttpResponse {headers: HttpHeaders, status: 200, statusText: "OK", …}
        this.airPlanes = res.body;
        console.log(`[airPlanes]`, this.airPlanes);
      });
  }

  // 시간 쪼개는 함수
  sliceTime(duration: number) {
    const durationString = duration.toString();
    let hour = null;
    let min = null;
      if (durationString.length >= 4) {
       hour = durationString.slice(0, 2);
       min = durationString.slice(2);
       return `${hour}h ${min}m`;
      }
      hour = durationString.slice(0, 1);
      min = durationString.slice(1);
      return `${hour}h ${min}m`;
  }
  // distinguish direct or leftover
  countLeftOver(leftover: number) {
    if (leftover === 0) {
      return 'Direct';
    } return leftover;
  }
  // 1,000,000
  priceFormat(price: number) {
    const priceString = price.toString();
    const priceArr = [];
    // 공통
    priceArr.push(priceString.slice(-3));
    if (priceString.length >= 7) {
      priceArr.push(priceString.slice(-6, 4));
      priceArr.push(priceString.slice(0, 1));
    } else {
      priceArr.push(priceString.slice(0, 3));
    }
    return priceArr.reverse().join(',');
    // else priceString.length <= 6
    // 객체 불변성 지키지 못 함. 코드 재 수정
    // priceArr.concat(priceString.slice(-3));
  }

  // circle function
  countCircle(stops: Array<any>) {
    console.log(stops);
    let dynamicHtml = '';
    // 에러 : css circle 클래스 적용이 안 됨. <p class="circle"></p>
    // inline 방식
    stops.forEach((i) => {
      dynamicHtml += `<p style="width:30px; height:30px; border-radius:30px;
      background:red;">circle</p>`;
    });
    // getElementsByClassName는 유사 배열 객체 array-like
    const circleArr = document.getElementsByClassName('test');
    // 유사배열객체 > 배열로 전환 (convert)
    Array.prototype.forEach.call(circleArr, function(i, arr) {
      console.log(i);
      i.innerHTML = dynamicHtml;
    });
  }
}
