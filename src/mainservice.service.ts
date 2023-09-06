import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, catchError, map, tap, throwError } from 'rxjs';
import { environment } from './environment';
import { Login } from './app/Cart/login/login';


import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class MainserviceService {

  rootApiUrl = environment.apiRoot;
  url2 = environment.url2;
  login = environment.loginreq;
  saveTypeUrl = environment.saveTypeUrl;
  menugetUrl = environment.menugetUrl;
  menueditUrl = environment.menueditUrl;
  getabout = environment.getabout;
  updateUrl = environment.updateUrl;
  updateabout = environment.updateabout;
  getTypeNames = environment.getTypeNames;
  menuurl1 = environment.menuurl1;
  menuapiUrl = environment.menuapiUrl;
  editDetailsurl2 = environment.editDetailsurl2;
  editDetailsurl3 = environment.editDetailsurl3;
  saveImageUrl=environment.saveImageUrl;

  Tableurl = environment.Tableurl;
  Tableurl1 = environment.Tableurl1
  TableDeleteUrl = environment;

  viewsaveTypeUrl = environment.viewsaveTypeUrl;
  viewgetUrl = environment.viewgetUrl;
  vieweditUrl = environment.vieweditUrl;
  viewgetabout = environment.viewgetabout;
  viewupdateUrl = environment.viewupdateUrl;
  viewupdateabput = environment.viewupdateabput;
  viewgetTypeNames = environment.viewgetTypeNames;
  viewurl1 = environment.viewapiUrl;
  viewapiUrl = environment.viewapiUrl;



  private typeId!: string;
  private updatedItemId!: string;
  getItem: any;


  private viewtypeId!: string;
  private viewupdatedItemId!: string;
  viewgetItem: any;

  // private businessIdSource = new BehaviorSubject<string | null>();
  // currentBusinessId = this.businessIdSource.asObservable();


  private businessIdSource: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);
currentBusinessId = this.businessIdSource.asObservable();

constructor(private router: Router, private http: HttpClient) {
    // Extract ID from the initial URL
    const initialId = this.extractIdFromUrl(window.location.href);
    this.businessIdSource.next(initialId);

    // Listen to router events
    this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)
    ).subscribe(event => {
        const navEvent = event as NavigationEnd;
        const newId = this.extractIdFromUrl(navEvent.urlAfterRedirects);
        this.businessIdSource.next(newId);
    });
}

private extractIdFromUrl(url: string): string | null {
    const segments = url.split('/');
    return segments[segments.length - 1].toUpperCase();
}

// ...

setBusinessId(id: string): void {
    this.businessIdSource.next(id);
}



  saveimage(typeData: any, itemid: number): Observable<any> {
    return this.http.post<any>(`${this.saveImageUrl}${itemid}`, typeData);
  }

  public getSomeData(): Observable<any> {
    const apiUrl = `${this.rootApiUrl}/endpoint`; // Replace 'endpoint' with your actual API endpoint
    return this.http.get<any>(apiUrl);
  }
  ////////////////card conponents///////////////////////////////
  public countData(): Observable<number> {
    return this.http.get<number>(`${this.url2}`);

  }
  //////////////////////////////login////////////////////////////


  saveLogin(login: Login): Observable<string> {
    return this.http.post<any>(this.login, login).pipe(
      map((response: any) => {
        const token = response.token;

        // Store the token in local storage or any other appropriate location
        localStorage.setItem('token', token);

        // Get the expiration time from the token
        const expirationTime = this.getExpirationTimeFromToken(token);

        // Calculate the remaining time before expiration
        const currentTime = Date.now();
        const remainingTime = expirationTime - currentTime;

        // Set a timeout to prompt the user to re-login when the token expires
        setTimeout(() => {
          this.clearTokenAndPromptLogin();
        }, remainingTime);

        return token;
      }),
      catchError((error: HttpErrorResponse) => {
        // Handle login error
        if (error.status === 401) {
          return throwError('Invalid credentials. Please try again.');
        } else {
          return throwError('An error occurred. Please try again later.');
        }
      })
    );
  }

  private getExpirationTimeFromToken(token: string): number {
    const jwtData = token.split('.')[1];
    const decodedJwtJsonData = window.atob(jwtData);
    const decodedJwtData = JSON.parse(decodedJwtJsonData);
    const expirationTime = decodedJwtData.exp * 1000; // Convert seconds to milliseconds
    return expirationTime;
  }

  private clearTokenAndPromptLogin() {
    localStorage.removeItem('token');
    // Prompt the user to re-login or perform any other necessary actions
  }
  private getToken(): string | null {
    return localStorage.getItem('token');
  }

  private getHeaders(): HttpHeaders {
    const token = this.getToken();
    return new HttpHeaders().set('Authorization', `Bearer ${token}`);
  }

  getProtectedData(): Observable<any> {
    const headers = this.getHeaders();
    return this.http.get<any>('${this.rootApiUrl}/my/protected-data', { headers }).pipe(

      catchError((error: HttpErrorResponse) => {
        // Handle error
        if (error.status === 401) {
          // Clear the token if unauthorized
          this.clearTokenAndPromptLogin();
        }
        return throwError('An error occurred. Please try again later.');
      })
    );
  }

  /////////////////////////////////////menu services /////////////////////////////////////////




  getimageforbackend(itemid: number): Observable<any> {
    return this.http.get<any>(`${this.menuapiUrl}${itemid}`);
  }

  getDataFromBackend(businessId: string): Observable<any> {
    const url = `${this.menugetUrl}${businessId}`;
    return this.http.get(url).pipe(
      tap(data => {
        console.log('service data:', data);
      }),
      catchError(error => {
        console.error('Error fetching data:', error);
        return throwError(error);
      })
    );
  }



  saveType(typeData: any, businessId: string): Observable<any> {
    return this.http.post<any>(`${this.saveTypeUrl}${businessId}`, typeData);
  }
  getType(businessId: string): Observable<any> {
    return this.http.get<any>(`${this.getTypeNames}${businessId}`);
  }

  deleteItem(itemId: string): Observable<any> {
    return this.http.delete(`${this.rootApiUrl}/my/delete/${itemId}`);
  }

  deleteimage(id: number): Observable<any> {

    return this.http.delete(`${this.rootApiUrl}/api/view/${id}`);
  }

  deletetype(typeid: String): Observable<any> {

    return this.http.delete(`${this.rootApiUrl}/my/${typeid}`)
  }


  editData1(typeid: string): Observable<any> {
    return this.http.get<any>(`${this.menuurl1}${typeid}`);
  }


  updateItem(item: any): Observable<any> {
    const updateUrl = `${this.rootApiUrl}/my/updateitem/${item.itemId}`;
    return this.http.put(updateUrl, item);
  }



  getAbout(businessId: string): Observable<any> {
    return this.http.get<any>(`${this.getabout}${businessId}`);
  }

  setTypeId(typeId: string) {
    this.typeId = typeId;
  }

  saveItems(items: any): Observable<any> {
    return this.http.post<any>(
      `${this.rootApiUrl}/my/saving/${this.typeId}`,
      items
    );
  }


  saveItems1(items: any): Observable<any> {
    return this.http.post<any>(
      `${this.rootApiUrl}/api/view/save/1`,
      items
    );
  }





  setItemId(itemId: any) {
    this.updatedItemId = itemId;
  }
  editImage(item: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8085/my/updateitem/${this.updatedItemId}`,
      item
    );
  }


  editItemGet(id: number): Observable<any> {
    return this.http.get<any>(`${this.menueditUrl}${id}`);
  }

  updateBusinessData(data: any, businessId: string): Observable<any> {
    if (!businessId) {
      throw new Error('Invalid businessId');
    }
    const url = `${this.viewupdateabput}${businessId}`; // Removed the trailing slash
    return this.http.put(url, data);
  }
  

  /////////////////////edit Deatils services ///////////////////////////////////////

  updateDetails(businessId: string, formData: any): Observable<any> {
    return this.http.put<any>(`${this.editDetailsurl2}/${businessId}`, formData);
  }

  updateDetails1(typeid: number, formData: any): Observable<any> {
    return this.http.put<any>(`${this.editDetailsurl3}/${typeid}`, formData);
  }


  /////////////////////////regist /////////////////////////

  saveRegistration(registration: FormData): Observable<any> {
    return this.http.post<any>(
      'http://localhost:8085/my/save',
      registration
    );
  }


  /////////////////////table services//////////////////////////////////
  getData(): Observable<any> {
    return this.http.get<any>(`${this.Tableurl}`);
  }

  editData(businessId: string): Observable<any> {
    return this.http.get<any>(`${this.Tableurl1}${businessId}`);
  }
  Delete(businessId: string): Observable<any> {
    return this.http.delete<any>(`${this.TableDeleteUrl}${businessId}`);
  }

  //////////////////////////////////////////////views/////////////////////////////////////////



  getviewimageforbackend(itemid: number): Observable<any> {
    return this.http.get<any>(`${this.viewapiUrl}${itemid}`);
  }

  getviewDataFromBackend(businessId: string): Observable<any> {
    const url = `${this.viewgetUrl}${businessId}`;
    let data = this.http.get(url);
    console.log('service data implmented  ' + data);
    return this.http.get(url);
  }

  saveviewType(typeData: any, businessId: string): Observable<any> {
    return this.http.post<any>(`${this.saveTypeUrl}${businessId}`, typeData);
  }
  getviewType(businessId: string): Observable<any> {
    return this.http.get<any>(`${this.getTypeNames}${businessId}`);
  }

  deleteviewItem(itemId: string): Observable<any> {
    return this.http.delete(`http://localhost:8085/my/delete/${itemId}`);
  }

  deletetviewype(typeid: String): Observable<any> {

    return this.http.delete(`http://localhost:8085/my/${typeid}`)
  }


  editviewData1(typeid: string): Observable<any> {
    return this.http.get<any>(`${this.viewurl1}${typeid}`);
  }


  updateviewItem(item: any): Observable<any> {
    const updateUrl = `http://localhost:8085/my/updateitem/${item.itemId}`;
    return this.http.put(updateUrl, item);
  }

  getviewAbout(businessId: string): Observable<any> {
    return this.http.get<any>(`${this.getabout}${businessId}`);
  }

  setviewTypeId(typeId: string) {
    this.typeId = typeId;
  }

  saveviewItems(items: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8085/my/saving/${this.typeId}`,
      items
    );
  }


  saveviewItems1(items: any): Observable<any> {
    return this.http.post<any>(
      `http://localhost:8085/api/view/save/1`,
      items
    );
  }


  setviewItemId(itemId: any) {
    this.updatedItemId = itemId;
  }
  editviewImage(item: any): Observable<any> {
    return this.http.put<any>(
      `http://localhost:8085/my/updateitem/${this.updatedItemId}`,
      item
    );
  }

  editviewItemGet(id: number): Observable<any> {
    return this.http.get<any>(`${this.vieweditUrl}${id}`);
  }

  updateViewBusinessData(data: any, businessId: string): Observable<any> {
    console.log('iam service line 97' + data, businessId);
    return this.http.put(`${this.updateabout}${businessId}`, data);
  }

}
