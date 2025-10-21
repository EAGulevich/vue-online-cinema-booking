<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useSettingsData } from '@/composables/useSettingsData.ts'
import { ref } from 'vue'
import { usePostLogin } from '@/generated/login/login.ts'
import { getErrorMessage } from '@/utils/getErrorMessage.ts'
import { notification } from 'ant-design-vue'

interface FieldType {
  username?: string
  password?: string
}

const router = useRouter()
const { onLogin } = useSettingsData()

const form = ref<FieldType>({ username: '', password: '' })

const { mutate } = usePostLogin({
  mutation: {
    onError: (err) => {
      notification.error({
        message: 'Проверьте введенные данные и попробуйте снова',
        description: getErrorMessage(err),
      })
    },
    onSuccess: (data) => {
      onLogin(data.data.token || '')
      router.push('/tickets')
    },
  },
})

const onSubmit = () => {
  mutate({
    data: {
      username: form.value.username || '',
      password: form.value.password || '',
    },
  })
}

const rules = {
  username: [{ required: true, message: 'Введите логин' }],
  password: [{ required: true, message: 'Введите пароль' }],
}
</script>

<template>
  <a-form :model="form" layout="vertical" name="login" @finish="onSubmit">
    <a-row>
      <a-col :span="24">
        <a-form-item label="Логин" name="username" :rules="rules.username">
          <a-input v-model:value="form.username" />
        </a-form-item>
        <a-form-item label="Пароль" name="password" :rules="rules.password">
          <a-input-password v-model:value="form.password" />
        </a-form-item>
        <a-flex justify="center">
          <a-form-item>
            <a-button html-type="submit" size="large" type="primary"> Войти </a-button>
          </a-form-item>
        </a-flex>
      </a-col>
    </a-row>
  </a-form>
</template>
