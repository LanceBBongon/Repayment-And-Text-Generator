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

      if (!Array.isArray(trickle_payment_result)) {
         console.error("Invalid input: trickle_payment_result must be an array.");
         return;
      }
      let html_list_view_result = '';
      for (let i = 0; i < trickle_payment_result.length; i++) {
         const trickle_data = trickle_payment_result[i];
         html_list_view_result += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
    ${this.#html_dom.sanitize(trickle_data.repayment_id)}. 
    $${this.#html_dom.sanitize(trickle_data.repayment_amount)}, due on ${this.#html_dom.sanitize(trickle_data.repayment_date)}
    <input 
        type="button" 
        class="delete-btn btn btn-danger btn-sm" 
        data-trickle-info='{"repayment_id": "${this.#html_dom.sanitize(trickle_data.repayment_id)}", "repayment_amount": "${this.#html_dom.sanitize(trickle_data.repayment_amount)}"}' 
        value="Delete">
</li>
         `;
      }

      this.#trickle_repayment_list.innerHTML = html_list_view_result;
   }
}