<template>
    <h1>Cities</h1>
    <p v-if="this.role === 'Admin'">
        <a class="nav-link text-blue" @click="createClicked()">Create New</a>
    </p>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="city in entity" :key="city.id">
                <td>{{ city.name }}</td>
                <div class="col s6 text-right">
                    <td>
                        <button
                            @click="editClicked(city)"
                            type="button"
                            class="btn btn-primary btn-sm mr-1 btn-right"
                        >
                            Edit
                        </button>
                        <button
                            @click="detailsClicked(city)"
                            type="button"
                            class="btn btn-info btn-sm mr-1 btn-right"
                        >
                            Details
                        </button>
                    </td>
                </div>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import { ICity } from "../../domain/ICity";
import { Vue } from "vue-class-component";
import { Service } from "../../service/Service";
import store from "@/store/index";

export default class City extends Vue {
    service: Service<ICity> = new Service<ICity>();
    entity: ICity[] | null = null;

    protected readonly url: string = "https://localhost:5001/api/v1/Cities";
    role: string | null = "";

    async created() {
        const response = await this.service.getAll(this.url);
        console.log(response);
        this.entity = response;
        this.role = store.state.role;
    }

    editClicked(city: ICity): void {
        this.$router.push({ name: "CityEdit", query: { id: city.id } });
    }

    createClicked(): void {
        this.$router.push({ name: "CityCreate" });
    }

    detailsClicked(city: ICity): void {
        this.$router.push({ name: "CityDetails", query: { id: city.id } });
    }

    data() {
        return {
            posts: null,
        };
    }
}
</script>
