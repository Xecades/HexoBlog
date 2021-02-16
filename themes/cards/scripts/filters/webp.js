'use strict';

function replacePic(content) {
    return content.replace(/\/assets\/(.*?)\.(jpg|jpeg|png)/gi, (word) => {
        return word + ".picSuffix";
    });
}

function imgProcess(content) {
    return content.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, (str, before, src, after) => {
        return `<img${before}data-src="${src}" class="lazyload"${after}>`;
    });
}

// function webpProcess(content) {
//     return content.replace(/<img(.*?)src="(.*?)"(.*?)>/gi, function (str, p1, p2) {
//         if (/webp-comp/gi.test(p1) || !/\/assets\/(.*?)\.(jpg|jpeg|png)/gi.test(p2)) {
//             return str;
//         }
//         return `<picture><source srcset="${p2.replace(/\.(jpg|jpeg|png)/gi, '.webp')}" type="image/webp">${str.replace('<img', '<img webp-comp')}</picture>`;
//     });
// }

hexo.extend.filter.register('after_render:html', (content) => {
    return imgProcess.call(this, content);
});

if (hexo.config.use_webp) {
    // hexo.extend.filter.register('after_render:html', (content) => {
    //     return webpProcess.call(this, content);
    // });
    hexo.extend.filter.register('after_render:html', (content) => {
        return replacePic.call(this, content);
    });
}