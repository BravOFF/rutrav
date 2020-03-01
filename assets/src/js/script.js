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
            autoHeight:false,
            autoHeightClass: 'owl-height',
            center: true,
            loop:true,
            dots: false,
            lazyLoad:true,
            navClass: ["owl-prev-c","owl-next-c"]
            // stagePadding: 1
        }
    );


});
