$(document).ready(() => {
    var urlParams = new URLSearchParams(window.location.search);
    var username = urlParams.get('username');
    if(!username) {
        window.location.href = 'login.html';
    }
    $('#welcomeMessage').text(`Welcome, ${username || 'User'}`);
    const calculate = (operation) => {
        $('.error').text('');

        let num1 = $('#number1').val();
        let num2 = $('#number2').val();
        let result = 0;

        if (!$.isNumeric(num1)) {
            $('#number1Error').text('Please enter a valid number');
            return;
        }
        if (!$.isNumeric(num2)) {
            $('#number2Error').text('Please enter a valid number');
            return;
        }
        if (num2 === '0' && operation === 'divide') {
            $('#number2Error').text('Cannot divide by zero');
            return;
        }

        num1 = parseFloat(num1);
        num2 = parseFloat(num2);

        switch(operation) {
            case 'add':
                result = num1 + num2;
                break;
            case 'subtract':
                result = num1 - num2;
                break;
            case 'multiply':
                result = num1 * num2;
                break;
            case 'divide':
                result = num1 / num2;
                break;
            default:
                result = 'Operation not supported';
                break;
        }

        $('#result').val(result);
    };

    $('#add').click(() => calculate('add'));
    $('#subtract').click(() => calculate('subtract'));
    $('#multiply').click(() => calculate('multiply'));
    $('#divide').click(() => calculate('divide'));
});