<template>
    <h1>County</h1>
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
            <tr v-for="county in entity" :key="county.id">
                <td>{{ county.name }}</td>
                <div class="col s6 text-right">
                    <td>
                        <button
                            @click="editClicked(county)"
                            type="button"
                            class="btn btn-primary btn-sm mr-1 btn-right"
                        >
                            Edit
                        </button>
                        <button
                            @click="detailsClicked(county)"
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
import { ICounty } from "../../domain/ICounty";
import { Vue } from "vue-class-component";
import { Service } from "../../service/Service";
import store from "@/store";

export default class County extends Vue {
    service: Service<ICounty> = new Service<ICounty>();
    entity: ICounty[] | null = null;
    protected readonly url: string = "https://localhost:5001/api/v1/Counties";
    role: string | null = "";

    async created(): Promise<void> {
        console.log("attached");

        const response = await this.service.getAll(this.url);
        this.entity = response;
        this.role = store.state.role;
    }

    createClicked(): void {
        this.$router.push({ name: "CountyCreate" });
    }

    detailsClicked(county: ICounty): void {
        this.$router.push({ name: "CountyDetails", query: { id: county.id } });
    }

    editClicked(county: ICounty): void {
        this.$router.push({ name: "CountyEdit", query: { id: county.id } });
    }
}
</script>
