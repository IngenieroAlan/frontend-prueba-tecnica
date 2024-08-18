<script setup>
import { reactive } from "vue";
import { ElButton, ElContainer } from "element-plus";
import router from "../../router";
import "./styles.css";
//localStorage.setItem('token','JWT hola')
if (localStorage.getItem("token")) {
  router.replace("/home");
}
const form = reactive({
  username: "",
  email: "",
});
const onSubmit = () => {
  //logica del login
};
</script>
<template>
  <el-container class="container">
    <el-main class="main">
      <el-icon
        size="50px"
        class="avatar"
        ><UserFilled
      /></el-icon>
      <el-form
        class="form"
        label-width="auto"
        :model="form"
      >
        <el-form-item
          prop="username"
          label="Nombre de usuario"
          :rules="[
            {
              required: true,
              message: 'El campo del nombre de usuario no puede estar vacio',
              trigger: 'blur',
            },
            {
              type: 'username',
              message: 'Por favor ingrese un nombre de usuario valido',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item
          prop="email"
          label="Correo electronico"
          :rules="[
            {
              required: true,
              message: 'El campo del correo electronico no puede estar vacio',
              trigger: 'blur',
            },
            {
              type: 'email',
              message: 'Por favor ingrese un correo electronico valido',
              trigger: ['blur', 'change'],
            },
          ]"
        >
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item class="button">
          <el-button
            type="primary"
            @click="onSubmit"
            >Iniciar sesión</el-button
          >
        </el-form-item>
      </el-form>
    </el-main>
  </el-container>
</template>
