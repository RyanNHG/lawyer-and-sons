var vm = new Vue({

    el: '#app',

    data: {

        introCtaClicked: false

    },

    computed: {

        introCtaText: function() {
            return (this.introCtaClicked ? 'Yea, dude.' : 'Really?');
        }

    },

    methods: {

        setIntroCtaClicked: function() {

            this.introCtaClicked = true;

        }

    }

})
