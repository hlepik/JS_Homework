<template>
    <h1>Edit</h1>
    <h2>City</h2>
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
import { ICity } from "../../domain/ICity";
import { Service } from "../../service/Service";
import router from "../../router";

export default class CityEdit extends Vue {
    service: Service<ICity> = new Service<ICity>();
    protected url: string = "https://localhost:5001/api/v1/Cities/";
    name: string = "";
    entity: any;
    nameId: any;
    message: string = "";

    async created() {
        this.url = this.url + this.$route.query.id;
        const response = await this.service.get(this.url);

        console.log(response);
        if (response.statusCode >= 200 && response.statusCode < 400) {
            this.entity = response.data;
            this.name = response.data!.name;
            this.nameId = response.data!.nameId;
        }
        console.log(this.entity);
    }

    backOnClick(): void {
        router.push({ name: "city-index" });
    }

    async editClicked(): Promise<void> {
        const objToSave: ICity = {
            id: this.entity!.id,
            name: this.name,
            nameId: this.nameId,
        };

        console.log(objToSave);
        console.log(this.url);

        const response = await this.service.edit(objToSave, this.url);

        if (response.statusCode >= 200 && response.statusCode < 400) {
            router.push({ name: "city-index" });
        }
    }

    data() {
        return {
            posts: null,
        };
    }
}
</script>
