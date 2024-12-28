class AccountUI {
   #html_dom = DOMPurify
   #accounts_element_refference = {
      input_call_connection_id: document.getElementById("input-call-connid"),
      input_billing_account_number: document.getElementById("input-billing-account-number"),
      input_authenticaton_type: document.getElementById("input-authentication-type"),
      input_customer_name: document.getElementById("input-customer-name"),
      input_amount_payable: document.getElementById("input-amount-payable"),
      input_upcoming_balance: document.getElementById("input-upcoming-balance"),
      input_overdue_balance: document.getElementById("input-overdue-balance")

   }

   constructor() {

   }

   set connection_id(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      this.#accounts_element_refference.input_call_connection_id.value = sanitized_value;
   }
   set billing_account_number(value){
      const sanitized_value = this.#html_dom.sanitize(value);
      this.#accounts_element_refference.input_billing_account_number.value = sanitized_value;
   }
   set authenticaton_type(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      this.#accounts_element_refference.input_authenticaton_type.value = sanitized_value;
   }
   set customer_name(value){
      const sanitized_value = this.#html_dom.sanitize(value);
      this.#accounts_element_refference.input_customer_name.value = sanitized_value;
   }
   set amount_payable(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parsed_value = parseFloat(sanitized_value);
      const final_value = isNaN(parsed_value) ? 0 : parsed_value;
      this.#accounts_element_refference.input_amount_payable.value = final_value;
   }
   set upcoming_balance(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parsed_value = parseFloat(sanitized_value);
      const final_value = isNaN(parsed_value) ? 0 : parsed_value;
      this.#accounts_element_refference.input_upcoming_balance.value = final_value;
  }
   set overdue_balance(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parsed_value = parseFloat(sanitized_value);
      const final_value = isNaN(parsed_value) ? 0 : parsed_value;
      this.#accounts_element_refference.input_overdue_balance.value = final_value;
   }


}



class AccountUITest {

   #account_refference = UIAccounts;
   
   constructor() {
      
      //this.#account_refference.input_overdue_balance = 50;
      this.test_accountui_value();
   }

   test_accountui_value() {
      this.#account_refference.connection_id = "123jndfae";
      this.#account_refference.authenticaton_type = "Interactive Voice Verification";
      this.#account_refference.billing_account_number = 12314253123;
      this.#account_refference.customer_name = "John Doe"
      this.#account_refference.amount_payable = 100;
      this.#account_refference.upcoming_balance = 0;
      this.#account_refference.overdue_balance = 50;
   }

}

