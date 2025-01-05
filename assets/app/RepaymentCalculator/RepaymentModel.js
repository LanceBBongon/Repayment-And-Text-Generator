class RepaymentModel {

   trickle_payment_count = 1;
   trickle_amount_payable;
   trickle_overdue_balance;

   trickle_original_amount_payable;
   trickle_original_overdue_balance;

   trickle_repayment_amount;
   trickle_repayment_date;
   trickle_repayment_list = [];


   constructor() {
      console.log("Repayment Model Loaded.");
   }

   //To-do: The calculation needs to advance the date.
   reset_trickle_calculation() {

   }

   add_trickle_calculation() {
      let repayment_details = null;
      let total_amount = this.trickle_amount_payable + this.trickle_repayment_amount;

      if (this.trickle_amount_payable <= 0) {
         console.warn("Unable to add a new item to the list. The amount payable is zero");
         return;
      }

      //Add value to the array.
      // Increment payment count if there are existing repayments
      if (this.trickle_repayment_list.length > 0) {
         this.trickle_payment_count++;
      }

      if (this.trickle_repayment_amount >= total_amount) {
         repayment_details = {
            repayment_id: this.trickle_payment_count,
            repayment_amount: total_amount,
            repayment_date: formatDate(this.trickle_repayment_date)
         };
         this.trickle_amount_payable = 0;
         this.trickle_overdue_balance = 0
      }

      if (this.trickle_repayment_amount >= this.trickle_amount_payable && this.trickle_overdue_balance <= 0) {
         repayment_details = {
            repayment_id: this.trickle_payment_count,
            repayment_amount: Math.min(this.trickle_amount_payable, this.trickle_amount_payable),
            repayment_date: formatDate(this.trickle_repayment_date)
         };
         this.trickle_amount_payable = 0;
      } else {
         repayment_details = {
            repayment_id: this.trickle_payment_count,
            repayment_amount: Math.min(this.trickle_repayment_amount, this.trickle_amount_payable),
            repayment_date: formatDate(this.trickle_repayment_date)
         };
      }

      this.trickle_repayment_list.push(repayment_details);
      // Check if repayment amount exceeds the amount payable.
      // Adjust overdue balance and payable amount
      if (this.trickle_overdue_balance >= this.trickle_repayment_amount) {
         console.log("Caluculating overdue balance");
         this.trickle_overdue_balance -= this.trickle_repayment_amount;
      } else {
         console.log("Calculating amount payable.")
         const remainder = this.trickle_repayment_amount - this.trickle_overdue_balance;

         if (this.trickle_repayment_amount >= this.trickle_amount_payable && this.trickle_overdue_balance <= 0) {
            this.trickle_amount_payable = 0;
         } else {
            this.trickle_overdue_balance = 0;
            this.trickle_amount_payable -= remainder;
         }

      }

      console.log(this.trickle_payment_count);
      console.log(this.trickle_repayment_list.length);
      //console.log(this.trickle_repayment_list);
      return this.trickle_repayment_list;
   }




   remove_trickle_calculation(repayment_id, repayment_amount) {

      let remaining_balance;
      let total_amount = this.trickle_amount_payable + repayment_amount;
      console.log(this.trickle_payment_count);
      console.log(this.trickle_repayment_list.length);

      if (total_amount >= this.trickle_original_amount_payable && this.trickle_overdue_balance <= 0) {
         console.log("Processing amount payable to overdue balance transition.");

         // Handle amount payable transition
         this.trickle_amount_payable = Math.min(total_amount, this.trickle_original_amount_payable);
         remaining_balance = total_amount - this.trickle_amount_payable;
         // Handle overdue balance transition
         this.trickle_overdue_balance = Math.min(remaining_balance, this.trickle_original_overdue_balance);

      } else if (total_amount <= this.trickle_original_amount_payable && this.trickle_overdue_balance <= 0) {
         console.log("Processing amount payable increment.");
         this.trickle_amount_payable += repayment_amount;

      } else if (total_amount >= this.trickle_original_amount_payable && this.trickle_overdue_balance >= 0) {
         console.log("Processing overdue balance increment.");
         this.trickle_overdue_balance += repayment_amount;
      } else if (total_amount === 0 && this.trickle_amount_payable <= 0) {
         this.trickle_amount_payable += repayment_amount;
      }


      this.update_repayment_list(repayment_id);
   }

   update_repayment_list(repayment_id) {
      const index = this.trickle_repayment_list.findIndex(item => item.repayment_id === repayment_id);
      if (index !== -1) {
         this.trickle_repayment_list.splice(index, 1);
      }
      // Renumber repayment IDs
      this.trickle_repayment_list.forEach((item, idx) => {
         item.repayment_id = idx + 1;
      });
      // Adjust payment count if the list isn't empty
      if (this.trickle_repayment_list.length > 0) {
         this.trickle_payment_count -= 1;
      }
   }
}