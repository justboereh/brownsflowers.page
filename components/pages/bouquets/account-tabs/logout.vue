<script setup>
const authCookie = useCookie('.auth_brownsflowers')
authCookie.value = null

useRouter().push('/account/login')
</script>

<template></template>
