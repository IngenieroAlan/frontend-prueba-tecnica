<template>
  <div
    class="card"
    v-if="!isLoading"
  >
    <el-descriptions title="Información del usuario">
      <el-descriptions-item label="Nombre de usuario">{{
        user.userName
      }}</el-descriptions-item>
      <el-descriptions-item label="Correo electronico">{{
        user.email
      }}</el-descriptions-item>
      <el-descriptions-item label="Dia de registro">{{
        user.registerDate
      }}</el-descriptions-item>
    </el-descriptions>
    <hr class="divider" />
  </div>
  <div
    class="card"
    v-else
  >
    <el-skeleton
      :rows="2"
      animated
    />
  </div>
</template>
<script setup>
import { ref } from "vue";

const { user } = defineProps({
  user: Object,
});
const isLoading = ref(true);
setTimeout(() => (isLoading.value = false), 1500);
</script>
<style scoped>
.card {
  padding: 10px;
  background-color: white;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}
.divider {
  border: 0.5px #dbdada solid;
}
</style>
