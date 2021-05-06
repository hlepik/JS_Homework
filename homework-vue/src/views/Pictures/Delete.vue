<template>
    <div>
        <h1>Delete</h1>
        <h2>Are you sure you want to delete this?</h2>
        <h3>Picture</h3>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">Url</dt>
            <dd class="col-sm-10">
                {{ pictureUrl }}
            </dd>
            <dt class="col-sm-2">Product Name</dt>
            <dd class="col-sm-10">
                {{ productName }}
            </dd>
            <div id="button">
                <button
                    @click="deleteClicked()"
                    type="button"
                    class="btn btn-primary"
                >
                    Delete
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
import { IPicture } from "../../domain/IPicture";
import { Service } from "../../service/Service";
import router from "../../router";

export default class PictureDelete extends Vue {
    service: Service<IPicture> = new Service<IPicture>();

    protected url: string = "https://localhost:5001/api/v1/Pictures";
    productName: string = "";
    pictureUrl: string = "";
    private entity: IPicture | null = null;

    async created() {
        this.url = this.url + "/" + this.$route.query.id;
        console.log(this.url);

        const response = await this.service.get(this.url);

        if (response.statusCode >= 200 && response.statusCode < 400) {
            this.entity = response.data;
            this.pictureUrl = response.data!.url;
            this.productName = response.data!.productName;
        }

        console.log(this.entity);
    }

    async deleteClicked(): Promise<void> {
        const response = await this.service.delete(this.url);

        if (response.statusCode >= 200 && response.statusCode < 400) {
            router.push({ name: "picture-index" });
        }
    }

    backOnClick(): void {
        router.push({ name: "picture-index" });
    }
}
</script>
