<script setup>
import { reactive, ref } from "vue";
import { ElButton, ElContainer } from "element-plus";
import router from "../../router";
import "./styles.css";
import baseUrl from "../../api/api";

const errorMessage = ref(""); //TODO: add validations

if (localStorage.getItem("token")) {
  router.replace("/home");
}
const form = reactive({
  username: "",
  email: "",
});

const onSubmit = async () => {
  try {
    const resp = await fetch(baseUrl + "/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: form.username,
        email: form.email,
      }),
    });
    const data = await resp.json();
    console.log(data);
    if (data.isSuccess) {
      localStorage.setItem("token", data.token);
      router.replace("/home");
    } else {
      errorMessage.value = "Error, las credenciales son incorrectas";
    }
  } catch (error) {
    console.log(error);
  }
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
              trigger: 'blur',
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
