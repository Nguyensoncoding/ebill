let totalBillAmount = 0;
        let balance = 0;

        document.getElementById('billingForm').addEventListener('submit', function(event) {
            event.preventDefault();

            const season = document.querySelector('input[name="season"]:checked').value;
            const ev = document.querySelector('input[name="ev"]:checked').value;
            const usage = parseInt(document.getElementById('usage').value);

            let rate;
            let evCharge = 0;
            const fixedDeliveryFee = 30; // Fixed delivery fee
            const variableDeliveryFeeRate = 0.05; // Variable delivery fee per kWh
            const hst = 0.13; // HST tax rate (13%)

            if (season === 'summer') {
                rate = 0.15; // Summer rate per kWh
            } 
            else {
                rate = 0.10; // Winter rate per kWh
            }

            if (ev === 'yes') {
                evCharge = 30; // Additional charge for EV
            }

            const usageCharge = usage * rate;
            const deliveryFee = fixedDeliveryFee + (usage * variableDeliveryFeeRate);
            const subtotal = usageCharge + evCharge + deliveryFee;
            const hstAmount = subtotal * hst;
            const totalBill = subtotal + hstAmount;
            totalBillAmount = totalBill;

            document.getElementById('result').classList.remove('hidden');
            document.getElementById('result').innerHTML = `
                <div class="bill">
                    <div class="bill-header">
                        <h2>Electricity Bill</h2>
                    </div>
                    <div class="bill-details">
                        <p>Usage Charge: ${usage} kWh * $${rate.toFixed(2)} = $${usageCharge.toFixed(2)}</p>
                        ${evCharge > 0 ? `<p>Electric Vehicle Charge: $${evCharge.toFixed(2)}</p>` : ''}
                        <p>Delivery Fee: $${fixedDeliveryFee.toFixed(2)} (Fixed) + ${usage} kWh * $${variableDeliveryFeeRate.toFixed(2)} (Variable) = $${deliveryFee.toFixed(2)}</p>
                        <p>Subtotal: $${subtotal.toFixed(2)}</p>
                        <p>HST (13%): $${hstAmount.toFixed(2)}</p>
                        <p class="total">Total Bill: $${totalBill.toFixed(2)}</p>
                    </div>
                </div>
            `;

            document.getElementById('payButton').classList.remove('hidden');
            document.getElementById('checkBalanceButton').classList.remove('hidden');
        });

        document.getElementById('checkBalanceButton').addEventListener('click', function() {
            document.getElementById('balance').classList.remove('hidden');
            document.getElementById('balance').innerHTML = `
                <div class="bill">
                    <div class="bill-header">
                        <h2>Balance</h2>
                    </div>
                    <div class="bill-details">
                        <p class="total">Current Balance: $${balance.toFixed(2)}</p>
                    </div>
                </div>
            `;

            document.getElementById('paymentForm').classList.remove('hidden');
        });

        document.getElementById('payButton').addEventListener('click', function() {
            if (balance >= totalBillAmount) {
                balance -= totalBillAmount;
                document.getElementById('balance').innerHTML = `
                    <div class="bill">
                        <div class="bill-header">
                            <h2>Payment Confirmation</h2>
                        </div>
                        <div class="bill-details">
                            <p>Thank you for your payment!</p>
                            <p class="total">Amount Paid: $${totalBillAmount.toFixed(2)}</p>
                            <p class="total">Remaining Balance: $${balance.toFixed(2)}</p>
                        </div>
                    </div>
                `;
            } 
            else {
                document.getElementById('balance').innerHTML = `
                    <div class="bill">
                        <div class="bill-header">
                            <h2>Payment Failed</h2>
                        </div>
                        <div class="bill-details">
                            <p class="total">Insufficient Balance. Please add more funds to proceed with the payment.</p>
                        </div>
                    </div>
                `;
            }
        });

        document.getElementById('addFundsForm').addEventListener('submit', function(event) {
            event.preventDefault();
            const cardNumber = document.getElementById('cardNumber').value;
            const cvv = document.getElementById('cvv').value;
            const expiry = document.getElementById('expiry').value;
            const addAmount = parseFloat(document.getElementById('addAmount').value);

            // Simulate adding funds (in a real application, this would involve validation and interaction with a payment gateway)
            if (cardNumber.length === 16 && cvv.length === 3) {
                balance += addAmount;
                document.getElementById('balance').innerHTML = `
                    <div class="bill">
                        <div class="bill-header">
                            <h2>Balance</h2>
                        </div>
                        <div class="bill-details">
                            <p class="total">Current Balance: $${balance.toFixed(2)}</p>
                        </div>
                    </div>
                `;

                document.getElementById('paymentForm').classList.add('hidden');
            } 
            else {
                alert("Invalid card details. Please check the information and try again.");
            }
        });