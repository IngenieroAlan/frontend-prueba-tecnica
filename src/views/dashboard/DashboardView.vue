<script setup>
import { ref } from 'vue';
const isMenuOpen = ref(false);
</script>
<template>
<el-container>
    <el-button type="primary" size="48px" @click="isMenuOpen = !isMenuOpen">
        <el-icon size="24px" > <Menu v-if="!isMenuOpen"/> <Close v-else/> </el-icon>
    </el-button>
    
    <el-aside>
    </el-aside>
</el-container>
</template>