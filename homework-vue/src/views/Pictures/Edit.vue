<template>
    <h1>Edit</h1>
    <h2>Picture</h2>
    <hr />
    <div class="row">
        <div class="col-md-4">
            <div class="form-group">
                <div v-if="message" style="color: crimson">{{ message }}</div>

                <label>Url</label>
                <input class="form-control" v-model="pictureUrl" />
            </div>
            <div class="form-group">
                <label>Product</label>
                <select v-model="this.productId" class="form-control">
                    <option
                        v-for="product in products"
                        :key="product.id"
                        v-bind:value="product.id"
                    >
                        {{ product.description }}
                    </option>
                </select>
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
import { IPicture } from "../../domain/IPicture";
import { IPictureCreate } from "../../domain/IPictureCreate";
import { IProduct } from "../../domain/IProduct";
import { Service } from "../../service/Service";
import router from "../../router";

export default class PictureEdit extends Vue {
    service: Service<IPicture> = new Service<IPicture>();
    editService: Service<IPictureCreate> = new Service<IPictureCreate>();
    productService: Service<IProduct> = new Service<IProduct>();
    entity: any;
    products: IProduct[] | null = null;
    protected url: string = "https://localhost:5001/api/v1/Pictures/";
    protected productUrl: string = "https://localhost:5001/api/v1/Products";
    pictureUrl: string = "";
    productId: any;
    productName: string = "";
    selectedProduct: any;
    message: string = "";

    async created() {
        this.url = this.url + this.$route.query.id;

        const response = await this.service.get(this.url);

        const productResponse = await this.productService.getAll(
            this.productUrl
        );
        this.products = productResponse;
        if (response.statusCode >= 200 && response.statusCode < 400) {
            this.entity = response.data;
            this.productId = response.data!.productId;
            this.pictureUrl = response.data!.url;
        }
    }

    backOnClick(): void {
        router.push({ name: "picture-index" });
    }

    async editClicked(): Promise<void> {
        console.log(this.productId.value);
        console.log(this.productId);
        const objToSave: IPictureCreate = {
            id: this.entity!.id,
            url: this.pictureUrl,
            productId: this.productId,
        };
        if (this.url.length < 2) {
            this.message = "Url can't be empty";
            return;
        }
        if (this.selectedProduct.id.length < 2) {
            this.message = "Product can't be empty";
            return;
        }

        console.log(objToSave);

        const response = await this.editService.edit(objToSave, this.url);

        if (response.statusCode >= 200 && response.statusCode < 400) {
            router.push({ name: "picture-index" });
        }
    }
}
</script>
