window.addEventListener('load', function () {

    //  Alert FadeOut
    const sms = setTimeout(msg, 2000)
    function msg() {
        $('.alert').fadeOut('slow')
    }


    //Show And hide Password
    let password = $('#password')
    let open = $('.open')
    let close = $('.close').css('display', 'none')
    open.click(() => {
        password.attr('type', 'text');
        open.css('display', 'none');
        close.css('display', 'block');
    })
    close.click(() => {
        password.attr('type', 'password');
        close.css('display', 'none');
        open.css('display', 'block');
    })

    
    
})