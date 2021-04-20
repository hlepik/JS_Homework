<template>
    <div class="row">
        <div class="col-sm-1 col-md-3"></div>
        <div class="col-sm-10 col-md-6">
            <h1>Register</h1>
            <h4>Create a new account.</h4>
            <hr />
            <div class="form-group">
                <label for="Input_firstname">First name</label>
                <input
                    class="form-control"
                    type="text"
                    id="Input_firstname"
                    v-model="firstname"
                />
            </div>
            <div class="form-group">
                <label for="Input_lastname">Last name</label>
                <input
                    class="form-control"
                    type="text"
                    id="Input_lastname"
                    v-model="lastname"
                />
            </div>
             <div class="form-group">
                <label for="Input_email">Email</label>
                <input
                    class="form-control"
                    type="email"
                    id="Input_email"
                    v-model="email"
                />
            </div>
             <div class="form-group">
                <label for="Input_password">Password</label>
                <input
                    class="form-control"
                    type="password"
                    id="Input_password"
                    v-model="password"
                />
            </div>
             <div class="form-group">
                <label for="Input_confirmpassword">Confirm password</label>
                <input
                    class="form-control"
                    type="password"
                    id="Input_confirmpassword"
                    v-model="confirmpassword"
                />
            </div>
            <div class="form-group">
                <button
                    @click="registerClicked($event)"
                    type="submit"
                    class="btn btn-primary"
                >
                    Register
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
export default class Register extends Vue {
    firstname: string = "";
    lastname: string = "";
    email: string = "";
    password: string = "";
    confirmpassword: string = "";

    async registerClicked(event: Event): Promise<void> {
        console.log(this.email, this.password, event);

        store.dispatch("register", { email: this.email, password: this.password });
        /*
        var result = await this.axios.get("https://localhost:5001/api/v1/ContactTypes");
        console.log(result);
        */
    }
}
</script>
