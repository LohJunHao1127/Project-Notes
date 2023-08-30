document.addEventListener('DOMContentLoaded', () => {
    var form = document.querySelector('form');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        var name = document.querySelector('#name').value;
        var email = document.querySelector('#email').value;
        var message = document.querySelector('#message').value;
        var data = {
            name: name,
            email: email,
            message: message
        };
        fetch('/email', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data),
        }).then((response) => {
            return response.json();
        }).then((data) => {
            console.log(data);
        }).catch((error) => {
            console.log(error);
        });
    });
});
