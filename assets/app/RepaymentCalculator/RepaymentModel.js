class RepaymentModel {



   constructor() {
      console.log("Repayment Model Loaded.");
   }


   trickle_payment_count = 1;
   trickle_amount_payable;
   trickle_overdue_balance;
   trickle_repayment_amount;
   trickle_repayment_date;
   trickle_repayment_list = [];

   //To-do: The calculation needs to advance the date.
   reset_trickle_calculation() {

   }

   add_trickle_calculation() {
      console.log({
         trickleAmountPayable: this.trickle_amount_payable,
         trickleOverdueBalance: this.trickle_overdue_balance,
         trickleRepaymentAmount: this.trickle_repayment_amount,
         trickleRepaymentDate: this.trickle_repayment_date
      });

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
         console.log("Deducting overdue balance", this.trickle_overdue_balance);
         this.trickle_overdue_balance -= this.trickle_repayment_amount;
      } else {
         console.log("Deducting overdue balance", this.trickle_overdue_balance);
         const remainder = this.trickle_repayment_amount - this.trickle_overdue_balance;

         if (remainder > this.trickle_amount_payable) {
            console.error("Error: Repayment amount exceeds the total payable amount.");
            return;
         }

         this.trickle_overdue_balance = 0;
         this.trickle_amount_payable -= remainder;
      }

      console.log(this.trickle_repayment_list);
      return this.trickle_repayment_list;
   }

   trickle_original_amount_payable;
   trickle_original_overdue_balance;

   remove_trickle_calculation(repayment_id, repayment_amount) {
      console.log("Original Trickle Value", this.trickle_original_amount_payable);
      console.log("Original Trickle Value", this.trickle_original_overdue_balance);
      console.log("Trickle amount payable", this.trickle_amount_payable);
      console.log("Trickle overdue balance", this.trickle_overdue_balance);

      console.log(repayment_id);
      console.log(repayment_amount);
      let refunded_amount_payable = this.trickle_amount_payable
      if (refunded_amount_payable === this.trickle_original_amount_payable) {
         console.log("Calculating refund of overdue balance.");
         this.trickle_overdue_balance += repayment_amount;
      } else {
         console.log()
         if (this.trickle_amount_payable <= this.trickle_original_amount_payable) {
            console.log("Calculating refund of amount payable");
            const repayment_overflow = this.trickle_amount_payable + repayment_amount;
            if (repayment_overflow <= this.trickle_original_amount_payable) {
               console.log("Amount payable has not exceeded the original balance.");
               this.trickle_amount_payable += repayment_amount;
            } else if (repayment_overflow >= this.trickle_original_amount_payable) {
               console.log("Repayment has overflowed to overdue balance.");
               this.trickle_amount_payable = this.trickle_original_amount_payable;
               this.trickle_overdue_balance = this.trickle_amount_payable - repayment_amount
            }
         } else {
            console.log("")
         }
      }


      // } else if (this.trickle_overdue_balance > 0){
      //    // Catch-all for other cases

      //    const overdue_balance_overflow = this.trickle_overdue_balance + repayment_amount;
      //    if (overdue_balance_overflow > this.trickle_original_overdue_balance) {
      //       // Exit the function early if it overflowed.
      //       console.log("Overdue balance overflow detected. Exiting...");
      //       return;
      //    }

      //    // No overflow: update overdue balance.
      //    if (this.trickle_overdue_balance < this.trickle_original_overdue_balance) {
      //       this.trickle_overdue_balance += repayment_amount;
      //    }
      // } else {
      //    console.log("Handling remaining scenarios...");
      // }

      console.log("Resulting ", this.trickle_amount_payable);
      console.log(this.trickle_overdue_balance);




      // const index = this.trickle_repayment_list.findIndex(item => item.repayment_id === repayment_id);
      // if (index !== -1) {
      //    this.trickle_repayment_list.splice(index, 1); // Remove the item at the found index
      // }

      // for (let update_index = 0; update_index < this.trickle_repayment_list.length; update_index++) {
      //    this.trickle_repayment_list[update_index].repayment_id = update_index + 1; // Renumber starting from 1
      // }


   }
}