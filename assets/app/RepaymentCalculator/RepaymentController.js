class RepaymentController {

   #UIAccount_Service = UIAccounts;
   #repayment_ui = UIRepayment;

   #trickle_unordered_list = this.#repayment_ui.ulist_trickle_repayment_result();
   #button_reset_trickle_repayment = this.#repayment_ui.button_reset_trickle_repayment();
   #button_add_trickle_repayment = this.#repayment_ui.button_add_trickle_repayment();


   constructor(Repayment_View, Repayment_Model) {
      console.log("Repayment Controller Loaded.");
      this.Repayment_View = Repayment_View;
      this.Repayment_Model = Repayment_Model;

      this.reset_trickle_calculation();
      this.add_trickle_calculation();
      this.remove_trickle_calculation();
   }

   reset_trickle_calculation() {
      this.#button_reset_trickle_repayment.addEventListener('click', () => {
         console.log("Value is reset!");
         this.Repayment_Model.trickle_original_amount_payable = this.#repayment_ui.trickle_amount_payable;
         this.Repayment_Model.trickle_original_overdue_balance = this.#repayment_ui.trickle_overdue_balance;
         this.Repayment_Model.trickle_repayment_list = [];
      });
   }



   add_trickle_calculation() {
      this.#button_add_trickle_repayment.addEventListener('click', () => {
         // if (this.trickle_repayment_amount > this.trickle_amount_payable) {
         //    console.warn("The repayment amount exceeds the trickle amount payable");
         //    if (this.trickle_amount_payable !== 0){
         //       this.Repayment_Model.trickle_repayment_amount = this.trickle_amount_payable;
         //       this.Repayment_Model.trickle_repayment
         //    }   

         //    return;
         // }

         //Getting the variables needed in repayment_ui
         const {
            trickle_repayment_amount,
            trickle_amount_payable,
            trickle_overdue_balance,
            trickle_repayment_date
         } = this.#repayment_ui;

         if (trickle_repayment_amount <= 0) {
            console.warn("Your repayment amount cannot be 0");
            return;
         }

         // Update Repayment_Model with the required values
         Object.assign(this.Repayment_Model, {
            trickle_amount_payable,
            trickle_overdue_balance,
            trickle_repayment_amount,
            trickle_repayment_date
         });
         // Perform the calculation
         this.Repayment_Model.add_trickle_calculation();
         // Update the view with the calculation result

         // Update UI with the new balance
         const { trickle_amount_payable: updated_amount_payable, trickle_overdue_balance: updated_overdue_balance } = this.Repayment_Model;
         Object.assign(this.#repayment_ui, {
            trickle_amount_payable: updated_amount_payable,
            trickle_overdue_balance: updated_overdue_balance
         });

         this.Repayment_View.html_trickle_ulist_result(this.Repayment_Model.trickle_repayment_list);
      });
   }

   remove_trickle_calculation() {
      this.#trickle_unordered_list.addEventListener("click", (event) => {
         //Return $85 back to the balance 
         //The remainder should be $5.


         if (event.target && event.target.classList.contains("delete-btn")) {

            this.Repayment_Model.trickle_amount_payable = this.#repayment_ui.trickle_amount_payable;
            this.Repayment_Model.trickle_overdue_balance = this.#repayment_ui.trickle_overdue_balance;
            // Get the data-id attribute from the clicked input
            const trickle_repayment_data = event.target.getAttribute("data-trickle-info");
            //When deleted return the value to amount payable;
            //Log or use the selected data ID
            // console.log(`Selected Data ID: ${trickle_repayment_data}`);

            // console.log(trickle_repayment_data);
            const parsed_trickle_data = JSON.parse(trickle_repayment_data);

            let parsed_repayment_id = parseFloat(parsed_trickle_data.repayment_id);
            let parsed_repayment_amount = parseFloat(parsed_trickle_data.repayment_amount);

            this.Repayment_Model.remove_trickle_calculation(parsed_repayment_id,
               parsed_repayment_amount);

            this.#repayment_ui.trickle_amount_payable = this.Repayment_Model.trickle_amount_payable;
            this.#repayment_ui.trickle_overdue_balance = this.Repayment_Model.trickle_overdue_balance;
            // Optionally, remove the parent list item
            const listItem = event.target.closest(".list-group-item");
            if (listItem) {
               listItem.remove();
            }
         }
            this.Repayment_View.html_trickle_ulist_result(this.Repayment_Model.trickle_repayment_list);
      });
   }
}

