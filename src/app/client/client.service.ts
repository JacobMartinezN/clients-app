import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";

import { Observable } from "rxjs";

import { Client } from "./client.model";

@Injectable({
  providedIn: "root"
})
export class ClientService {
  private clientsUrl = "http://localhost:3000/clients";

  constructor(private http: HttpClient) {}

  getClients(): Observable<Client[]> {
    return this.http.get<Client[]>(this.clientsUrl);
  }

  createClient(payload: Client): Observable<Client> {
    return this.http.post<Client>(this.clientsUrl, payload);
  }
}