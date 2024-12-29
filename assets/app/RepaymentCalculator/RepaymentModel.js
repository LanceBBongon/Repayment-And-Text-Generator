class RepaymentModel {

   trickle_payment_count = 1;
   trickle_amount_payable;
   trickle_overdue_balance;
   trickle_repayment_amount;
   trickle_repayment_date;


   trickle_repayment_list = [];

   constructor() {
      console.log("Repayment Model Loaded.");
   }

   add_trickle_calculation() {
      console.log(this.trickle_amount_payable);
      console.log(this.trickle_overdue_balance);
      console.log(this.trickle_overdue_balance);
      console.log(this.trickle_repayment_date);

      if (this.trickle_repayment_amount > this.trickle_amount_payable) {
         console.log("Error: Repayment amount exceeds the total payable amount.");
         return; // Exit the method
      }


      if (this.trickle_repayment_list.length > 0) {
         this.trickle_payment_count++;
      }

      this.trickle_repayment_list.push({
         repayment_id: this.trickle_payment_count,
         repayment_amount: this.trickle_repayment_amount,
         repayment_date: formatDate(this.trickle_repayment_date)
      });

      if (this.trickle_overdue_balance >= this.trickle_repayment_amount) {
         console.log("Deducting overdue balance", this.trickle_overdue_balance);
         this.trickle_overdue_balance = this.trickle_overdue_balance - this.trickle_repayment_amount;
      } else {
         console.log("Deducting overdue balance", this.trickle_overdue_balance);
         const trickle_remainder = this.trickle_repayment_amount - this.trickle_overdue_balance;
         if (trickle_remainder > this.trickle_amount_payable) {
            console.log("Error: Repayment amount exceeds the total payable amount.");
            return;
         }
         this.trickle_overdue_balance = 0;
         this.trickle_amount_payable = this.trickle_amount_payable - trickle_remainder;
      }

      console.log(this.trickle_repayment_list);
   }

   remove_trickle_calculation() {

   }
}