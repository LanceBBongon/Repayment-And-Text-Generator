
//Global functions are here.
function AU_EST_Time(date_value) {
   let australian_date;
   if (!date_value){
      date_value = new Date();
   }

   // Handle DD/MM/YYYY format
   if (typeof date_value === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(date_value)) {
      const [day, month, year] = date_value.split("/").map(Number);
      australian_date = new Date(year, month - 1, day); // Month is 0-based
   } else {
      // Fallback to default Date constructor handling
      australian_date = new Date(date_value);
   }

   if (isNaN(australian_date)) {
      throw new Error("Invalid date value");
   }

   const options = {
      timeZone: "Australia/Sydney",
      hour12: true,
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
   };

   const formatter = new Intl.DateTimeFormat('en-AU', options);
   const parts = formatter.formatToParts(australian_date);
   const formattedDate = parts.reduce((acc, part) => {
      if (part.type !== "literal") {
         acc[part.type] = part.value;
      }
      return acc;
   }, {});

   // Return date in ISO 8601 format adjusted to Australia/Sydney timezone
   return new Date(
      `${formattedDate.year}-${formattedDate.month}-${formattedDate.day}T${formattedDate.hour}:${formattedDate.minute}:${formattedDate.second}`
   );
}

console.log(AU_EST_Time());


//Refference declarations used globally throughout the program.
const UIAccounts = new AccountUI;
const UIRepayment = new RepaymentUI;


//Test will be here.
const UIRepaymentTest = new RepaymentUITest;
const UIAccountsTest = new AccountUITest;

const RepaymentApp = new RepaymentController(new RepaymentView, new RepaymentModel)