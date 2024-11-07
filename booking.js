document.addEventListener('DOMContentLoaded', function() {
    // Party size dropdown and table cards
    const partySizeSelect = document.querySelector('.party-size select');
    const tableCards = document.querySelectorAll('.table-card');
    const bookTablesButton = document.getElementById('book-tables');

    // Simulate the login status (set to false by default, change this value as per actual login state)
    let isLoggedIn = false; // Change this based on actual login status

    // Available times for each table
    const availableTimes = {
        'table-1': ['', '1pm-2pm', '2pm-3pm', '3pm-4pm'],
        'table-2': ['', '1pm-2pm', '2pm-3pm', '3pm-4pm'],
        'table-3': ['', '1pm-2pm', '2pm-3pm'],
        'table-4': ['', '1pm-2pm', '2pm-3pm', '3pm-4pm'],
        'table-5': ['', '1pm-2pm', '2pm-3pm', '3pm-4pm'],
        'table-6': ['', '1pm-2pm', '2pm-3pm'],
        'table-7': ['', '1pm-2pm', '2pm-3pm', '3pm-4pm'],
        'table-8': ['', '1pm-2pm', '2pm-3pm', '3pm-4pm'],
        'table-9': ['', '1pm-2pm', '2pm-3pm', '3pm-4pm'],
        'table-10': ['', '1pm-2pm', '2pm-3pm', '3pm-4pm'],
        'table-11': ['', '1pm-2pm', '2pm-3pm'],
        'table-12': ['', '1pm-2pm', '2pm-3pm', '3pm-4pm'],
    };

    // Update table visibility based on party size
    partySizeSelect.addEventListener('change', function() {
        const partySize = parseInt(partySizeSelect.value);

        tableCards.forEach(card => {
            const tableSeats = parseInt(card.getAttribute('data-seats'));
            const tableNumber = card.getAttribute('data-table');

            // Check if the table can accommodate the party size
            if (tableSeats >= partySize) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }

            // Update the available times for the table based on its availability
            const timeSelect = card.querySelector('select');
            timeSelect.innerHTML = ''; // Clear previous options

            // Get available times for the table
            const times = availableTimes[tableNumber] || [];
            times.forEach(time => {
                const option = document.createElement('option');
                option.value = time;
                option.textContent = time;
                timeSelect.appendChild(option);
            });
        });
    });

    // Initial trigger to show tables for the default party size
    partySizeSelect.dispatchEvent(new Event('change'));

    // Handle booking action
    bookTablesButton.addEventListener('click', function() {
        if (!isLoggedIn) {
            // If user is not logged in, show alert to log in
            alert('You must log in first to book a table!');
        } else {
            // If user is logged in, proceed with booking
            tableCards.forEach(card => {
                const timeSelect = card.querySelector('select');
                if (timeSelect) {
                    timeSelect.selectedIndex = 0; // Reset to the first (blank) option
                }
            });

            alert('Your table(s) have been booked!');
        }
    });
});
