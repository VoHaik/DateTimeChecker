function validateDate() {
    const dayInput = document.getElementById('day');
    const monthInput = document.getElementById('month');
    const yearInput = document.getElementById('year');
    const resultDiv = document.getElementById('result');
    const resultMessageSpan = resultDiv.querySelector('.message'); // Target the message span
    // const resultIconSpan = resultDiv.querySelector('.icon'); // Icon is handled by CSS via parent class

    // Clear previous results and classes
    resultMessageSpan.textContent = '';
    resultDiv.classList.remove('valid', 'invalid');

    const day = parseInt(dayInput.value);
    const month = parseInt(monthInput.value); // Month is 1-indexed from input
    const year = parseInt(yearInput.value);

    if (isNaN(day) || isNaN(month) || isNaN(year)) {
        resultMessageSpan.textContent = 'Please enter valid numbers for day, month, and year.';
        resultDiv.classList.add('invalid');
        return;
    }

    if (year < 1000 || year > 9999) {
        resultMessageSpan.textContent = 'Year must be a 4-digit number (e.g., 1990).';
        resultDiv.classList.add('invalid');
        return;
    }

    if (month < 1 || month > 12) {
        resultMessageSpan.textContent = 'Month must be between 1 and 12.';
        resultDiv.classList.add('invalid');
        return;
    }

    const date = new Date(year, month - 1, day); // month is 0-indexed in JS Date

    if (date.getFullYear() === year && date.getMonth() === (month - 1) && date.getDate() === day) {
        resultMessageSpan.textContent = 'Date is valid!';
        resultDiv.classList.add('valid');
    } else {
        // Provide a more specific error for invalid day if possible
        const daysInMonth = new Date(year, month, 0).getDate(); // Get days in the entered month (month is 1-indexed here)
        if (day > daysInMonth) {
             resultMessageSpan.textContent = `Invalid day. ${new Date(0, month-1).toLocaleString('default', { month: 'long' })} ${year} has only ${daysInMonth} days.`;
        } else if (day < 1) {
            resultMessageSpan.textContent = 'Day cannot be less than 1.';
        }
        else {
            resultMessageSpan.textContent = 'Invalid day for the selected month and year.';
        }
        resultDiv.classList.add('invalid');
    }
}

const validateButton = document.getElementById('validateButton');
if (validateButton) {
    validateButton.addEventListener('click', validateDate);
} else {
    // This check is important for test_validator.html where the button might be handled differently
    if (document.getElementById('manualValidateButton')) {
         // Allow test_validator.html to setup its own listener if needed
    } else {
        console.error('Error: Could not find the "validateButton" element.');
    }
}

// Clear out old interval if it by any chance still exists (legacy)
if (typeof intervalId !== 'undefined') {
    clearInterval(intervalId);
}
