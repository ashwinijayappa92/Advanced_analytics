import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class GraphServiceService {

  public _initializeProjectView$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public _initializeProjectView = this._initializeProjectView$.asObservable(); // asObservable declarations for listening to the BehaviorSubject Property
  

  public _initializeFormulaTimePoint$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public _initializeFormulaTimePoint = this._initializeFormulaTimePoint$.asObservable(); // asObservable declarations for listening to the BehaviorSubject Property
  
  public _initializeFormulaData$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public _initializeFormulaData = this._initializeFormulaData$.asObservable(); 


  public _initializeTestingData$: BehaviorSubject<any> = new BehaviorSubject<any>('');
  public _initializeTestingData = this._initializeTestingData$.asObservable(); 
  
  
  constructor() { }
}
