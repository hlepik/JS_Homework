<template>
    <div class="row">
        <div class="col-sm-1 col-md-3"></div>
        <div class="col-sm-10 col-md-6">
            <h4>Use a local account to log in.</h4>
            <div v-if="error" style="color: crimson">{{ error }}</div>
            <div class="form-group">
                <label for="Input_Email">Email</label>
                <input
                    class="form-control"
                    type="email"
                    id="Input_Email"
                    v-model="email"
                />
            </div>
            <div class="form-group">
                <label for="Input_Password">Password</label>
                <input
                    class="form-control"
                    type="password"
                    id="Input_Password"
                    v-model="password"
                />
            </div>
            <div class="form-group">
                <button
                    @click="loginClicked($event)"
                    type="submit"
                    class="btn btn-primary"
                >
                    Log in
                </button>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";
import router from "../../router";

@Options({
    components: {},
    props: {},
})
export default class Login extends Vue {
    email: string = "";
    password: string = "";
    error: string = "";

    async loginClicked(event: Event): Promise<void> {
        console.log(this.email, this.password, event);
        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;

        if (!regexEmail.test(this.email)) {
            this.error = "Email is not valid!";
            return;
        }
        if (this.password.length < 4) {
            this.error = "Password inncorrect!";
            return;
        }

        store.dispatch("logIn", { email: this.email, password: this.password });

        router.push("/");
        if (store.state.token != null) {
            router.push("/");
        } else {
            this.error = "Email or password inncorrect!";
        }
    }
}
</script>
