document.addEventListener("DOMContentLoaded", function () {
    let selectedRating = 0; // Variable to store the selected rating

    // Select all stars, the review button, the review input field, and the name input field
    const stars = document.querySelectorAll(".star-rating .fa-star");
    const reviewButton = document.querySelector(".review-input-body button");
    const reviewInput = document.querySelector(".review-input-body input:nth-of-type(2)");
    const nameInput = document.getElementById("full");
    const reviewSection = document.querySelector(".reviews-main");

    // Function to update star appearance based on rating
    function updateStars(rating) {
        stars.forEach(star => {
            const starValue = parseInt(star.getAttribute("data-value"));
            star.classList.toggle("filled", starValue <= rating);
        });
    }

    // Load reviews from localStorage on page load
    loadReviews();

    // Add click event listener for each star to set the rating
    stars.forEach(star => {
        star.addEventListener("click", function () {
            const ratingValue = parseInt(this.getAttribute("data-value"));
            selectedRating = (selectedRating === ratingValue) ? 0 : ratingValue;
            updateStars(selectedRating);
        });
    });

    // Click event for the review submission button
    reviewButton.addEventListener("click", function () {
        const reviewText = reviewInput.value.trim();
        const userName = nameInput.value.trim();

        // Validate that a rating, name, and review text are provided
        if (selectedRating === 0) {
            alert("Please select a star rating.");
            return;
        }
        if (!userName) {
            alert("Please enter your full name.");
            return;
        }
        if (!reviewText) {
            alert("Please enter a review description.");
            return;
        }

        // Create the review object
        const review = {
            name: userName,
            rating: selectedRating,
            description: reviewText,
        };

        // Save the review to localStorage
        saveReview(review);

        // Display the review in the reviews section
        displayReview(review);

        // Reset the form fields
        selectedRating = 0;
        nameInput.value = "";
        reviewInput.value = "";
        updateStars(0);
    });

    // Function to display a single review on the page
    function displayReview(review) {
        const reviewEntry = document.createElement("div");
        reviewEntry.classList.add("review-entry");

        // Add the review content with name, rating stars, and description
        reviewEntry.innerHTML = `<p><strong>${review.name}</strong></p>
                                 <div id="review-divider" class="divider"></div>
                                 <p id="rating">${"★".repeat(review.rating)}${"☆".repeat(5 - review.rating)}</p>
                                 <p id="review-description">${review.description}</p>`;

        reviewSection.appendChild(reviewEntry);
    }

    // Function to save a review to localStorage
    function saveReview(review) {
        let reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.push(review);
        localStorage.setItem("reviews", JSON.stringify(reviews));
    }

    // Function to load and display all reviews from localStorage
    function loadReviews() {
        const reviews = JSON.parse(localStorage.getItem("reviews")) || [];
        reviews.forEach(displayReview);
    }
});
