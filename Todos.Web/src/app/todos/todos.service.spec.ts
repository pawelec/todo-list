import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { TodosService } from "./todos.service";
import { Item } from "./models/item";

describe('Todos Service', () => {
    let service: TodosService;
    let httpMock: HttpTestingController;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                HttpClientTestingModule
            ],
            providers: [
                TodosService
            ]
        });

        service = TestBed.get(TodosService);
        httpMock = TestBed.get(HttpTestingController);
    });

    afterEach(inject([HttpTestingController], (httpMock: HttpTestingController) => {
        httpMock.verify();
    }));

    it('should create service', () => expect(service).toBeDefined());

    it('get - return array of todos',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            const mockResponse = [
                {
                    id: 1,
                    name: 'Test1',
                    isDone: false,
                    created: new Date()
                }
            ];

            service.get().subscribe(
                data => {
                    expect(data.length).toBe(1);
                    expect(data[0].name).toBe("Test1");
                }
            );

            const req = httpMock.expectOne('/api/todos');
            expect(req.request.method).toEqual('GET');

            req.flush(mockResponse);
        }));

    it('get - should throw with an error message when API returns an error',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            service.get()
                .catch(actualError => {
                    expect(Observable.of(actualError)).toBeTruthy();
                    expect(actualError).toBeTruthy();
                    return Observable.of(actualError);
                })
                .subscribe();

            const req = httpMock.expectOne('/api/todos');
            expect(req.request.method).toEqual('GET');

            req.flush({ errorMessage: 'Uh oh!' }, { status: 500, statusText: 'Server Error' });
        }));

    it('markAsDone - should return false when API returns false',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            let number: 0;

            service.markAsDone(number).subscribe(data => expect(data).toBe('false'));

            const req = httpMock.expectOne('/api/todos/' + number);
            expect(req.request.method).toEqual('PUT');

            req.flush(false.toString());
        }));

    it('markAsDone - should return true when API returns true',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            let number: 0;

            service.markAsDone(number).subscribe(data => expect(<boolean>data).toBeTruthy());

            const req = httpMock.expectOne('/api/todos/' + number);
            expect(req.request.method).toEqual('PUT');

            req.flush(true.toString());
        }));

    it('markAsDone - should throw with an error message when API returns an error',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            service.markAsDone(0)
                .catch(actualError => {
                    expect(Observable.of(actualError)).toBeTruthy();
                    expect(actualError).toBeTruthy();
                    return Observable.of(actualError);
                })
                .subscribe();

            const req = httpMock.expectOne('/api/todos/' + 0);
            expect(req.request.method).toEqual('PUT');

            req.flush({ errorMessage: 'Uh oh!' }, { status: 500, statusText: 'Server Error' });
        }));

    it('add - should return null if name is undefined',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            let name = undefined;

            expect(service.add(name)).toBeNull();
        }));

    it('add - should return null if name is null',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            let name = null;

            expect(service.add(name)).toBeNull();
        }));

    it('add - should item when created - 201 response code',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            let item: Item = {
                name: "Test",
                id: 0,
                isDone: false,
                created: new Date()
            };

            service.add(item.name).subscribe(data => {
                expect(data.name).toBe(item.name);
                expect(data.isDone).toBeFalsy();
            });

            const req = httpMock.expectOne('/api/todos');
            expect(req.request.method).toEqual('POST');

            req.flush(item);

        }));

    it('add -  should throw with an error message when API returns an error',
        inject([HttpClient, HttpTestingController], (http: HttpClient, httpMock: HttpTestingController) => {
            service.add(" ")
                .catch(actualError => {
                    expect(Observable.of(actualError)).toBeTruthy();
                    expect(actualError).toBeTruthy();
                    return Observable.of(actualError);
                })
                .subscribe();

            const req = httpMock.expectOne('/api/todos');
            expect(req.request.method).toEqual('POST');

            req.flush({ errorMessage: 'Uh oh!' }, { status: 500, statusText: 'Server Error' });
        }));
});