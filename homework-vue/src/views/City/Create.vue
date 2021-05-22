<template>
    <h1>Create</h1>
    <h2>City</h2>
    <hr />
    <div v-if="message" style="color: crimson">{{ message }}</div>
    <div v-if="error" style="color: crimson">{{ error }}</div>
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <label>Name</label>
                <input class="form-control" v-model="name" />
            </div>
            <div class="row">
                <div id="button">
                    <button
                        @click="saveClicked()"
                        type="button"
                        class="btn btn-primary"
                    >
                        Save
                    </button>
                </div>
                <div id="button">
                    <button
                        @click="backOnClick()"
                        type="button"
                        class="btn btn-info"
                    >
                        Back to List
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { ICity } from "../../domain/ICity";
import { Service } from "../../service/Service";
import router from "../../router";

export default class CityCreate extends Vue {
    service: Service<ICity> = new Service<ICity>();
    name: string = "";
    protected url: string = "https://hlepik.azurewebsites.net/Cities";
    message: string = "";
    error: any;

    async saveClicked() {
        const objToSave: ICity = {
            name: this.name,
        };
        if (this.name.length < 2) {
            this.message = "Minimum name length is 2!";
            return;
        }
        if (this.name.length > 128) {
            this.message = "Maximum name length is 128!";
            return;
        }

        if (this.name.length > 2 && this.message.length < 129) {
            const response = await this.service.create(objToSave, this.url);

            if (response.statusCode >= 200 && response.statusCode < 400) {
                router.push({ name: "city-index" });
            } else {
                this.error = response.errorMessage;
            }
        }
    }

    backOnClick(): void {
        router.push({ name: "city-index" });
    }

    data() {
        return {
            posts: null,
        };
    }
}
</script>
