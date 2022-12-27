<template>
<section class="search-container">
 <input type="text" v-model="inputSearch" @input="filterByName" :placeholder="searchPlaceholderText" class="search-input" />
</section>
</template>

<script>
import { ref, toRef } from 'vue'

export default {
  props: {
    contacts: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    }
  },
  emits: ['filterByName'],
  setup (props, { emit }) {
    const inputSearch = ref('')
    const searchPlaceholderText = 'Search...'
    const contactsList = toRef(props, 'contacts')

    const filterByName = () => {
      emit('filterByName', contactsList.value.filter((contact) => contact.name.first.toLowerCase().includes(inputSearch.value.toLowerCase())))
    }

    return { contactsList, searchPlaceholderText, inputSearch, filterByName }
  }
}
</script>

<style lang="scss">
  .search-container {
    display: flex;
    justify-content: center;
    .search-input {
      margin-top: 40px;
      padding: 5px;
      border: 4px solid #2980b9;
      border-radius: 10px;
      outline: none;
      font-size: 15px;
      background: none;
      color: #ffffff;
      &::placeholder {
        color: #ffffff;
        font-size: 15px;
        text-transform: capitalize;
      }
    }
  }
</style>
