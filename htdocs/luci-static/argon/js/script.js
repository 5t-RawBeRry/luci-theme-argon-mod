/**
 *  Argon is a clean HTML5 theme for LuCI. It is based on luci-theme-material and Argon Template
 *
 *  luci-theme-argon
 *      Copyright 2019 Jerrykuku <jerrykuku@qq.com>
 *
 *  Have a bug? Please create an issue here on GitHub!
 *      https://github.com/jerrykuku/luci-theme-argon/issues
 *
 *  luci-theme-bootstrap:
 *      Copyright 2008 Steven Barth <steven@midlink.org>
 *      Copyright 2008 Jo-Philipp Wich <jow@openwrt.org>
 *      Copyright 2012 David Menting <david@nut-bolt.nl>
 *
 *  MUI:
 *      https://github.com/muicss/mui
 *
 *  luci-theme-material:
 *      https://github.com/LuttyYang/luci-theme-material/
 *
 *  Agron Theme
 *	    https://demos.creative-tim.com/argon-dashboard/index.html
 *
 *  Login background
 *      https://unsplash.com/
 *
 *  Licensed to the public under the Apache License 2.0
 */

/*
 *  Font generate by Icomoon<icomoon.io>
 */
(function ($) {
    $(".main > .loading").fadeOut();

    /**
     * trim text, Remove spaces, wrap
     * @param text
     * @returns {string}
     */
    function trimText(text) {
        return text.replace(/[ \t\n\r]+/g, " ");
    }


    var lastNode = undefined;
    var mainNodeName = undefined;

    var nodeUrl = "";
    (function (node) {
        if (node[0] == "admin") {
            luciLocation = [node[1], node[2]];
        } else {
            luciLocation = node;
        }

        for (var i in luciLocation) {
            nodeUrl += luciLocation[i];
            if (i != luciLocation.length - 1) {
                nodeUrl += "/";
            }
        }
    })(luciLocation);

    /**
     * get the current node by Burl (primary)
     * @returns {boolean} success?
     */
    function getCurrentNodeByUrl() {
        var ret = false;
        if (!$('body').hasClass('logged-in')) {
            luciLocation = ["Main", "Login"];
            return true;
        }
        $(".main > .main-left > .nav > .slide > .active").next(".slide-menu").stop(true).slideUp("fast");
        $(".main > .main-left > .nav > .slide > .menu").removeClass("active");
        $(".main > .main-left > .nav > .slide > .menu").each(function () {
            var ulNode = $(this);

            ulNode.next().find("a").each(function () {
                var that = $(this);
                var href = that.attr("href");

                if (href.indexOf(nodeUrl) != -1) {
                    ulNode.click();
                    ulNode.next(".slide-menu").stop(true, true);
                    lastNode = that.parent();
                    lastNode.addClass("active");
                    ret = true;
                    return true;
                }
            });
        });
        return ret;
    }

    /**
     * menu click
     */
    $(".main > .main-left > .nav > .slide > .menu").click(function () {
        var ul = $(this).next(".slide-menu");
        var menu = $(this);
        if (!menu.hasClass("exit")) {
            $(".main > .main-left > .nav > .slide > .active").next(".slide-menu").stop(true).slideUp("fast");
            $(".main > .main-left > .nav > .slide > .menu").removeClass("active");
            if (!ul.is(":visible")) {
                menu.addClass("active");
                ul.addClass("active");
                ul.stop(true).slideDown("fast");
            } else {
                ul.stop(true).slideUp("fast", function () {
                    menu.removeClass("active");
                    ul.removeClass("active");
                });
            }

            return false;
        }

    });




// define what element should be observed by the observer
// and what types of mutations trigger the callback
    if ($("#cbi-dhcp-lan-ignore").length > 0) {
        observer.observe(document.getElementById("cbi-dhcp-lan-ignore"), {
            subtree: true,
            attributes: true
        });
    }

    /**
     * hook menu click and add the hash
     */
    $(".main > .main-left > .nav > .slide > .slide-menu > li > a").click(function () {
        if (lastNode != undefined)
            lastNode.removeClass("active");
        $(this).parent().addClass("active");
        $(".main > .loading").fadeIn("fast");
        return true;
    });

    /**
     * fix menu click
     */
    $(".main > .main-left > .nav > .slide > .slide-menu > li").click(function () {
        if (lastNode != undefined)
            lastNode.removeClass("active");
        $(this).addClass("active");
        $(".main > .loading").fadeIn("fast");
        window.location = $($(this).find("a")[0]).attr("href");
        return false;
    });
    
    /**
     * fix submenu click
     */
    $("#maincontent > .container > .tabs > li").click(function () {
        $(".main > .loading").fadeIn("fast");
        window.location = $($(this).find("a")[0]).attr("href");
        return false;
    });

    /**
     * get current node and open it
     */
    if (getCurrentNodeByUrl()) {
        mainNodeName = "node-" + luciLocation[0] + "-" + luciLocation[1];
        mainNodeName = mainNodeName.replace(/[ \t\n\r\/]+/g, "_").toLowerCase();
        $("body").addClass(mainNodeName);
    }
    $(".cbi-button-up").val("");
    $(".cbi-button-down").val("");


    /**
     * hook other "A Label" and add hash to it.
     */
    $("#maincontent > .container").find("a").each(function () {
        var that = $(this);
        var onclick = that.attr("onclick");
        if (onclick == undefined || onclick == "") {
            that.click(function () {
                var href = that.attr("href");
                if (href.indexOf("#") == -1) {
                    $(".main > .loading").fadeIn("fast");
                    return true;
                }
            });
        }
    });

    /**
     * Sidebar expand
     */
    var showSide = false;
    $(".showSide").click(function () {
        if (showSide) {
            $(".darkMask").stop(true).fadeOut("fast");
            $(".main-left").stop(true).animate({
                width: "0"
            }, "fast");
            $(".main-right").css("overflow-y", "auto");
            showSide = false;
        } else {
            $(".darkMask").stop(true).fadeIn("fast");
            $(".main-left").stop(true).animate({
                width: "15rem"
            }, "fast");
            $(".main-right").css("overflow-y", "hidden");
            showSide = true;
        }
    });


    $(".darkMask").click(function () {
        if (showSide) {
            showSide = false;
            $(".darkMask").stop(true).fadeOut("fast");
            $(".main-left").stop(true).animate({
                width: "0"
            }, "fast");
            $(".main-right").css("overflow-y", "auto");
        }
    });

    $(window).resize(function () {
        if ($(window).width() > 921) {
            $(".main-left").css("width", "");
            $(".darkMask").stop(true);
            $(".darkMask").css("display", "none");
            showSide = false;
        }
    });

    /**
     * fix legend position
     */
    $("legend").each(function () {
        var that = $(this);
        that.after("<span class='panel-title'>" + that.text() + "</span>");
    });

    $(".cbi-section-table-titles, .cbi-section-table-descr, .cbi-section-descr").each(function () {
        var that = $(this);
        if (that.text().trim() == "") {
            that.css("display", "none");
        }
    });

    $(".node-main-login > .main .cbi-value.cbi-value-last .cbi-input-text").focus(function () {
        //$(".node-main-login > .main > .main-right > .login-bg").addClass("blur");
    });
    $(".node-main-login > .main .cbi-value.cbi-value-last .cbi-input-text").blur(function () {
        //$(".node-main-login > .main > .main-right > .login-bg").removeClass("blur");
    });


    $(".main-right").focus();
    $(".main-right").blur();
    $("input").attr("size", "0");

    if (mainNodeName != undefined) {
        console.log(mainNodeName);
        switch (mainNodeName) {
            case "node-status-system_log":
            case "node-status-kernel_log":
                $("#syslog").focus(function () {
                    $("#syslog").blur();
                    $(".main-right").focus();
                    $(".main-right").blur();
                });
                break;
            case "node-status-firewall":
                var button = $(".node-status-firewall > .main fieldset li > a");
                button.addClass("cbi-button cbi-button-reset a-to-btn");
                break;
            case "node-system-reboot":
                var button = $(".node-system-reboot > .main > .main-right p > a");
                button.addClass("cbi-button cbi-input-reset a-to-btn");
                break;
        }
    }

})(jQuery);
		console.log("%c ","background: url(data:image/gif;base64,R0lGODlhZABAAPMOAD0fJXonTU5bT50oWLdaXM9AVd5ydJmeXLCJfdeUi/iil//Lgvrfwfnu0AAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQJCAAOACwAAAAAZABAAAAE/9DJSau9OOvNu/9gKI5kaZ5oqq5s675wLM90bd94ru9871OAn3ACaASHv+LxBVh6mrpiw8hcODlFK046vaoAC21HKqY1p2gvCoAwlDXcN/OMTreK7bC6QpavmmALdXV7JVJufnxoendNYY+Pg4UjXIiTDpWMKY6QnZFdLJmaF1wNlmuBnqqCVF91iIkSpacmqaurrZsNCLywe3i8ebFYnLfGlyB4U7AGasq7vslNA9S2xp7IT7xosH7Py4/ZmADU5dXXq+JYr93NgIAIg9Eb0+b21ujq69DozfFTvcLRs3ePHL5jfxAA6HbNwL+AYZplIEewGsVz6IZROngtWBtmXv/eAbpXkWMnfVhUMcwY0d27AAAOyJRZ7yJBk6M2rVr5iCekZgcABZ1JNKjNmxwNSPyj0lg7lTEBwIRZlOhRixh/Lv2y01iATivdUW1S1aq5elkXKN3KtafatT4DwFXrqRlVo2XNoj0Ll63Ony1vGVDwFTBYoXmrXi23UCmUO1oD71TA4OlhPYmLLmb82IUtuWopI2I4mEHlR4VbNnsbM/PMq+9kfF5revRPBZRrh0nty5JrqyIZy4YUAOZLpT2NAyq+gLdamGtb/w5acQDKEKnsilx4+vl2ubyjO55uFun1J3SbKTBSHGZuNwy6tAfAQAEzpcrJkqd+s8v2NRGpRZ//EQUU2IBptcVHoIH1wdJeMxDCJIAA0y1GxyBGdCZCYwbINWAABRYQAIIITgFigSN2I5djLAIw4YswxijAO4wZgaEklODXYTPxnSgiiaaZGGKKxEXnYX7bxWjTOzdi6NcYOvIYZHtAltgAlQytqJ1+eW1Xko1NLoNSY1I5hltuVaZZnwIBPhcdl65xsRcA65VSRzAEXAcFmWeqqSZuO+7Wl3S/zSiFQtXgdqdHCgFSS3R+RsrAim5qSWihMwLURAKcKsTLf2sMSieaJJKKoH34NWZpYjLCyEaj250HB4fRjRPrrW8uBF10rRp6q6Nm9OXYhsXtCRMmuYIqxK0kNOFhJmdNDIvEDGSSIuu00miI7bbcduvtt+CGK+645JZr7rnopqvuDBEAACH5BAkIAA4ALAgADQBTACkAAAT/0MlJJQA156u7/6AVOsCCjVZjomwLNOdXruOrxm3e2bgGIAYayHbTGSuXhrKHbAAXQo8NyjzKLliltjqxBaM+LdV6xUKh2jSXpP2uU0o3GXk529HppbR9XhMbcnMkM3eFC2p7fGM7aYFkhIaGW3sIlV9gXU6VT5g5kJGRMJRxZwZVLwhKnJ1SWHWgsKwklYqLFKiNfSgXA72+r7GFfo2XC6auF6m5tq2+zr+fwcNOxZGmypqXbyTP3b3A0jIIANWwBsqWpX7e0LwD0ZFv4MFQm0CXphvIAM/u/eEyDJWjZ+yYqwAADihU6I4fu3fm5FkDNdCOqQNYMC7ciNHhQ3gF/7fBqwil2MCLABAi5LjRozMsEO8YyBdQIKwAMgsdW3mBZcuXLiHNpFmzZMGhkQIMDVLO1MqOPn/6e7mUqJScBSkqwGlRZ8aoLF32G8ohhNAvM7UyMOmVCliOYvuVrWFHqTEFa41axJsXCteSM0sEfvuzGxZPdYcy6GtSAd++f7W5Idxy3zfEZwIgPJi25GYsmhdENoaQLOWFcS+7UPcZiwHGrS8ojUx28GnU3g7vMmYMgAIYmhHyDcJgSXAADBTgmxn7NsPcS/b5MGqqOIAC2BssXvx6CfYC2pVn1myqPEIBAk6nTpInOg5yzKs3CPA9wPbtSuhjt19MaeD/AKAn4NaABArgyi8wtJfHCfDNJp9+Bdh3X3Hz1deXX2QpldI+rhAY1DcKtpdPg4HhF9yE+M2n2YUYBvbZW5YB9cIfCh7jYmCOPYbijo7pZYB/Bt1GxFS+JajgJgRgwAF8vjm245PJKWeXaFUldJuBNozzjWNp2FOJK0iQBeWYDPhH2o+mOYdelhck4OY4XyKzQ5VN8sjjUKWhaZtPBQ74wzgcbjNIVSMGGihZF/wIX2B9YmnoXJ4QatUumi2JEAmIcihIK9IZIZtBXTC56ag6iKoPqaiyAGaqR0QAACH5BAkIAA4ALAgADQBTACkAAAT/0MlJKQA156u7/2BoLZgoAaSpripgpCbQwGztcZ/8lqE887ag4yIDbhozWg75E8aIUGbDaGEulB1fkuo8Qa9XqZR7Qr6wRytaSAS7w+LpjXlel6VXMuvy7sPHc2ZgelpJdisofn5ihA0Ij3VkMo+QeV2JiopMjQiCVwZck0gIkYhQmJmZclmdnpYVonSDTwO1tnypio10dQugpwCtsq85ALbHt6i5xGmky6DClcwaxsjWA7jLh0MILtqfrdK+hNfJF7XKmXpD6cuUpHWgG8DI59btb+tDfr3fn79QAgA4QJCgvWrl8M26oaifG4dvQB0gMrGgxYkIEzaUl4Nfql4Q/yUCECjwosWM5rD1McCRocdMASKuvFDygsmTx+yhe8hS3z4wL1gKVRRAaNCZJTHexKkzp9GWLoH+y2RAQcyHM20uNYnSaU+fP6f6gvhJAQOQM/Nsvdg1Jw4RqIr6MnumX1UGZ8Fc/Qdq7MC1BdsS2eOmKEu8dR8qMIv4yt5IZ/4CNkgPG2G9AgOyBJqZSICYj30JFCp5clvLiICOBGYgr2hgRR+T7jmZ7bXBMXyNUzDls0DGLxggGfkZAAMF8Vh21lp74u3hwKh9GiccQIHrDfAiFj7leoHsyDEXdeFCoAABtQUXGvN2iNDxwgN4D6BdOxL51+n3MgyqJ6jzAAYooNoAUNwyRRyMnKCcAfA1gF8B9NXH3YP6FUbaeMsBI2BG1ayHYAPyuMBgT/b5JqF9Dn7mml4XUrRVZeYc+KEZF/RkGACLMXbijscpMJ1opDEHmBZN4ShjHJQQgAEHIuK4GI88LjaiY0+VBhiBPnSDzmJSvPMIFLCQBuWYDBgGJH9WXkngKBck4GY3X56SRZVO7qhjfcgpJyKaWw0YYDDdANNeFiIataSgiBZKBIOF/udnomDa0ChpNRDHpEDufSVoF8VEJ+lIAE1QI1SclopIT9SAZeqqFuDGahARAAAh+QQJCAAOACwIAA0AVAApAAAE/9DJSScANeeru/9gWAELJkqkea7sCRjlCjRxa2sXF85wDc401a2VAzYaOg9v4VMeg0NZ7kl9CkfH3nXzZDajm4t3UaVuKUDtx0hjnqO58biMXD/VzrsbjCbJ5WVvFnoLBm9sDXhgYn+NVYIOMwiTPV+Dk5R7i42cTFY/DQhZXoZcoUcIlZBhRZ2uZKsAoqNeW5JUqi4AA7y9jK9ysbiVhUU5s4SWYb3Mvn7AmnmpwIbImdEdu83bA7/AsQgv0EwGs9fFStzOF7zPrquR7uOYqZWlI8baztzyjfD9hcb9MWDIWAAABxImZNdNXbt3OzgRkzNxIMIcBxAq3MjQIUBy//8aVRxDbKShjAcPblypj1mObgPvrZHoKgBFiwBUXljJ0mVLeQThRSJZiCBBTgGMwqhoSGVGjTwV7uroUqnMmUSLdjKgwGZWkhijRm3Z7EVQoUNJ9TgqUQGDkhbdiOVJtmwSEe6SFnK7lqLbt168kgtaFOrchfzuuhiTlCADwAFJKfgLWbAqLYdZ5mtnI+/BIo1Jfc4RwKblQgeNGs5clzMRUjnzGYBsYDTp2mqDBs1MNzFaFAENKUBS+uBfGAyO5CwNgIECewRtr2bNT3m+bOSKJQdQoHuDx49nK+9e4PvzwKUNqT8oQADvjInpIFFstrah5AHIBwAP/kj+7vsR05jkeuoB0N6BCCYoQBG+ICHfJyhEZ19zDfxXwH78JVehfpAxMWBOTeVTRII/tfMgLiaY1Vhzj1VYWob9uRigHB+OdthmPs2ASBmlmAWicJPBKCR4k2WHmmo7vWcEVQAMtyMqkxCQIgY+TkbZkBlOZp+HVk0314JAhNPOZFTQM0kRG6iG5ZoMhGbfh+8p1F6YFyRgZzhnGqNEl01eSaSQz0WnompfKnigLOGIKNQFVvWoqKJIvpCaaoaC+ahiLNSn1G8WMEflQZFEeh0fa4g4xAVJ5WCBj6S2CkdQOHDq6qwoqEorGBEAACH5BAkIAA4ALAgADQBTACkAAAT/0MlJJQA156u7/9slghSwYOQEGGjqaiLQzPT4recLIOzrq6bFgkas3QzC1q3BU/5AF6G0SHRWZMgcSdboPbfS8JBqvXaTWxqy/LUExdMqVI32cGfrNgzOly/xdR13Z2w/UXx9DYUqdAteG0VZi1tviHAzkzIIm1lakJucgYaVlnyTDpqAQo+MTDM8oikiAwOHpXCnO42xqK67p260wrSkt7lEBp2OMSIIkVK5AMPTtbdhx0zKiCzOr7C8V9TUtqXAOzjWq92hq4XS4sQXxNbmxdagPJ2sbszT8v7lXNjTlm4VC2YBABxYuPDfO3H2wG3YZomgGBYHRGRkyDHjQ4jF/5KZ42NRijKLGAEkTNiR40dhDi+OJFkqwEU4B1leaOly2L95BvcJCoMkmVFEAYwWxalSoUeePX/6VDrTpMGKCmwSZboTasuXUw8KJJolGVYGJ5km8doRrE9gKsIkdaQA7aqLde0K0RrUhEi2Pcdx8FEpaTIGek8qyKuXbyd0TgE3ZPYOblwpARLGMGxSs4jMCxw7Smg0smS3tQyZbMrMQGLPnw04Lv1XcmB/g2U5WqZAUeaEeZEwwPQbAAMF+pLBNn0aIibKe3azGA6ggPUGiBG7xmS9AHbkmDOzGJ9QgADbbi9Qea5khfLpDQJ0D5A9+wz51ukrMzx+PADzAAYooNcAMcCkyHp+uJdUUsbFN199iN334H6lMbgcMwJ+VBmCkWCgoEj2/QahffFlphdmFWrkFWW4yTDIegeJZBgAizE24o2L3TVaaV2dVoOGvb1IAygEeOihSDXeqORxyM0VmlIY2XYAgVwgUNliROCzSQxXlLbklwxwJtuYtUlpXpUXJKCmlVsyIwiUFyyGI45GkUZmlDwNGOAOVlKWmx3uUYWKn4QGKoJsgbKgJ5WF/kkYlCI9oZJmqCSECo9+6kEJdF9cwGBuF0Sq6aijuleGo6SmSpgNqmoaAQAh+QQJCAAOACwIAAsAUwArAAAE/9DJSau9OOt9gf8eJ45kKX1NqqbAFpavKXvLarcasCy4qPMy2K9mY3EAiF3PlVwGM7SdtOjEIJUjpAH4tA6l01W1g9hyc4jyuUv5gsGqsQWQMsvbdSx74n7DG3d4DWZrcyp2eyd+i2CBfHl6VoeRXX2MUo4nK2YGcnSblDOXl5kOdGlqoY+oqaVzH6OMpaeQC52GDQgprSYeA78DlqRZurWFprmgql7AzcKLs5uEtiAfxZPLFb7Nzs9v0bnTjJ3XaYSOANzc6cGxx1YIAOKjBsXmUrdW6sDbv97vHf4tYmWAUL421djx2+fNlaV57nYUTBgAwIGLF7cpVCfM4bhLEP/BdDrwgSTGkyQ3rmvnx6OfkBJFLhoJoGJFlCdVBmPn5qCLj5cCvJnXqaZFDzhzOluHz2cOmQWjMgoQdQtRoxktJsWYrh+/qi7xSYRpQIFQmUNLbsWp86vTp03HglTAYNpVJWtRtuXnSpEUqrbochpKt+5fkRNtjczLleOHXmCoFmRg2JZIBYUrn7WsxA7jnNX4Qf5bEYRkfKU/BBC62WrFqFo/k9wXbDS11B8MVDaA2wPV1rAnylbquK8OqwAUAFpdsfAWBiyYA2CgwGDB3sMzMmSRsEPMTtABFBjfgDJl3SzGFyhfnTRVefIqChAgu62HItyXyLsOvkEA9QGYZ17nCv+NF+A0knUyUSfzNejggwKAwA8g+IlxAn/vQVdgAQEKCJ1/AFa2Q4I1ddJbNQ9uBEKFNtyyn2TTUebfah4OOOOBb5CYWl4JbfcJi0VNBCNmmdVoJGYx2UIiUvXFoaJyP9qACgEthLBfcpgZqSV11QG2QILCDRfhJ/H4g9kKrKQBgjawbekmA6fxJmeYYka4iwcJ5BmPmtVYUVVRWdZYpHnVXfcibGtB6CAS8SQUAxT7gWWKo5RGmttrsCk6ZqWPwvDnRDOsZmVFpsBGaSKQdheEb0X14AGoqMbaC6za9CXrrWve2kUEACH5BAkIAA4ALAgACgBTACwAAAT/0MlJq704642B91wojmT1NSgKlGzLemncrG5tW94ip3T2lb8bB7Ao6na9ThEkIi6SQpPTuJttAAgj1Jd9RqXG8DG2NSG63uu5W65NxVTe8GzQqs/Lr+MND6uGKHV2HSkIdQZtQH2LeVeBYYkAMYKJI3yMkICPRYiEKYJpLpeYjY50mReSa6CVPh+kfa17KAibC50mtLSUQAADvwOjmLJYtbahE6qTg0O+wMDCsSGSn6C3H9jGn8yuz945sMg+u7CI2qelHd7fv9HcGlgA1qQGxujXPuvQzu2kshLgwhlZYwgULgrYPrBb5+7fnj7zBN5ClDAAgAMYMXpop6+ftGmL/yIaERkG0YEPJzOqPMmPYbCPQyBisibSJACLFleqbNnOGZ+DV0JiCiAmIsWcHnTufMZzigGg8EpOfEoyANVDcBDlZKl06cZvVx3+5ETylgKiUoui7KqTJ9OnDh+OFPSUkQEFDGhmdXKR7dKOweLKLWLVbF5ORfEeJlwS7sS+fjUyDGIpjNWnDBbTVKB4MdpbWihF3pkQmiIjASxiuzxS9YfUCz4fskgV8mi37U5fc/3BgGbeHqzKrg139ErclGMeAqBgRmqLiuswUPEcAAMFBp8CN54RuYqEZZwsnw6ggPkGmTP7VmG+AHrsqFMjmm9RgADjyKkhYQKQqlXrDQTQXusA6aWHgoDmEWjNZfPNB4B9EEYooQDYQDNDFWT0Z4BwiEyHYAEEFjhdgAMuRlht/wGXkIQtYYOhDJ3IsyFcBj4nooEBpmbiiXC55hd4+kiiH4YU9QgXZ53dqCRniN3C4Fq38dBic0PGsAYBK4AgI3OcKenlddgVFttVJnFHITUI+MSZlQSlmdwetX0pJwOszfgkdxjZh6YHCfSZ5hngdUCmB13emGR62Gkn451dTRhhMeC9mYqMYe0R6aWU9kZbbY6eiSl/QJAJ1wupaWkRnHBdqgcOkYpyE0U9eDDqqrReMasUtebqCqi6ihABACH5BAkIAA4ALAgACABTAC4AAAT/0MlJq704660B/2AobkDjjWiqUqW5vjDXNm5s3zN9dnvY36ScTrb4kYrA4ILGHB6RIMACmqwApNMm02hFGKZcCwCBAFcn16l6qQ2jvWr3Gy5XpdfrZt3R+i4MdX1mOFh4eFsyNH5UFzlfe1GGkmt7gnEZjoMvhZOSlUyLgBiZjCmcnXiQJWRwmlYNrK2QYlenqJckNAiKaqKvsLp+s2gAA8YDtreVZKCUYsDNrjzH1MmTqk0Gi3+13bvZuNPU1daG2LDbk4DfsK2lYuPjxci30qMIAOmoBt9koW7z4iELSA/VrDv11sTS1stIt1ryBJZ7N0qSvoR/AD0MAOCAR49X/4wRlHctksVOF9cAOlCL5ceXLEdWK9jLFxFDKadsu7gSAEeOMF/KDElT50F1qALg0acR6JWgQmdWq3m0V0ZtKQNg/cLUZ8eYUKMSrba1qtWMKBUoVYmzZdigMo/ls3lTpx+G6hQw2NkWzFuYceUO47NG6x+9d5fq3atmrV1AGb/+BRmv2whOWrUxYPxHpYLFnB0vyud38seHAQcTbsyxW+ZerWsFUCr6D0eskk0HVl0IUOxaBjgb+H1Fq2jc2nKbZinxio/OgBSYmM1x8RcGOqgDYKAglDbiy09L1IG6kU5u2AEUWN9g8+bgOtYXaN+dtdZ8+TgKELA87hUtWziHButW92EXgHwBuOceDQeul+A2mQGSHCD7VWjhhQJ0I5cJALYhwVzGAWIgggpuxiCJEOJ2H3EPXUhQNx0CKAqIyS1IXYkLNnBjOhF69dRbqI0nhIxXJJcZAJ+BhuOSn51nG24/6hZgNdINqQsZBHjg3FxIfrbkl9x1Z9gCESYX3gEZtoCPSJ81EQsZlrGAG5h0MvDacHiaeeZ+al6RwJ/4wPnQKFtp5CWOSrrX3Xc06gkVhhaOgQ9qAvJQ6IyUZjqXRvltSiGkmsaJgqe4jTrblhzxASWlZxBTnik+cUpMcq3WKgattNiqq6uq2RoBACH5BAkIAA4ALAgACgBTACwAAAT/0MlJq704670B/2Aodo03nmhaAeUHmCOspmzTdovs5jNt27oLYMEDsYq90OsH7CAMxKDQFk1yXjXmLcOCVkkNqNTqwBK1v7Ek61Wvf23yxEysn5ludj0P/1pfdoF2aRp6fhZZYYcqgIKOd3x9CwZjiYpINI+aZ2o1CJ9emBQsn6CLSo2bmp02CDahlIitrXEiWAO4Q6qPnZ+Sp6RMoW6jALjHubuOrHChk1jQrsJ7V8bI17rKp6O0u5TSDabbo9fYxtnKeQgAzqoG0uLPXOXHL8jom8Sp2gulT7BBoN26Rw8fLxyC2vEzQElgAAAHIka0N8BaQVX6Himss9EOpQNY/0BKHAnSYkGDRBhmTLjJ2caPAB4+JDnSZD1rBlUiZKkpQCCFDWe+oFnznkl0DGPtnDQpaccATpn+jAmxJNGiFLE5VVroZ8qOkxT49Jgw5FWaNu8lfbGDoxeGmgwoYOCybJSzJNMaJTbKDtSwdFP+nBuYyNivlJpWxTuxHLQYfpMyKOxSAeHCh4e1YVxTYD3IdQI8hAYV1mgsohdknvRwLWeJeiuCfnYaiwHKtV9AzbxW5euijtkaYUpJQQnRDwlDYQAEOQAGCmAxzP27sWMgAqXogkKJOYAC4BtMnnwbCPgC4qOHFk2p/UMBAl7rXYKmhPA1SaE+bxDgfIDx49nQH+B4/zlTWnvtAQDfggw2KAA09ZRQHx74GbBbd/z5B+BkAmpo4Fr65SZQg0dhMaEWsbBjoUoBIrdhgPyJVlhoIJp1VXYFSXhiGC+oVBoAll324pCWCcbaWkPJl8ZRxlnyQykEeMCWikBaNuSV0EX3l2pbLcbZg57gZBkT/nzy2ChrYakmA6UdeaCXXz7YygsJ1LmOmQJhoCKSVr4o5HjRTafim2c5yCAAeGbHV49dlqHoo3va1tpahoIJ6X0xbKVTDKJN+VAZSCoqByKioqBbQzAwyteorFIpxKqsjnpmrCdEAAAh+QQJCAAOACwIAA0AUwApAAAE/9DJSSUANeeru/+gFTrAgo1WY6JsCzTnV67jq8Zt3tm4BiAGGsh20xkrl4ayh2wAF0KPDco8yi5YpbY6sQWjPi3VesVCodo0l6T9rlNKNxl5OdvR6aW0fV4TG3JzJDN3hQtqe3xjO2mBZISGhlt7CJVfYF1OlU+YOZCRkTCUcWcGVS8ISpydUlh1oLCsJJWKixSojX0oFwO9vq+xhX6Nlwumrhepubatvs6/n8HDTsWRpsqal28kz929wNIyCADVsAbKlqV+3tC8A9GRb+DBUJtAl6YbyADP7v3hMgyVo2fsmKsAAA4oVOiOH7t35uRZAzXQjqkDWDAu3IjR4UN4Bf+3wasIpdjAiwAQIuS40aMzLBDvGMgXUCCsADILHVt5gWXLly4hzaRZs2TBoZECDA1SztTKjj5/+nu5lKiUnAUpKsBpUWfGqCxd9hvKIYTQLzO1MjDplQpYjmL7la1hR6kxBWuNWsSbFwrXkjNLBH77sxsWT3WHMuhrUgHfvn+1uSHcct83xGcCIDyYtuRmLJoXRDaGkCzlhXEvu1D3GYsBxq0vKI1MdvBp1N4O7zJmDIACGJoR8g3CYElwAAwU4JsZ+zbD3Ev2+TBqqjiAAtgbLF78egn2AtqVZ9ZsqjxCAQJOp06SJzoOcsyrNwjwPcD27UroY7dfTGng/wCgJ+DWgAQK4MovMLSXxwnwzSaffgXYd19x89XXl19kKZXSPq4QGNQ3CraXT4OB4RfchPjNp9mFGAb22VuWAfXCHwoe42Jgjj2G4o6O6WWAfwbdRsRUviWo4CYEYMABfL45tuOTySlnl2hVJXSbgTaM841jadhTiStIkAXlmAz4R9qPpjmHXpYXJODmOF8is0OVTfLI41CloWmbTwUO+MM4HG4zSFUjBhooWRf8CF9gfWJp6FyeEGrVLpotiRAJiHIoSCvSGSGbQV0wuemoOoiqD6mosgBmqkdEAAAh+QQJCAAOACwIAA0AUwApAAAE/9DJSSUANeeru/9gSAELJlpNea7sSqoi0KRma3+cByAGDMoz321ouTRqmwZvIewAmUji70I1zo66Wa+ZDHKlk+qLeS1jNcDGNtpVQ8GjC3NON8/Y4ev2i9K/4XJ0gnN2eA5pbn9oZWuAg49kZYaHSghLihUylpaNUmOQj1eTmlpzBnikSnuTaGKgr2SGOwh+c2yppZg4AAO9voGwg6OMewunYjtmqyEXvs6/n8F8lKrBp7QznLY/z929wMGsOwDFsAbY2kynOt7QzQPRoOLxwZs8e+uZyM/v/OE/j8pJU3esSgAABxImfMerHTxY4iAJNGUOIZUDCBVq7NeOnrF8Ov8Cvio28RTGgwc1qmzIr1k8AyCdSHwVQJDAYykvqFzpjOMnmDFlUgQKE1IAosYGnUqJMeNOhbw4/iIaFI1NgqAMKKhJ5+bFp09ZdiMHMwdAU1uKSlTAgKTSF07BQnUIzywzOkeNsU1rk23bOVwJnvoYVy5Gb1RafDoKk8HfpKYU+H0ceNUawyv3wVOM96BBtcY8UwlQs3JosiYxz0XMWR0A0VQMPDYA+8LRykDJFlYt1p2LpKcUHCF90G8PBneIA2CgAB/M2qo3Ir6DzCrw5UcKaG/g2LHsO9oLcG8OmPSp8wcFCIje+xsiSXZRH8UeIHyA7t1n1Nd+vxjj8+cBoN7dgAQWKEAVvxxhhxkmkHXbKcjtV8B9+CHXgIT94ZXbfLWJUaBYDb23oBoYOFhWfsRVmN+FpD0G2IZfgaWZOwqOqMUFZTEGgGSTqeijZOqo81+MmKXhk3AiZmMJASWWWBaPPkbJXHN5LfBfWdEldCAQCIQoWRn2WFJFJrlJaSYDjIVGW25ZanlgNhckIGeXYorhBFUXSPbjj0Ad9BybYBlI4CzIJDYFVesUqiiOZeHoZ26CbrmoXSygRhQrTpDGwWtONlooHDp8eoNtBYWhG6io2nDqBpim6moclL7KQgQAIfkECQgADgAsCAANAFQAKQAABP/QyUklADXnq7v/YFgBCyZaTXmuLEuqItCkZmtvV/0BiAGDstnv1soFZxyPrLcYdoJNHRGYm1mvDSkl6HNurNEp9dXEXrWTYxe9ta7FOHJzbs7u3HO249h4wy1yc4JmentXXV5ph2FwF4KPj1iFSwhMjF+VlX5TgZCQVoWGCDOIBmhLM5aJSkadnp52SpV4eZiLl1QDuruOr76hfAaIC6atPFiIoXsAu828rr9AqcOvpqOpqsDO27q9voLACADU3wbXmnOmStzPF93ftVTwnpk9pVrGzM3u29DgIa7IzWsizFgAAAcSJuSnj52/VVuq+RIoyNSBHBcVarzY0OFEZQH/y1X0ZBHAwYMbNXZsN6BTQYASfQV4RK4YygspVe7rGOglzHTEhAl7FUCoj5omEXLMqZOfs3FGle2hSZAiMQUzR9LEyDTlyn1Ck/ysSraaAgbDkEbpuvHrTqlpBBW9ipYgzbN1m2StaiqoUrYLueWwIaeoMAZ50yrAm3dvsjWAVRrrRljuQSOG013OEWCmY2IHw0ZW6LZlZYJJWxlIvJmzAcdhC47W2U9sDGLEACjI0vkgXh8MkPQGwEBBKWGt/452GyTfE7umggMoQL0BYsSrkVAvYN34nN6mwh8UIGC5YD5nbO8RWpR4gwDbA1y/PgM+dfnDDIcPD4C8//8ACmAE0i9Z1HFGGsi9Ft178c2HWH0N5hdWe8m1AiBP3RiIjAlQGUbcg705SN97neX13YRcMTXZWwVq2AcGUJlU0GKMiWjjYnaBFhZOy4HC027oWZEJARzCOONiNiZZnHFzLaCfbLMJGIQ43Sx2RT2VGLFBWEp2yUBmCuqnXGTkTXlBAmiKk2UrShhVDJIi1nidcch1KBpTAf7Hgzj5SHWBm+r0KeiO44QWVp5SCqqeC4CqU0RnHCS1XkF9/rGDczdc0J5Yfzpq6adF+DQCXKCWCsiiprIQAQAh+QQJCAAOACwIAA0AUwApAAAE/9DJSSUANeeru//bJYIUsGDkBDRn6nbi2szzCJptKudvfy1AmpCGgiEMvI+MVeyRfsDgkKhsHIFN2Azr1EW/i2kju5khk5olt+uBgqNDcmV5lpdodXb6zRfaVXhRf0sNeXoqOHxvNTdCZ2h3gZA+iYqLY40Imo92K5qba11ulop/gAhmUQZynjNXoToXAwOjpF+mDgCakrAWVo6CLrKzxLS2YLi5jo8LqzEXqMC9aQDF1sbH02VWzIqr0VavkyXX17WlOggA3aQG0aBAq23lxCKzlehP+NmfR4/yc55VKzaMIKlkFviwy9bMWYwAAA5IlDhsYLl9wZ54s7Twy6oDIv9AThwJ0uLFfQYA3lDYzqPCiAAgQiQ50mS9gfhUKtloKQAYds5mXqBZk6DJRCl1tnGZNKWiAE2bvVk1syTRogUJNkWYM17HZgp8uvwZ8ipNm1qdCfN4xqk3BQyYAcUR0WxRerQQqvgCFWzceD/h/gUi1uuqhnXtUjypd28UqCkZDJarQPDgwpzqKK4p8J6TSgEgPnTbTLSI0Aswl16XMvFmtJ59qIop0MBk06cNYE7K2vVmkIxfmECySsGY0BAFI2FQAzkABgr+pcTtWzFsGQJZAV7FHECB7w0kS7Zd43uB8NEfh17FHqIAAb+vE/LDQUVSqM8bBDAfQLz4Gft91x/cM5Cxxx4A7yWo4IICxFDPGGL4YcF0unGnH3/+SQYghgTyhh91zyx41D0RDiEPa5A9pyFyGf6nX2iDPeZhWVd1ZtQK803hTGspVmZZi0BWBlhpvA0VHxFHGZejK5oQgAEHvfkI5JTQRddXak199NsBDcqgzj2VCdGPJjHMwRuVaDIAGZEFVmfXe15ekMCc6pD5DAxZXlBZkEHehyJvZjGooC7qZJfMBVmeaKihRa4D0VaCdrlofaIkqpQOoUEJUS6NCnSIPp6ycQF+lCJ66aeoVnoqpam2KooNrn4aAQAh+QQJCAAOACwIAAsAUwArAAAE/9DJSau9OOt9gf8eJ45kKX1NqqaAGJavCQPLarccjY9As+yyjWdBtKmAGtqPl1oGk0pi8cZDGJxCFfZZGUq/tRUS07MSx5aeb8s9gd/hBrqTurLT2vszCv+yXCp2cxNqDYJtbn19gxSFdnonK4dtfIpfjISSUoOFhmeUlouACKSPc2WkZpBCH6FwmJEIdVIGaGUpqqsdAAO9A5WhsA4ApIGXeLLGny68vr7AisKdBo8LtSAeycq6J83Oz9CvgA25irXapZtC39/N4ccuCADVoQbJ6US1Gd7sHs7vy3IA7JPKyiN9XbDx+8XulyVhw+DQc0XrGogAAA5o1OiPYUOH4v9c9JlIq17GDwcyblzZsSEvaBChkSxJE0ytlBgxrty58Jc7mzFHWgpg8801nR528vzXrmLQktSi9gkQ9crEWjpTqlS68WXPeVGf0qRmTgHRL1dRcuXa8xk1iBEr5ptpTQGDamnPrFXaFhyML1Tr3s1n0+5gImfn1rJ2cy/Lfh9M8KFKjcFhvAoMH05sSpBjntieSQaM8SLZfKU/BCDK2RrGsJ8fuxydD0DqDwYu3/ZAlXPYt7GXQoZLwyoABXJWYzR8hQEL5QAYKDhIbXfwri5ZKOxAuJZzAAXCN7BsOTeL8AXGT5eivJZ7jAIEBG/rwYh2IGANUI3eIAD6AOSRl4Lkf+EBWA1l7rkHQHwMNuigACA8I4d9YpxQnX7e9fdfgJYNuOGBYe23GzYO8gMChTboAxZl0XWoHIcC9rfaYeyFqNZaCmXXiX3XvMViZprBKGRmhLkWVlLzHWEicjuqkAoBLYQA1nGZCWmldNMFtgCCwF0HoRry9ELlCgWRAkIXYV2pJgOUGYngVsHFB6YHCdQpj5nYkFHVNVXCGCR501W3ImxrPdggMfIoFMM++YU1jKKQ5ofba2EZ+mWki8Kw51sy2FbaMBgNc6SiiECxXRC8WUTIlKW2ugenacDl6qzdZEqrCREAACH5BAkIAA4ALAgACgBTACwAAAT/0MlJq704642B91wojmT1NSgKlGzLemncrCJI2i7nLXJKh4DFD9gQ5jbBhbI3GyWHGgDKeLzslMseNANAGKjIFLgquWKxWqJXubVIi+Nq8kyPta2ob9wt3rvmdIEqRHlsYYV+JYCBjHcmKXqJDm+IjjWMmFiWZTGRjpQNeptImZmjkw0Iqp4dqaprklEfpZinUgiICwZttyiwsW4AA8MDi7TAk6qQZ1u9y4ZAwsTExqaEeZG6H9u4nZo60tPU1Y2Ev5m73a6sUeLi0uTMNQgA2bQG3atYu1zu49PxoIE7FuiVl0j8TGzz8M5fwFOTGNkjqMTAroUBABzYuJFhMX/D/8hBJDdx3z2NHw5o5MjSo8Ni5YBILJWt5C6VGTOy3BnuH8wzCXVgKoklAJ2JF3V62MkT4Lt9QUmZtEgVUwCqX5AC0KlyJVOOwlxSwzryaEWiuhQYBRrootevTUHWiyr1rN2hChjUbPsELtOe7nDILJo1rx57BvLqLQrUYhDHfuMC/KDozFWLDBbrAqpAsea1m9mIisxzIbXKRTNuu7xP9YcARkFnzUj1LWnAp2/s27qwnmYDrl8Dh+oYMmnJkyFGzApAwQzYGRV/YaACOgAGChBaDG77tkMVva1U1EYdQIHzDTJnNkB9xvkC6bOnvlqvXkYBAo6rdAjKjuC5wO1CXewA7wWgnnooEHiegdlctktxAOAn4YQUCrANNTMwYUcZ2wV4XQMKFmDgge2FyKBltdHH3UIU9rSNhjLwM9dl12UGImwkInjjiSg65lpkvX3XXw8X+ehYZ57lqGRn4+niYEr6USJWcxky8QoBK4AwV3OdKekldtldpYSDxuln4Rv0hNRZDAapso0JtX0pJwOsBfikfhzhh6YHCfRJj5sLdYDVRV3mmKR62W03Y21+VThhF/T0JlgHANY2iaSYAvgBcJVG6Gimb7ZQqaWKwKZlRpPUhikZXEj6x1ZuTeCBY6zW+gKtwdiqqxOU7epCBAAh+QQJCAAOACwIAAgAUwAuAAAE/9DJSau9OOutAf9gKG5A441oqlKlub4w1zZubN8zfYLAzvu3S49GrH0ACyCpkQwKkUWiMoNsHmlWp6S36EZ1PIQh2yGScdWuNzq1lMTdNgt7hnHV+EVRXmmN631mgCl3eXlSVzR/fA4zizFphpKDgYpqcjmPL5GThoyNRX+UmXGbnZ2foAirom1vq3CUHT2cp5dXCJZdBlNvNLGybgADxAO1tp8Aq0Sidb7Mt0fDxcXHk6mZzby0tLmh0bPU4oXIicCdvN4NrOAY0+LVxNZ52AgAzbYG3uy7mPDV74yVk2ZLEiwxongJ4xbQ2L95wSYcw1dQjYFt3AIAOMCRYw95///kXeMxiaLFfBtpHdjYseXHkMM4XUzVSJLJkzjz8FqpUWPLnw2NTZNJ09rNLgF0Gtrms8dPoNQapplJ8uTFq5MCXB1DkZfPlSyfdowZ9N7VokoXXESnICmerirFig1ajWrVXX/WllTAQNvSKmHljg0pj+YWPFrV8s2rk29fNW7x8lK7U7BLeNxGRNJ6kcFjtW8VOP4cudUiy0AZVtOMWGNGvWpd0wqQtHRss5VRe4TJup9sWgY+G/jdQ2vpszN1Q8XcIwQSrgAUmKCt0fEYBjqoA2CgIOFF4soHY9bBsNcutdtNFFjfwLPn4DrWF2jfHTJtXvg1ChCgnO6QLyY0J9HxVVqlF4B8AbjnHg0HrpdgM5zhhx8A+1Vo4YUCcFONCQDuscV3w/GCXYMFJKggdg2Q+CBiZxVIHEMXBsRNh1EoZBZn23mWIm0nLrjjiizOJJtl5T3EIY0NbCPkTKKN1uOTop0X21lO9SeFjNLlUAQsBHjQnFnRifbkmNx1l9gCESYXXoYt2COPaFseZA8tfZxF5p0McDZlhIHptl+bPSQgqD2rlOfOVtuI2aOT7nX33Y1nCYahhcrMWV4yuJ3VyKWc4gacRltROGmnmRGCqF0iAEDblxo1QuWlWrAAKyGqYiQRmLHmeqhCwujqax90/hpCBAAh+QQJCAAOACwIAAoAUwAsAAAE/9DJSau9OOu9Af9gKHaNN55oWgGlCJjhq6ps037AAuONPp81206T8/F6wx8xKMQhDEaSLarEvJi2G7HxXFCt029VcvVmz9pMDSpeZb3JX9lLN5/jlCAbP9HDxy91gnVZfGRZbG2HiH9yRYOQC01qZ4l8THtykZtmhiwIoJZgoKGNQIGcnJ5cNokGcZ82XaY4LwO3j6mDl6CMdEmxvooWtrfGA7m6v5SIiQuvV1cIaKIdAMfYyMp1q1zOka/TsrPDZNnHtsmpnggA35wG4qVer2rnuNfG6pGGDqjbXkg9cQUsWjF95/bt6gDp3TYD0KIFAHCgYsVi+RKuY9hwk8M6r/8OXBFpsaTIjAkVQuy37yM9kA0pApg40WRJlPryqVvJcZDLBQEEvYNW84XNm+hQ5oJYr+ezZ0w/Boj6VOhMiiePIj2ILmpTIkLpuTSgIChMq0a12sTZdWU/MiDZQPSogIGzoUWwqrXINunbPnWmPqsrV2hdu3TMin0FVe9ekdmijcg1FSIDxFXpKTiMWbGlPY9vGtQ3OfBEiXPpnb4SIKjnZxOZOn7cF1lpelcNGsBsYDXr3nSiugsZGmlkGSByQHmloETriYehMBDyHAADBa4g+p5NO6EQg7BevpoOoID5Bpcv7xZivgB67Ilbv5o/UYCA4n1foCmEnAzTqdY1EEDqewGkl54NA5pXoDOVzTcfAPZFKOGEAkSjTwn7oWHCcFMBOF2CBRRo4HQCEoiZFw3O9Mp2Bk2o1BUZ7lcPhysd+NyIBwrY2okoyrbaXuB5h4WML6xUGQCbcYbjkpu9BJtsaYUWBFdIYpghKQR4IMNwSG625JfXYScYUF5xp1aFNbSDy2ZnCASKZHnIBuacDFT2ZIrFWWRfmi8k4Gc7bxpkRZldMsnkfzSudCaFEQIQKHhvFVmmP5BWOlxEvV36CqNoWtrfZF7xNFlrW07kD5SQjnFBpSm8AGB/kv6l6qynfpWHrLSqCmeuJ0QAACH5BAkIAA4ALAgADQBTACkAAAT/0MlJJQA156u7/6AVOsCCjVZjomwLNOdXruOrxm3e2bgGIAYayHbTGSuXhrKHbAAXQo8NyjzKLliltjqxBaM+LdV6xUKh2jSXpP2uU0o3GXk529HppbR9XhMbcnMkM3eFC2p7fGM7aYFkhIaGW3sIlV9gXU6VT5g5kJGRMJRxZwZVLwhKnJ1SWHWgsKwklYqLFKiNfSgXA72+r7GFfo2XC6auF6m5tq2+zr+fwcNOxZGmypqXbyTP3b3A0jIIANWwBsqWpX7e0LwD0ZFv4MFQm0CXphvIAM/u/eEyDJWjZ+yYqwAADihU6I4fu3fm5FkDNdCOqQNYMC7ciNHhQ3gF/7fBqwil2MCLABAi5LjRozMsEO8YyBdQIKwAMgsdW3mBZcuXLiHNpFmzZMGhkQIMDVLO1MqOPn/6e7mUqJScBSkqwGlRZ8aoLF32G8ohhNAvM7UyMOmVCliOYvuVrWFHqTEFa41axJsXCteSM0sEfvuzGxZPdYcy6GtSAd++f7W5Idxy3zfEZwIgPJi25GYsmhdENoaQLOWFcS+7UPcZiwHGrS8ojUx28GnU3g7vMmYMgAIYmhHyDcJgSXAADBTgmxn7NsPcS/b5MGqqOIAC2BssXvx6CfYC2pVn1myqPEIBAk6nTpInOg5yzKs3CPA9wPbtSuhjt19MaeD/AKAn4NaABArgyi8wtJfHCfDNJp9+Bdh3X3Hz1deXX2QpldI+rhAY1DcKtpdPg4HhF9yE+M2n2YUYBvbZW5YB9cIfCh7jYmCOPYbijo7pZYB/Bt1GxFS+JajgJgRgwAF8vjm245PJKWeXaFUldJuBNozzjWNp2FOJK0iQBeWYDPhH2o+mOYdelhck4OY4XyKzQ5VN8sjjUKWhaZtPBQ74wzgcbjNIVSMGGihZF/wIX2B9YmnoXJ4QatUumi2JEAmIcihIK9IZIZtBXTC56ag6iKoPqaiyAGaqR0QAACH5BAkIAA4ALAgADQBTACkAAAT/0MlJJQA156u7/2BIAQsmWk15ruxKqiLQpGZrf5wHIAYMyjPfbWi5NGqbBm8h7ACZSOLvQjXOjrpZr5kMcqWT6ot5LWM1wMY22lVDwaMLc043z9jh6/aL0r/hcnSCc3Z4Dmluf2hla4CDj2RlhodKCEuKFTKWlo1SY5CPV5OaWnMGeKRKe5NoYqCvZIY7CH5zbKmlmDgAA72+gbCDo4x7C6diO2arIRe+zr+fwXyUqsGntDOctj/P3b3Awaw7AMWwBtjaTKc63tDNA9Gg4vHBmzx765nIz+/84T+PyklTd6xKAAAHEiZ8x6sdPFjiIAk0ZQ4hlQMIFWrs146esXw6/wK+KjbxFMaDBzWqbMivWTwDIJ1IfBVAkMBjKS+oXOmM4yeYMWVSBAoTUgCixgadSokx406FvDj+IhoUjU2CoAwoqEnn5sWnT1l2IwczB0BTW4pKVMCApNIXTsFCdQjPLDM6R42xTWuTbds5XAme+hhXLkZvVFp8OgqTwd+kphT4fRx41RrDK/fBU4z3oEG1xjxTCVCzcmiyJjHPRcxZHQDRVAw8NgD7wtHKQMkWVi3WnYukpxQcIX3Qbw8Gd4gDYKAAH8zaqjcivoPMKvDlRwpob+DYsew72gtwbw6Y9KnzBwUIiN77GyJJdlEfxR4gfIDu3WfU136/GOPz5wGg3t2ABBYoQBW/HGGHGSaQddspyO1XwH34IdeAhP3hldt8tYlRoFgNvbegGhg4WFZ+xFWY34WkPQbYhl+BpZk7Co6oxQVlMQaAZJOp6KNk6qjzX4yYpeGTcCJmYwkBJZZYFo8+Rslcc3kt8F9Z0SV0IBAIhChZGfZYUkUmuUlpJgOMhUZbbllqeWA2FyQgZ5diiuEEVRdI9uOPQB30HJtgGUjgLMgkNgVV6xSqKI5l4ehnboJuuahdLKBGFCtOkMbBa042WigcOnx6g20FhaEbqKjacOoGmKbqahyUvspCBAAh+QQJCAAOACwIAA0AVAApAAAE/9DJSSUANeeru/9gWAELJlpNea4sS6oi0KRma29X/QGIAYOy2e/WygVnHI+stxh2gk0dEZibWa8NKSXoc26s0Sn11cRetZNjF721rsU4cnNuzu7cc7bj2HjDLXJzgmZ6e1ddXmmHYXAXgo+PWIVLCEyMX5WVflOBkJBWhYYIM4gGaEszlolKRp2ennZKlXh5mIuXVAO6u46vvqF8BogLpq08WIihewC7zbyuv0Cpw6+mo6mqwM7bur2+gsAIANTfBteac6ZK3M8X3d+1VPCemT2lWsbMze7b0OAhrsjNayLMWAAABxIm5KePnb9VW6r5EijI1IEcFxVqvNjQ4URlAf/LVfRkEcDBgxs1dmw3oFNBgBJ9BXhErhjKCylV7usY6CXMdMSECXsVQKiPmiYRcsypk5+zcUaV7aFJkCIxBTNH0sTINOXKfUKT/KxKtpoCBsOQRum68etOqWkEFb2KliDNs3WbZK1qKqhStgu55bAhp6gwBnnTKsCbd2+yNYBVGutGWO5BI4bTXc4RYKZjYgfDRlbotmVlgklbGUi8mbMBx2ELjtbZT2wMYsQAKMjS+SBeHwyQ9AbAQEEpYa3/jnYbJN8Tu6aCAyhAvQFixKuRUC9g3fic3qbCHxQgYLlgPmds7xFalHiDANsDXL8+Az51+cMMhw8PgLz//wAKYATSL1nUcUYayL0W3XvxzYdYfQ3mF1Z7ybUCIE/dGIiMCVAZRtyDvTlI33ud5fXdhFwxNdlbBWrYBwZQmVTQYoyJaONidoEWFk7LgcLTbuhZkQkBHMI442I2JlmccXMtoJ9sswkYhDjdLHZFPZUYsUFYSnbJQGYK6qdcZORNeUECaIqTZStKGFUMkiLWeJ1xyHUoGlMB/seDOPlIdYGb6vQp6I7jhBZWnlIKqp4LgKpTRGccJLVeQX3+sYNzN1zQnlh/Omrpp0X4NAJcoJYKyKKmshABACH5BAkIAA4ALAgADQBTACkAAAT/0MlJJQA156u7/9slghSwYOQENGfqduLazPMImm0q529/LUCakIaCIQy8j4xV7JF+wOCQqGwcgU3YDOvURb+LaSO7mSGTmiW364GCo0NyZXmWl2h1dvrNF9pVeFF/Sw15eio4fG81N0JnaHeBkD6JiotjjQiaj3YrmptrXW6Win+ACGZRBnKeM1ehOhcDA6OkX6YOAJqSsBZWjoIusrPEtLZguLmOjwurMReowL1pAMXWxsfTZVbMiqvRVq+TJdfXtaU6CADdpAbRoECrbeXEIrOV6E/42Z9Hj/JznlUrNowgqWQW+LDL1sxZjAAADkiUOGxguX3BnniztPDLqgMi/0BOHAnS4sV9BgDeUNjOo8KIACBCJDnSZL2B+FQq2WgpABh2zmZeoFmToMlEKXW2cZk0paIATZu9WTWzJNGiBQk2RZgzXsdmCny6/BnyKk2bWp0J83jGqTcFDJgBxRHRbFF6tBCq+AIVbNx4P+H+BSLW66qGde1SPKl3bxSoKRkMlqtA8ODCnOoorinwnpNKASA+dNtMtIjQCzCXXpcy8Wa0nn2oiinQwGTTpw1gTsra9WaQjF+YQLJKwZjQEAUjYVADOQAGCv6lxO1bMWwZAlkBXsUcQIHvDSRLtl3je4Hw0R+HXsUeogABv68T8sNBRVKozxsEMB9AvPgZ+33XH9wzkLHHHgDvJajgggLEUM8YYvhhwXS6cacff/5JBiCGBPKGH3XPLHjUPREOIQ9rkD2nIXIZ/qdfaIM95mFZV3Vm1ArzTeFMaylWZlmLQFYGWGm8DRUfEUcZl6MrmhCAAQe9+QjklNBF11dqTX302wENyqDOPZUJ0Y8mMczBG5VoMgAZkQVWZ9d7Xl6QwJzqkPkMDFleUFmQQd6HIm9mMaigLupkl8wFWZ5oqKFFrgPRVoJ2uWh9oiSqlA6hQQlRLo0KdIg+nrJxAX6UInrpp6hWeiqlqbYqig2ufhoBACH5BAkIAA4ALAgACwBTACsAAAT/0MlJq704632B/x4njmQpfU2qpoAYlq8JA8tqtxyNj0Cz7LKNZ0G0qYAa2o+XWgaTSmLxxkMYnEIV9lkZSr+1FRLTsxLHlp5vyz2B3+EGupO6stPa+zMK/7JcKnZzE2oNgm1ufX2DFIV2eicrh218il+MhJJSg4WGZ5SWi4AIpI9zZaRmkEIfoXCYkQh1UgZoZSmqqx0AA70DlaGwDgCkgZd4ssafLry+vsCKwp0Gjwu1IB7Jyronzc7P0K+ADbmKtdqlm0Lf383hxy4IANWhBsnpRLUZ3uwezu/LcgDsk8rKI31dsPH7xe6XJWHD4NBzResaiAAADmjU6I9hQ4fi/1z0mUirXsYPBzJuXNmxIS9oEKGRLEkTTK2UGDGu3LnwlzubMUdaCmDzzTWdHnby/NeuYtCS1KL2CRD1ysRaOlOqVLrxZc95UZ/SpGZOAdEvV1Fy5drzGTWIESvmm2lNAYNqac+sVdoWHIwvVOvezWfT7mAiZ+fWsnZzL8t+H0zwoUqNwWG8CgwfTmxKkGOe2J5JBozxItl8pT8EIMrZGsawnx+7HJ0PQOoPBi7f9kCVc9i3sZdChkvDKgAFclZjNHyFAQvlABgoOEhtd/CuLlko7EC4lnMABcI3sGw5N4vwBcZPl6K8lnuMAgQEb+vBiHYgYA1Qjd4gAPoA5JGXguR/4QFYDWXuuQdAfAw26KAAIDwjh31inFCdft7191+Alg244YFh7bcbNg7yAwKFNugDFmXRdagchwL2t9ph7IWo1loKZdeJfde8xWJmmsEoZGaEuRZWUvMdYSJyO6qQCgEthADWcZkJaaV00wW2AILAXQehGvL0QuUKBZECQhdhXakmA5QZieBWwcUHpgcJ1CmPmdiQUdU1VcIYJHnTVbcibGs92CAx8igUwz75hTWMopDmh9trYRn6ZaSLwrDnWzLYVtowGA1zpKKIQLFdELxZRMiUpba6B6dpwOXqrN1kSqsJEQAAIfkECQgADgAsCAAKAFMALAAABP/QyUmrvTjrjYH3XCiOZPU1KAqUbMt6adysIkjaLuctckqHgMUP2BDmNsGFsjcbJYcaAMp4vOyUyx40A0AYqMgUuCq5YrFaole5tUiL42ryTI+1rahv3C3eu+Z0gSpEeWxhhX4lgIGMdyYpeokOb4iONYyYWJZlMZGOlA16m0iZmaOTDQiqnh2pqmuSUR+lmKdSCIgLBm23KLCxbgADwwOLtMCTqpBnW73LhkDCxMTGpoR5kbof27idmjrS09TVjYS/mbvdrqxR4uLS5Mw1CADZtAbdq1i7XO7j0/GggTsW6JWXSPxMbPPwzl/AU5MY2SOoxMCuhQEAHNi4kWExf8P/yEEkN3HfPY0fDmjkyNKjw2LlgEgsla3kLpUZM7LcGe4fzDMJdWAqiSUAnYkXdXrYyRPgu31BSZm0SBVTAKpfkALQqXIlU47CXFLDOvJoRaK6FBgFGuii169NQdaLKvWs3aEKGNRs+wQu057ucMgsmjWvHnsG8uotCtRiEMd+4wL8oOjMVYsMFusCqkCx5rWb2YiKzHMhtcpFM267vE/1hwBGQWfNSPUtacCnb+zburCeZgOuXwOH6hgyacmTIUbMCkDBDNgZFX9hoAI6AAYKEFoMbvu2QxW9rVTURh1AgfMNMmc2QH3G+QLps6e+Wq9eRgECjqt0CMqO4LnA7UJd7ADvBaCeeigQeJ6B2Vy2S3EA4CfhhBQKsA01MzBhRxnbBXhdAwoWYOCB7YXIoGW10cfdQhT2tI2GMvAz12XXZQYibCQieOOJKDrmWmS9fddfDxf56FhnnuWoZGfj6eJgSvpRIlZzGTLxCgErgDBXc50p6SV22V2lhIPG6WfhG/SE1FkMBqmyjQm1fSknA6wF+KR+HOGHpgcJ9EmPmwt1gNVFXeaYpHrZbTdjbX5VOGEX9PQmWAcA1jaJpJgC+AFwlUboaKZvtlCppYrApmVGk9SGKRlcSPrHVm5N4IFjrNb6Aq3B2KqrE5Tt6kIEACH5BAUIAA4ALAgACABTAC4AAAT/0MlJq704660B/2AobkDjjWiqUqW5vjDXNm5s3zN9gsDO+7dLj0asfQALIKmRDAqRRaIyg2weaVanpLfoRnU8hCHbIZJx1a43OrWUxN02C3uGcdX4RVFeaY3rfWaAKXd5eVJXNH98DjOLMWmGkoOBimpyOY8vkZOGjI1Ff5SZcZudnZ+gCKuibW+rcJQdPZynl1cIll0GU280sbJuAAPEA7W2nwCrRKJ1vsy3R8PFxceTqZnNvLS0uaHRs9TihciJwJ283g2s4BjT4tXE1nnYCADNtgbe7LuY8NXvjJWTZksSLDGieAnjFtDYv3nBJhzDV1CNgW3cAgA4wJFjD3n//+Rd4zGJosV8G2kd2Nix5ceQwzhdTNVIksmTOPPwWqlRY8ufDY1Nk0nT2s0uAXQa2uazx0+g1BqmmUny5MWrkwJcHUORl8+VLJ92jBn03tWiShdcRKcgKZ6uKsWKDVqNatVdf9aWVMBA29IqYeWODSmP5hY8WtXyzauTb181bvHyUrtTsEt43EZE0nqRwWO1bxU4/hy51SLLQBlW04xYY0a9al3TCpC0dGyzlVF7hMm6n2xaBj4b+N1Da+mzM3VDxdwjBBKuABSYoK3R8RgGOqgDYKAg4UXiygdj1sGw1y61200UWN/As+fgOtYXaN8dMm1e+DUKEKCc7pAvJjQn0fFVWqUXgHwBuOceDQeul2AznOGHHwD7VWjhhQJwU40JAO6xxXfD8YJdgwUkqCB2DZD4IGJnFUgcQxcGxE2HUShkFmfbeZYibScuuOOKLM4km2XlPcQhjQ1sI+RMoo3W45OinRfbWU71J4WM0uVQBCwEeNCcWdGJ9uSY3HWX2AIRJhdehi3YI49oWx5kDy19nEXmnQxwNmWEgem2X5s9JCCoPauU585W24jZo5PudffdjWcJhqGFysxZXjK4ndXIpZziBpxGW1E4aaeZEYKoXSIAQNuXGjVC5aVasAArIapiJBGYseZ6qELC6OprH3T+GkIEADs=) no-repeat center;padding-left:100px;padding-bottom: 64px;");