class RepaymentController {

   #UIAccount_Service = UIAccounts;
   #repayment_ui = UIRepayment;

   #trickle_unordered_list = this.#repayment_ui.ulist_trickle_repayment_result();
   #button_add_trickle_repayment = this.#repayment_ui.button_add_trickle_repayment();


   constructor(Repayment_View, Repayment_Model) {
      console.log("Repayment Controller Loaded.");
      this.Repayment_View = Repayment_View;
      this.Repayment_Model = Repayment_Model;


      this.add_trickle_calculation();
      this.remove_trickle_calculation();
   }

   add_trickle_calculation() {
      this.#button_add_trickle_repayment.addEventListener('click', () => {


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

         if (trickle_amount_payable <= 0) {
            console.warn("Unable to calculate. Trickle amount payable is already 0.");
            return;
         }

         this.#repayment_ui.trickle_amount_payable;
         this.#repayment_ui.trickle_overdue_balance;


         // Update Repayment_Model with the required values
         Object.assign(this.Repayment_Model, {
            trickle_amount_payable,
            trickle_overdue_balance,
            trickle_repayment_amount,
            trickle_repayment_date
         });

         // Perform the calculation
         const trickleResult = this.Repayment_Model.add_trickle_calculation();

         // Update the view with the calculation result
         this.Repayment_View.html_trickle_ulist_result(trickleResult);

         // Update UI with the new balance
         const { trickle_amount_payable: updated_amount_payable, trickle_overdue_balance: updated_overdue_balance } = this.Repayment_Model;
         Object.assign(this.#repayment_ui, {
            trickle_amount_payable: updated_amount_payable,
            trickle_overdue_balance: updated_overdue_balance
         });
      });
   }

   remove_trickle_calculation() {
      this.#trickle_unordered_list.addEventListener("click", (event) => {
         // Check if the clicked element is a delete input button
         if (event.target && event.target.classList.contains("delete-btn")) {

            //    // Get the data-id attribute from the clicked input
            //    const selectedDataId = event.target.getAttribute("data-trickle-info");
            //    //When deleted return the value to amount payable;
            //    // Log or use the selected data ID
            //    console.log(`Selected Data ID: ${selectedDataId}`);
            const trickle_repayment_data = event.target.getAttribute("data-trickle-info");
            console.log(trickle_repayment_data);
            const parsed_trickle_data = JSON.parse(trickle_repayment_data);
            
            let parsed_id = parseFloat(parsed_trickle_data.repayment_id);
            let parsed_amount = parseFloat(parsed_trickle_data.repayment_amount);
            console.log(parsed_id);
            console.log("Amount:", parsed_amount);

            //    // Optionally, remove the parent list item
            //    const listItem = event.target.closest(".list-group-item");
            //    if (listItem) {
            //       listItem.remove();
            //    }
         }
      });
   }


}

