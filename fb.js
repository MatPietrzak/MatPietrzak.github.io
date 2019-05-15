function statusChangeCallback(response) {
    console.log('statusChangeCallback');

    if (response.status === 'connected') {
        testAPI();
    } else {
        document.getElementById('status').innerHTML = 'Zaloguj się ' +
            'do aplikacji.';
    }
}

function checkLoginState() {
    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function () {
    FB.init({
        appId: '1306240826200360',
        cookie: true,
        xfbml: true,
        version: 'v3.2'
    });

    FB.getLoginStatus(function (response) {
        statusChangeCallback(response);
    });

};

(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

function testAPI() {
    console.log('Fetching your information.... ');
    FB.api('/me', { locale: 'pl_PL', fields: 'name, email,picture{url},id,middle_name' }, function (response) {
        console.log('Successful login for: ' + response.name);
        console.log(response);
        document.getElementById('status').innerHTML ='<p><img src="' + response.picture.data.url + '"></p>'+
            '<p class="ptext">Zalogowany jako: ' + response.name + response.middle_name'.</p><p class="ptext"> Email: ' + response.email+'</p>'
			+'<p class="ptext">id: '+response.id+'</p>';
    });
}