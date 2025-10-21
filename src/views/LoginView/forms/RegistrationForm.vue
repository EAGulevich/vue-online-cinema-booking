<script setup lang="ts">
import { useRouter } from 'vue-router'
import { notification } from 'ant-design-vue'
import { reactive, ref } from 'vue'
import { useSettingsData } from '@/composables/useSettingsData'
import { usePostRegister } from '@/generated/register/register'
import { getErrorMessage } from '@/utils/getErrorMessage'
import type { Rule } from 'ant-design-vue/es/form'
import { isValidUsername } from '@/views/LoginView/forms/helpers/isValidUsername'
import { isValidPassword } from '@/views/LoginView/forms/helpers/isValidPassord.ts'

interface FormState {
  username?: string
  password?: string
  confirm?: string
}

const router = useRouter()
const { onLogin } = useSettingsData()

const formRef = ref()
const formState = reactive<FormState>({
  username: '',
  password: '',
  confirm: '',
})

const { mutate } = usePostRegister({
  mutation: {
    onError: (err) => {
      notification.error({
        message: 'Не удалось выполнить регистрацию',
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
  formRef.value?.validate().then(() => {
    mutate({
      data: {
        username: formState.username || '',
        password: formState.password || '',
      },
    })
  })
}

const validateUsername = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Введите логин'))
  } else if (isValidUsername(value)) {
    return Promise.resolve()
  }
  return Promise.reject(new Error('Логин должен быть длиной от 8 символов'))
}

const validatePassword = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Введите пароль'))
  } else if (isValidPassword(value)) {
    return Promise.resolve()
  }
  return Promise.reject(
    new Error('Пароль должен быть длиной от 8 символов, иметь минимум 1 заглавную букву и 1 цифру'),
  )
}

const validateConfirm = async (_rule: Rule, value: string) => {
  if (!value) {
    return Promise.reject(new Error('Пожалуйста подтвердите пароль'))
  } else if (formState.password === value) {
    return Promise.resolve()
  }
  return Promise.reject(new Error('Пароли не совпадают'))
}

const rules: Record<string, Rule[]> = {
  username: [
    {
      required: true,
      validator: validateUsername,
      trigger: ['change', 'blur'],
    },
  ],
  password: [
    {
      required: true,
      validator: validatePassword,
      trigger: ['change', 'blur'],
    },
  ],
  confirm: [
    {
      required: true,
      validator: validateConfirm,
      trigger: ['change', 'blur'],
    },
  ],
}
</script>

<template>
  <a-form
    ref="formRef"
    :model="formState"
    :rules="rules"
    layout="vertical"
    name="basic"
    auto-complete="off"
    @finish="onSubmit"
  >
    <a-flex vertical gap="middle">
      <div>
        <a-form-item label="Логин" name="username">
          <a-input v-model:value="formState.username" />
        </a-form-item>
        <a-form-item label="Пароль" name="password">
          <a-input-password v-model:value="formState.password" />
        </a-form-item>
        <a-form-item label="Подтверждение пароля" name="confirm">
          <a-input-password v-model:value="formState.confirm" />
        </a-form-item>
      </div>
      <a-flex justify="center">
        <a-form-item>
          <a-button html-type="submit" size="large" type="primary"> Зарегистрироваться </a-button>
        </a-form-item>
      </a-flex>
    </a-flex>
  </a-form>
</template>
