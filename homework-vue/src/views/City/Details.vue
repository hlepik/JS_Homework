<template>
    <div>
        <h1>Details</h1>
        <h2>City</h2>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">Name</dt>
            <dd class="col-sm-10">
                {{ this.name }}
            </dd>
            <div id="button">
                <button
                    @click="editClicked(entity)"
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
        </dl>
    </div>
</template>
<script lang="ts">
import { Vue } from "vue-class-component";
import { ICity } from "../../domain/ICity";
import { Service } from "../../service/Service";
import router from "../../router";

export default class CityDetails extends Vue {
    service: Service<ICity> = new Service<ICity>();

    protected url: string = "https://localhost:5001/api/v1/Cities";

    name: string = "";
    private entity: ICity | null = null;

    async created() {
        this.url = this.url + "/" + this.$route.query.id;
        console.log(this.url);

        const response = await this.service.get(this.url);

        if (response.statusCode >= 200 && response.statusCode < 400) {
            this.name = response.data!.name;
            this.entity = response.data;
        }
    }

    editClicked(city: ICity): void {
        router.push({ name: "CityEdit", query: { id: city.id } });
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
