$(document).ready(function () {
    $("pre code").each(function (i, block) {
        hljs.highlightBlock(block);
    });

    $("#navClickBar").click(function () {
        const x = $("#navHeaderBar")[0]; // //returns a HTML DOM Object;
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    });

    $("#openSideBar").click(function () {
        const x = $("#mySidebar")[0]; // //returns a HTML DOM Object;
        if (x.className.indexOf("w3-show") == -1) {
            x.className += " w3-show";
        } else {
            x.className = x.className.replace(" w3-show", "");
        }
    });

    $("#closeSideBar").click(function () {
        $("#mySidebar").hide();
    });
});