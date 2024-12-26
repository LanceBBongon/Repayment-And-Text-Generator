class RepaymentUI {

   //Keep this as private field to prevent accidents
   #html_dom = DOMPurify

   repayment_element_refference = {
      input_repayment_balance: document.getElementById("input-repayment-balance"),
      input_repayment_starting_date: document.getElementById("input-repayment-starting-date"),
      input_copy_amount_payable_result: document.getElementById("input-copy-amount-payable-repayment-result"),
      input_copy_overdue_balance_result: document.getElementById("input-copy-overdue-balance-repayment-result"),

      input_trickle_amount_payable: document.getElementById("input-reproduced-trickle-amount-payable"),
      input_tricke_overdue_balance: document.getElementById("input-reproduced-trickle-overdue-balance"),

      select_payment_extension_type: document.getElementById("select-payment-extension-type"),
      select_repayment_date_interval:  document.getElementById("select-repayment-date-interval"),

      ulist_amount_payable: document.getElementById("ulist-amount-payable-result"),
      ulist_overdue_balance: document.getElementById("ulist-overdue-balance-result"),

      div_repayment: document.getElementById("divID-repayment"),
      div_repayment_control: document.getElementById("divID-repayment-control"),
      div_trickle_control: document.getElementById("divID-trickle-control"),

      label_repayment_balance: document.getElementById("label-repayment-balance"),
   }

   div_repayment = () => this.repayment_element_refference.div_repayment;
   div_repayment_control = () =>this.repayment_element_refference.div_repayment_control;
   dive_trickle_control = () => this.repayment_element_refference.div_trickle_control;

   constructor() {
      console.log("Repayment UI Loaded");
   }

   set trickle_amount_payable(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parsed_value =  parseFloat(sanitized_value);
      this.repayment_element_refference.input_trickle_amount_payable.value = parsed_value;
   }
   set trickle_overdue_balance(values) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parsed_value =  parseFloat(sanitized_value);
      this.repayment_element_refference.input_tricke_overdue_balance.value = parsed_value;
   }

   //setters
   set repayment_balance(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parsed_value =  parseFloat(sanitized_value)
      this.repayment_element_refference.input_repayment_balance.value = parsed_value
   }

   set repayment_starting_date(value) {
      const sanitized_value = this.#html_dom.sanitize(value);
      const parse_date = AU_EST_Time(sanitized_value);
      this.repayment_element_refference.input_repayment_starting_date.valueAsDate = parse_date
   }

   get repayment_balance() {
      const sanitized_value = this.#html_dom.sanitize(this.repayment_element_refference.repayment_balance);
      const parsed_value = parseFloat(sanitized_value);
      return parsed_value;
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
   }

   init_user_interface_repayment_test() {
    
   }

   test_set_values() {
      this.#repayment_ui.repayment_balance = 100;
      this.#repayment_ui.repayment_starting_date = "24/12/2024";
   }

   test_get_values() {

   }
   
}