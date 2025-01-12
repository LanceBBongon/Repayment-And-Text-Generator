//Global functions are here.
function open_new_window(data) {
    const newWindow = window.open('', '_blank', 'width=400,height=300');

    // Inject an HTML skeleton
    newWindow.document.write(`
        <html>
            <head><title>User Data</title></head>
            <body>
                <h1 id="greeting">Loading...</h1>
                <script>
                    // Listen for data from the parent window
                    window.addEventListener('message', function(event) {
                        const data = event.data;
                        document.getElementById('greeting').textContent = 
                            'Hello, ' + data.name + '! You are ' + data.age + ' years old.';
                    });
                </script>
            </body>
        </html>
    `);

    newWindow.document.close();

    // Send data once the window is ready
    newWindow.onload = function() {
        newWindow.postMessage(userData, '*');
    };
}

function advanceDate(date, intervalType) {
    //Clone the date
    const newDate = new Date(date); 
    console.log(newDate);
    switch (intervalType) {
        case "weekly":
            newDate.setDate(date.getDate() + 7);
            break;
        case "fortnightly":
            newDate.setDate(date.getDate() + 14);
            break;
        case "monthly":
            //Handle varying month lengths
            newDate.setMonth(date.getMonth() + 1); 
            break;
        default:
            console.warn("Interval type not recognized.");
            return date;
    }
    //Return the correctly advanced date
    return newDate; 
}

function formatDate(date = new Date()) {
    // If date is a string, convert it to a Date object
    if (typeof date === 'string' || date instanceof String) {
        date = new Date(date);
    }

    // Ensure the date is a valid Date object
    if (isNaN(date)) {
        throw new Error("Invalid date");
    }

    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear().toString();

    return `${day}/${month}/${year}`;
}

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