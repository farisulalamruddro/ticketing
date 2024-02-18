// Global Variables

let pricePerSeat = 500;
let totalSeats = 40;
let totalSelectedSeats = 0;


// Seat Plans

function seatPlans() {
  let seats = document.querySelectorAll('#seatPlan input[type="checkbox"]');
  seats.forEach((seat) => {
    seat.addEventListener("change", handleCheckbox);
  });
}

function handleCheckbox(seat) {
    let isChecked = seat.target.checked;
    let inputLabel = seat.target.labels[0].classList;

    seatActive(isChecked, inputLabel);
    seatsSelected(isChecked);
}


// Changing color on seat active

function seatActive(checked, label) {
  if (checked) {
    label.replace("bg-ash", "bg-green");
    label.replace("text-dark/50", "text-white");
  } else {
    label.replace("bg-green", "bg-ash");
    label.replace("text-white", "text-dark/50");
  }
}

// Total Selected Seats

function seatsSelected(e) {
    let totalSeatsInGreen = document.getElementById("totalSeats");
    if (e) {
        totalSelectedSeats++
    } else {
        totalSelectedSeats--
    }

    totalSelectedSeats = Math.max(0, Math.min(totalSelectedSeats, totalSeats));
    totalSeatsInGreen.innerText = totalSelectedSeats;
    availableSeats(totalSelectedSeats);
    totalPrice(totalSelectedSeats);
}

// Available Seats

function availableSeats(selectedSeats) {
    let seats = document.getElementById("availableSeats");
    let remainingSeats = totalSeats - selectedSeats;
    remainingSeats = isNaN(remainingSeats) ? totalSeats : remainingSeats;
    seats.innerText = remainingSeats;
}


// Total Price

function totalPrice(totalSelected) {
  let totalPriceText = document.getElementById("totalPrice");
  let totalPrice = pricePerSeat * totalSelected;
  totalPriceText.innerText = totalPrice;

  grandTotal(totalPrice);
  applyCoupon(totalPrice);
}


// Grand Total

function grandTotal(price) {
  let grandTotalText = document.getElementById("grandTotal");
  grandTotalText.innerText = price;
}


// Applying Coupon

function applyCoupon(totalPrice) {
  let couponCodes = {
    NEW15: 15,
    COUPLE20: 20,
  };

  let couponCodeInput = document.getElementById("couponCode");
  let couponSubmit = document.getElementById("couponSubmit");

  couponSubmit.addEventListener("click", () => {
    let enteredCouponCode = couponCodeInput.value.toUpperCase();
    let discountPercentage = couponCodes[enteredCouponCode] || 0;

    let discountedPrice = totalPrice - (totalPrice * discountPercentage) / 100;
    // Update the grand total with the discounted price
    grandTotal(discountedPrice);
  });
}

