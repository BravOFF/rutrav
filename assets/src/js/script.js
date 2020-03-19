$(document).ready(function() {
    $('.selectregion').select2({
        closeOnSelect: true,
        minimumResultsForSearch: Infinity
    });


    $('.owl-carousel').owlCarousel(
        {
            // items:5,
            margin:10,
            nav:true,
            autoWidth:true,
            autoHeight:true,
            autoHeightClass: 'owl-height',
            // center: true,
            // loop:true,
            dots: false,
            lazyLoad:true,
            navClass: ["owl-prev-c","owl-next-c"]
            // stagePadding: 1
        }
    );











});

var funcDefined = function(func){
    try
    {
        if(typeof func == 'function')
            return true;
        else
            return typeof window[func] === "function";
    }
    catch (e)
    {
        return false;
    }
}


var isOnceInited = insertFilter = false;
var animationTime = 200;
var delayTime = 200;
var topMenuEnterTimer = false;
var isMobile = jQuery.browser.mobile;

if(isMobile)
    document.documentElement.className += ' mobile';

if(navigator.userAgent.indexOf("Edge") != -1)
    document.documentElement.className += ' bx-ie-edge';

if(!funcDefined('CheckTopMenuFullCatalogSubmenu')){
    CheckTopMenuFullCatalogSubmenu = function(){
        if(arNextOptions['THEME']['MENU_TYPE_VIEW'] != 'HOVER')
            return;

        var $menu = $('.menu_top_block');
        if($menu.length)
        {
            var $wrapmenu = $menu.parents('.wrap_menu');

            var wrapMenuWidth = $menu.closest('.wrapper_inner').actual('width');
            if(!wrapMenuWidth)
                wrapMenuWidth = $menu.closest('.wraps').actual('width');

            var bCatalogFirst = $menu.hasClass('catalogfirst');
            var findMenuLi = $('.menu_top_block:visible li.full');
            var parentSubmenuWidth = $menu.actual('outerWidth');
            var wrapMenuLeft = 0;
            var wrapMenuRight = 0;

            if($wrapmenu.length)
            {
                wrapMenuWidth = $wrapmenu.actual('outerWidth');
                wrapMenuLeft = $wrapmenu.offset().left;
                wrapMenuRight = wrapMenuLeft + wrapMenuWidth;
            }

            if($('.catalog_block.menu_top_block').length){
                if($('.catalog_block.menu_top_block').is(':visible'))
                    findMenuLi=$('.menu_top_block.catalog_block li.full');
            }
            findMenuLi.each(function(){
                var $this = $(this);
                var $submenu = $this.find('>.dropdown');

                if($submenu.length){
                    //if(bCatalogFirst){
                    $submenu.css({left: parentSubmenuWidth + 'px', width: (wrapMenuWidth - parentSubmenuWidth) + 'px', 'padding-left': '0px', 'padding-right': '0px', 'opacity': 1});
                    /*}
                    else{
                        $submenu.css({left: ($this.offset().left * -1) + 'px', width: ($(window).width() - 1) + 'px', 'padding-left': wrapMenuLeft + 'px', 'padding-right': ($(window).width() - wrapMenuRight) + 'px'});
                    }*/
                    // if(!isOnceInited && bCatalogFirst && arNextOptions["THEME"]["MENU_POSITION"] == "TOP"){
                    if(!isOnceInited && arNextOptions["THEME"]["MENU_POSITION"] == "TOP"){
                        $this.on('mouseenter', function(){
                            $submenu.css('min-height', $this.closest('.dropdown').actual('outerHeight') + 'px');
                        });
                    }
                }
            });
        }
    }
}

if(!funcDefined("InitTopestMenuGummi")){
    InitTopestMenuGummi = function(){
        if(!isOnceInited){
            function _init(){
                var arItems = $menuTopest.find('>li:not(.more)');
                var cntItems = arItems.length;
                if(cntItems){
                    var itemsWidth = 0;
                    for(var i = 0; i < cntItems; ++i){
                        var item = arItems.eq(i);
                        var itemWidth = item.actual('outerWidth',{includeMargin: true});
                        arItemsHideWidth[i] = (itemsWidth += itemWidth) + (i !== (cntItems - 1) ? moreWidth : 0);
                    }
                }
            }

            function _gummi(){
                var rowWidth = $menuTopest.actual('innerWidth');
                var arItems = $menuTopest.find('>li:not(.more),li.more>.dropdown>li');
                var cntItems = arItems.length;
                if(cntItems){
                    var bMore = false;
                    for(var i = cntItems - 1; i >= 0; --i){
                        var item = arItems.eq(i);
                        var bInMore = item.parents('.more').length > 0;
                        if(!bInMore){
                            if(arItemsHideWidth[i] > rowWidth){
                                if(!bMore){
                                    bMore = true;
                                    more.removeClass('hidden');
                                }
                                var clone = item.clone();
                                clone.find('>a').addClass('dark_font');
                                clone.prependTo(moreDropdown);
                                item.addClass('cloned');
                            }
                        }
                    }
                    for(var i = 0; i < cntItems; ++i){
                        var item = arItems.eq(i);
                        var bInMore = item.parents('.more').length > 0;
                        if(bInMore){
                            if(arItemsHideWidth[i] <= rowWidth){
                                if(i === (cntItems - 1)){
                                    bMore = false;
                                    more.addClass('hidden');
                                }
                                var clone = item.clone();
                                clone.find('>a').removeClass('dark_font');
                                clone.insertBefore(more);
                                item.addClass('cloned');
                            }
                        }
                    }
                    $menuTopest.find('li.cloned').remove();
                }
            }

            var $menuTopest = $('.menu.topest');
            if($menuTopest.length)
            {
                var more = $menuTopest.find('>.more');
                var moreDropdown = more.find('>.dropdown');
                var moreWidth = more.actual('outerWidth',{includeMargin: true});
                var arItemsHideWidth = [];

                ignoreResize.push(true);
                _init();
                _gummi();
                ignoreResize.pop();

                BX.addCustomEvent('onWindowResize', function(eventdata) {
                    try{
                        ignoreResize.push(true);
                        _gummi();
                    }
                    catch(e){}
                    finally{
                        ignoreResize.pop();
                    }
                });
            }
        }
    }
}

if(!funcDefined("InitTopMenuGummi")){
    InitTopMenuGummi = function(){
        function _init(){
            var arItems = $topMenu.closest('.wrap_menu').find('.inc_menu .menu_top_block >li:not(.more)');
            var cntItems = arItems.length;
            if(cntItems){
                var itemsWidth = 0;
                for(var i = 0; i < cntItems; ++i){
                    var item = arItems.eq(i);
                    var itemWidth = item.actual('outerWidth');
                    arItemsHideWidth[i] = (itemsWidth += itemWidth) + (i !== (cntItems - 1) ? moreWidth : 0);
                }
            }

        }

        function _gummi(){
            var rowWidth = $wrapMenu.actual('innerWidth') - $wrapMenuLeft.actual('innerWidth');
            var arItems = $topMenu.find('>li:not(.more):not(.catalog),li.more>.dropdown>li');
            var cntItems = arItems.length;

            if(cntItems){
                var bMore = false;
                for(var i = cntItems - 1; i >= 0; --i){
                    var item = arItems.eq(i);
                    var bInMore = item.parents('.more').length > 0;
                    if(!bInMore){
                        if(arItemsHideWidth[i] > rowWidth){
                            if(!bMore){
                                bMore = true;
                                more.removeClass('hidden');
                            }
                            var clone = item.clone();
                            clone.find('>.dropdown').removeAttr('style').removeClass('toleft');
                            clone.find('>a').addClass('dark_font').removeAttr('style');
                            clone.prependTo(moreDropdown);
                            item.addClass('cloned');
                        }
                    }
                }
                for(var i = 0; i < cntItems; ++i){
                    var item = arItems.eq(i);
                    var bInMore = item.parents('.more').length > 0;
                    if(bInMore){
                        if(arItemsHideWidth[i] <= rowWidth){
                            if(i === (cntItems - 1)){
                                bMore = false;
                                more.addClass('hidden');
                            }
                            var clone = item.clone();
                            clone.find('>a').removeClass('dark_font');
                            clone.insertBefore(more);
                            item.addClass('cloned');
                        }
                    }
                }
                $topMenu.find('li.cloned').remove();

                var cntItemsVisible = $topMenu.find('>li:not(.more):not(.catalog)').length;
                var o = rowWidth - arItemsHideWidth[cntItemsVisible - 1];
                var itemsPaddingAdd = Math.floor(o / (cntItemsVisible + (more.hasClass('hidden') ? 0 : 1)));
                var itemsPadding_new = itemsPadding_min + itemsPaddingAdd;
                var itemsPadding_new_l = Math.floor(itemsPadding_new / 2);
                var itemsPadding_new_r = itemsPadding_new - itemsPadding_new_l;

                $topMenu.find('>li:not(.catalog):visible>a').each(function(){
                    $(this).css({'padding-left': itemsPadding_new_l + 'px'});
                    $(this).css({'padding-right': itemsPadding_new_r + 'px'});
                });

                var lastItemPadding_new = itemsPadding_new + o - (cntItemsVisible + (more.is(':visible') ? 1 : 0)) * itemsPaddingAdd;
                var lastItemPadding_new_l = Math.floor(lastItemPadding_new / 2);
                var lastItemPadding_new_r = lastItemPadding_new - lastItemPadding_new_l;
                $topMenu.find('>li:visible').last().find('>a').css({'padding-left': lastItemPadding_new_l + 'px'});
                $topMenu.find('>li:visible').last().find('>a').css({'padding-right': lastItemPadding_new_r + 'px'});
            }
            CheckTopMenuFullCatalogSubmenu();
        }

        var $topMenu = $('.menu_top_block');
        if($menuTopest.length)
        {
            var $wrapMenu = $topMenu.parents('.wrap_menu');
            var $wrapMenuLeft = $wrapMenu.find('.catalog_menu_ext');
            var more = $topMenu.find('>.more');
            var moreWidth = more.actual('outerWidth',{includeMargin: true});
            more.addClass('hidden');
            var arItemsHideWidth = [];
            var moreDropdown = more.find('>.dropdown');
            var itemsPadding = parseInt(more.find('>a').css('padding-left')) * 2;
            var itemsPadding_min = itemsPadding;

            // setTimeout(function(){
            ignoreResize.push(true);
            _init();
            _gummi();
            ignoreResize.pop();
            // }, 100)

            window.addEventListener('resize', function(eventdata) {
                try{
                    ignoreResize.push(true);
                    _gummi();
                }
                catch(e){}
                finally{
                    ignoreResize.pop();
                }
            });

            /*BX.addCustomEvent('onTopPanelFixUnfix', function(eventdata) {
                ignoreResize.push(true);
                _gummi();
                ignoreResize.pop();
            });*/
        }
    }
}



CheckTopMenuDotted = function(){
    var menu = $('nav.mega-menu.sliced');

    /*if(isMobile)
		return;*/
    if(window.matchMedia('(max-width:991px)').matches)
        return;

    if(menu.length)
    {
        menu.each(function(){
            if($(this).hasClass('initied'))
                return false;

            var menuMoreItem = $(this).find('td.js-dropdown');
            if($(this).parents('.collapse').css('display') == 'none'){
                return false;
            }

            var block_w = $(this).closest('div').actual('width');
            var	menu_w = $(this).find('table').actual('outerWidth');
            var afterHide = false;

            while(menu_w > block_w) {
                menuItemOldSave = $(this).find('td').not('.nosave').last();
                if(menuItemOldSave.length){
                    menuMoreItem.show();
                    var oldClass = menuItemOldSave.attr('class');
                    menuItemNewSave = '<li class="menu-item ' + (menuItemOldSave.hasClass('dropdown') ? 'dropdown-submenu ' : '') + (menuItemOldSave.hasClass('active') ? 'active ' : '') + '" data-hidewidth="' + menu_w + '" ' + (oldClass ? 'data-class="' + oldClass + '"' : '') + '>' + menuItemOldSave.find('.wrap').html() + '</li>';
                    menuItemOldSave.remove();
                    menuMoreItem.find('> .wrap > .dropdown-menu').prepend(menuItemNewSave);
                    menu_w = $(this).find('table').actual('outerWidth');
                    afterHide = true;
                }
                //menu.find('.nosave').css('display', 'table-cell');
                else{
                    break;
                }
            }

            if(!afterHide) {
                do {
                    var menuItemOldSaveCnt = menuMoreItem.find('.dropdown-menu').find('li').length;
                    menuItemOldSave = menuMoreItem.find('.dropdown-menu').find('li').first();
                    if(!menuItemOldSave.length) {
                        menuMoreItem.hide();
                        break;
                    }
                    else {
                        var hideWidth = menuItemOldSave.attr('data-hidewidth');
                        if(hideWidth > block_w) {
                            break
                        }
                        else {
                            var oldClass = menuItemOldSave.attr('data-class');
                            menuItemNewSave = '<td class="' + (oldClass ? oldClass + ' ' : '') + '" data-hidewidth="' + block_w + '"><div class="wrap">' + menuItemOldSave.html() + '</div></td>';
                            menuItemOldSave.remove();
                            $(menuItemNewSave).insertBefore($(this).find('td.js-dropdown'));
                            if(!menuItemOldSaveCnt) {
                                menuMoreItem.hide();
                                break;
                            }
                        }
                    }
                    menu_w = $(this).find('table').actual('outerWidth');
                }
                while(menu_w <= block_w);
            }
            $(this).find('td').css('visibility', 'visible');
            $(this).find('td').removeClass('unvisible');
            $(this).addClass('ovisible');
            $(this).addClass('initied');
        })
    }
    return false;
}

CheckTopVisibleMenu = function(that) {
    var dropdownMenu = $('.dropdown-menu:visible').last();

    if(dropdownMenu.length){
        dropdownMenu.find('a').css('white-space', '');
        dropdownMenu.css('left', '');
        dropdownMenu.css('right', '');
        dropdownMenu.removeClass('toright');

        var dropdownMenu_left = dropdownMenu.offset().left;
        if(typeof(dropdownMenu_left) != 'undefined'){
            var menu = dropdownMenu.parents('.mega-menu');
            if(!menu.length)
                menu = dropdownMenu.closest('.logo-row');
            var menu_width = menu.outerWidth();
            var menu_left = menu.offset().left;
            var menu_right = menu_left + menu_width;
            var isToRight = dropdownMenu.parents('.toright').length > 0;
            var parentsDropdownMenus = dropdownMenu.parents('.dropdown-menu');
            var isHasParentDropdownMenu = parentsDropdownMenus.length > 0;
            if(isHasParentDropdownMenu){
                var parentDropdownMenu_width = parentsDropdownMenus.first().outerWidth();
                var parentDropdownMenu_left = parentsDropdownMenus.first().offset().left;
                var parentDropdownMenu_right = parentDropdownMenu_width + parentDropdownMenu_left;
            }

            if(parentDropdownMenu_right + dropdownMenu.outerWidth() > menu_right){
                dropdownMenu.find('a').css('white-space', 'normal');
            }

            var dropdownMenu_width = dropdownMenu.outerWidth();
            var dropdownMenu_right = dropdownMenu_left + dropdownMenu_width;

            if(dropdownMenu_right > menu_right || isToRight){
                var addleft = 0;
                addleft = menu_right - dropdownMenu_right;
                if(isHasParentDropdownMenu || isToRight){
                    dropdownMenu.css('left', 'auto');
                    dropdownMenu.css('right', '100%');
                    dropdownMenu.addClass('toright');
                }
                else{
                    var dropdownMenu_curLeft = parseInt(dropdownMenu.css('left'));
                    dropdownMenu.css('left', (dropdownMenu_curLeft + addleft) + 'px');
                }
            }
        }
    }
}



// TOP MENU ANIMATION
$(document).on('click', '.menu_top_block>li .more a', function(){
    $this = $(this);
    $this.parents('.dropdown').first().find('>.hidden').removeClass('hidden');
    $this.parent().addClass('hidden');
    setTimeout(function(){
        $this.parent().remove();
    }, 500);
});

$(document).on('mouseenter', '.menu_top_block.catalogfirst>li>.dropdown>li.full', function(){
    var $submenu = $(this).find('>.dropdown');

    if($submenu.length){
        if(topMenuEnterTimer){
            clearTimeout(topMenuEnterTimer);
            topMenuEnterTimer = false;
        }
    }
});

$(document).on('mouseenter', '.menu_top_block>li:not(.full)', function(){
    var $submenu = $(this).find('>.dropdown');

    if($submenu.length && !$submenu.hasClass('visible')){
        var $menu = $(this).parents('.menu');
        var $wrapmenu = $menu.parents('.wrap_menu');
        var wrapMenuWidth = $wrapmenu.actual('outerWidth');
        var wrapMenuLeft = $wrapmenu.offset().left;
        var wrapMenuRight = wrapMenuLeft + wrapMenuWidth;
        var left = wrapMenuRight - ($(this).offset().left + $submenu.actual('outerWidth'));
        if(window.matchMedia('(min-width: 951px)').matches && $(this).hasClass('catalog') && ( $('.banner_auto').hasClass('catalog_page') || $('.banner_auto').hasClass('front_page'))){
            return;
        }
        if(left < 0){
            $submenu.css({left: left + 'px'});
        }
        $submenu.stop().slideDown(animationTime, function(){
            $submenu.css({height: '', 'overflow':'visible'});
        });


        $(this).on('mouseleave', function(){
            var leaveTimer = setTimeout(function(){
                $submenu.stop().slideUp(animationTime, function(){
                    $submenu.css({left: ''});
                });
            }, delayTime);

            $(this).on('mouseenter', function(){
                if(leaveTimer){
                    clearTimeout(leaveTimer);
                    leaveTimer = false;
                }
            });
        });
    }
});




$(document).on('mouseenter', '.menu_top_block>li .dropdown>li', function(){
    var $this = $(this);
    var $submenu = $this.find('>.dropdown');

    if($submenu.length && ((!$this.parents('.full').length && !$this.hasClass('full')) || $this.parents('.more').length)){
        var $menu = $this.parents('.menu');
        var $wrapmenu = $menu.parents('.wrap_menu');
        var arParentSubmenuForOpacity = [];
        topMenuEnterTimer = setTimeout(function(){

            var wrapMenuWidth = $wrapmenu.actual('outerWidth');
            var wrapMenuLeft = $wrapmenu.offset().left;
            var wrapMenuRight = wrapMenuLeft + wrapMenuWidth;
            var $parentSubmenu = $this.parent();
            var bToLeft = $parentSubmenu.hasClass('toleft') ? true : false;
            if(!bToLeft){
                bToLeft = $this.offset().left + $this.actual('outerWidth') + $submenu.actual('outerWidth') > wrapMenuRight;
            }
            else{
                bToLeft = $this.offset().left + $this.actual('outerWidth') - $submenu.actual('outerWidth') < wrapMenuLeft;
            }

            if(bToLeft){
                $this.find('>.dropdown').addClass('toleft').show();
            }
            else{
                $this.find('>.dropdown').removeClass('toleft').show();
            }
            var submenuLeft = $submenu.offset().left;
            var submenuRight = submenuLeft + $submenu.actual('outerWidth');

            $this.parents('.dropdown').each(function(){
                var $this = $(this);
                var leftOffset = $this.offset().left;
                var rightOffset = leftOffset + $this.actual('outerWidth');
                if(leftOffset >= submenuLeft  && leftOffset < (submenuRight - 1) || (rightOffset > (submenuLeft + 1) && rightOffset <= submenuRight)){
                    arParentSubmenuForOpacity.push($this);
                    $this.find('>li>a').css({opacity: '0.1'});
                }
            });
        }, delayTime);

        $this.unbind('mouseleave');
        $this.on('mouseleave', function(){
            var leaveTimer = setTimeout(function(){
                $this.find('.dropdown').removeClass('toleft').hide();
                if(arParentSubmenuForOpacity.length){
                    for(i in arParentSubmenuForOpacity){
                        arParentSubmenuForOpacity[i].find('>li>a').css({opacity: ''});
                    }
                }
            }, delayTime);

            $this.unbind('mouseenter');
            $this.on('mouseenter', function(){
                if(leaveTimer){
                    clearTimeout(leaveTimer);
                    leaveTimer = false;
                }
            });
        });
    }
});

CheckHeaderFixed = function(){
    var header_fixed = $('#headerfixed');
    header = $('header').first();
    if(header_fixed.length){
        if(header.length)
        {
            var isHeaderFixed = false,
                isTabsFixed = false,
                headerCanFix = true,
                headerFixedHeight = header_fixed.actual('outerHeight'),
                headerNormalHeight = header.actual('outerHeight'),
                headerDiffHeight = headerNormalHeight - headerFixedHeight,
                mobileBtnMenu = $('.btn.btn-responsive-nav'),
                headerTop = $('#panel:visible').actual('outerHeight');
            topBlock = $('.TOP_HEADER').first();

            if(headerDiffHeight <= 0)
                headerDiffHeight = 0;
            if(topBlock.length)
                headerTop += topBlock.actual('outerHeight');

            $(window).scroll(function(){
                var tabs_fixed = $('.product-item-detail-tabs-container-fixed');
                if(window.matchMedia('(min-width:992px)').matches)
                {
                    var scrollTop = $(window).scrollTop();
                    headerCanFix = !mobileBtnMenu.is(':visible')/* && !$('.dropdown-menu:visible').length*/;

                    var tabs_offset = $('.tabs_section .nav.nav-tabs').offset();

                    var current_is = $('.search-wrapper .search-input:visible'),
                        title_search_result = $('.title-search-result.'+current_is.attr('id')),
                        pos, pos_input;

                    if(!isHeaderFixed)
                    {
                        if((scrollTop > headerNormalHeight + headerTop) && headerCanFix)
                        {
                            isHeaderFixed = true;
                            // header_fixed.css('top', '-' + headerNormalHeight + 'px');
                            header_fixed.addClass('fixed');
                            // header_fixed.stop(0).animate({top: '0'}, 300);

                            /*header_fixed.animate({top: '0'}, {duration:300, complete:
								function(){}
							});*/

                            if($('nav.mega-menu.sliced').length)
                                $('nav.mega-menu.sliced').removeClass('initied');
                            CheckTopMenuDotted();
                        }
                    }
                    else if(isHeaderFixed || !headerCanFix)
                    {
                        if((scrollTop <= headerDiffHeight + headerTop) || !headerCanFix)
                        {
                            isHeaderFixed = false;
                            header_fixed.removeClass('fixed');
                        }
                    }
                    //fixed tabs
                    if(tabs_fixed.length)
                    {
                        if (scrollTop + headerFixedHeight > tabs_offset.top)
                        {
                            tabs_fixed.css({'top': header_fixed.actual('outerHeight')});
                            tabs_fixed.addClass('fixed');
                        }
                        else if (tabs_fixed.hasClass('fixed'))
                        {
                            tabs_fixed.removeAttr('style');
                            tabs_fixed.removeClass('fixed');
                        }
                    }
                }
            });
        }
    }

    //mobile fixed
    var mfixed = $('.wrapper1.mfixed_Y #mobileheader');
    if(mfixed.length && isMobile)
    {
        var isMHeaderFixed = false,
            mheaderCanFix = true,
            //mheaderFixedHeight = mfixed.actual('outerHeight'),
            mheaderFixedHeight = 0,
            mheaderTop = $('#panel:visible').actual('outerHeight');
        $(window).scroll(function(){
            var scrollTop = $(window).scrollTop();
            if(window.matchMedia('(max-width:991px)').matches)
            {
                if($('.wrapper1.mfixed_Y.mfixed_view_scroll_top #mobileheader').length)
                {
                    if(scrollTop > startScroll)
                    {
                        $('.wrapper1.mfixed_Y.mfixed_view_scroll_top #mobileheader').removeClass('fixed');
                    }
                    else if(scrollTop > mheaderFixedHeight + mheaderTop)
                        $('.wrapper1.mfixed_Y.mfixed_view_scroll_top #mobileheader').addClass('fixed');
                    else if(scrollTop <= mheaderFixedHeight + mheaderTop)
                        $('.wrapper1.mfixed_Y.mfixed_view_scroll_top #mobileheader').removeClass('fixed');
                    startScroll = scrollTop;
                }
                else
                {
                    if(!isMHeaderFixed)
                    {
                        if((scrollTop > mheaderFixedHeight + mheaderTop))
                        {
                            isMHeaderFixed = true;
                            mfixed.addClass('fixed');
                        }
                    }
                    else if(isMHeaderFixed)
                    {
                        if((scrollTop <= mheaderFixedHeight + mheaderTop))
                        {
                            isMHeaderFixed = false;
                            mfixed.removeClass('fixed');
                        }
                    }
                }
            }
            else
                mfixed.removeClass('fixed');
        })
    }
}


CheckHeaderFixedMenu = function(){
    if(arNextOptions['THEME']['HEADER_FIXED'] == 2 && $('#headerfixed .js-nav').length && window.matchMedia('(min-width: 992px)').matches)
    {
        $('#headerfixed .js-nav').css('width','0');
        var all_width = 0,
            cont_width = $('#headerfixed .maxwidth-theme').actual('width'),
            padding_menu = $('#headerfixed .logo-row.v2 .menu-block').actual('outerWidth')-$('#headerfixed .logo-row.v2 .menu-block').actual('width');
        $('#headerfixed .logo-row.v2 > .inner-table-block').each(function(){
            if(!$(this).hasClass('menu-block'))
                all_width += $(this).actual('outerWidth');
        })
        $('#headerfixed .js-nav').width(cont_width-all_width-padding_menu);
    }
}

CheckTopMenuPadding = function(){
    if($('.logo_and_menu-row .right-icons .wrap_icon').length && $('.logo_and_menu-row .menu-row').length){
        var menuPosition = $('.menu-row .menu-only').position().left,
            leftPadding = 0,
            rightPadding = 0;
        $('.logo_and_menu-row .menu-row>div').each(function(indx){
            if(!$(this).hasClass('menu-only')){
                var elementPosition = $(this).position().left,
                    elementWidth = $(this).outerWidth()+1;

                if(elementPosition > menuPosition){
                    rightPadding += elementWidth;
                }else{
                    leftPadding += elementWidth;
                }
            }
        }).promise().done(function(){
            $('.logo_and_menu-row .menu-only').css({'padding-left': leftPadding, 'padding-right': rightPadding});
        });
    }
}

CheckTopMenuOncePadding = function(){
    if($('.menu-row.sliced .right-icons .wrap_icon').length){
        var menuPosition = $('.menu-row .menu-only').position().left,
            leftPadding = 0,
            rightPadding = 0;
        $('.menu-row.sliced .maxwidth-theme>div>div>div').each(function(indx){
            if(!$(this).hasClass('menu-only')){
                var elementPosition = $(this).position().left,
                    elementWidth = $(this).outerWidth()+1;

                if(elementPosition > menuPosition){
                    rightPadding += elementWidth;
                }else{
                    leftPadding += elementWidth;
                }
            }
        }).promise().done(function(){
            $('.menu-row.sliced .menu-only').css({'padding-left': leftPadding, 'padding-right': rightPadding});
        });
    }
}

CheckSearchWidth = function(){
    if($('.logo_and_menu-row .search_wrap').length){
        var searchPosition = $('.logo_and_menu-row .search_wrap').position().left,
            maxWidth = $('.logo_and_menu-row .maxwidth-theme').width() - 2;
        width = 0;

        $('.logo_and_menu-row .maxwidth-theme > .row >div').each(function(){
            if(!$(this).hasClass('search_wrap')){
                var elementWidth = $(this).outerWidth();
                width = (width ? width - elementWidth : maxWidth - elementWidth);
            }
        }).promise().done(function(){
            if($('.logo_and_menu-row .search_wrap.wide_search').length)
                $('.logo_and_menu-row .search_wrap .search-block').outerWidth(width);
            else
                $('.logo_and_menu-row .search_wrap').outerWidth(width);
            $('.logo_and_menu-row .search_wrap').css({'opacity': 1, 'visibility': 'visible'});
        });
    }
}

MegaMenuFixed = function(){
    var animationTime = 150;

    $('.logo_and_menu-row .burger').on('click', function(){
        $('.mega_fixed_menu').fadeIn(animationTime);
        $('.header_wrap').toggleClass('zindexed');
    });

    $('.mega_fixed_menu .svg.svg-inline-close').on('click', function(){
        $(this).closest('.mega_fixed_menu').fadeOut(animationTime);
        $('.header_wrap').toggleClass('zindexed');
    });

    $('.mega_fixed_menu .dropdown-menu .arrow').on('click', function(e){
        e.preventDefault();
        e.stopPropagation();
        $(this).closest('.dropdown-submenu').find('.dropdown-menu').slideToggle(animationTime);
        $(this).closest('.dropdown-submenu').addClass('opened');
    });
}





$(document).ready(function() {
    //check width for menu and search
    CheckSearchWidth();
    MegaMenuFixed();

    var bSafary = false;
    if (typeof jQuery.browser == 'object')
        bSafary = jQuery.browser.safari;
    else if (typeof browser == 'object')
        bSafary = browser.safari;
    if (!bSafary) {
        CheckTopMenuPadding();
        CheckTopMenuOncePadding();
        CheckTopMenuDotted();
        CheckHeaderFixed();
        setTimeout(function () {
            $(window).resize();
        }, 150); // need to check resize flexslider & menu
        setTimeout(function () {
            $(window).scroll();
        }, 250); // need to check position fixed ask block
    } else {
        setTimeout(function () {
            $(window).resize(); // need to check resize flexslider & menu
            setTimeout(function () {
                CheckTopMenuPadding();
                CheckTopMenuOncePadding();
                CheckTopMenuDotted();
                CheckHeaderFixed();

                setTimeout(function () {
                    $(window).scroll();
                }, 50);
            }, 50);
        }, 350);
    }


    /*  --- Bind mobile menu  --- */
    var $mobileMenu = $("#mobilemenu")
    if ($mobileMenu.length) {
        $mobileMenu.isLeftSide = $mobileMenu.hasClass('leftside')
        $mobileMenu.isOpen = $mobileMenu.hasClass('show')
        $mobileMenu.isDowndrop = $mobileMenu.find('>.scroller').hasClass('downdrop')

        $('#mobileheader .burger').click(function () {
            SwipeMobileMenu()
        })

        if ($mobileMenu.isLeftSide) {
            $mobileMenu.parent().append('<div id="mobilemenu-overlay"></div>')
            var $mobileMenuOverlay = $('#mobilemenu-overlay')

            $mobileMenuOverlay.click(function () {
                if ($mobileMenu.isOpen) {
                    CloseMobileMenu()
                }
            });

            $(document).swiperight(function (e) {
                if (!$(e.target).closest('.flexslider').length && !$(e.target).closest('.swipeignore').length) {
                    OpenMobileMenu()
                }
            });

            $(document).swipeleft(function (e) {
                if (!$(e.target).closest('.flexslider').length && !$(e.target).closest('.swipeignore').length) {
                    CloseMobileMenu()
                }
            });
        } else {
            $('#mobileheader').click(function (e) {
                if (!$(e.target).closest('#mobilemenu').length && !$(e.target).closest('.burger').length && $mobileMenu.isOpen) {
                    CloseMobileMenu()
                }
            });
        }

        $('#mobilemenu .menu a,#mobilemenu .social-icons a').click(function (e) {
            var $this = $(this)
            if ($this.hasClass('parent')) {
                e.preventDefault()

                if (!$mobileMenu.isDowndrop) {
                    $this.closest('li').addClass('expanded')
                    MoveMobileMenuWrapNext()
                } else {
                    if (!$this.closest('li').hasClass('expanded')) {
                        $this.closest('li').addClass('expanded')
                    } else {
                        $this.closest('li').removeClass('expanded')
                    }
                }
            } else {
                if ($this.closest('li').hasClass('counters')) {
                    var href = $this.attr('href')
                    if (typeof href !== 'undefined') {
                        window.location.href = href
                        window.location.reload()
                    }
                }

                if (!$this.closest('.menu_back').length) {
                    CloseMobileMenu()
                }
            }
        })

        $('#mobilemenu .dropdown .menu_back').click(function (e) {
            e.preventDefault()
            var $this = $(this)
            MoveMobileMenuWrapPrev()
            setTimeout(function () {
                $this.closest('.expanded').removeClass('expanded')
            }, 400)
        })

        OpenMobileMenu = function () {
            if (!$mobileMenu.isOpen) {
                // hide styleswitcher
                if ($('.style-switcher').hasClass('active')) {
                    $('.style-switcher .switch').trigger('click')
                }
                $('.style-switcher .switch').hide()

                if ($mobileMenu.isLeftSide) {
                    // show overlay
                    setTimeout(function () {
                        $mobileMenuOverlay.fadeIn('fast')
                    }, 100)
                } else {
                    // scroll body to top & set fixed
                    $('body').scrollTop(0).css({position: 'fixed'})

                    // set menu top = bottom of header
                    $mobileMenu.css({top: +($('#mobileheader').height() + $('#mobileheader').offset().top) + 'px'})

                    // change burger icon
                    $('#mobileheader .burger').addClass('c')
                }

                // show menu
                $mobileMenu.addClass('show')
                $mobileMenu.isOpen = true

                if (!$mobileMenu.isDowndrop) {
                    var $wrap = $mobileMenu.find('.wrap').first()
                    var params = $wrap.data('params')
                    if (typeof params === 'undefined') {
                        params = {
                            depth: 0,
                            scroll: {},
                            height: {}
                        }
                    }
                    $wrap.data('params', params)
                }
            }
        }

        CloseMobileMenu = function () {
            if ($mobileMenu.isOpen) {
                // hide menu
                $mobileMenu.removeClass('show')
                $mobileMenu.isOpen = false

                // show styleswitcher
                $('.style-switcher .switch').show()

                if ($mobileMenu.isLeftSide) {
                    // hide overlay
                    setTimeout(function () {
                        $mobileMenuOverlay.fadeOut('fast')
                    }, 100)
                } else {
                    // change burger icon
                    $('#mobileheader .burger').removeClass('c')

                    // body unset fixed
                    $('body').css({position: ''})
                }

                if (!$mobileMenu.isDowndrop) {
                    setTimeout(function () {
                        var $scroller = $mobileMenu.find('.scroller').first()
                        var $wrap = $mobileMenu.find('.wrap').first()
                        var params = $wrap.data('params')
                        params.depth = 0
                        $wrap.data('params', params).attr('style', '')
                        $mobileMenu.scrollTop(0)
                        $scroller.css('height', '')
                    }, 400)
                }
            }
        }

        SwipeMobileMenu = function () {
            if ($mobileMenu.isOpen) {
                CloseMobileMenu()
            } else {
                OpenMobileMenu()
            }
        }

        function MoveMobileMenuWrapNext() {
            if (!$mobileMenu.isDowndrop) {
                var $scroller = $mobileMenu.find('.scroller').first()
                var $wrap = $mobileMenu.find('.wrap').first()
                if ($wrap.length) {
                    var params = $wrap.data('params')
                    var $dropdownNext = $mobileMenu.find('.expanded>.dropdown').eq(params.depth)
                    if ($dropdownNext.length) {
                        // save scroll position
                        params.scroll[params.depth] = parseInt($mobileMenu.scrollTop())

                        // height while move animating
                        params.height[params.depth + 1] = Math.max($dropdownNext.height(), (!params.depth ? $wrap.height() : $mobileMenu.find('.expanded>.dropdown').eq(params.depth - 1).height()))
                        $scroller.css('height', params.height[params.depth + 1] + 'px')

                        // inc depth
                        ++params.depth

                        // translateX for move
                        $wrap.css('transform', 'translateX(' + -100 * params.depth + '%)')

                        // scroll to top
                        setTimeout(function () {
                            $mobileMenu.animate({scrollTop: 0}, 200);
                        }, 100)

                        // height on enimating end
                        var h = $dropdownNext.height()
                        setTimeout(function () {
                            if (h) {
                                $scroller.css('height', h + 'px')
                            } else {
                                $scroller.css('height', '')
                            }
                        }, 200)
                    }

                    $wrap.data('params', params)
                }
            }
        }

        function MoveMobileMenuWrapPrev() {
            if (!$mobileMenu.isDowndrop) {
                var $scroller = $mobileMenu.find('.scroller').first()
                var $wrap = $mobileMenu.find('.wrap').first()
                if ($wrap.length) {
                    var params = $wrap.data('params')
                    if (params.depth > 0) {
                        var $dropdown = $mobileMenu.find('.expanded>.dropdown').eq(params.depth - 1)
                        if ($dropdown.length) {
                            // height while move animating
                            $scroller.css('height', params.height[params.depth] + 'px')

                            // dec depth
                            --params.depth

                            // translateX for move
                            $wrap.css('transform', 'translateX(' + -100 * params.depth + '%)')

                            // restore scroll position
                            setTimeout(function () {
                                $mobileMenu.animate({scrollTop: params.scroll[params.depth]}, 200);
                            }, 100)

                            // height on enimating end
                            var h = (!params.depth ? false : $mobileMenu.find('.expanded>.dropdown').eq(params.depth - 1).height())
                            setTimeout(function () {
                                if (h) {
                                    $scroller.css('height', h + 'px')
                                } else {
                                    $scroller.css('height', '')
                                }
                            }, 200)
                        }
                    }

                    $wrap.data('params', params)
                }
            }
        }
    }
    /*  --- END Bind mobile menu  --- */


    $('.toggle_menu .more_items').on('click', function(){
        $(this).closest('.toggle_menu').find('.collapsed').addClass('clicked_exp');
        $(this).remove();
    })


    setTimeout(function(){
        InitTopestMenuGummi();
        isOnceInited = true;
    },50);




    /*adaptive menu start*/
    $('.menu.adaptive').on('click', function(){
        $(this).toggleClass('opened');
        if($(this).hasClass('opened')){
            $('.mobile_menu').toggleClass('opened').slideDown();
        }else{
            $('.mobile_menu').toggleClass('opened').slideUp();
        }
    });
    $('.mobile_menu .has-child >a').on('click', function(e){
        var parentLi=$(this).parent();
        e.preventDefault();
        parentLi.toggleClass('opened');
        parentLi.find('.dropdown').slideToggle();
    })

    $('.mobile_menu .search-input-div input').on('keyup', function(e) {
        var inputValue = $(this).val();
        $('.center_block .stitle_form input').val(inputValue);
        if(e.keyCode == 13){
            $('.center_block .stitle_form form').submit();
        }
    });

    $('.center_block .stitle_form input').on('keyup', function(e) {
        var inputValue = $(this).val();
        $('.mobile_menu .search-input-div input').val(inputValue);
        if(e.keyCode == 13){
            $('.center_block .stitle_form form').submit();
        }
    });

    $('.mobile_menu .search-button-div button').on('click', function(e) {
        e.preventDefault();
        var inputValue = $(this).parents().find('input').val();
        $('.center_block .stitle_form input').val(inputValue);
        $('.center_block .stitle_form form').submit();
    });
    /*adaptive menu end*/



    $(document).on('click', '.mega-menu .dropdown-menu', function(e){
        e.stopPropagation()
    });

    $(document).on('click', '.mega-menu .dropdown-toggle.more-items', function(e){
        e.preventDefault();
    });

    $('.table-menu .dropdown,.table-menu .dropdown-submenu,.table-menu .dropdown-toggle').on('mouseenter', function() {
        CheckTopVisibleMenu();
    });
    $(document).on('mouseenter', '#headerfixed .table-menu .dropdown-menu .dropdown-submenu', function() {
        CheckTopVisibleMenu();
    });

    $('.mega-menu .search-item .search-icon, .menu-row #title-search .fa-close').on('click', function(e) {
        e.preventDefault();
        $('.menu-row #title-search').toggleClass('hide');
    });

    $('.mega-menu ul.nav .search input').on('keyup', function(e) {
        var inputValue = $(this).val();
        $('.menu-row > .search input').val(inputValue);
        if(e.keyCode == 13){
            $('.menu-row > .search form').submit();
        }
    });

    $('.menu-row > .search input').on('keyup', function(e) {
        var inputValue = $(this).val();
        $('.mega-menu ul.nav .search input').val(inputValue);
        if(e.keyCode == 13){
            $('.menu-row > .search form').submit();
        }
    });

    $('.mega-menu ul.nav .search button').on('click', function(e) {
        e.preventDefault();
        var inputValue = $(this).parents('.search').find('input').val();
        $('.menu-and-search .search input').val(inputValue);
        $('.menu-row > .search form').submit();
    });


    document.addEventListener('touchend', function(event) {
        if(!$(event.target).closest('.menu-item').length && !$(event.target).hasClass('menu-item')){
            $('.menu-row .dropdown-menu').css({'display':'none','opacity':0});
            $('.menu-item').removeClass('hover');
            $('.bx-breadcrumb-item.drop').removeClass('hover');
        }
        if(!$(event.target).closest('.menu.topest').length){
            $('.menu.topest').css({'overflow': 'hidden'});
            $('.menu.topest > li').removeClass('hover');
        }
        if(!$(event.target).closest('.full.has-child').length){
            $('.menu_top_block.catalog_block li').removeClass('hover');
        }
        if(!$(event.target).closest('.basket_block').length){
            $('.basket_block .link').removeClass('hover');
            $('.basket_block .basket_popup_wrapp').slideUp();
        }
        if(!$(event.target).closest('.catalog_item').length){
            var tabsContentUnhoverHover = $('.tab:visible').attr('data-unhover') * 1;
            $('.tab:visible').stop().animate({'height': tabsContentUnhoverHover}, 100);
            $('.tab:visible').find('.catalog_item').removeClass('hover');
            $('.tab:visible').find('.catalog_item .buttons_block').stop().fadeOut(233);
            if($('.catalog_block').length){
                $('.catalog_block').find('.catalog_item_wrapp').removeClass('hover');
                $('.catalog_block').find('.catalog_item').removeClass('hover');
            }
        }
        //togglePropBlock($(event.target));

    }, false);


    touchMenu('.menu-row .menu-item');
    touchTopMenu('.menu.topest li');
    touchLeftMenu('.menu_top_block li.full');
    touchBreadcrumbs('.bx-breadcrumb-item.drop');


    function touchMenu(selector){
        if(isMobile){
            if($(selector).length)
            {
                $(selector).each(function(){
                    var th=$(this);
                    th.on('touchend', function(e) {
                        var _th = $(e.target).closest('.menu-item');

                        $('.menu.topest > li').removeClass('hover');
                        $('.menu_top_block.catalog_block li').removeClass('hover');
                        $('.bx-breadcrumb-item.drop').removeClass('hover');

                        if (_th.find('.dropdown-menu').length && !_th.hasClass('hover')) {
                            e.preventDefault();
                            e.stopPropagation();
                            _th.siblings().removeClass('hover');
                            _th.addClass('hover');
                            $('.menu-row .dropdown-menu').css({'display':'none', 'opacity':0});
                            if(_th.hasClass('menu-item'))
                            {
                                _th.closest('.dropdown-menu').css({'display':'block', 'opacity':1});
                            }
                            if(_th.find('> .wrap > .dropdown-menu'))
                            {
                                _th.find('> .wrap > .dropdown-menu').css({'display':'block', 'opacity':1});
                            }
                            else if(_th.find('> .dropdown-menu'))
                            {
                                _th.find('> .dropdown-menu').css({'display':'block', 'opacity':1});
                            }
                            CheckTopVisibleMenu();
                        }
                        else
                        {
                            var href = ($(e.target).attr('href') ? $(e.target).attr('href') : $(e.target).closest('a').attr('href'))
                            if(href && href !== 'undefined')
                                location.href = href;
                        }
                    })
                })
            }
        }else{
            $(selector).off();
        }
    }

    function touchTopMenu(selector){
        if(isMobile){
            if($(selector).length)
            {
                $(selector).each(function(){
                    var th=$(this);
                    th.on('touchend', function(e) {
                        var _th = $(e.target).closest('li');

                        $('.menu-item').removeClass('hover');
                        $('.menu_top_block.catalog_block li').removeClass('hover');
                        $('.bx-breadcrumb-item.drop').removeClass('hover');

                        if (_th.hasClass('more') && !_th.hasClass('hover')) {
                            e.preventDefault();
                            e.stopPropagation();
                            _th.siblings().removeClass('hover');
                            _th.addClass('hover');
                            $('.menu.topest').css({'overflow': 'visible'});
                        }
                        else
                        {
                            var href = ($(e.target).attr('href') ? $(e.target).attr('href') : $(e.target).closest('a').attr('href'))
                            if(href && href !== 'undefined')
                                location.href = href;
                        }
                    })
                })
            }
        }else{
            $(selector).off();
        }
    }

    function touchLeftMenu(selector){
        if(isMobile){
            if($(selector).length)
            {
                $(selector).each(function(){
                    var th=$(this);
                    th.on('touchend', function(e) {
                        var _th = $(e.target).closest('li');

                        $('.menu-item').removeClass('hover');
                        $('.bx-breadcrumb-item.drop').removeClass('hover');
                        $('.menu.topest > li').removeClass('hover');

                        if (_th.hasClass('has-child') && !_th.hasClass('hover')) {
                            e.preventDefault();
                            e.stopPropagation();
                            _th.siblings().removeClass('hover');
                            _th.addClass('hover');
                        }
                        else
                        {
                            var href = ($(e.target).attr('href') ? $(e.target).attr('href') : $(e.target).closest('a').attr('href'))
                            if(href && href !== 'undefined')
                                location.href = href;
                        }
                    })
                })
            }
        }else{
            $(selector).off();
        }
    }

    function touchBreadcrumbs(selector){
        if(isMobile){
            if($(selector).length)
            {
                $(selector).each(function(){
                    var th=$(this);
                    th.on('touchend', function(e) {
                        var _th = $(e.target).closest('.bx-breadcrumb-item');

                        $('.menu-item').removeClass('hover');
                        $('.menu.topest > li').removeClass('hover');
                        $('.menu_top_block.catalog_block li').removeClass('hover');

                        if(!_th.hasClass('hover')) {
                            e.preventDefault();
                            e.stopPropagation();
                            _th.siblings().removeClass('hover');
                            _th.addClass('hover');
                        }
                        else
                        {
                            _th.removeClass('hover');
                            var href = ($(e.target).attr('href') ? $(e.target).attr('href') : $(e.target).closest('a').attr('href'));
                            if(href && href !== 'undefined')
                                location.href = href;
                        }
                    })
                })
            }
        }else{
            $(selector).off();
        }
    }




});


window.addEventListener('resize', function(eventdata){
    try{
        ignoreResize.push(true);

        CheckTopMenuPadding();
        CheckTopMenuOncePadding();
        CheckSearchWidth();

        CheckTabActive();
        CheckTopMenuFullCatalogSubmenu();
        CheckHeaderFixedMenu();

        CheckTopMenuDotted();
        if($('nav.mega-menu.sliced').length)
            $('nav.mega-menu.sliced').removeClass('initied');


        CheckTopVisibleMenu();

        checkScrollToTop();
        CheckObjectsSizes();

        CheckFlexSlider();
        initSly();

        checkVerticalMobileFilter();

        checkTopFilter();

        if(window.matchMedia('(min-width: 767px)').matches)
            $('.wrapper_middle_menu.wrap_menu').removeClass('mobile');

        if(window.matchMedia('(max-width: 767px)').matches)
            $('.wrapper_middle_menu.wrap_menu').addClass('mobile');


        if($("#basket_form").length && $(window).outerWidth()<=600){
            $("#basket_form .tabs_content.basket > li.cur td").each(function() { $(this).css("width","");});
        }

        $(".bx_filter_section .bx_filter_select_container").each(function(){
            var prop_id=$(this).closest('.bx_filter_parameters_box').attr('property_id');
            if($('#smartFilterDropDown'+prop_id).length){
                $('#smartFilterDropDown'+prop_id).css("max-width", $(this).width());
            }
        })
    }
    catch(e){}
    finally{
        ignoreResize.pop();
    }
});