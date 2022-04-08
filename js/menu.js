let on_of=false;

function openr(){
	var doc=document.getElementById("menu");
	var doc_img=document.getElementById("ikonka");
	if (on_of) {
		doc.setAttribute("class", "menu off");
		doc_img.setAttribute("class", "offimg");
	}
	else{
		doc.setAttribute("class", "menu on");
		doc_img.setAttribute("class", "onimg");
	}
	on_of=!on_of;
}
function tip_m__(){
	let el=document.getElementById("tip_m_select");
tip_m=+el.value;
}