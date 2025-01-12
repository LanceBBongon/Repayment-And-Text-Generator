console.log("Trickle Menu Open!");

document.getElementById('ulist-window-result').addEventListener("click", (event) => {
   if (event.target && event.target.classList.contains("copy-btn")) {

      const trickle_repayment_data = event.target.getAttribute("data-trickle-info");
      const parsed_trickle_data = JSON.parse(trickle_repayment_data);
      console.log(parsed_trickle_data);

      let parsed_repayment_amount= parseFloat(parsed_trickle_data.repayment_amount);
      let parsed_repayment_date = parseFloat(parsed_trickle_data.repayment_date);

      
   }  
});