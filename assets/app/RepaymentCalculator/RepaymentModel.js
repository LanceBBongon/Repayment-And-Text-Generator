class RepaymentModel {


   trickle_payment_count = 1;
   trickle_original_amount_payable;
   trickle_original_overdue_balance;
   trickle_amount_payable;
   trickle_overdue_balance;
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
      // console.log({
      //    trickleAmountPayable: this.trickle_amount_payable,
      //    trickleOverdueBalance: this.trickle_overdue_balance,
      //    trickleRepaymentAmount: this.trickle_repayment_amount,
      //    trickleRepaymentDate: this.trickle_repayment_date
      // });

      // Increment payment count if there are existing repayments
      if (this.trickle_repayment_list.length > 0) {
         this.trickle_payment_count++;
      }

      const repaymentDetails = {
         repayment_id: this.trickle_payment_count,
         repayment_amount: Math.min(this.trickle_repayment_amount, this.trickle_amount_payable),
         repayment_date: formatDate(this.trickle_repayment_date)
      };

      this.trickle_repayment_list.push(repaymentDetails);

      // Check if repayment amount exceeds the amount payable
      if (this.trickle_repayment_amount >= this.trickle_amount_payable) {
         this.trickle_amount_payable = 0;
         console.warn("Final balance added to the list.");
         return this.trickle_repayment_list;
      }

      // Adjust overdue balance and payable amount
      if (this.trickle_overdue_balance >= this.trickle_repayment_amount) {
         //console.log("Deducting overdue balance", this.trickle_overdue_balance);
         this.trickle_overdue_balance -= this.trickle_repayment_amount;
      } else {
         //console.log("Deducting overdue balance", this.trickle_overdue_balance);
         const remainder = this.trickle_repayment_amount - this.trickle_overdue_balance;

         if (remainder > this.trickle_amount_payable) {
            console.error("Error: Repayment amount exceeds the total payable amount.");
            return;
         }

         this.trickle_overdue_balance = 0;
         this.trickle_amount_payable -= remainder;
      }

      //console.log(this.trickle_repayment_list);
      return this.trickle_repayment_list;
   }




   remove_trickle_calculation(repayment_id, repayment_amount) {
      if (this.trickle_amount_payable <= 0) {
         console.warn("Cannot calculate trickle as it has already reached 0");
         return;
      }
      let totalAmount = this.trickle_amount_payable + repaymentAmount;
      let remainingBalance = 0;
      if (totalAmount >= this.trickle_original_amount_payable && this.trickle_overdue_balance <= 0) {
         console.log("Processing amount payable to overdue balance transition.");
         this.trickle_amount_payable = Math.min(totalAmount, this.trickle_original_amount_payable);
         remainingBalance = totalAmount - this.trickle_amount_payable;
         this.trickle_overdue_balance = Math.min(remainingBalance, this.trickle_original_overdue_balance);
      } else if (totalAmount <= this.trickle_original_amount_payable && this.trickle_overdue_balance <= 0) {
         console.log("Processing amount payable");
         this.trickle_amount_payable += repaymentAmount;
      } else if (totalAmount >= this.trickle_original_amount_payable && this.trickle_overdue_balance > 0) {
         console.log("Processing overdue balance");
         this.trickle_overdue_balance += repaymentAmount;
      }
      this.update_repayment_list(repaymentId);
   }

   update_repayment_list(repaymentId) {
      // Find and remove the repayment record
      const index = this.trickle_repayment_list.findIndex(item => item.repayment_id === repaymentId);
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