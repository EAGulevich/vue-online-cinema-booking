<script setup lang="ts">
import { ref } from 'vue'

import LoginForm from './forms/LoginForm.vue'
import RegistrationForm from './forms/RegistrationForm.vue'

const isLoginForm = ref(true)
</script>

<template>
  <a-row justify="center">
    <a-col>
      <a-typography-title :level="2">
        {{ isLoginForm ? 'Вход' : 'Регистрация' }}
      </a-typography-title>
    </a-col>
  </a-row>
  <a-row justify="center">
    <a-col>
      <a-card class="login-card">
        <LoginForm v-if="isLoginForm" />
        <RegistrationForm v-else />
        <a-flex justify="center" align="center" class="help-msg">
          {{ isLoginForm ? 'Если у вас нет аккаунта' : 'Если вы уже зарегистрированы' }}
          <a-button size="small" type="link" @click="isLoginForm = !isLoginForm">
            {{ isLoginForm ? 'зарегистируйтесь' : 'войдите' }}
          </a-button>
        </a-flex>
      </a-card>
    </a-col>
  </a-row>
</template>

<style scoped>
.login-card {
  width: 400px;
}

.help-msg {
  margin-top: 20px;
}
</style>
