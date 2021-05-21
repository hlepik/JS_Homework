<template>
    <div>
        <h4>Picture Details</h4>
        <hr />
        <dl class="row">
            <dt class="col-sm-2">Url</dt>
            <dd class="col-sm-10">
                <img :src="this.pictureUrl" />
            </dd>
            <dt class="col-sm-2">Product Name</dt>
            <dd class="col-sm-10">
                {{ this.productName }}
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
import { IPicture } from "../../domain/IPicture";
import { Service } from "../../service/Service";
import router from "../../router";

export default class PictureDetails extends Vue {
    service: Service<IPicture> = new Service<IPicture>();

    protected url: string = "https://localhost:5001/api/v1/Pictures";
    pictureUrl: string = "";
    productName: string = "";
    private entity: IPicture | null = null;

    async created(): Promise<void> {
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

    editClicked(picture: IPicture): void {
        router.push({ name: "pictureEdit", query: { id: picture.id } });
    }

    backOnClick(): void {
        router.push({ name: "picture-index" });
    }
}
</script>
<style >
img {
    width: 10rem;
    height: 16rem;
}
</style>
