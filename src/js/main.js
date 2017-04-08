;(function($){
    $('.nav-toggle').click(function() {
        $('.nav-toggle, .nav-menu').toggleClass('is-active');
    });

    $('#form').submit(function(e) {
        e.preventDefault();

        var nome = $('#iNome').val();
        var email = $('#iEmail').val();
        var msg = $('#iMsg').val();

        
        $.ajax({
        	url: 'https://formspree.io/paulopaixao@mail.com',
        	method: 'post',
        	data: {
        	  Nome: nome,
        	  Email: email,
        	  Mensagem: msg,
        	  _replyto: email,
        	  _subject: 'Form Cheap Downloads',
        	  _format: 'plain'
        	},
        	dataType: 'json',
        	success: function() {
        		$('.is-success').slideDown('fast');
        	},
        	error: function() {
        		$('.is-danger').slideDown('fast');						
        	},
        	beforeSend: function() {
        		$('.button').addClass('is-loading');
        		$('.notification').slideUp('fast');
        	},
        	complete: function() {
        		$('.button').removeClass('is-loading');
        	}
        });
    });

    $('button.delete').click(function(e) {
        e.preventDefault();
        $('.notification').remove();
    });
})(Zepto)