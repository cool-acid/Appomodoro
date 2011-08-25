$(document).ready(function() {
    
    $('h1.logo').click(function(){
        window.location = "/";
    });
    $('#sendInvitation').click(function(){
        $.get('/xmppInvitation',function(data){
            console.log(data);
        });
        return false; 
    });
    
});

