var webpSuffix = "";

async function supportsWebp() {
	if (!self.createImageBitmap) return false;

	const webpData = 'data:image/webp;base64,UklGRh4AAABXRUJQVlA4TBEAAAAvAAAAAAfQ//73v/+BiOh/AAA=';
	const blob = await fetch(webpData).then(r => r.blob());
	return createImageBitmap(blob).then(() => true, () => false);
}

(async () => {
	webpSuffix = (await supportsWebp()) ? ".webp" : "";

	document.querySelectorAll([".post-thumbnail", ".LinkCard-image"]).forEach((item) => {
		item.style["backgroundImage"] = item.style["backgroundImage"].replace(".picSuffix", webpSuffix);
	});

	document.querySelectorAll("img").forEach((item) => {
		item.outerHTML = item.outerHTML.replace(".picSuffix", webpSuffix).replace("fakesrc", "src");
	});

	mediumZoom('.post__content :not(a) > img, .post__content > img');

	console.clear();
})();

// const isSupportWebp = (document.createElement('canvas').toDataURL('image/webp', 0.5).indexOf('data:image/webp') === 0);
// const webpSuffix = isSupportWebp ? ".webp" : "";

// document.querySelectorAll([".post-thumbnail", ".LinkCard-image"]).forEach((item) => {
// 	item.style["backgroundImage"] = item.style["backgroundImage"].replace(".picSuffix", webpSuffix);
// });
// document.querySelectorAll("img").forEach((item) => {
// 	item.outerHTML = item.outerHTML.replace(".picSuffix", webpSuffix);
// });