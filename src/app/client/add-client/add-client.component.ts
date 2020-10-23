import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Store } from "@ngrx/store";

import * as clientActions from "../state/client.actions";
import * as fromClient from "../state/client.reducer";
import { Client } from "../client.model";

@Component({
  selector: 'app-add-client',
  templateUrl: './add-client.component.html',
  styleUrls: ['./add-client.component.sass']
})
export class AddClientComponent implements OnInit {
  clientForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private store: Store<fromClient.AppState>
  ) { }

  ngOnInit(): void {
    this.clientForm = this.fb.group({
      firstName: ["", Validators.required],
      lastName: ["", Validators.required],
      age: ["", Validators.required],
      birthdate: ["", Validators.required]

    });
  }

  createClient() {
    const newClient: Client = {
      firstName: this.clientForm.get("firstName").value,
      lastName: this.clientForm.get("lastName").value,
      age: this.clientForm.get("age").value,
      birthdate: this.clientForm.get("birthdate").value
    };

    this.store.dispatch(new clientActions.CreateClient(newClient));

    this.clientForm.reset();
  }

}
