<template>
    <div class="row">
        <div class="col-sm-1 col-md-3"></div>
        <div class="col-sm-10 col-md-6">
            <h1>Login</h1>
            <h4>Use a local account to log in.</h4>
            <hr />
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
        <div class="col-sm-1 col-md-3"></div>
    </div>
</template>
<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "@/store/index";

@Options({
    components: {},
    props: {},
})

export default class Login extends Vue {
    email: string = "";
    password: string = "";

    async loginClicked(event: Event): Promise<void> {
        console.log(this.email, this.password, event);

        store.dispatch("logIn", { email: this.email, password: this.password });
        var result = await this.axios.get("https://localhost:5001/api/v1/Bookings");
        console.log(result);
    }
}
</script>
