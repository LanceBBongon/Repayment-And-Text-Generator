class RepaymentView {
   constructor() {
      console.log("Repayment View Loaded.");

   }

}

class RepaymentController {

   #UIAccount_Service = UIAccounts;
   #repayment_ui = UIRepayment;

   constructor(Repayment_View, Repayment_Model) {

      console.log("Repayment Controller Loaded.");
      this.Repayment_View = Repayment_View;
      this.Repayment_Model = Repayment_Model;

      this.trickle_calculation();
   }

   trickle_calculation() {

      this.#repayment_ui.button_add_trickle_repayment().addEventListener('click', () => {
         });

      this.Repayment_Model.trickle_amount_payble = this.#repayment_ui.trickle_amount_payable;
      this.Repayment_Model.trickle_overdue_balance = this.#repayment_ui.trickle_overdue_balance;
      this.Repayment_Model.trickle_repayment_amount = this.#repayment_ui.trickle_repayment_amount;
      this.Repayment_Model.trickle_repayment_date = this.#repayment_ui.trickle_repayment_date;
      this.Repayment_Model.trickle_calculation();
   }
}

