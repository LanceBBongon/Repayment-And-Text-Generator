console.log("Trickle Menu Open!");

document.getElementById('ulist-window-result').addEventListener("click", async (event) => {
   // Check if the clicked button is for copying amount or date
   const target = event.target;
   if (target && (target.classList.contains("copy-amount-btn") || target.classList.contains("copy-date-btn"))) {
       console.log(`${target.classList.contains("copy-amount-btn") ? "Amount" : "Date"} is processed to be copied.`);

       const trickle_repayment_data = target.getAttribute("data-trickle-info");

       let parsed_trickle_data;

       // Error handling for invalid JSON data
       try {
           parsed_trickle_data = JSON.parse(trickle_repayment_data);
       } catch (error) {
           console.error("Invalid JSON in data-trickle-info:", error);
           return;
       }
       console.log(parsed_trickle_data);
       let valueToCopy;
       // Determine what to copy based on the button class
       if (target.classList.contains("copy-amount-btn")) {
           valueToCopy = parsed_trickle_data.repayment_amount;
       } else if (target.classList.contains("copy-date-btn")) {
           valueToCopy = parsed_trickle_data.repayment_date;
       }

       if (valueToCopy !== undefined) {
           try {
               // Copy value as string
               await copy_to_clipboard(String(valueToCopy));
               console.log("Copied to clipboard:", valueToCopy);
           } catch (err) {
               console.error("Failed to copy to clipboard:", err);
           }
       }
   }
});
async function copy_to_clipboard(params) {
   try {
       if (navigator.clipboard && window.isSecureContext) {
           await navigator.clipboard.writeText(params);
           console.log('Text copied to clipboard');
       } else {
           if (document.execCommand('copy')) {
               console.log('Text copied to clipboard (fallback)');
           } else {
               throw new Error('Fallback method failed');
           }

           document.body.removeChild(textArea);
       }
   } catch (err) {
       console.error('Failed to copy text', err);
   }
}