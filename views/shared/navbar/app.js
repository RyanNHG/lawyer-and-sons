var navbarVm = new Vue({

    el: '#navbar',

    data: {

        pathname: window.location.pathname,

        showMobileMenu: false,
        showMobileSearch: false,

        searchQuery: '',
        searching: false
    },

    computed: {
        showInvisibleWall: function() {
            return this.showMobileMenu || this.showMobileSearch;
        }
    },

    methods: {

        toggleMobileMenu: function() {

            this.showMobileSearch = false;

            this.showMobileMenu = !this.showMobileMenu;

        },

        toggleMobileSearch: function() {

            this.showMobileMenu = false;

            this.showMobileSearch = !this.showMobileSearch;

        },

        hideMobileMenus: function() {
            this.showMobileSearch = false;
            this.showMobileMenu = false;
        },

        search: function(){

            var _self = this;

            if (_self.searching === false) {

                _self.searching = true;

                setTimeout(function(){

                    _self.searching = false;

                }, 2000);

                window.location = '/search?keyword=' + _self.searchQuery;
            }

        }


    }

})
