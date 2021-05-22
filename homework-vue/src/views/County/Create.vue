<template>
    <h1>Create</h1>
    <h2>County</h2>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <div v-if="message" style="color: crimson">{{ message }}</div>

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
import { ICounty } from "../../domain/ICounty";
import { Service } from "../../service/Service";
import router from "../../router";

export default class CountyCreate extends Vue {
    service: Service<ICounty> = new Service<ICounty>();
    private name: string = "";
    protected url: string = "https://hlepik.azurewebsites.net/api/v1/Counties";
    message: string = "";

    async saveClicked(): Promise<void> {
        const objToSave: ICounty = {
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

        const response = await this.service.create(objToSave, this.url);

        if (response.statusCode >= 200 && response.statusCode < 400) {
            router.push({ name: "county-index" });
        } else {
            console.log(response.errorMessage);
        }
    }

    backOnClick(): void {
        router.push({ name: "county-index" });
    }
}
</script>
