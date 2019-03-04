function create_tabs(tabs)
{
    if ($(tabs).length == 0) return;
    //remove div,which is added to make it compatible to easytabs
    var tab_panels = $(tabs + '> div').detach();
    $(tabs).append('<div></div>');
    for (var i = 0; i < tab_panels.length;i++){
        $(tabs + '> div').append(tab_panels[i]);
    }
    $(tabs).addClass("tabs-org");
    $(tabs + '>ul').addClass("nav nav-tabs");
    $(tabs + '> div').addClass("tab-content");
    $(tabs).easytabs({
        animate: false
    });
}

//selectmenu bug fix and wrap
$.widget("ui.selectmenu", $.ui.selectmenu, {
    //add maxHeight option
    options: $.extend(this.options, { maxHeight: null }),
    _resizeMenu: function () {        
        if (this.options.maxHeight != null) {
            this.menu.css("maxHeight", this.options.maxHeight + "px");
        }
        return this._super();
    },
    //fix selected not visible bug
    open:function(){
        if (this.options.disabled) {
            return;
        }

        // If this is the first time the menu is being opened, render the items
        if (!this.menuItems) {
            this._refreshMenu();
        } else {
            // Menu clears focus on close, reset focus to selected item
            this.menu.find(".ui-state-focus").removeClass("ui-state-focus");
        }
        this.isOpen = true;
        this._toggleAttr();
        this._resizeMenu();
        this._position();

        this.menuInstance.focus(null, this._getSelectedItem());
        this._on(this.document, this._documentClick);
        this._trigger("open", event);
    }
});

function init_selectmenu(select, width, maxHeight, change_fun) {
    if (change_fun != undefined) {
        $(select).selectmenu({
            width: width,
            maxHeight: maxHeight,
            change: function (event, object) { change_fun(event, object.item) }
        });
    }
    else {
        $(select).selectmenu({
            width: width,
            maxHeight: maxHeight
        });
    }    
}

jQuery.fn.select_val = function (value) {
    if (arguments.length) {
        if(this.children('option[value="' + value + '"]').length > 0) {
            this.val(value);
            this.selectmenu("refresh");
        }
    }
    else {
        return this.val();
    }
}

//check box wrap for bootstrap style
function init_checkbox(check) {
    $(check).each(function () {
        var check_or_radio = $(this);        
        var label = $("label[for='" + check_or_radio.attr("id") + "']");
        if (label.length) {
            check_or_radio.prependTo(label);
            check_or_radio.attr("value", label.text());
            label.removeAttr("for");

            //inline
            if (check_or_radio.attr("type") == "checkbox") {
                label.addClass("checkbox-inline");
            }
            else {
                label.addClass("radio-inline");
            }
        }        
    });
}

jQuery.fn.check_change = function (func) {
    this.click(func);
}

jQuery.fn.check_disabled = function (value) {
    if (value == true) this.attr('disabled', 'disabled');
}

jQuery.fn.check_val = function (value) {
    if (arguments.length) {
        this.attr('checked', value);
    }
    else {
        return this.prop('checked');
    }    
}
$(function(){
    init_checkbox('input[type=checkbox],input[type=radio]');

    $("button, input:submit, input:button").button().live("focus", function () {
        $(this).blur();
    });
    $("input:text,input:password").addClass("text");
    create_tabs("#tabs");
})
var inform_auto_hide_timer=0;
function hide_informer(){
    $(".inform").html("");
    if(inform_auto_hide_timer!=0){
        clearTimeout(inform_auto_hide_timer);
        inform_auto_hide_timer=0;
    }
}
function show_informer_text(text, time) {
    var t = "3000";
    if (time) {
        t = time;
    }
    toastr.options = {
        closeButton: true,
        debug: true,
        progressBar: true,
        positionClass: "toast-bottom-right",
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: t,
        extendedTimeOut: t,
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "slideDown",
        hideMethod: "slideUp"
    };
    var length = $(".toast-error").length;
    if (length == 0) {
        toastr.error(text, 'hint');
    }
}
function show_informer(text,time) {
    var t = "save success";
    var ti = "1000";
    if (text) {
        t = text;
    }
    if (time) {
        ti = time;
    }
    toastr.options = {
        closeButton: true,
        debug: true,
        progressBar: true,
        positionClass: "toast-bottom-right",
        onclick: null,
        showDuration: "300",
        hideDuration: "1000",
        timeOut: ti,
        extendedTimeOut: ti,
        showEasing: "swing",
        hideEasing: "linear",
        showMethod: "slideDown",
        hideMethod: "slideUp"
    };
    var length = $(".toast-success").length;
    if (length == 0) {
        toastr.success(t, 'hint');
    }
}