
//Global functions are here.
function AU_EST_Time(dateValue) {
   let australianDate;

   if (!dateValue) {
       dateValue = new Date(); // Default to current date if no value provided
   }

   // Handle DD/MM/YYYY format
   if (typeof dateValue === "string" && /^\d{2}\/\d{2}\/\d{4}$/.test(dateValue)) {
       const [day, month, year] = dateValue.split("/").map(Number);
       australianDate = new Date(year, month - 1, day); // Month is 0-based
   } else {
       // Fallback to default Date constructor handling
       australianDate = new Date(dateValue);
   }

   if (isNaN(australianDate)) {
       throw new Error("Invalid date value");
   }

   // Adjust to Australia/Sydney timezone
   const options = {
       timeZone: "Australia/Sydney",
       hour12: false, // Adjust to 24-hour format
       day: "2-digit",
       month: "2-digit",
       year: "numeric",
       hour: "2-digit",
       minute: "2-digit",
       second: "2-digit"
   };

   const formatter = new Intl.DateTimeFormat("en-AU", options);
   const parts = formatter.formatToParts(australianDate);

   // Convert parts into ISO 8601-like string
   const formattedDate = parts.reduce((acc, part) => {
       if (part.type !== "literal") {
           acc[part.type] = part.value;
       }
       return acc;
   }, {});

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