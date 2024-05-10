import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  accounts: any[] = [];
  selectedAccount: any = {};

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.fetchAccounts();
  }

  fetchAccounts(): void {
    this.http.get<any[]>('http://localhost:3000/accounts').subscribe(accounts => {
      this.accounts = accounts;
    });
  }

  onSubmit(form: any) {
    if (form.valid) {
      if (this.selectedAccount._id) {
        this.http.put(`http://localhost:3000/accounts/${this.selectedAccount._id}`, this.selectedAccount)
          .subscribe(updatedAccount => {
            const index = this.accounts.findIndex(account => account._id === this.selectedAccount._id);
            if (index !== -1) {
              this.accounts[index] = updatedAccount;
            }
            form.resetForm();
          });
      } else {
        this.http.post('http://localhost:3000/accounts', this.selectedAccount)
          .subscribe(newAccount => {
            this.accounts.push(newAccount);
            form.resetForm();
          });
      }
    }
  }

  onEdit(account: any) {
    this.selectedAccount = { ...account };
  }
  

  onDelete(id: string, form: any) {
    if (confirm('Are you sure you want to delete this account?')) {
      this.http.delete(`http://localhost:3000/accounts/${id}`)
        .subscribe(() => {
          this.accounts = this.accounts.filter(account => account._id !== id);
          form.resetForm();
        });
    }
  }
  

  resetForm(form: any) {
    form.resetForm();
    this.selectedAccount = {};
  }
}
