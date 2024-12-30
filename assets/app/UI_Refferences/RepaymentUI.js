class RepaymentUI {

   //Keep this as private field to prevent accidents
   #html_dom = DOMPurify

   #repayment_element_reference = {

      input_repayment_balance: document.getElementById("input-repayment-balance"),
      input_repayment_starting_date: document.getElementById("input-repayment-starting-date"),
      select_repayment_date_interval: document.getElementById("select-repayment-date-interval"),

      input_copy_amount_payable_result: document.getElementById("input-copy-amount-payable-repayment-result"),
      input_copy_overdue_balance_result: document.getElementById("input-copy-overdue-balance-repayment-result"),
      input_trickle_amount_payable: document.getElementById("input-reproduced-trickle-amount-payable"),
      input_trickle_overdue_balance: document.getElementById("input-reproduced-trickle-overdue-balance"),
      input_trickle_repayment_amount: document.getElementById("input-trickle-repayment-amount"),
      input_trickle_repayment_date: document.getElementById("input-trickle-repayment-date"),
      input_button_add_trickle_repayment: document.getElementById("input-button-add-trickle-repayment"),
    

      select_trickle_repayment_interval: document.getElementById("select-trickle-date-interval"),

      select_payment_extension_type: document.getElementById("select-payment-extension-type"),

      ulist_amount_payable: document.getElementById("ulist-amount-payable-result"),
      ulist_overdue_balance: document.getElementById("ulist-overdue-balance-result"),
      ulist_trickle_balance_result: document.getElementById("ulist-trickle-calculation-result"),


      div_repayment_control: document.getElementById("divID-repayment-control"),
      div_trickle_control: document.getElementById("divID-trickle-control"),

      label_repayment_balance: document.getElementById("label-repayment-balance"),
   }

   ulist_trickle_repayment_result() {
      return this.#repayment_element_reference.ulist_trickle_balance_result;
   }

   button_add_trickle_repayment() {
      // console.log("We got a button!");
      // console.log(this.#repayment_element_reference.input_button_add_trickle_repayment);
      return this.#repayment_element_reference.input_button_add_trickle_repayment;
   }

   

   div_repayment = () => this.#repayment_element_reference.div_repayment;
   div_repayment_control = () => this.#repayment_element_reference.div_repayment_control;
   div_trickle_control = () => this.#repayment_element_reference.div_trickle_control;

   constructor() {
      console.log("Repayment UI Loaded");
   }
   set payment_extension_type(value) {

   }
   set repayment_balance(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parsed_value = parseFloat(sanitized_value);
      const final_value = isNaN(parsed_value) ? 0 : parsed_value;
      this.#repayment_element_reference.input_repayment_balance.value = final_value;
   }
   set repayment_date_interval(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      this.#repayment_element_reference.select_repayment_date_interval.value = sanitized_value
   }
   set repayment_starting_date(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parse_date = AU_EST_Time(sanitized_value);
      this.#repayment_element_reference.input_repayment_starting_date.valueAsDate = parse_date
   }
   set trickle_amount_payable(value) {
      console.log("Updating html:", value);
      const sanitized_value = this.#html_dom.sanitize(value);
      const parsed_value = parseFloat(sanitized_value);
      const final_value = isNaN(parsed_value) ? 0 : parsed_value;
      this.#repayment_element_reference.input_trickle_amount_payable.value = final_value;
   }
   set trickle_overdue_balance(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parsed_value = parseFloat(sanitized_value);
      const final_value = isNaN(parsed_value) ? 0 : parsed_value;
      this.#repayment_element_reference.input_trickle_overdue_balance.value = final_value;
   }
   set trickle_repayment_amount(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parsed_value = parseFloat(sanitized_value);
      const final_value = isNaN(parsed_value) ? 0 : parsed_value;
      this.#repayment_element_reference.input_trickle_repayment_amount.value = final_value;
   }
   set trickle_repayment_starting_date(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parsed_value = parseFloat(sanitized_value);
      const final_value = isNaN(parsed_value) ? 0 : parsed_value;
      this.#repayment_element_reference.input_repayment_starting_date.value = final_value;
   }
   set trickle_repayment_date(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parse_date = AU_EST_Time(sanitized_value);
      this.#repayment_element_reference.input_trickle_repayment_date.valueAsDate = parse_date
   }
   set trickle_repayment_interval(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      this.#repayment_element_reference.select_trickle_repayment_interval.value = sanitized_value;
   }


   get repayment_balance() {
      const sanitized_value = this.#html_dom.sanitize(this.#repayment_element_reference.input_repayment_balance.value)
      const parsed_value = parseFloat(sanitized_value);
      const final_value = isNaN(parsed_value) ? 0 : parsed_value;
      return final_value
   }
   get repayment_starting_date() {
      const sanitized_value = this.#html_dom.sanitize(this.#repayment_element_reference.input_repayment_starting_date.value);
      const parsed_date = new Date(sanitized_value);
      return parsed_date;
   }
   get repayment_date_interval() {
      return this.#html_dom.sanitize(this.#repayment_element_reference.select_repayment_date_interval.value);
   }
   //Trickle 
   get trickle_amount_payable() {
      return this.#html_dom.sanitize(this.#repayment_element_reference.input_trickle_amount_payable.value);
   }
   get trickle_overdue_balance() {
      return this.#html_dom.sanitize(this.#repayment_element_reference.input_trickle_overdue_balance.value);
   }
   get trickle_repayment_amount() {
      return this.#html_dom.sanitize(this.#repayment_element_reference.input_trickle_repayment_amount.value);
   }
   get trickle_repayment_date() {
      const sanitize_value = this.#html_dom.sanitize(this.#repayment_element_reference.input_trickle_repayment_date.value);
      const parsed_date = AU_EST_Time(sanitize_value);
      return parsed_date
   }
}

class RepaymentUITest {

   #repayment_ui = UIRepayment;
   #repayment_element = this.#repayment_ui.repayment_element;

   constructor() {

      //Test setters.
      //Test if the input exist in the first place.
      // console.log(this.#repayment_element.input_repayment_balance);
      // console.log(this.#repayment_element.input_repayment_starting_date.value);
      // console.log(this.#repayment_element.select_payment_extension_type);
      // console.log(this.#repayment_element.select_repayment_date_interval);
      // console.log(this.#repayment_element.input_copy_overdue_balance_result);
      // console.log(this.#repayment_element.input_copy_amount_payable_result);

      // console.log(this.#repayment_element.ulist_amount_payable);
      // console.log(this.#repayment_element.ulist_overdue_balance);
      //Testing how to set value.
      console.log("UI Repayment Test Loaded!");
      this.init_user_interface_repayment_test();
      this.test_set_values();
      this.test_get_values();
   }

   init_user_interface_repayment_test() {

   }

   #repayment_balance = 100;
   #repayment_starting_date = "24/12/2024";
   #repayment_date_interval = "fortnightly";
   #trickle_amount_payable = 75
   #trickle_overdue_balance = 0;
   #trickle_repayment_amount = 25;
   #trickle_repayment_date = "23/12/2024";
   #trickle_repayment_interval = "fortnightly"

   test_set_values() {
      this.#repayment_ui.repayment_balance = this.#repayment_balance;
      this.#repayment_ui.repayment_starting_date = this.#repayment_starting_date;
      this.#repayment_ui.repayment_date_interval = this.#repayment_date_interval;
      this.#repayment_ui.trickle_amount_payable = this.#trickle_amount_payable;
      this.#repayment_ui.trickle_overdue_balance = this.#trickle_overdue_balance;
      this.#repayment_ui.trickle_repayment_amount = this.#trickle_repayment_amount;
      this.#repayment_ui.trickle_repayment_date = this.#trickle_repayment_date;
      this.#repayment_ui.trickle_repayment_interval = this.#trickle_repayment_interval;
   }

   test_get_values() {
      if (this.#repayment_ui.repayment_balance === this.#repayment_balance) {
         console.log(this.#repayment_ui.repayment_balance);
      }
      console.log(this.#repayment_ui.repayment_starting_date);
      console.log(this.#repayment_ui.repayment_date_interval)
      console.log(this.#repayment_ui.trickle_amount_payable);
   }

}