$(document).ready(function () {
    $("#btnLogin").click(function() {
        login($("#ipUsername").val(), $("#ipPassword").val(), (data) => {
            if(typeof data.data == 'undefined')
            {
                alert("Đăng nhập thất bại! Vui lòng kiểm tra lại thông tin")
            }
            else
            {
                window.location.href = '/index'
            }
        })
    })
})
