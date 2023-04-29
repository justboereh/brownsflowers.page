<script setup>
defineEmits(['update:modelValue'])
defineProps({ modelValue: String, name: String })
</script>

<template>
    <div class="flex flex-col">
        <label :for="name" class="capitalize">{{ name }}</label>

        <input
            v-bind="$attrs"
            class="outline-none px-2 h-10 border border-light-900 hover:border-brand-purple focus:border-brand-purple flex-grow min-w-0"
            
            :name="name"
            :id="name"
            :value="modelValue"
            @input="$emit('update:modelValue', $event.target.value)"
        />
    </div>
</template>
