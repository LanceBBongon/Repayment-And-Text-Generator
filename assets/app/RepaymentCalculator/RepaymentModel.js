class RepaymentModel {

   trickle_count;
   static trickle_amount_payble;
   static trickle_overdue_balance;
   static trickle_repayment_amount;
   static trickle_repayment_date;
   trickle_repayment_list = [];


   constructor() {
      console.log("Repayment Model Loaded.");
   }

   trickle_calculation() {


      this.trickle_repayment_list.push({
         repayment_id: this.trickle_payment_count,
         repayment_amount: this.trickle_repayment_amount,
         repayment_date: this.trickle_repayment_date
      });

      if (this.trickle_overdue_balance > this.trickle_amount_payble) {
         this.trickle_overdue_balance -= this.trickle_repayment_amount;

      } else {
         this.trickle_amount_payble -= this.trickle_repayment_amount;
      }

      console.log(this.trickle_repayment_list);
   }
}