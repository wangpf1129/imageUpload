<template>
    <div id="app">
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-md-9">
                    <div class="card card-default">
                        <div class="card-header">图片上传组件</div>
                        <div class="card-body">
                            <image-upload></image-upload>
                        </div>
                    </div>
                   <div>
                       <ui-component></ui-component>
                   </div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import imageUpload from "@/components/imageUpload";

    import "bootstrap/dist/css/bootstrap.min.css";
    import "bootstrap/dist/js/bootstrap.min.js";
    import UiComponent from "./components/uiComponent";

    export default {
        name: "App",
        components: {
            UiComponent,
            imageUpload,
        },
    };
</script>

<style>
    /*引入字体图标font-awesome*/
    @import url("https://cdn.bootcss.com/font-awesome/4.7.0/css/font-awesome.min.css");

    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
    .ui-component{
        margin-top: 50px;
    }
</style>
