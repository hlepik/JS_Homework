<template>
    <h1>Pictures</h1>
    <p>
        <a class="nav-link text-blue" @click="createClicked()">Create New</a>
    </p>
    <table class="table">
        <thead>
            <tr>
                <th>Url</th>
                <th>Product Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="picture in entity" :key="picture.id">
                <td>
                    <img :src="picture.url" />
                </td>
                <td>{{ picture.productName }}</td>
                <div class="col s6 text-right">
                    <td>
                        <button
                            @click="editClicked(picture)"
                            type="button"
                            class="btn btn-primary btn-sm mr-1 btn-right"
                        >
                            Edit
                        </button>
                        <button
                            @click="detailsClicked(picture)"
                            type="button"
                            class="btn btn-info btn-sm mr-1 btn-right"
                        >
                            Details
                        </button>
                        <button
                            @click="deleteClicked(picture)"
                            type="button"
                            class="btn btn-danger btn-sm btn-right"
                        >
                            Delete
                        </button>
                    </td>
                </div>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { IPicture } from "../../domain/IPicture";
import { Vue } from "vue-class-component";
import { Service } from "../../service/Service";

export default class Picture extends Vue {
    service: Service<IPicture> = new Service<IPicture>();
    entity: IPicture[] | null = null;
    protected url: string = "https://hlepik.azurewebsites.net/Pictures";

    async created(): Promise<void> {
        console.log("attached");

        const response = await this.service.getAll(this.url);
        this.entity = response;
    }

    editClicked(picture: IPicture): void {
        this.$router.push({ name: "PictureEdit", query: { id: picture.id } });
    }

    detailsClicked(picture: IPicture): void {
        this.$router.push({
            name: "PictureDetails",
            query: { id: picture.id },
        });
    }

    deleteClicked(picture: IPicture): void {
        this.$router.push({ name: "PictureDelete", query: { id: picture.id } });
    }

    createClicked(): void {
        this.$router.push({ name: "PictureCreate" });
    }
}
</script>
<style >
img {
    width: 10rem;
    height: 16rem;
}
</style>
