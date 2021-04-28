<template>
    <h1>Create</h1>
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
                    <option value="">--- Please select ---</option>

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
import { IPicture } from "../../domain/IPicture";
import { IPictureCreate } from "../../domain/IPictureCreate";
import { IProduct } from "../../domain/IProduct";
import { Service } from "../../service/Service";
import router from "../../router";
import store from "@/store/index";

export default class PictureCreate extends Vue {
    service: Service<IPictureCreate> = new Service<IPictureCreate>();
    productService: Service<IProduct> = new Service<IProduct>();
    entity: IPicture | null = null;
    products: IProduct[] | null = null;
    pictureUrl: string = "";
    protected url: string = "https://localhost:5001/api/v1/Pictures";
    protected productUrl: string = "https://localhost:5001/api/v1/Products";
    productId: string = "";
    productName: string = "";
    selectedProduct: any;
    message: string = "";

    async created() {
        const productResponse = await this.productService.getAll(
            this.productUrl
        );
        this.products = productResponse;
        console.log(this.products);
        console.log(store.state.token);
    }

    backOnClick(): void {
        router.push({ name: "picture-index" });
    }

    async saveClicked(): Promise<void> {
        console.log(this.selectedProduct);
        const objToSave: IPictureCreate = {
            url: this.pictureUrl,
            productId: this.selectedProduct.id,
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
        const response = await this.service.create(objToSave, this.url);

        if (response.statusCode >= 200 && response.statusCode < 400) {
            router.push({ name: "picture-index" });
        }
    }
}
</script>
