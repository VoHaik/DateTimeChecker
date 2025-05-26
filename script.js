function updateDateTime() {
    const now = new Date();
    const dateTimeString = now.toLocaleString(); // Uses user's locale for formatting

    const dateTimeElement = document.getElementById('datetime');
    if (dateTimeElement) {
        dateTimeElement.textContent = dateTimeString;
    } else {
        console.error("Error: Could not find the 'datetime' element.");
    }
}

// Update the time immediately when the page loads
updateDateTime();

// Then update the time every second
setInterval(updateDateTime, 1000);
