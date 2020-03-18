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

            /*BX.addCustomEvent('onTopPanelFixUnfix', function(eventdata) {
                ignoreResize.push(true);
                _gummi();
                ignoreResize.pop();
            });*/
        }
    }
}
