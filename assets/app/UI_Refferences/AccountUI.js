class AccountUI {
   #html_dom_purify = DOMPurify
   accounts_element_refference = {
      // input_call_connid: document.getElementById(""),
      // input_billing_account_number: document.getElementById(""),
      // input_customer_name: document.getElementById(""),
      input_amount_payable: document.getElementById("input-amount-payable"),
      input_overdue_balance: document.getElementById("input-overdue-balance"),
      input_upcoming_balance: document.getElementById("input-upcoming-balance")
   }


   set amount_payable(value) {
      const sanitized_value = this.#html_dom_purify.sanitize(value);
      this.accounts_element_refference.input_amount_payable.value = parseFloat(sanitized_value);
   }
   set overdue_balance(value) {
      const sanitized_value = this.#html_dom_purify.sanitize(value);
      this.accounts_element_refference.input_overdue_balance.value = parseFloat(sanitized_value);
   }

}



class AccountUITest {

   #account_refference = UIAccounts;
   
   constructor() {
      
      //this.#account_refference.input_overdue_balance = 50;
      this.test_accountui_value();
   }

   test_accountui_value() {
      this.#account_refference.amount_payable = 100;
      this.#account_refference.overdue_balance = 50

   }

}