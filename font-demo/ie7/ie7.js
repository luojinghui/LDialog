/* To avoid CSS expressions while still supporting IE 7 and IE 6, use this script */
/* The script tag referencing this file must be placed before the ending body tag. */

/* Use conditional comments in order to target IE 7 and older:
	<!--[if lt IE 8]><!-->
	<script src="ie7/ie7.js"></script>
	<!--<![endif]-->
*/

(function() {
	function addIcon(el, entity) {
		var html = el.innerHTML;
		el.innerHTML = '<span style="font-family: \'icomoon2\'">' + entity + '</span>' + html;
	}
	var icons = {
		'iconcaution': '&#x2757;',
		'iconheart': '&#x1f49b;',
		'iconclock': '&#x1f553;',
		'iconhappy': '&#x1f60a;',
		'iconsad': '&#x1f61e;',
		'iconclock2': '&#x1f554;',
		'iconforward': '&#x279c;',
		'iconsearch': '&#x1f50d;',
		'iconcancel': '&#x1f6ab;',
		'iconcross2': '&#x2297;',
		'iconplay': '&#x23e9;',
		'iconarrow-left3': '&#x2b05;',
		'iconarrow-up3': '&#x2b06;',
		'iconarrow-down3': '&#x2b07;',
		'iconarrow-right': '&#x2794;',
		'iconheart2': '&#x1f49a;',
		'iconforbidden': '&#x2298;',
		'iconpill': '&#x1f48a;',
		'iconbell': '&#x1f47c;',
		'iconlock': '&#x1f512;',
		'iconunlock': '&#x1f513;',
		'iconclock3': '&#x1f557;',
		'iconheart3': '&#x1f49c;',
		'iconcircle-plus': '&#x25ce;',
		'iconcircle-check': '&#xe042;',
		'iconcircle-cross': '&#xe043;',
		'iconpower': '&#xe086;',
		'iconarrow-left': '&#xe094;',
		'iconarrow-right2': '&#xe095;',
		'iconarrow-up': '&#xe096;',
		'iconarrow-down': '&#xe097;',
		'iconban': '&#xe107;',
		'iconplus': '&#xe114;',
		'iconminus': '&#xe115;',
		'iconcheck': '&#xe116;',
		'iconcross3': '&#xe117;',
		'iconcircle-minus': '&#xe041;',
		'iconsmile': '&#xe90e;',
		'iconsad2': '&#xe90f;',
		'iconwink': '&#xe910;',
		'iconcool': '&#xe911;',
		'iconbaffled': '&#xe909;',
		'iconneutral2': '&#xe912;',
		'iconnotification': '&#xe913;',
		'iconquestion': '&#xe914;',
		'iconinfo': '&#xe915;',
		'iconcancel-circle': '&#xe916;',
		'iconblocked': '&#xe917;',
		'iconarrow-up2': '&#xe918;',
		'iconarrow-right22': '&#xe919;',
		'iconarrow-down2': '&#xe91a;',
		'iconarrow-left2': '&#xe91b;',
		'0': 0
		},
		els = document.getElementsByTagName('*'),
		i, c, el;
	for (i = 0; ; i += 1) {
		el = els[i];
		if(!el) {
			break;
		}
		c = el.className;
		c = c.match(/icon[^\s'"]+/);
		if (c && icons[c[0]]) {
			addIcon(el, icons[c[0]]);
		}
	}
}());
