class RepaymentView {
    #html_dom = DOMPurify
    #repayment_ui = UIRepayment;
    //Element Refference in HTML
    #trickle_repayment_list = this.#repayment_ui.ulist_trickle_repayment_result();


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

    //Create the menu for the following features:
    html_create_trickle_payment_extension_notes(trickle_payment_result) {
    }

    html_trickle_result_to_new_window(trickle_repayment_data) {
        console.log(trickle_repayment_data);

        if (!Array.isArray(trickle_repayment_data)) {
            console.error("Invalid input: trickle_repayment_data must be an array.");
            return;
        }

        let html_list_view_result = '';
        for (let i = 0; i < trickle_repayment_data.length; i++) {
            const trickle_data = trickle_repayment_data[i];
            html_list_view_result += `
              <li class="list-group-item d-flex justify-content-between align-items-center">
                  ${this.#html_dom.sanitize(trickle_data.repayment_id)}. 
                  $${this.#html_dom.sanitize(trickle_data.repayment_amount)}
                  <input 
                      type="button" 
                      class="copy-btn btn-primary btn-sm"
                      data-trickle-info='{"repayment_amount": "${this.#html_dom.sanitize(trickle_data.repayment_amount)}","repayment_date": "${this.#html_dom.sanitize(trickle_data.repayment_date)}"}' 
                      value="📋">, due on ${this.#html_dom.sanitize(trickle_data.repayment_date)}
                  <input 
                      type="button" 
                      class="copy-btn btn-primary btn-sm"
                      data-trickle-info='{"repayment_amount": "${this.#html_dom.sanitize(trickle_data.repayment_amount)}","repayment_date": "${this.#html_dom.sanitize(trickle_data.repayment_date)}"}' 
                      value="📋">
              </li>
          `;
        }
        this.open_new_window(html_list_view_result);
    }

    open_new_window(repayment_data) {
        if (!repayment_data || repayment_data.length === 0) {
            console.log("No repayment data to display.");
            return;
        }

        console.log(repayment_data);
        const create_new_window = window.open('', '_blank', 'width=400,height=600');

        if (!create_new_window) {
            console.error("Failed to open a new window. Check if pop-ups are blocked.");
            return;
        }

        create_new_window.document.write(`
          <html>
              <head>
                  <meta charset="UTF-8">
                  <meta name="viewport" content="width=device-width, initial-scale=1.0">
                  <link href="./assets/bootstrap_assets/css/bootstrap.min.css" rel="stylesheet">
                  <title>FA&ST Toolset</title>
              </head>
              <body>
               <div class="container">
                  <div class="col">
                      <div class="input-group mt-3 justify-content-center">
                          <span class="input-group-text">Repayment Result</span>
                      </div>
                      <ul id="ulist-window-result" class="list-group">
                          ${repayment_data}
                      </ul>
                  </div>
                  </div>
                  <script src="./assets/dompurify_assets/purify.min.js"></script>
                  <script src="./assets/bootstrap_assets/js/bootstrap.bundle.min.js"></script>
                  <script src="./assets/app/Menu/Repayment/trickle-repayment-menu.js"></script>
              </body>
          </html>
      `);

        create_new_window.document.close();  // Ensure the document is properly closed before appending scripts
    }
}