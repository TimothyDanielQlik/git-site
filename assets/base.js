// Load Videos in the Docs
$(document).ready(function () {
    $('img[alt="Qlik"]').each(function () {
        var id = $(this).attr('src').split('/')[$(this).attr('src').split('/').length - 1];
        var video = '<iframe style="width: 100%;height: 450px;" src="https://usott-bdm.qliktech.com/single/?appid=3bd8f159-9c87-4061-aa11-bc2cb1910a60&sheet=75a184d2-932e-47d4-91fb-deb0661a1eb8&opt=ctxmenu,currsel"></iframe>';
        $(this).replaceWith(video);
    });
});