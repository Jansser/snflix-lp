var getUrlParameter = function getUrlParameter(sParam) {
	var sPageURL = decodeURIComponent(window.location.search.substring(1)),
		sURLVariables = sPageURL.split("&"),
		sParameterName,
		i;

	for (i = 0; i < sURLVariables.length; i++) {
		sParameterName = sURLVariables[i].split("=");

		if (sParameterName[0] === sParam) {
			return sParameterName[1] === undefined ? true : sParameterName[1];
		}
	}
};

var aff = getUrlParameter("aff");

if (aff != undefined) {
	var imgtag = document.createElement("img");
	imgtag.height = "1";
	imgtag.width = "1";
	imgtag.style = "border-style:none;display:none;";
	imgtag.alt = "";
	imgtag.src = "//www.editorasanar.com.br/js/afiliados.php?aff=" + aff;
}
