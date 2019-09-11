RoadUI = function () { };
RoadUI.Core = {
    //roadflow所在目录，集成的时候有用
    rfPath: "",
    allFrames: [],
    getAllFrames: function (frame)
    {
        if (!frame)
        {
            frame = top;
            this.allFrames.push(frame);
        }
        var frames = frame.frames;
        for (var i = 0; i < frames.length; i++)
        {
            this.allFrames.push(frames[i]);
            this.getAllFrames(frames[i]);
        }
    },
    newid: function (isMiddline)
    {
        var guid = "";
        isMiddline = isMiddline == undefined ? true : isMiddline;
        for (var i = 1; i <= 32; i++)
        {
            var n = Math.floor(Math.random() * 16.0).toString(16);
            guid += n;
            if (isMiddline && (i == 8 || i == 12 || i == 16 || i == 20))
            {
                guid += "-";
            }
        }
        return guid;
    },
    rooturl: function ()
    {
        return "";
        if (top && top.rootdir)
        {
            return top.rootdir;
        }
        else
        {
            var cookie = $.cookies.get("rf_core_rootdir");
            return cookie == null || cookie.toString() == "undefined" ? "" : cookie.toString();
        }
    },
    //得到当前主题
    getTheme: function () {
        theme = $.cookies.get("rf_core_theme");
        return theme || "blue";
    },
    queryString: function (name, search)
    {
        if (!search)
        {
            search = document.location.search;
        }
        var pattern = new RegExp("[?&]" + name + "\=([^&]+)", "g");
        var matcher = pattern.exec(search);
        var items = "";
        if (null != matcher)
        {
            try
            {
                items = decodeURIComponent(decodeURIComponent(matcher[1]));
            } catch (e)
            {
                try
                {
                    items = decodeURIComponent(matcher[1]);
                } catch (e)
                {
                    items = matcher[1];
                }
            }
        }
        return items;
    },
    //win 弹出窗口的父窗口的window对象
    open: function (url, width, height, name, win)//弹出居中窗口
    {
        //弹出窗口的宽度
        var iWidth = width || 700;
        //弹出窗口的高度
        var iHeight = height || 500;
        var y = (window.screen.availHeight - 30 - iHeight) / 2;    //获得窗口的垂直位置;
        var x = (window.screen.availWidth - 10 - iWidth) / 2;      //获得窗口的水平位置;
        return (win || window).open(url, '', 'height=' + iHeight.toString() + ',width=' + iWidth.toString() + ',top=' + y.toString() + ',left=' + x.toString() + ',toolbar=no,menubar=no,scrollbars=yes,resizable=yes,location=no,status=no');
    },
    formatDate: function (date, format)
    {
        date = new Date(date);
        var map = {
            "M": date.getMonth() + 1, //月份
            "d": date.getDate(), //日
            "h": date.getHours(), //小时
            "m": date.getMinutes(), //分
            "s": date.getSeconds(), //秒
            "q": Math.floor((date.getMonth() + 3) / 3), //季度
            "S": date.getMilliseconds() //毫秒
        };
        format = format.replace(/([yMdhmsqS])+/g, function (all, t)
        {
            var v = map[t];
            if (v !== undefined)
            {
                if (all.length > 1)
                {
                    v = '0' + v;
                    v = v.substr(v.length - 2);
                }
                return v;
            }
            else if (t === 'y')
            {
                return (date.getFullYear() + '').substr(4 - all.length);
            }
            return all;
        });
        return format;
    },
    decodeUri: function (uri)
    {
        try
        {
            if (!uri || $.trim(uri).length == 0)
            {
                return "";
            }
            return decodeURIComponent(uri);
        }
        catch (e)
        {
            return uri;
        }
    },
    accDiv: function (arg1, arg2)//返回值：arg1除以arg2的精确结果
    {
        var t1 = 0, t2 = 0, r1, r2;
        try
        {
            t1 = arg1.toString().split(".")[1].length
        } catch (e)
        {
        }
        try
        {
            t2 = arg2.toString().split(".")[1].length
        } catch (e)
        {
        }
        r1 = Math.Number(arg1.toString().replace(".", ""))
        r2 = Math.Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * Math.pow(10, t2 - t1);
    },
    accMul: function (arg1, arg2)//返回值：arg1乘以 arg2的精确结果
    {
        var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
        try
        {
            m += s1.split(".")[1].length
        } catch (e)
        {
        }
        try
        {
            m += s2.split(".")[1].length
        } catch (e)
        {
        }
        return Math.Number(s1.replace(".", "")) * Math.Number(s2.replace(".", "")) / Math.pow(10, m)
    },
    accAdd: function (arg1, arg2)// 返回值：arg1加上arg2的精确结果
    {
        var r1, r2, m, c;
        try
        {
            r1 = arg1.toString().split(".")[1].length
        } catch (e)
        {
            r1 = 0
        }
        try
        {
            r2 = arg2.toString().split(".")[1].length
        } catch (e)
        {
            r2 = 0
        }
        c = Math.abs(r1 - r2);
        m = Math.pow(10, Math.max(r1, r2))
        if (c > 0)
        {
            var cm = Math.pow(10, c);
            if (r1 > r2)
            {
                arg1 = Math.Number(arg1.toString().replace(".", ""));
                arg2 = Math.Number(arg2.toString().replace(".", "")) * cm;
            }
            else
            {
                arg1 = Math.Number(arg1.toString().replace(".", "")) * cm;
                arg2 = Math.Number(arg2.toString().replace(".", ""));
            }
        }
        else
        {
            arg1 = Math.Number(arg1.toString().replace(".", ""));
            arg2 = Math.Number(arg2.toString().replace(".", ""));
        }
        return (arg1 + arg2) / m
    },
    accSub: function (arg1, arg2)// 返回值：arg1减去arg2的精确结果
    {
        var r1, r2, m, n;
        try
        {
            r1 = arg1.toString().split(".")[1].length
        } catch (e)
        {
            r1 = 0
        }
        try
        {
            r2 = arg2.toString().split(".")[1].length
        } catch (e)
        {
            r2 = 0
        }
        m = Math.pow(10, Math.max(r1, r2));
        //last modify by deeka
        //动态控制精度长度
        n = (r1 >= r2) ? r1 : r2;
        return ((arg1 * m - arg2 * m) / m).toFixed(n);
    },
    isIe6Or7: function ()
    {
        return this.isIE6 || this.isIE7;
    },
    isIE: function ()
    {
        return navigator.appName == "Microsoft Internet Explorer";
    },
    isIE6: function ()
    {
        return navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE6.0";
    },
    isIE7: function ()
    {
        return navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE7.0";
    },
    isIE8: function ()
    {
        return navigator.appName == "Microsoft Internet Explorer" && navigator.appVersion.split(";")[1].replace(/[ ]/g, "") == "MSIE8.0";
    },
    intDiv: function (number1, number2)//整除
    {
        var num1 = Math.round(number1);
        var num2 = Math.round(number2);
        var result = num1 / num2;
        if (result >= 0)
        {
            result = Math.floor(result);
        }
        else
        {
            result = Math.ceil(result);
        }
        return result;
    },
    offsetTop: function (elements)
    {
        var top = elements.offsetTop;
        var parent = elements.offsetParent;
        while (parent)
        {
            top += parent.offsetTop;
            parent = parent.offsetParent;
        }
        ;
        return top;
    },
    offsetLeft: function (elements)
    {
        var left = elements.offsetLeft;
        var parent = elements.offsetParent;
        while (parent)
        {
            left += parent.offsetLeft;
            parent = parent.offsetParent;
        }
        ;
        return left;
    },
    loadOptions: function linkageField(select)
    {
        var $select = $(select);
        var linkagefield = $select.attr("linkagefield");
        var linkagesource = $select.attr("linkagesource");
        var linkagesourcetext = $select.attr("linkagesourcetext");
        var linkagesourceconn = $select.attr("linkagesourceconn");
        var issubtable = "1" == $select.attr("issubtable");

        var value = $select.val();
        if (!linkagefield || linkagefield.length == 0)
        {
            return;
        }
        if (!linkagesource || linkagesource.length == 0)
        {
            return;
        }
        var $linkage = $(document.getElementById(linkagefield));
        if ($linkage.size() == 0)
        {
            return;
        }
        if (!value || value.length == 0)
        {
            $linkage.html('');
            return;
        }
        switch (linkagesource)
        {
            case "sql":
            case "dict":
                $.ajax({
                    url: this.rooturl() + "/WorkFlowRun/GetLinkageOptions",
                    async: false,
                    cache: false,
                    type: "POST",
                    data: {
                        "linkagesource": linkagesource,
                        "linkagesourcetext": linkagesourcetext,
                        "linkagesourceconn": linkagesourceconn,
                        "value": value
                    },
                    success: function (options)
                    {
                        $linkage.html(options);
                    }
                });
                break;
            case "url":
                linkagesourcetext = $.trim(linkagesourcetext).substr(0, 1) == "/" ? this.rooturl() + linkagesourcetext : linkagesourcetext;
                $.ajax({
                    url: linkagesourcetext,
                    async: false,
                    cache: false,
                    type: "POST",
                    data: { "value": value },
                    success: function (options)
                    {
                        $linkage.html(options);
                    }
                });
                break;
        }
        if ($linkage.attr("onchange"))
        {
            RoadUI.Core.loadOptions($linkage.get(0));
        }
    },
    getPager: function (count, size, number, param, loadDataFunName, eleId)
    {
        eleId = eleId || "";
        var pager = '';
        size = size || 15;
        number = number || 1;
        //得到共有多少页
        var pageCount = count <= 0 ? 1 : count % size == 0 ? parseInt(count / size) : parseInt(count / size) + 1;
        if (pageCount <= 1)//只有一页则返回空
        {
            return "";
        }
        if (number < 1)
        {
            number = 1;
        }
        else if (number > pageCount)
        {
            number = pageCount;
        }
        //构造分页字符串
        var displaySize = 10;//中间显示的页数
        pager += "<div>";
        pager += "<span style='margin-right:15px;'>共 " + count.toString() + " 条  每页 " + size.toString() + " 条</span>";
        pager += "<a class=\"b\" style=\"margin-right:10px;\" href=\"javascript:eval('" + loadDataFunName + "(" + size + "," + 1 + ",\\'" + eleId + "\\')');\">首页</a>";
        pager += "<a class=\"b\" style=\"margin-right:10px;\" href=\"javascript:eval('" + loadDataFunName + "(" + size + "," + (number - 1) + ",\\'" + eleId + "\\')');\">上一页</a>";
        pager += "<a class=\"b\" style=\"margin-right:10px;\" href=\"javascript:eval('" + loadDataFunName + "(" + size + "," + (number + 1) + ",\\'" + eleId + "\\')');\">下一页</a>";
        pager += "<a class=\"b\" href=\"javascript:eval('" + loadDataFunName + "(" + size + "," + pageCount + ",\\'" + eleId + "\\')');\">尾页</a>";
        pager += "</div>";
        return pager;
    },
    getPager1: function (count, size, number, funName)
    {
        if (!count)
        {
            return "";
        }
        size = this.getPageSize(size);
        number = this.getPageNumber(number);

        //得到共有多少页
        var pageCount = count <= 0 ? 1 : count % size == 0 ? parseInt(count / size) : parseInt(count / size) + 1;
        /*if (pageCount <= 1)//只有一页则返回空
        {
            return "";
        }*/
        if (number < 1)
        {
            number = 1;
        }
        else if (number > pageCount)
        {
            number = pageCount;
        }

        var displaySize = 10;
        var jsFunctionName = funName;
        var returnPagerString = "";

        //构造分页字符串
        returnPagerString += "<div>";
        returnPagerString += "<span style='margin-right:15px;'>共 " + count.toString() + " 条  每页 <input type='text' id='tnt_count' title='输入数字可改变每页显示条数' class='pagertxt' onchange=\"javascript:$.cookies.set('pagesize', this.value);" + jsFunctionName + "(this.value," + number.toString() + ");\" value='" + size.toString() + "' /> 条  ";
        returnPagerString += "转到 <input type='text' id='paernumbertext' title='输入数字可跳转页' value=\"" + number.toString() + "\" onchange=\"javascript:" + jsFunctionName + "(" + size.toString() + ", this.value);\" class='pagertxt'/> 页</span>";
        if (number > 1)
        {
            returnPagerString += "<a class=\"pager\" href=\"javascript:" + jsFunctionName + "(" + size.toString() + "," + (number - 1).toString() + ");\"><span class=\"pagerarrow\">«</span></a>";
        }
        //添加第一页
        if (number >= displaySize / 2 + 3)
        {
            returnPagerString += "<a class=\"pager\" href=\"javascript:" + jsFunctionName + "(" + size.toString() + ",1);\">1…</a>";
        }
        else
        {
            returnPagerString += "<a class=\"" + (1 == number ? "pagercurrent" : "pager") + "\" href=\"javascript:" + jsFunctionName + "(" + size.toString() + ",1);\">1</a>";
        }

        //添加中间数字
        var star = number - displaySize / 2;
        var end = number + displaySize / 2;
        if (star < 2)
        {
            end += 2 - star;
            star = 2;
        }
        if (end > pageCount - 1)
        {
            star -= end - (pageCount - 1);
            end = pageCount - 1;
        }
        if (star < 2)
        {
            star = 2;
        }

        for (var i = star; i <= end; i++)
        {
            returnPagerString += "<a class=\"" + (i == number ? "pagercurrent" : "pager") + "\" href=\"javascript:" + jsFunctionName + "(" + size.toString() + "," + i.toString() + ");\">" + i.toString() + "</a>";
        }
        //添加最后页
        if (number <= pageCount - (displaySize / 2))
        {
            returnPagerString += "<a class=\"pager\" href=\"javascript:" + jsFunctionName + "(" + size.toString() + "," + pageCount.toString() + ");\">…" + pageCount.toString() + "</a>";
        }
        else if (pageCount > 1)
        {
            returnPagerString += "<a class=\"" + (pageCount == number ? "pagercurrent" : "pager") + "\" href=\"javascript:" + jsFunctionName + "(" + size.toString() + "," + pageCount.toString() + ");\">" + pageCount.toString() + "</a>";
        }
        if (number < pageCount)
        {
            returnPagerString += "<a class=\"pager\" href=\"javascript:" + jsFunctionName + "(" + size.toString() + "," + (number + 1).toString() + ");\"><span class=\"pagerarrow\">»</span></a>";
        }
        returnPagerString += "</div>";

        return returnPagerString;
    },
    getPageSize: function (size)
    {
        if (!size || isNaN(size))
        {
            size = $.cookies.get("pagesize");
        }
        if (!size || isNaN(size))
        {
            size = 15;
        }
        return size;
    },
    getPageNumber: function (number)
    {
        if (isNaN(number))
        {
            number = 1;
        }
        return number;
    },
    //禁用a标签
    disableda: function (a) {
        var click = $(a).attr("onclick");
        $(a).removeAttr("onclick").css({ "background-color": "#efeeee", "border": "1px solid #c8c8c7", "color":"#666666" });
        return click;
    },
    //启用a标签
    enableda: function (a, click) {
        $(a).attr("onclick", click).css({ "background-color": "", "border": "", "color": "" });
    },
    showWait: function (msg, isClose)
    {
        var html = '<div id="rf_showwaitdiv" style="display:none;width:200px;text-align:center;padding-top:15px;">';
        html += '<img src="' + this.rooturl() + '/RoadFlowResources/images/loading/load4.gif" style="vertical-align:middle; padding-right:6px; margin-right:3px"/>';
        html += msg || '正在加载...';
        html += '</div>';
        $(window.document.body).append(html);
        new RoadUI.Window().open({
            id: "rf_showwaitdiv",
            elementid: "rf_showwaitdiv",
            opener: window,
            width: isClose ? 200 : 200,
            height: isClose ? 80 : 50,
            showclose: isClose || false,
            showtitle: isClose || false,
            title: isClose ? msg : '',
            ismodal: true,
            showmaskdiv: true
        });
    },
    closeWait: function ()
    {
        new RoadUI.Window().close('rf_showwaitdiv');
    },
    ajaxContentType: "application/json; charset=utf-8",
    showError: function (json)
    {
        var errjson = JSON.parse(json.responseText);
        alert(errjson.Message);
    },
    checkLogin: function (json, refresh)
    {
        if (!json)
        {
            return false;
        }
        if ("string" == typeof json)
        {
            try
            {
                json = JSON.parse(json);
                if (json.loginstatus && json.loginstatus == -1)
                {
                    //alert('登录状态失效,请重新登录!');
                    if (false == refresh)
                    {
                        top.login("");
                    }
                    return false;
                }
                return true;
            } catch (e)
            {
                return true;
            }
        }
        if (json.loginstatus && json.loginstatus == -1)
        {
            top.login(false == refresh ? "" : json.url || "");
            return false;
        }
        return true;
    },
    serializeForm: function ($form)
    {
        var o = {};
        var a = $form.serializeArray();
        $.each(a, function ()
        {
            if (o[this.name] !== undefined)
            {
                if (!o[this.name].push)
                {
                    //o[this.name] = [o[this.name]];
                    this.value = o[this.name] + "," + (this.value || '');
                }
                o[this.name] = this.value || '';
            } else
            {
                o[this.name] = this.value || '';
            }
        });
        return o;
    },
    unescape: function (text)
    {
        if (!text || $.trim(text).length == 0)
        {
            return text;
        }
        return unescape(text);
    },
    escape: function (text)
    {
        if (!text || $.trim(text).length == 0)
        {
            return text;
        }
        return escape(text);
    }
};

RoadUI.Xml = {
    getXmlDom: function ()
    {
        var xmldoc;
        if (window.ActiveXObject)
        {
            xmldoc = new ActiveXObject("Microsoft.XMLDOM");
        }
        else
        {
            if (document.implementation && document.implementation.createDocument)
            {
                xmldoc = document.implementation.createDocument("", "doc", null);
            }
        }
        return xmldoc;
    },
    loadXML: function (xml)
    {
        var xmldoc = RoadUI.Xml.getXmlDom();
        xmldoc.async = false;
        try
        {
            xmldoc.loadXML(xml);
        }
        catch (e)
        {
            xmldoc = new DOMParser().parseFromString(xml, "text/xml");
        }
        return xmldoc;
    },
    getElementValue: function (elements)
    {
        return elements && elements.length > 0 && elements[0].firstChild ? elements[0].firstChild.nodeValue : "";
    }
};

String.prototype.isInteger = function ()
{
    return (new RegExp(/^\d+$/).test(this));
};
String.prototype.isNumber = function (value, element)
{
    return (new RegExp(/^-?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/).test(this));
};
String.prototype.trim = function ()
{
    return this.replace(/(^\s*)|(\s*$)/g, "");
};
String.prototype.isNullOrEmpty =function()
{
    return !this || this.length == 0 || this.trim().length == 0;
};
String.prototype.startWith = function (pattern)
{
    return this.indexOf(pattern) === 0;
};
String.prototype.endWith = function (pattern)
{
    var d = this.length - pattern.length;
    return d >= 0 && this.lastIndexOf(pattern) === d;
};
String.prototype.encodeTXT = function ()
{
    return (this).replaceAll('&', '&amp;').replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll(" ", "&nbsp;");
};
String.prototype.isMail = function ()
{
    return (new RegExp(/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/).test(this.trim()));
};
String.prototype.isPhone = function ()
{
    return (new RegExp(/(^([0-9]{3,4}[-])?\d{3,8}(-\d{1,6})?$)|(^\([0-9]{3,4}\)\d{3,8}(\(\d{1,6}\))?$)|(^\d{3,8}$)/).test(this));
};
String.prototype.isUrl = function ()
{
    return (new RegExp(/^[a-zA-z]+:\/\/([a-zA-Z0-9\-\.]+)([-\w .\/?%&=:]*)$/).test(this));
};
String.prototype.isExternalUrl = function ()
{
    return this.isUrl() && this.indexOf("://" + document.domain) == -1;
};
String.prototype.replaceAll = function (s1, s2, ignoreCase)
{
    var str = this;
    if ('.' == s1)
    {
        while (str.indexOf(s1) != -1)
        {
            str = str.replace(s1, s2);
        }
        return str;
    }
    else
    {
        if (!RegExp.prototype.isPrototypeOf(s1))
        {
            return str.replace(new RegExp(s1, (ignoreCase ? "gi" : "g")), s2);
        }
        else
        {
            return str.replace(s1, s2);
        }
    }
};
String.prototype.isDate = function ()
{
    var str = this;
    var reg = /^(\d+)-(\d{1,2})-(\d{1,2})$/;
    var r = str.match(reg);
    if (r == null)
    {
        reg = /^(\d+)\/(\d{1,2})\/(\d{1,2})$/;
        r = str.match(reg);
    }
    if (r == null) return false;
    r[2] = r[2] - 1;
    var d = new Date(r[1], r[2], r[3]);
    if (d.getFullYear() != r[1]) return false;
    if (d.getMonth() != r[2]) return false;
    if (d.getDate() != r[3]) return false;
    return true;
}
String.prototype.isDateTime = function ()
{
    var str = this;
    var reg = /^(\d+)-(\d{1,2})-(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
    var r = str.match(reg);
    if (r == null)
    {
        reg = /^(\d+)\/(\d{1,2})\/(\d{1,2}) (\d{1,2}):(\d{1,2}):(\d{1,2})$/;
        r = str.match(reg);
    }
    if (r == null) return false;
    r[2] = r[2] - 1;
    var d = new Date(r[1], r[2], r[3], r[4], r[5], r[6]);
    if (d.getFullYear() != r[1]) return false;
    if (d.getMonth() != r[2]) return false;
    if (d.getDate() != r[3]) return false;
    if (d.getHours() != r[4]) return false;
    if (d.getMinutes() != r[5]) return false;
    if (d.getSeconds() != r[6]) return false;
    return true;
}
String.prototype.removeHtml = function ()
{
    var str = this;
    return str.replace(/<[^>]+>/g, "");//去掉所有的html标记
};
Date.prototype.format = function (format)
{
    var o = {
        "M+": this.getMonth() + 1,
        "d+": this.getDate(),
        "h+": this.getHours(),
        "m+": this.getMinutes(),
        "s+": this.getSeconds(),
        "q+": Math.floor((this.getMonth() + 3) / 3),
        "S": this.getMilliseconds()
    }
    if (/(y+)/.test(format))
    {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    }
    for (var k in o)
    {
        if (new RegExp("(" + k + ")").test(format))
        {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};
Array.prototype.unique = function ()
{
    var res = [];
    var json = {};
    for (var i = 0; i < this.length; i++)
    {
        if (!json[this[i]])
        {
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    return res;
};
Array.prototype.remove = function (obj)
{
    for (var i = 0; i < this.length; i++)
    {
        var temp = this[i];
        if (!isNaN(obj))
        {
            temp = i;
        }
        if (temp == obj)
        {
            for (var j = i; j < this.length; j++)
            {
                this[j] = this[j + 1];
            }
            this.length = this.length - 1;
        }
    }
};

var currentFocusObj = null; //当前焦点对象
function initElement($elements, type)
{
    return;
    /*if (!$elements || $elements.size() == 0) {
        return;
    }
    var cssType = type;
    $elements.addClass(cssType + "1")
        .bind("mouseover", function () {
            $(this).removeClass().addClass(cssType + ("select" == cssType ? "3" : "2"));
        }).bind("mouseout", function () {
        if (currentFocusObj == null || $(this).get(0) !== currentFocusObj) {
            $(this).removeClass().addClass(cssType + "1");
        }
    }).bind("focus", function () {
        if (currentFocusObj != null) {
            var css = $(currentFocusObj).attr("class").replace("1", "").replace("2", "").replace("3", "");
            $(currentFocusObj).removeClass().addClass(css + "1");
        }

        $(this).removeClass().addClass(cssType + ("select" == cssType ? "3" : "2"));
        currentFocusObj = $(this).get(0);
    });*/
}

//处理键盘事件 禁止后退键（Backspace）密码或单行、多行文本框除外
function banBackSpace(e)
{
    var ev = e || window.event;//获取event对象
    var obj = ev.target || ev.srcElement;//获取事件源
    var t = obj.type || obj.getAttribute('type');//获取事件源类型
    //获取作为判断条件的事件类型
    var vReadOnly = obj.getAttribute('readonly');
    var vEnabled = obj.getAttribute('enabled');
    //处理null值情况
    vReadOnly = (vReadOnly == null) ? false : vReadOnly;
    vEnabled = (vEnabled == null) ? true : vEnabled;
    //当敲Backspace键时，事件源类型为密码或单行、多行文本的，
    //并且readonly属性为true或enabled属性为false的，则退格键失效
    var flag1 = (ev.keyCode == 8 && (t == "password" || t == "text" || t == "textarea" || t == "search" || t == "number")
        && (vReadOnly == true || vEnabled != true)) ? true : false;
    //当敲Backspace键时，事件源类型非密码或单行、多行文本的，则退格键失效
    var flag2 = (ev.keyCode == 8 && t != "password" && t != "text" && t != "textarea" && t != "search" && t != "number")
        ? true : false;
    //判断
    if (flag2)
    {
        return false;
    }
    if (flag1)
    {
        return false;
    }
}


RoadUI.Window = function () {
    this.opts = {};
    var instance = this;
    this.open = function (options) {
        var defaults = {
            id: "",
            title: "",
            url: "",
            ico: "",
            showico: true,
            showclose: true,
            left: 0,
            top: 0,
            height: 300,
            width: 600,
            ismodal: true, //是否模态窗口
            move: true, //是否可以移动
            zindex: 99999999,
            resize: true,
            settopwindow: true,//是否要设置top.roadflowCurrentWindow
            opener: null,
            openerid: "",
            data: null,//要提交的数据
            elementid: "", //要显示的DIV层的内容
            showtitle: true, //是否显示标题栏
            showmaskdiv: true, //为模态窗口时是否显示遮照层
            mouseover: null, //mouseover事件函数
            mouseout: null, //mouseout事件函数
            dblclickclose: true //是否可以双击关闭
        };

        this.opts = $.extend(defaults, options);
        this.opts.opener = this.getOpener();
        this.opts.id = this.getID();
        var $opener = $(this.opts.opener);
        if ($opener == null || $opener.size() == 0) {
            throw "父窗口为空!";
        }

        var $openerBody = $(this.opts.opener.document.body);
        var $openerDocument = $(this.opts.opener.document);
        if ($openerBody == null || $openerBody.size() == 0) {
            throw "父窗口body为空!";
        }

        if (this.opts.settopwindow) {
            try {
                top.roadflowCurrentWindow = this.opts.opener;
            } catch (e) { }
        }
        if (this.opts.left == 0) {
            this.opts.left = ($opener.width() - this.opts.width) / 2;
        }
        if (this.opts.top == 0) {
            this.opts.top = ($opener.height() - this.opts.height) / 2 + $(this.opts.opener.document).scrollTop();
        }
        if (this.opts.ismodal)//如果是模态窗口，则添加遮罩层
        {
            var $maskdiv = $('<div id="' + this.opts.id + '_maskdiv" class="' + (this.opts.showmaskdiv ? "window_maskdiv" : "window_maskdiv1") + '" style="display:none;z-index:' + (this.opts.zindex - 1) + ';"></div>', $openerDocument);
            //$maskdiv.width($opener.width()).height(Math.max($openerBody.get(0).clientHeight, $opener.height()));
            $openerBody.append($maskdiv);
            $maskdiv.show();
        }

        var $maindiv = $('<div id="' + this.opts.id + '" class="window_maindiv" style="left:' + this.opts.left + 'px;top:' + this.opts.top + 'px;width:' + this.opts.width + 'px;height:' + this.opts.height + 'px;z-index:' + this.opts.zindex + ';"></div>', $openerDocument);
        var $titlediv = $('<div id="' + this.opts.id + '_titlediv" class="window_title"></div>', $openerDocument);
        var $dragdiv = $('<div id="' + this.opts.id + '_dragdiv" style="position:absolute;left:0px;top:26px;height:' + (this.opts.height).toString() + 'px;display:none;width:' + (this.opts.width).toString() + 'px;background:#f6f6f6;filter:alpha(opacity=30);-khtml-opacity:0.3;-moz-opacity:.3;opacity:0.3;"></div>', $openerDocument);
        if ($.isFunction(this.opts.mouseover)) {
            $maindiv.bind("mouseover", this.opts.mouseover);
        }
        if ($.isFunction(this.opts.mouseout)) {
            $maindiv.bind("mouseout", this.opts.mouseout);
        }
        var $titlediv_title = $('<div class="' + (this.opts.showico ? 'window_title_title_ico' : 'window_title_title') + '">' + this.opts.title + '</div>', $openerDocument);
        if (this.opts.showico && this.opts.ico && $.trim(this.opts.ico).length > 0) {
            $titlediv_title.css({ 'background-image': 'url(' + this.opts.ico + ')' });
        }
        //双击关闭窗口
        if (this.opts.dblclickclose) {
           // $titlediv_title.bind("dblclick", function () { instance.close($(this).parent().parent().attr("id"), true); });
        }

        var $titlediv_button = $();
        if (this.opts.showclose) {
            $titlediv_button = $('<div class="window_title_button">&nbsp;</div>', $openerDocument);
            $titlediv_button.bind("mouseover", function () {
                $(this).removeClass().addClass("window_title_button1");
            }).bind("mouseout", function () {
                $(this).removeClass().addClass("window_title_button");
            }).bind("click", function () {
                instance.close($(this).parent().parent().attr("id"), true);
            });
        }
        $titlediv.append($titlediv_title, $titlediv_button, '<div style="clear:both;"></div>');

        var isShowUrl = this.opts.url && $.trim(this.opts.url).length > 0;
        var isShowDiv = this.opts.elementid && $.trim(this.opts.elementid).length > 0;

        var $bodydiv = isShowUrl ? $('<div class="window_body"></div>', $openerDocument) : $('<div class="window_body"></div>');
        var bodydivHeight = this.opts.height - (this.opts.resize ? 39 : 26);
        $bodydiv.css({ "height": bodydivHeight + "px" });

        var isPostSubmit = this.opts.data;//是否是post提交
        var $form;
        if (isShowUrl) {
            var url = this.opts.url;
            if (url.indexOf('?') >= 0) {
                url += "&iframeid=" + this.opts.id + "&openerid=" + this.opts.openerid;
            }
            else {
                url += "?iframeid=" + this.opts.id + "&openerid=" + this.opts.openerid;
            }
            //url = url.substr(0, 1) == "/" ? RoadUI.Core.rooturl() + url : url;
            //如果选项中包含data，则用post方式提交，主要是解决组织机构附件等值较长时url报错问题
            if (isPostSubmit) {
                $form = $('<form method="post" id="' + this.opts.id + '_form" name="' + this.opts.id + '_form" action="' + url + '" target="' + this.opts.id + '_iframe"></form>');
                for (var param in this.opts.data) {
                    $hidden = $('<input type="hidden" name="' + param + '"/>');
                    $hidden.val(this.opts.data[param]);
                    $form.append($hidden);
                }
                $bodydiv.append($form);
            }
            var $iframe = $('<div style="-webkit-overflow-scrolling:touch;overflow:auto;">'
                + '<iframe id="' + this.opts.id + '_iframe" ' + (isPostSubmit ? "" : 'src="' + url + '"') + ' name="' + this.opts.id + '_iframe"  frameborder="0" marginheight="0" marginwidth="0" border="0" style="border:none 0;margin:0;padding:0;width:100%;height:' + bodydivHeight + 'px;"></iframe></div>', $openerDocument);
            if (!this.opts.title || this.opts.title.length === 0) {
                $iframe.bind("load", function () {
                    if (!instance.opts.title || $.trim(instance.opts.title).length == 0) {
                        var title = "";
                        try {
                            title = $("html head title", $(this).contents()).html();
                        } catch (e) { }
                        instance.setTitle(title);
                    }
                });
            }
            $bodydiv.append($iframe);
        }
        else if (isShowDiv) {
            var $ele = $("#" + this.opts.elementid, $openerDocument);
            $ele.appendTo($bodydiv);
            $ele.show();
        }
        if (this.opts.showtitle) {
            $maindiv.append($titlediv);
        }
        $maindiv.append($bodydiv);
        if (this.opts.resize) {
            $resizediv = $('<div class="window_resize"><div class="window_resize_img">&nbsp;</div></div>', $openerDocument);
        }
        $maindiv.append($dragdiv);
        if (isShowUrl) {
            $openerBody.append($maindiv);
        }
        else if (isShowDiv) {
            var $form = $("form", $openerDocument);
            //页面有FORM的时候要将内容加到form下，以便于表单提交
            if ($form.size() > 0) {
                $form.append($maindiv);
            }
            else {
                $openerBody.append($maindiv);
            }
        }

        var maindiv = $maindiv.get(0);
        var titlediv = $titlediv.get(0);
        //var resizediv = $resizediv ? $resizediv.get(0) : null;
        if (this.opts.move) {
            var dragBody = maindiv;
            var handle = titlediv;
            $opener.get(0).Drag.init(handle, dragBody);
            if (!document.all) {
                dragBody.onDragStart = function (left, top, mouseX, mouseY) {
                    $dragdiv.show(); //非ie浏览器下在拖拽时用一个层遮住iframe，以免光标移入iframe失去拖拽响应
                }
                dragBody.onDragEnd = function (left, top, mouseX, mouseY) {
                    $dragdiv.hide();
                }
            }
        };
        if (isPostSubmit) {
            $form.trigger("submit").remove();
        }
        //if (RoadUI.Core.isIe6Or7()) { try { $('#' + this.opts.id + '_maskdiv', $body).bgiframe(); } catch (e) { } }
        return this.opts.id;
    };
    this.getOpener = function () {
        if (this.opts.opener) {
            return this.opts.opener;
        }
        if (this.opts.openerid) {
            iframesArray = [];
            addIframe(top.document);
            for (var i = 0; i < iframesArray.length; i++) {
                if ($(iframesArray[i]).attr("id") == this.opts.openerid || $(iframesArray[i]).attr("name") == this.opts.openerid) {
                    return iframesArray[i].contentWindow;
                }
            }
            for (var i = 0; i < iframesArray.length; i++) {
                if ($(iframesArray[i]).attr("id") == this.opts.openerid + "_iframe" || $(iframesArray[i]).attr("name") == this.opts.openerid + "_iframe") {
                    return iframesArray[i].contentWindow;
                }
            }
        }
        return window;
    };
    this.getOpenerWindow = function () {
        iframesArray = [];
        var openerid = RoadUI.Core.queryString("openerid") || "";
        if (openerid && openerid.length > 0) {
            //openerid += "_iframe";
        }
        var ele = $();
        var iframes = $(top.document).find("iframe");
        if (openerid && openerid.length > 0) {
            for (var i = iframes.size() - 1; i >= 0; i--) {
                if (openerid && openerid.length > 0 && (openerid == iframes.eq(i).attr("id") || openerid + "_iframe" == iframes.eq(i).attr("id"))) {
                    return iframes.eq(i).get(0).contentWindow;
                }
            }
        }

        iframesArray.push(top);
        addIframe(top.document);
        for (var i = 0; i < iframesArray.length; i++) {
            if (openerid && openerid.length > 0 && (openerid == $(iframesArray[i]).attr("id") || openerid + "_iframe" == $(iframesArray[i]).attr("id"))) {
                return iframesArray[i].contentWindow;
            }
        }
        if (top.roadflowCurrentWindow) {
            return top.roadflowCurrentWindow;
        }
        return null;
    };
    this.getID = function () {
        var id = this.opts.id != null && this.opts.id != undefined && $.trim(this.opts.id).length > 0 ? this.opts.id : "roadui_window_" + Math.random().toString();
        return id.replaceAll('.', '');
    };
    this.setTitle = function (title) {
        this.opts.title = title;
        var mainid = this.opts.id;
        var $titlediv = $(">div:first", $("#" + mainid + "_titlediv", $(this.opts.opener.document)));
        if ($titlediv == null || $titlediv.size() == 0) {
            return false;
        }
        $titlediv.text(title);
        return true;
    };
    this.close = function (id, fromInstance) {
        //fromInstance参数表示是否通过实例关闭，窗口右上角的X按钮
        if (!id || id.trim().length == 0) {
            id = RoadUI.Core.queryString("iframeid");
        }
        return closeWindow(id, fromInstance);
    };
    this.closeAll = function () {
        return closeWindow();
    };
    function closeWindow(id, fromInstance) {
        var amount = 0;
       
        iframesArray = [];
       
        iframesArray.push(parent);
        iframesArray.push(window);
        addIframe(parent.document);
        for (var i = 0; i < iframesArray.length; i++) {
            try {
                if (!iframesArray[i].contentWindow || !iframesArray[i].contentWindow.document || iframesArray[i].contentWindow.document == null) {
                    //continue;
                }
            } catch (e) {
                continue;
            }

            var $maindiv1 = null;
            try {
                $maindiv1 = !id || id.trim().length == 0 ? $("div[id^='roadui_window_']", iframesArray[i].document) : $("#" + id, iframesArray[i].document);
            } catch (e) {
            }

            if ($maindiv1 != null && $maindiv1.size() > 0) {
                for (var j = 0; j < $maindiv1.size(); j++) {
                    try {
                        $iframes = $maindiv1.eq(j).find("iframe");
                        $iframes.each(function () {
                            ifrm = $(this).get(0);
                            ifrm.src = "";
                            if (fromInstance) {
                                //fromInstance参数表示是否通过实例关闭，窗口右上角的X按钮(解决IE下通过X按钮关闭后再次打开提示没有权限错误)
                                try {
                                    ifrm.document.write('');
                                } catch (e) { }
                                
                                //ifrm.contentWindow.document.clear();
                                //ifrm.contentWindow.close();
                            }
                        });

                        $("#" + $maindiv1.eq(j).attr("id") + "_maskdiv", iframesArray[i].document).remove();
                        $iframes.remove();
                        $maindiv1.eq(j).remove();
                    } catch (e) { }
                    amount++;
                }
            } else {
                if (document.all) {
                    //由于IE8下关闭iframe会引起字体图标不显示，这里重新加载CSS
                    try {
                        $("#style_fontawesome", iframesArray[i].document).attr("href", "/RoadFlowResources/scripts/font-awesome-4.7.0/css/font-awesome.min.css?v=" + RoadUI.Core.newid(false));
                    } catch (e) { }
                }
            }
        }
        //if (document.all) {
        //    try {
        //        $("#style_fontawesome", top.document).attr("href", "/RoadFlowResources/scripts/font-awesome-4.7.0/css/font-awesome.min.css?v=" + RoadUI.Core.newid(false));
        //    } catch (e) { }
        //    try {
        //        CollectGarbage();
        //    } catch (e) { }
        //}
        return amount;
    };
    var iframesArray = [];
    this.getOpenerElement = function (id) {

        iframesArray = [];
        addIframe(parent.document);
        for (var i = 0; i < iframesArray.length; i++) {
            var doc = null;
            try {
                doc = iframesArray[i].contentWindow.document;
            }
            catch (e) {
                doc = iframesArray[i].document;
            }
            if (doc) {
                var obj = doc.getElementById(id);
                if (obj) {
                    iframesArray = [];
                    return $(obj);
                }
            }
        }
};

    var addIframe = function (doc) {
        var iframes = $(doc).find("iframe");
        for (var i = 0; i < iframes.size() ; i++) {
            try {
                iframesArray.push(iframes.eq(i).get(0));
            } catch (e) { }
            var doc = undefined;
            try {
                doc = iframes.eq(i).get(0).contentWindow.document;
            } catch (e) { }
            if (doc) {
                addIframe(doc);
            }
        }
    };

    this.reloadOpener = function (url, id, type) //type为webapi刷新函数 不为空表示webapi刷新
    {
        if (!id || id.trim().length == 0) {
            id = RoadUI.Core.queryString("refreshwindowid");
        }
        if (!id || id.trim().length == 0) {
            id = RoadUI.Core.queryString("openerid");
        }
        //if (!id || id.trim().length == 0) {
        //    id = RoadUI.Core.queryString("iframeid");
        //}

        iframesArray = [];
        addIframe(top.document);
        for (var i = 0; i < iframesArray.length; i++) {
            if (id + "_iframe" == $(iframesArray[i]).attr("id") || id == $(iframesArray[i]).attr("id")) {
                var win = iframesArray[i].contentWindow;
                if (type && $.trim(type).length > 0) {
                    eval("win." + type);
                }
                else {
                    win.location = !url || $.trim(url).length == 0 ? win.location : url;
                }
                return true;
            }
        }
        var currentWindow = this.opts.opener;
        if (!currentWindow) {
            currentWindow = top.roadflowCurrentWindow
        }
        if (currentWindow) {
            var win = currentWindow;
            if (type && $.trim(type).length > 0) {
                try {
                    eval("win." + type);
                } catch (e) { }
            }
            else {
                win.location = !url || $.trim(url).length == 0 ? win.location : url;
            }
            return true;
        }
        return false;
    };
    this.resize = function (width, height) {
        if (!width || !height) {
            return;
        }
        try {
            var $maindiv = $("#" + this.opts.id, $(this.opts.opener.document));
            if ($maindiv == null || $maindiv.size() == 0) {
                return;
            }
            $maindiv.css({ "height": height + "px", "width": width + "px" });
            var $bodydiv = $(".window_body", $maindiv);
            if ($bodydiv == null || $bodydiv.size() == 0) {
                return;
            }
            var bodydivHeight = height - (this.opts.resize ? 39 : 26);
            $bodydiv.css({ "height": bodydivHeight + "px" });
            var $iframe = $("iframe", $bodydiv);
            if ($iframe && $iframe.size() > 0) {
                $iframe.css({ "height": bodydivHeight + "px" });
            }
        } catch (e) { }
    };
    var doBothDrag = function (x, y, maindiv) {
        if (x < 110) {
            x = 110;
        }

        maindiv.style.width = (x - 8) + 'px';
        if (y < 35) {
            y = 35;
        }

        maindiv.style.height = (y - 8) + 'px';
        instance.resize(x - 8, y - 8);
    };
    var draging = function (oElement, fnGetPos, fnOnDrag, win) {
        win = win || window;
        var obj = this;
        this.oElement = oElement;
        this.fnGetPos = fnGetPos;
        this.fnOnDrag = fnOnDrag;
        this.__oStartOffset__ = { x: 0, y: 0 };

        this.fnOnMouseUp = function (ev) {
            obj.stopDrag(win.event || ev);
        };

        this.fnOnMouseMove = function (ev) {
            obj.doDrag(win.event || ev);
        };

        this.oElement.onmousedown = function (ev) {
            obj.startDrag(win.event || ev);
        };
    };
    draging.prototype.startDrag = function (oEvent) {
        var oPos = this.fnGetPos();
        var x = oEvent.clientX;
        var y = oEvent.clientY;

        this.__oStartOffset__.x = x - oPos.x;
        this.__oStartOffset__.y = y - oPos.y;

        if (this.oElement.setCapture) {
            this.oElement.setCapture();

            this.oElement.onmouseup = this.fnOnMouseUp;
            this.oElement.onmousemove = this.fnOnMouseMove;
        }
        else {
            document.addEventListener("mouseup", this.fnOnMouseUp, true);
            document.addEventListener("mousemove", this.fnOnMouseMove, true);

            window.captureEvents(Event.MOUSEMOVE | Event.MOUSEUP);
        }
    };
    draging.prototype.stopDrag = function (oEvent) {
        if (this.oElement.releaseCapture) {
            this.oElement.releaseCapture();

            this.oElement.onmouseup = null;
            this.oElement.onmousemove = null;
        }
        else {
            document.removeEventListener("mouseup", this.fnOnMouseUp, true);
            document.removeEventListener("mousemove", this.fnOnMouseMove, true);

            window.releaseEvents(Event.MOUSE_MOVE | Event.MOUSE_UP);
        }
    };
    draging.prototype.doDrag = function (oEvent) {
        var x = oEvent.clientX;
        var y = oEvent.clientY;

        this.fnOnDrag(x - this.__oStartOffset__.x, y - this.__oStartOffset__.y);
    };
}
var Drag = {
    "obj": null,
    "init": function (handle, dragBody, e) {
        if (e == null) handle.onmousedown = Drag.start;
        handle.root = dragBody;
        if (isNaN(parseInt(handle.root.style.left))) handle.root.style.left = "0px";
        if (isNaN(parseInt(handle.root.style.top))) handle.root.style.top = "0px";
        handle.root.onDragStart = new Function();
        handle.root.onDragEnd = new Function();
        handle.root.onDrag = new Function();
        if (e != null) {
            var handle = Drag.obj = handle;
            e = Drag.fixEvent(e);
            var top = parseInt(handle.root.style.top);
            var left = parseInt(handle.root.style.left);
            handle.root.onDragStart(left, top, e.pageX, e.pageY);
            handle.lastMouseX = e.pageX;
            handle.lastMouseY = e.pageY;
            document.onmousemove = Drag.drag;
            document.onmouseup = Drag.end;
        }
    },
    "start": function (e) {
        var handle = Drag.obj = this;
        e = Drag.fixEvent(e);
        var top = parseInt(handle.root.style.top);
        var left = parseInt(handle.root.style.left);
        try { handle.root.onDragStart(left, top, e.pageX, e.pageY); } catch (e) { }
        handle.lastMouseX = e.pageX;
        handle.lastMouseY = e.pageY;
        document.onmousemove = Drag.drag;
        document.onmouseup = Drag.end;
        return false;
    },
    "drag": function (e) {
        e = Drag.fixEvent(e);
        var handle = Drag.obj;
        var mouseY = e.pageY;
        var mouseX = e.pageX;
        var top = parseInt(handle.root.style.top);
        var left = parseInt(handle.root.style.left);

        if (document.all) { Drag.obj.setCapture(); } else { e.preventDefault(); }; //作用是将所有鼠标事件捕获到handle对象，对于firefox，以用preventDefault来取消事件的默认动作：
        var currentLeft, currentTop;
        currentLeft = left + mouseX - handle.lastMouseX;
        currentTop = top + (mouseY - handle.lastMouseY);
        if (currentLeft < 0) currentLeft = 0;
        if (currentTop < 0) currentTop = 0;
        if (currentLeft > parseInt($(window).width()) - parseInt(handle.root.style.width))
            currentLeft = parseInt($(window).width()) - parseInt(handle.root.style.width);
        if (currentTop > parseInt($(window).height()) - parseInt(handle.root.style.height))
            currentTop = parseInt($(window).height()) - parseInt(handle.root.style.height);
        handle.root.style.left = currentLeft + "px";
        handle.root.style.top = currentTop + "px";
        handle.lastMouseX = mouseX;
        handle.lastMouseY = mouseY;
        handle.root.onDrag(currentLeft, currentTop, e.pageX, e.pageY);
        return false;
    },
    "end": function () {
        if (document.all) { Drag.obj.releaseCapture(); }; //取消所有鼠标事件捕获到handle对象
        document.onmousemove = null;
        document.onmouseup = null;
        try { Drag.obj.root.onDragEnd(parseInt(Drag.obj.root.style.left), parseInt(Drag.obj.root.style.top)); } catch (e) { }
        Drag.obj = null;
    },
    "fixEvent": function (e)//格式化事件参数对象
    {
        var sl = Math.max(document.documentElement.scrollLeft, document.body.scrollLeft);
        var st = Math.max(document.documentElement.scrollTop, document.body.scrollTop);
        if (typeof e == "undefined") e = window.event;
        if (typeof e.layerX == "undefined") e.layerX = e.offsetX;
        if (typeof e.layerY == "undefined") e.layerY = e.offsetY;
        if (typeof e.pageX == "undefined") e.pageX = e.clientX + sl - document.body.clientLeft;
        if (typeof e.pageY == "undefined") e.pageY = e.clientY + st - document.body.clientTop;
        return e;
    }
};
//jquery.bgiframe.pack.js
//eval(function (p, a, c, k, e, r) { e = function (c) { return (c < a ? '' : e(parseInt(c / a))) + ((c = c % a) > 35 ? String.fromCharCode(c + 29) : c.toString(36)) }; if (!''.replace(/^/, String)) { while (c--) r[e(c)] = k[c] || e(c); k = [function (e) { return r[e] }]; e = function () { return '\\w+' }; c = 1 }; while (c--) if (k[c]) p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]); return p }('(b($){$.m.E=$.m.g=b(s){h($.x.10&&/6.0/.I(D.B)){s=$.w({c:\'3\',5:\'3\',8:\'3\',d:\'3\',k:M,e:\'F:i;\'},s||{});C a=b(n){f n&&n.t==r?n+\'4\':n},p=\'<o Y="g"W="0"R="-1"e="\'+s.e+\'"\'+\'Q="P:O;N:L;z-H:-1;\'+(s.k!==i?\'G:J(K=\\\'0\\\');\':\'\')+\'c:\'+(s.c==\'3\'?\'7(((l(2.9.j.A)||0)*-1)+\\\'4\\\')\':a(s.c))+\';\'+\'5:\'+(s.5==\'3\'?\'7(((l(2.9.j.y)||0)*-1)+\\\'4\\\')\':a(s.5))+\';\'+\'8:\'+(s.8==\'3\'?\'7(2.9.S+\\\'4\\\')\':a(s.8))+\';\'+\'d:\'+(s.d==\'3\'?\'7(2.9.v+\\\'4\\\')\':a(s.d))+\';\'+\'"/>\';f 2.T(b(){h($(\'> o.g\',2).U==0)2.V(q.X(p),2.u)})}f 2}})(Z);', 62, 63, '||this|auto|px|left||expression|width|parentNode||function|top|height|src|return|bgiframe|if|false|currentStyle|opacity|parseInt|fn||iframe|html|document|Number||constructor|firstChild|offsetHeight|extend|browser|borderLeftWidth||borderTopWidth|userAgent|var|navigator|bgIframe|javascript|filter|index|test|Alpha|Opacity|absolute|true|position|block|display|style|tabindex|offsetWidth|each|length|insertBefore|frameborder|createElement|class|jQuery|msie'.split('|'), 0, {}));

//禁止后退键 作用于Firefox、Opera
document.onkeypress = banBackSpace;
//禁止后退键  作用于IE、Chrome
document.onkeydown = banBackSpace;

module.exports=RoadUI;