
var addPointsSection = (data_id_node) => 
{
	var price_section = data_id_node.querySelector(".price-section");
	if (price_section)
	{
		var id = price_section.querySelector("span").id.split("_")[1];
		var link = document.querySelector("a#itemName_"+id).href

		var xhr = new XMLHttpRequest();
		xhr.onload = ((xhr, price_section, id) =>{
			var res_dom = xhr.responseXML;
			if(res_dom != null)
			{
				var point = res_dom.querySelector(".loyalty-points");
				if ( point != null ){
					price_section.appendChild(point);
				}
			}
		}).bind(null, xhr, price_section, id);

		xhr.open("GET", link);
		xhr.responseType = "document";
		xhr.send();
	}
}


var data_id_nodes = document.querySelectorAll("li[data-id]");
data_id_nodes.forEach((data_id_node) => addPointsSection(data_id_node));

var gitems = document.querySelector("ul#g-items");
 
// オブザーバインスタンスを作成
const observer = new MutationObserver((mutations) => {
	mutations.forEach((mutation) => {
		var addedNodes = mutation.addedNodes;
		if (addedNodes != null)
		{
			addedNodes.forEach((node) => {
				addPointsSection(node)
			});
		}
	});
});    
 
// 対象ノードとオブザーバの設定を渡す
observer.observe(gitems, { childList:true});
