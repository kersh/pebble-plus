$(document).ready(function()
{
	var SavingLib = {}; // global Object container
	SavingLib.refreshInterval = '';
	SavingLib.hidingInterval  = '';

	$('#loading').hide(); // hide loading initially.
	
	$('.edit-box').bind('click', editMode);

	function editMode() {
		clearInterval(SavingLib.refreshInterval);
		clearInterval(SavingLib.hidingInterval);

		SavingLib.refreshInterval = setInterval(function(){
			$('#loading').fadeIn();
			// console.log('Show loading in editMode');
			SavingLib.hidingInterval = setInterval(function(){
				if ($('#loading').is(':visible')) {
					$('#loading').fadeOut();
					// console.log('HIDE loading in editMode');
					clearInterval(SavingLib.hidingInterval);
				}
			},2000);
		},5000);
	}

	$('.edit-box').bind('focusout', savingMode);
	
	function savingMode() {
		clearInterval(SavingLib.refreshInterval);
		clearInterval(SavingLib.hidingInterval);
		currentText = $(this).val().replace(/"/g, "&quot;");
		// console.log(currentText);
		// console.log("Saved");

		$('#loading').fadeIn();
		SavingLib.hidingInterval = setInterval(function(){
			if ($('#loading').is(':visible')) {
				$('#loading').fadeOut();
				// console.log('HIDE loading in editMode');
				clearInterval(SavingLib.hidingInterval);
			}
		},2000);

		// saving data to the server
		// $.ajax({
		// 	type: "POST",
		// 	url: "handler.js",
		// 	data: currentText,
		// 	success: function(msg) {
		// 		// action o indicate success
		// 		console.log("successfuly saved!");
		// 	}
		// });
	}
});