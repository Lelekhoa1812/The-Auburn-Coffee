document.addEventListener('DOMContentLoaded', function() {
    const promotionButton = document.getElementById('promotionButton');
    const employmentButton = document.getElementById('employmentButton');
    const submitPromotionButton1 = document.getElementById('submitPromotionButton1');
    const submitPromotionButton2 = document.getElementById('submitPromotionButton2');
    const closeButton1 = document.querySelector('.close1');
    const closeButton2 = document.querySelector('.close2');
    const closeButton3 = document.querySelector('.close3');
    const closeButton4 = document.querySelector('.close4');

    const customer = {};

    // Open Modal 1 (Promotion)
    promotionButton.addEventListener('click', function() {
        document.getElementById('promotionModal1').style.display = 'block';
    });

    // Close Modal 1
    closeButton1.addEventListener('click', function() {
        document.getElementById('promotionModal1').style.display = 'none';
    });

    // Open Modal 2 (Survey) and close Modal 1
    submitPromotionButton1.addEventListener('click', function() {
        document.getElementById('promotionModal1').style.display = 'none';
        document.getElementById('promotionModal2').style.display = 'block';
    });

    // Close Modal 2
    closeButton2.addEventListener('click', function() {
        document.getElementById('promotionModal2').style.display = 'none';
    });

    // Open Modal 3 (Reward) and close Modal 2 if survey completed
    submitPromotionButton2.addEventListener('click', function() {
        // Capture user input
        customer.name = document.getElementById('customerName').value;
        customer.coffee = document.getElementById('customerCoffee').value;
        customer.milk = document.getElementById('customerMilk').value === 'None' ? '' : document.getElementById('customerMilk').value;
        if ((customer.name).length > 0)
        {
            // Hide modal 2
            document.getElementById('promotionModal2').style.display = 'none';
            // Display the reward message in Modal 3
            const promotionMessage = `Thank you, ${customer.name} for completing this survey, please show this to our staff and get your ${customer.milk} ${customer.coffee} for free this morning!`;
            document.getElementById('promotionMessage').textContent = promotionMessage;
            document.getElementById('promotionModal3').style.display = 'block';
        }
        else {  // Deny open Modal 3 (Reward) and close Modal 2 if survey not completed
            alert("Please complete your survey!");
        }
    });

    // Close Modal 3
    closeButton3.addEventListener('click', function() {
        document.getElementById('promotionModal3').style.display = 'none';
    });

    // Open Modal 4 (Employment)
    employmentButton.addEventListener('click', function() {
        document.getElementById('employmentModal').style.display = 'block';
    });

    // Close Modal 4
    closeButton4.addEventListener('click', function() {
        document.getElementById('employmentModal').style.display = 'none';
    });

});