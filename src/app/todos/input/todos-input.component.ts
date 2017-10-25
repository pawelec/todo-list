// angular
import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'todos-input',
    templateUrl: './todos-input.component.html',
    styleUrls: ['./todos-input.component.css']
})

export class TodosInputComponent implements OnInit {
    form: FormGroup;
    @Output() onInputSubmit = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) { }

    ngOnInit() {
        this.form = this.formBuilder.group({
            thingToDo: ['', Validators.required]
        });
    }

    onSubmit(): boolean {
        if (this.form.invalid) {
            return false;
        }

        this.onInputSubmit.emit(this.form.get('thingToDo').value);
        this.form.reset();
        return true;
    }
}