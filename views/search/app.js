Vue.use(VueResource);

var vm = new Vue({

    el: '#app',

    data: {

        query: '',

        lastQuery: data.lastQuery || '',
        searching: false,

        errorMessage: undefined,

        lists: data.lists || [],
        results: data.results || [],

        sortAscending: true

    },

    computed: {

        showError: function() {

            return this.errorMessage !== undefined;

        },

        showResultsLabel: function () {

            return this.showError || this.lastQuery.length > 0;

        },

        resultsLabel: function () {

            if (this.showError) {

                return this.errorMessage;

            } else {

                var displayedQuery = (this.lastQuery.length > 8 ) ? this.lastQuery.substring(0,5) + '...' : this.lastQuery

                return this.displayedResults.length + ' results for "' + displayedQuery + '"';

            }

        },

        sortIconClasses: function() {

            return {
                'fa': true,
                'fa-sort-alpha-asc': this.sortAscending,
                'fa-sort-alpha-desc': !this.sortAscending
            };

        },

        displayedResults: function() {

            var clonedResults = this.results.map(function(result) { return result });

            return clonedResults.sort(this.sortResults);

        }

    },

    methods: {

        search: function () {

            if (!this.searching) {

                this.$http
                    .get('/api/search?lists=' + this.lists.join(',') + '&query=' + this.query)
                    .then(this.searchComplete);

            }

            this.searching = true;

        },

        searchComplete: function (response) {

            response = response.data;

            if (response.error) {

                this.errorMessage = response.message;

            } else {

                this.errorMessage = undefined;
                this.lastQuery = this.query;
                this.query = '';
                this.results = response.data;

            }

            this.searching = false;

        },

        toggleSort: function () {

            this.sortAscending = false;

        },

        sortResults: function ( a, b ) {

            var LT = -1,
                EQ = 0,
                GT = 1,
                sort = EQ;

            if ( a.name < b.name ) {
                sort = LT;
            } else if ( a.name > b.name ) {
                sort = GT;
            } else {
                sort = EQ;
            }

            return this.sortAscending ? sort : ( -1 * sort );

        }

    }

})
