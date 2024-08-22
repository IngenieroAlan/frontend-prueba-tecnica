<template>
  <el-container class="container">
    <el-header
      class="header"
      style="text-align: left"
    >
      <el-button
        link
        @click="goBack"
      >
        <el-icon size="38px"><Back /></el-icon>
      </el-button>
    </el-header>
    <el-main class="content">
      <el-card>
        <h1>{{ isEditMode ? "Editar Contacto" : "Agregar Contacto" }}</h1>
        <el-form
          :model="contact"
          :rules="rules"
          ref="contactForm"
        >
          <el-form-item
            label="Nombre del contacto"
            prop="name"
          >
            <el-input
              v-model="contact.name"
              placeholder="Nombre del contacto"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Correo electrónico"
            prop="email"
          >
            <el-input
              v-model="contact.email"
              placeholder="Correo electrónico"
              type="email"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Número de teléfono"
            prop="phoneNumber"
          >
            <el-input
              v-model="contact.phoneNumber"
              placeholder="Número de teléfono"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="Dirección"
            prop="address"
          >
            <el-input
              v-model="contact.address"
              placeholder="Dirección"
            ></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              @click="submit"
            >
              {{ isEditMode ? "Guardar Cambios" : "Agregar Contacto" }}
            </el-button>
            <el-button @click="resetForm">Resetear</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </el-main>
  </el-container>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { ElMessage } from "element-plus";
import baseUrl from "../../api/api";

const route = useRoute();
const router = useRouter();

const contact = ref({
  name: "",
  email: "",
  phoneNumber: "",
  address: "",
});
const userId = ref(route.params.userId);

const rules = {
  name: [
    { required: true, message: "El nombre es obligatorio", trigger: "blur" },
  ],
  email: [
    { required: true, message: "El correo es obligatorio", trigger: "blur" },
    { type: "email", message: "El correo no es válido", trigger: "blur" },
  ],
  phoneNumber: [
    {
      required: true,
      message: "El número de teléfono es obligatorio",
      trigger: "blur",
    },
  ],
  address: [
    { required: true, message: "La dirección es obligatoria", trigger: "blur" },
  ],
};

const contactForm = ref(null);
const isEditMode = computed(() => !!route.params.id);

const getContact = async (id) => {
  if (isEditMode.value) {
    try {
      const resp = await fetch(baseUrl + `/Contact/${id}`, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      const data = await resp.json();
      if (resp.ok) {
        contact.value = data;
        userId.value = data.userId;
      } else {
        throw new Error(
          data.message || "Error al cargar los datos del contacto"
        );
      }
    } catch (error) {
      console.error(error);
      ElMessage.error("Error al cargar los datos del contacto");
    }
  }
};

const submit = () => {
  contactForm.value.validate(async (valid) => {
    if (valid) {
      try {
        if (isEditMode.value) {
          await fetch(baseUrl + `/Contact/${route.params.id}`, {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ userId: userId.value, ...contact.value }),
          });
        } else {
          await fetch(baseUrl + "/Contact", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
            body: JSON.stringify({ userId: userId.value, ...contact.value }),
          });
        }
        ElMessage.success("Operación realizada con éxito");
        router.replace(`/user/${userId.value}`);
      } catch (error) {
        console.error(error);
        ElMessage.error("Hubo un error al realizar la operación");
      }
    } else {
      ElMessage.error("Por favor, llena correctamente el formulario");
    }
  });
};

const resetForm = () => {
  contactForm.value.resetFields();
};

const goBack = async () => {
  router.replace(`/user/${userId.value}`);
};

onMounted(() => {
  getContact(route.params.id);
});
</script>
