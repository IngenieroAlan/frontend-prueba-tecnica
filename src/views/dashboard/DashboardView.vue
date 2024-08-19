<script setup>
import { ref } from "vue";
import "./styles.css";
import { Management } from "@element-plus/icons-vue";
const isMenuOpen = ref(false);
</script>
<template>
  <el-container class="container">
    <el-aside
      class="aside"
      :width="300"
      ><el-scrollbar>
        <el-menu
          :collapse="isMenuOpen"
          :collapse-transition="false"
        >
          <el-menu-item>
            <el-icon color="#000000"> <UserFilled /></el-icon>
            <template #title> Usuarios</template>
          </el-menu-item>
          <el-menu-item>
            <el-icon color="#000000"> <Management /></el-icon>
            <template #title> Contactos</template>
          </el-menu-item>
        </el-menu></el-scrollbar
      ></el-aside
    >
    <el-container>
      <el-header class="header"
        ><el-button
          type="primary"
          size="48px"
          @click="isMenuOpen = !isMenuOpen"
        >
          <el-icon size="24px">
            <Menu v-if="isMenuOpen" /> <Close v-else />
          </el-icon> </el-button
      ></el-header>
      <el-main class="content">
        <el-table
          :data="tableData"
          style="width: 100%"
        >
          <el-table-column
            fixed
            prop="username"
            label="Nombre de usuario"
            width="180"
          />
          <el-table-column
            prop="email"
            label="Correo electronico"
            width="180"
          />
          <el-table-column
            prop="date"
            label="Fecha de registro"
            width="180"
          />
          <el-table-column
            fixed="right"
            label="Operations"
            min-width="150"
          >
            <template #default>
              <el-button
                link
                type="primary"
                size="small"
                @click="handleClick"
              >
                Detalles
              </el-button>
              <el-button
                link
                type="primary"
                size="small"
                >Edit</el-button
              >
            </template>
          </el-table-column>
        </el-table>
      </el-main>
    </el-container>
  </el-container>
</template>
