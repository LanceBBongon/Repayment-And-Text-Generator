class RepaymentController {

   #UIAccount_Service = UIAccounts;
   #repayment_ui = UIRepayment;

   constructor(Repayment_View, Repayment_Model) {

      console.log("Repayment Controller Loaded.");
      this.Repayment_View = Repayment_View;
      this.Repayment_Model = Repayment_Model;

      this.add_trickle_calculation();
      this.remove_trickle_calculation();
   }

   add_trickle_calculation() {
      this.#repayment_ui.button_add_trickle_repayment().addEventListener('click', () => {
         //Get the value needed for trickle calculation.
         this.Repayment_Model.trickle_amount_payable = this.#repayment_ui.trickle_amount_payable;
         this.Repayment_Model.trickle_overdue_balance = this.#repayment_ui.trickle_overdue_balance;
         this.Repayment_Model.trickle_repayment_amount = this.#repayment_ui.trickle_repayment_amount;
         this.Repayment_Model.trickle_repayment_date = this.#repayment_ui.trickle_repayment_date;
         //Commit to calculation.
         this.Repayment_Model.add_trickle_calculation();
         //Update the balance
         this.#repayment_ui.trickle_amount_payable = this.Repayment_Model.trickle_amount_payable;
         this.#repayment_ui.trickle_overdue_balance =  this.Repayment_Model.trickle_overdue_balance;
         


      });
   }

   remove_trickle_calculation() {
      this.#repayment_ui.button_remove_trickle_repayment().addEventListener("click", (event) => {
         // Check if the clicked element is a delete input button
         if (event.target && event.target.classList.contains("delete-btn")) {
           // Get the data-id attribute from the clicked input
           const selectedDataId = event.target.getAttribute("data-id");
       
           // Log or use the selected data ID
           console.log(`Selected Data ID: ${selectedDataId}`);
       
           // Optionally, remove the parent list item
           const listItem = event.target.closest(".list-group-item");
           if (listItem) {
             listItem.remove();
           }
         }
       });
   }
}

