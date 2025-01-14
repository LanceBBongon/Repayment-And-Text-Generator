class RepaymentController {

   #UIAccount_Service = UIAccounts;
   #repayment_ui = UIRepayment;

   #trickle_unordered_list = this.#repayment_ui.ulist_trickle_repayment_result();
   #button_trickle_repayment_result_to_clipboard = this.#repayment_ui
   #button_reset_trickle_repayment = this.#repayment_ui.button_reset_trickle_repayment();
   #button_add_trickle_repayment = this.#repayment_ui.button_add_trickle_repayment();
   #button_trickle_repayment_to_new_window = this.#repayment_ui.button_open_trickle_repayment_window();


   #button_trickle_repayment_to_clipboard = this.#repayment_ui.button_open_trickle_repayment_to_clipboard();
   #button_trickle_hardship_decline_to_clipboard = this.#repayment_ui.button_copy_trickle_repayment_hardship_result_to_clipboard();
  
   constructor(Repayment_View, Repayment_Model) {
      console.log("Repayment Controller Loaded.");
      this.Repayment_View = Repayment_View;
      this.Repayment_Model = Repayment_Model;
      this.trickle_repayment();
   }

   trickle_repayment() {
      this.reset_trickle_calculation();
      this.add_trickle_calculation();
      this.remove_trickle_calculation();
      this.trickle_repayment_result_to_new_window();
      this.trickle_repayment_result_to_clipboard();
      this.trickle_repayment_hardship_result_to_clipboard();
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

         if (this.trickle_repayment_amount === 0) {
            console.warn("Repayment amount cannot be zero.");
            return
         }
         //Get the variables from repayment ui.
         //Deconstruct the value.
         const {
            trickle_repayment_amount,
            trickle_amount_payable,
            trickle_overdue_balance,
            trickle_repayment_date,
            trickle_repayment_date_interval,
         } = this.#repayment_ui;

         console.log("Selected Interval:", trickle_repayment_date_interval)
         //Deconstruct 
         Object.assign(this.Repayment_Model, {
            trickle_amount_payable,
            trickle_overdue_balance,
            trickle_repayment_amount,
            trickle_repayment_date,
            trickle_repayment_date_interval
         });

         // Perform the calculation
         this.Repayment_Model.add_trickle_calculation();
         // Update the view with the calculation result
         // Update UI with the new balance
         const { trickle_amount_payable: updated_amount_payable, trickle_overdue_balance: updated_overdue_balance, trickle_repayment_date: update_repayment_date } = this.Repayment_Model;
         Object.assign(this.#repayment_ui, {
            trickle_amount_payable: updated_amount_payable,
            trickle_overdue_balance: updated_overdue_balance,
            trickle_repayment_date: update_repayment_date
         });
         this.Repayment_View.html_trickle_ulist_result(this.Repayment_Model.trickle_repayment_list);
      });
   }

   remove_trickle_calculation() {
      this.#trickle_unordered_list.addEventListener("click", (event) => {
         //Return $85 back to the balance.
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
   trickle_repayment_result_to_clipboard() {
      this.#button_trickle_repayment_to_clipboard.addEventListener('click', () => {
         console.log("Completed");
      });
   }
   trickle_repayment_hardship_result_to_clipboard() {
      this.#button_trickle_hardship_decline_to_clipboard.addEventListener('click', () => {
         console.log("Hardship Decline");
         
      });
   }
   trickle_repayment_result_to_new_window() {
      this.#button_trickle_repayment_to_new_window.addEventListener('click', () => {
         console.log("Open new window!");
         let repayment_data = this.Repayment_Model.trickle_repayment_list;
         this.Repayment_View.html_trickle_result_to_new_window(repayment_data);
      });
   }
}

