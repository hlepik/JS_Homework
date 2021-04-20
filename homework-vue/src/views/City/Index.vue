<template>
    <h1>Cities</h1>
    <p>
        <a @click="createClick">Create New</a>
    </p>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="city in cities" :key="city.id">
                <td>{{ city.name }}</td>
                <td>
                    <a @click="editClick(city)">Edit</a> |
                    <a @click="detailsClick(city)">Details</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>
<script lang="ts">
import { ICity } from "../../domain/ICity";
import { BaseService } from "../../service/base-service";
import { Options, Vue } from "vue-class-component";
import store from "@/store";
import router from "@/router";

export default class City extends Vue {

      private service: BaseService<ICity> = 
        new BaseService<ICity>();
}
</script>
