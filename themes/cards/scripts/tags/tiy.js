/* global hexo */

'use strict';

function tiy(args) {
    var file = "";

    if (args[0] != "")
        file = "?file=" + args[0];

    var height = args[1] || "95vh";
    return `<div class="TIY-container" style="height:${height}"><iframe frameborder="no" src="https://tiy.xecades.xyz/${file}" width="100%" height="100%"></iframe></div>`;
}

hexo.extend.tag.register('tiy', tiy, {
    ends: false
});