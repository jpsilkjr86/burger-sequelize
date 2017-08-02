$(document).ready(function(){
	// functionality for posting eat-state
	$(document).on('click', '.eat', function () {
		// saves burger name as variable
		let thisBurger = $(this).attr('value');
		// posts it to the surver
		$.post('/burgers/eat', {burger_name: thisBurger}).done(data => {
			console.log(data);
			location.reload();
		});
	});

	// functionality for posting order-more-state
	$(document).on('click', '.order-more', function () {
		// saves burger name as variable
		let thisBurger = $(this).attr('value');
		// posts it to the surver
		$.post('/burgers/ordermore', {burger_name: thisBurger}).done(data => {
			console.log(data);
			location.reload();
		});
	});

	// functionality for submitting form to add burgers
	$('#add-form').on('submit', function(event) {
		event.preventDefault();
		$.post('/burgers/new', {
			burger_name: $('#burger-name').val().trim()
		}).done(data => {
			console.log(data);
			location.reload();
		});
	});

});