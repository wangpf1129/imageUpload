<template>
    <div class="ui-component">
        <pf-button type="primary" @click="visible =true">点击</pf-button>
        <pf-dialog title="登录" :visible.sync="visible" width="30%">
            <pf-form :model="model">
                <pf-form-item label="用户名">
                    <pf-input placeholder="请输入用户名" v-model="model.username"></pf-input>
                </pf-form-item>
                <pf-form-item label="密码">
                    <pf-input placeholder="请输入密码" type="password" v-model="model.password" show-password></pf-input>
                </pf-form-item>
                <pf-form-item label="阅读协议">
                    <pf-switch v-model="model.switch"></pf-switch>
                </pf-form-item>
                <pf-form-item label="性别">
                    <pf-radio-group v-model="model.gender">
                        <pf-radio label="1">男</pf-radio>
                        <pf-radio label="0">女</pf-radio>
                    </pf-radio-group>
                </pf-form-item>
            </pf-form>
            <template v-slot:footer>
                <pf-button type="primary">确定</pf-button>
            </template>
        </pf-dialog>
    </div>
</template>

<script>
    export default {
        name: "uiComponent",
        data() {
            return {
                visible: false,
                model: {
                    username: '',
                    password: '',
                    switch: false,
                    gender: 1
                }
            }
        }
    }
</script>

<style lang="scss" scoped>

</style>