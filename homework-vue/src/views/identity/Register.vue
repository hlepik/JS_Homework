<template>
    <div>
        <div class="row">
            <div class="col-md-4">
                <h1>Register</h1>
                <h4>Create a new account.</h4>
                <hr />
                <div v-if="message" style="color: crimson">{{ message }}</div>

                <div
                    class="text-danger validation-summary-valid"
                    data-valmsg-summary="true"
                >
                    <ul>
                        <li style="display: none"></li>
                    </ul>
                </div>
                <div class="form-group">
                    <label for="Input_Firstname">First name</label>
                    <input
                        class="form-control"
                        type="text"
                        data-val="true"
                        data-val-length="The field First name must be a string with a minimum length of 1 and a maximum length of 128."
                        data-val-length-max="128"
                        data-val-length-min="1"
                        data-val-required="The First name field is required."
                        id="Input_Firstname"
                        maxlength="128"
                        v-model="firstname"
                    />
                    <span
                        class="text-danger field-validation-valid"
                        data-valmsg-for="Input.Firstname"
                        data-valmsg-replace="true"
                    ></span>
                </div>
                <div class="form-group">
                    <label for="Input_Lastname">Last name</label>
                    <input
                        class="form-control"
                        type="text"
                        data-val="true"
                        data-val-length="The field Last name must be a string with a minimum length of 1 and a maximum length of 128."
                        data-val-length-max="128"
                        data-val-length-min="1"
                        data-val-required="The Last name field is required."
                        id="Input_Lastname"
                        maxlength="128"
                        v-model="lastname"
                    />
                    <span
                        class="text-danger field-validation-valid"
                        data-valmsg-for="Input.Lastname"
                        data-valmsg-replace="true"
                    ></span>
                </div>
                <div class="form-group">
                    <label for="Input_Email">Email</label>
                    <input
                        class="form-control"
                        type="email"
                        data-val="true"
                        data-val-email="The Email field is not a valid e-mail address."
                        data-val-required="The Email field is required."
                        id="Input_Email"
                        v-model="email"
                    />
                    <span
                        class="text-danger field-validation-valid"
                        data-valmsg-for="Input.Email"
                        data-valmsg-replace="true"
                    ></span>
                </div>
                <div class="form-group">
                    <label for="Input_Password">Password</label>
                    <input
                        class="form-control"
                        type="password"
                        data-val="true"
                        data-val-length="The Password must be at least 6 and at max 100 characters long."
                        data-val-length-max="100"
                        data-val-length-min="6"
                        data-val-required="The Password field is required."
                        id="Input_Password"
                        maxlength="100"
                        v-model="password"
                    />
                    <span
                        class="text-danger field-validation-valid"
                        data-valmsg-for="Input.Password"
                        data-valmsg-replace="true"
                    ></span>
                </div>
                <div class="form-group">
                    <label for="Input_ConfirmPassword">Confirm password</label>
                    <input
                        class="form-control"
                        type="password"
                        data-val="true"
                        data-val-equalto="The password and confirmation password do not match."
                        data-val-equalto-other="*.Password"
                        data-val-required="The Confirm password field is required."
                        id="Input_ConfirmPassword"
                        v-model="password"
                    />
                    <span
                        class="text-danger field-validation-valid"
                        data-valmsg-for="Input.ConfirmPassword"
                        data-valmsg-replace="true"
                    ></span>
                </div>
                <button
                    @click="registerClicked($event)"
                    type="submit"
                    class="btn btn-primary"
                >
                    Register
                </button>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";
import store from "../../store/index";
import router from "../../router";

@Options({
    components: {},
    props: {},
})
export default class Register extends Vue {
    email: string = "";
    password: string = "";
    firstname: string = "";
    lastname: string = "";
    message: string = "";

    async registerClicked(): Promise<void> {
        console.log(this.email, this.password, this.firstname, this.lastname);

        var regexEmail = /\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        var passwordRegex = /^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{6,100}$/;
        if (this.firstname.length < 1) {
            this.message = "First name can't be empty!";
            return;
        }
        if (this.lastname.length < 1) {
            this.message = "Last name can't be empty!";
            return;
        }
        if (!regexEmail.test(this.email)) {
            this.message = "Email is not valid!";
            return;
        }
        if (!passwordRegex.test(this.password)) {
            this.message = "Password is not valid!";
            return;
        }

        store.dispatch("register", {
            email: this.email,
            password: this.password,
            firstname: this.firstname,
            lastname: this.lastname,
        });

        router.push("/");
        if (store.state.token != null) {
            router.push("/");
        } else {
            this.message = "Email already in use!";
        }
    }
}
</script>
