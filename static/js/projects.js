$(document).ready(function() {
	function expand(obj) {
		obj.next().slideDown(200);
		obj.addClass("open");
	}

	function collapse(obj) {
		obj.next().slideUp(200);
		obj.removeClass("open");
	}


	$("button.projectName").on("dblclick", function() {
		console.log($(this).next().children("a.projectlink"));
		window.location = $(this).next().children("a.projectlink").attr("href");
	}).on("click", function() {
		$(this).parent().css("border-color", "blue");
		if (!$(this).hasClass("open")) {
			expand($(this));
		} else {
			collapse($(this));
		}
	});

	$("#expandall").on("click", function() {
		$("button.projectName").each(function() {
			expand($(this));
		});
	});

	$("#collapseall").on("click", function() {
		$("button.projectName").each(function() {
			collapse($(this));
		});
	});
});