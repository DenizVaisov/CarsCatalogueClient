
<template>
    <div style="height: 300px" class="vld-parent">
        <loading :active.sync="isLoading" 
        :can-cancel="canCancel" 
        :on-cancel="onCancel"
        :is-full-page="fullPage"
        :height="height"
        :width="width"
        :color="color"
        :loader="loader"
        :background-color="bgColor"></loading>
    </div>
</template>

<script>
    // Import component
    import Loading from 'vue-loading-overlay';
    // Import stylesheet
    import 'vue-loading-overlay/dist/vue-loading.css';
    
    export default {
        data() {
            return {
                isLoading: false,
                fullPage: true,
                canCancel: false,
                useSlot: false,
                loader: 'bars',
                color: '#007bff',
                bgColor: '#ffffff',
                height: 128,
                width: 128,
                timeout: 1000
            }
        },
        components: {
            Loading
        },
        methods: {
            onCancel() {
                console.log('User cancelled the loader.')
            }
        },
        created: function(){
            this.isLoading = true;
            // Simulate async call
            setTimeout(() => {
            this.isLoading = false
            }, this.timeout);
        },

    }
</script>