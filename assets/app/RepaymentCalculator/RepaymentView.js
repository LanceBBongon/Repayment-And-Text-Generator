class RepaymentView {
   #html_dom = DOMPurify
   #repayment_ui = UIRepayment;
   //Element Refference in HTML
   #trickle_repayment_list = this.#repayment_ui.ulist_trickle_repayment_result();


   //Class specific variables.
   
   constructor() {
      console.log("Repayment View Loaded.");

   }

   html_trickle_ulist_result(trickle_payment_result) {
      if (!this.#repayment_ui.trickle_amount_payable === 0) {
         return;
      }

      console.log("Trickle calculation into view.");
      let html_list_view_result = '';
      console.log(trickle_payment_result);
      console.log(trickle_payment_result.length);
      for (let i = 0; i < trickle_payment_result.length; i++) {
         const result = trickle_payment_result[i];
         html_list_view_result += `<li class="list-group-item d-flex justify-content-between align-items-center" data-id=${result.repayment_id}>${result.repayment_id}.`
         html_list_view_result += ` $${result.repayment_amount}, due on ${result.repayment_date}`;
         html_list_view_result += `<input type="button" class="delete-btn btn btn-danger btn-sm" data-id="${result.repayment_id}" value="Delete">`
         html_list_view_result += `</li>`
      }
      this.#trickle_repayment_list.innerHTML = this.#html_dom.sanitize(html_list_view_result) ;
   }
}