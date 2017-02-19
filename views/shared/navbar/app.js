var navbarVm = new Vue({

    el: '#navbar',

    data: {
        showMobileMenu: false,
        showMobileSearch: false,
        searchQuery: ''
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
            console.log(this.searchQuery);
        }


    }

})
