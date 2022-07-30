<template>
  <el-button>Default</el-button>
  <el-button :type="type">Primary</el-button>
  <el-button type="success">Success</el-button>
  <el-button type="info">Info</el-button>
  <el-button type="warning">Warning</el-button>
  <el-button type="danger">Danger</el-button>
  <el-button>example</el-button>
</template>

<script setup>
import { ref } from "vue";

const type = ref('primary')
</script>