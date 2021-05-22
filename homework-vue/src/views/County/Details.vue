<template>
    <div>
        <h4>County Details</h4>
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
import { ICounty } from "../../domain/ICounty";
import { Service } from "../../service/Service";
import router from "../../router";

export default class CountyDetails extends Vue {
    service: Service<ICounty> = new Service<ICounty>();

    protected url: string = "https://hlepik.azurewebsites.net/api/v1/Counties";

    private entity: ICounty | null = null;
    name: string = "";

    async created() {
        this.url = this.url + "/" + this.$route.query.id;
        console.log(this.url);

        const response = await this.service.get(this.url);

        if (response.statusCode >= 200 && response.statusCode < 400) {
            this.name = response.data!.name;
            this.entity = response.data;
        }

        console.log(this.entity);
    }

    editClicked(county: ICounty): void {
        router.push({ name: "CountyEdit", query: { id: county.id } });
    }

    backOnClick(): void {
        router.push({ name: "county-index" });
    }
}
</script>
