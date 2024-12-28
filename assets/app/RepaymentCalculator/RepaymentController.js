class RepaymentController {


   #UIAccount_Service = UIAccounts;
   #UIRepayment_Service = UIRepayment;

   constructor(Repayment_View, Repayment_Model) {
      console.log("Repayment Controller Loaded.")
      this.Repayment_View = Repayment_View;
      this.Repayment_Model = Repayment_Model;
   }

   
}

class RepaymentModel {

   constructor() {
      console.log("Repayment Model Loaded.");
   }
}

class RepaymentView {
   constructor() {
      console.log("Repayment View Loaded.");
      
   }

}