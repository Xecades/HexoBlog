hexo.extend.tag.register('kbd', function (args, content) {
    var key = args[0];
    switch (key.toLowerCase()) {
        case "enter":
            key += "↵";
            break;
        case "shift":
            key += "⇧";
            break;
        case "command":
            key += "⌘";
            break;
        case "option":
            key += "⌥";
            break;
        default:
            break;
    }
    return '<kbd class="kbd-display">' + key + '</kbd>';
});