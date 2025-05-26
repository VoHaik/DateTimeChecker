function validateDate() {
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const resultDiv = document.getElementById('result');

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value); // Month is 1-indexed from input
    const year = parseInt(yearInput.value);

    resultDiv.style.color = 'red'; // Default to error color

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        resultDiv.textContent = 'Please enter valid numbers for day, month, and year.';
        return;
    }

    if (year < 1000 || year > 9999) {
        resultDiv.textContent = 'Please enter a 4-digit year.';
        return;
    }

    if (month < 1 || month > 12) {
        resultDiv.textContent = 'Month must be between 1 and 12.';
        return;
    }

    // Check for days in month, accounting for leap years
    // JavaScript's Date object handles this well:
    // Creating a date like new Date(year, month_ZERO_INDEXED, day)
    // If day is out of range for the month, it rolls over.
    // So, if we create a date for the given day/month/year,
    // and then check if the resulting day/month/year match the input,
    // we can validate the date.
    const date = new Date(year, month - 1, day); // month is 0-indexed in JS Date

    if (date.getFullYear() === year && date.getMonth() === (month - 1) && date.getDate() === day) {
        resultDiv.textContent = 'Date is valid!';
        resultDiv.style.color = 'green';
    } else {
        resultDiv.textContent = 'Invalid day for the selected month and year.';
    }
}

const validateButton = document.getElementById('validateButton');
if (validateButton) {
    validateButton.addEventListener('click', validateDate);
} else {
    console.error('Error: Could not find the "validateButton" element.');
}

// Clear out old interval if it by any chance still exists from previous version
if (typeof intervalId !== 'undefined') {
    clearInterval(intervalId);
}
