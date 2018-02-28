// /**
//  * Created by stephen_dominic on 6/21/2017.
//  */
// import {async, TestBed} from "@angular/core/testing";
// import {AlertComponent} from "./alert.component";
// import {CUSTOM_ELEMENTS_SCHEMA} from "@angular/core";
// import {AlertService} from "../services/AlertService";
// import {HttpModule} from "@angular/http";
// import {AuthenticationService} from "../services/AuthenticationService";
// import {APP_BASE_HREF} from "@angular/common";
// import {RouterTestingModule} from "@angular/router/testing";
//
// describe('AlertComponent', () => {
//     beforeEach(() => {
//         TestBed.configureTestingModule({
//             imports: [RouterTestingModule],
//             schemas: [CUSTOM_ELEMENTS_SCHEMA],
//             declarations: [
//                 AlertComponent
//             ],
//             providers: [HttpModule, AuthenticationService, AlertService,
//                 {provide: APP_BASE_HREF, useValue: '/'}
//                 ],
//         });
//         TestBed.compileComponents();
//     });
//
//     it('should create the AlertComponent', async(() => {
//         const fixture = TestBed.createComponent(AlertComponent);
//         const app = fixture.debugElement.componentInstance;
//         expect(app).toBeTruthy();
//     }));
// });
