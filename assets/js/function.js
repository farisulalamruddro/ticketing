// Global Variables

let pricePerSeat = 550;
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
  var maxAllowed = 4;
  let isChecked = seat.target.checked;
  let label = seat.target.name;
  let inputLabel = seat.target.labels[0].classList;

  // Use checkedCheckboxes.length instead of isChecked.length
  let checkedCheckboxes = document.querySelectorAll(
    '#seatPlan input[type="checkbox"]:checked'
  );

  if (checkedCheckboxes.length > maxAllowed) {
    alert("You can only select up to " + maxAllowed + " seats.");
    this.checked = false; // Uncheck the last checked checkbox
  } else {
    seatActive(isChecked, inputLabel);
    seatsSelected(isChecked);
    checkoutItem(isChecked, label);
  }
}

// Changing color on seat active
function seatActive(checked, label) {
  if (checked) {
    label.remove("bg-ash");
    label.add("bg-green");
    label.remove("text-dark/50");
    label.add("text-white");
  } else {
    label.remove("bg-green");
    label.add("bg-ash");
    label.remove("text-white");
    label.add("text-dark/50");
  }
}

// Adding to checkout

function checkoutItem(checked, label) {
  let itemsContainer = document.getElementById("seatsCount");

  if (checked) {
    let itemRow = document.createElement("div");
    itemRow.classList.add("grid", "grid-cols-5", "gap-2");

    // Add content to the created div (you can customize this part)
    itemRow.innerHTML = `
      <div class="col-span-2">
                                            <p>${label}</p>
                                        </div>
                                        <div class="col-span-2">
                                            <p>Economoy</p>
                                        </div>
                                        <div class="col-span-1 text-end">
                                            <p>550</p>
                                        </div>
    `;

    itemRow.setAttribute("data-checkbox-id", label);

    itemsContainer.appendChild(itemRow);
  } else {
    // If the checkbox is not checked, find and remove the corresponding div
    let divToRemove = itemsContainer.querySelector(
      `[data-checkbox-id="${label}"]`
    );
    if (divToRemove) {
      itemsContainer.removeChild(divToRemove);
    }
  }
}

// Total Selected Seats

function seatsSelected(e) {
  let totalSeatsInGreen = document.getElementById("totalSeats");
  if (e) {
    totalSelectedSeats++;
  } else {
    totalSelectedSeats--;
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
      
    discountedPrice = Math.round(discountedPrice);

    // Update the grand total with the discounted price
    grandTotal(discountedPrice);
  });
}


seatPlans();
