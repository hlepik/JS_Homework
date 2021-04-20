<template>
    <h1>Pictures</h1>
    <p>
        <a @click="createClick">Create New</a>
    </p>
    <table class="table">
        <thead>
            <tr>
                <th>Url</th>
                <th>Product Description</th>
            </tr>
        </thead>
        <tbody>
            <tr v-for="picture in pictures" :key="picture.id">
                <td>{{ picture.url }}</td>
                <td>{{ picture.productName }}</td>

                <td>
                    <a @click="editClick(picture)">Edit</a> |
                    <a @click="detailsClick(picture)">Details</a> |
                    <a @click="deleteClick(picture)">Delete</a>
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
export default class Picture extends Vue {}
</script>
