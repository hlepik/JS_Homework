<template>
    <h1>County</h1>
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
            <tr v-for="county in counties" :key="county.id">
                <td>{{ county.name }}</td>

                <td>
                    <a @click="editClick(county)">Edit</a> |
                    <a @click="detailsClick(county)">Details</a>
                </td>
            </tr>
        </tbody>
    </table>
</template>

<script lang="ts">
import { Options, Vue } from "vue-class-component";

@Options({
    components: {},
    props: {},
})
export default class County extends Vue {}
</script>
