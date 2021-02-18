var addPointsSection = (price_section_query, data_id_node) => 
{
	if (data_id_node.nodeType != Node.ELEMENT_NODE) return;

	var price_section = data_id_node.querySelector(price_section_query);
	if (price_section)
	{
		var link = data_id_node.querySelector("a[title]").href;

		var xhr = new XMLHttpRequest();
		xhr.onload = ((xhr, price_section) =>{
			var res_dom = xhr.responseXML;
			if(res_dom != null)
			{
				var point = res_dom.querySelector(".loyalty-points");
				if ( point != null ){
					price_section.appendChild(point);
				}
			}
		}).bind(null, xhr, price_section);

		xhr.open("GET", link);
		xhr.responseType = "document";
		xhr.send();
	}
}

class AddPointNode{
	constructor(price_section_query)
	{
		this.price_section_query = price_section_query;
	}

	addNode(node)
	{
		addPointsSection(this.price_section_query, node);
	}
}

var observeItems = (items_query, price_section_query) =>
{
	var addNode = new AddPointNode(price_section_query);
	var gitems = document.querySelector(items_query);
	if (gitems)
	{
		var data_id_nodes = document.querySelectorAll("li[data-id]");
		data_id_nodes.forEach((node) => addNode.addNode(node));
		
		// オブザーバインスタンスを作成
		const itemObserver = new MutationObserver((mutations) => {
			mutations.forEach((mutation) => {
				var addedNodes = mutation.addedNodes;
				if (addedNodes != null)
				{
					addedNodes.forEach((node) => addNode.addNode(node));
				}
			});
		});    
		
		// 対象ノードとオブザーバの設定を渡す
		itemObserver.observe(gitems, {childList:true});
	}
}


var ObserveWishList = () =>
{
	// for list style
	observeItems("ul#g-items", ".price-section");

	// for grid style
	observeItems("ul#g-items-grid", ".wl-grid-item-bottom-section");
}

// update current page
ObserveWishList();


// observe wishlist style
var target = document.querySelector("div#item-page-wrapper > div");
const observer = new MutationObserver(_ => {
	console.log("hoge");
	ObserveWishList();    
});
observer.observe(target, {childList:true});