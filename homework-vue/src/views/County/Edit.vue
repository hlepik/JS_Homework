<template>
    <h1>Edit</h1>
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
                        @click="editClicked()"
                        type="button"
                        class="btn btn-primary"
                    >
                        Edit
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
    protected url: string = "https://hlepik.azurewebsites.net/Counties/";
    name: string = "";
    entity: any;
    message: string = "";

    async created() {
        this.url = this.url + this.$route.query.id;
        const response = await this.service.get(this.url);

        if (response.statusCode >= 200 && response.statusCode < 400) {
            this.entity = response.data;
            this.name = response.data!.name;
        }
        console.log(this.entity);
    }

    async editClicked(): Promise<void> {
        const objToSave: ICounty = {
            id: this.entity!.id,
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
        console.log(objToSave);
        const response = await this.service.edit(objToSave, this.url);

        if (response.statusCode >= 200 && response.statusCode < 400) {
            router.push({ name: "county-index" });
        }
    }

    backOnClick(): void {
        router.push({ name: "county-index" });
    }
}
</script>
