<template>
<div class="wrapper">
  <SearchBarComponent :contacts="contacts"  @filterByName="getfilteredContacts"/>
  <div class="wrapper-content">
    <div class="container">
      <ContactTabWrapperComponent>
       <ContactTabComponent :contacts="filteredContacts" :title="allTabText"></ContactTabComponent>
       <ContactTabComponent :contacts="getContacsList(titletext)" :title="titletext" v-for="titletext in alphabeticTabTitles" :key="titletext"></ContactTabComponent>
      </ContactTabWrapperComponent>
    </div>
  </div>
</div>
</template>

<script>
import ContactTabComponent from '@/components/ContactTabComponent.vue'
import ContactTabWrapperComponent from '@/components/ContactTabWrapperComponent.vue'
import SearchBarComponent from '@/components/SearchBarComponent.vue'
import { getContacts } from '@/services/contacts.sevice'
import { onMounted, ref } from 'vue'

export default {
  components: {
    ContactTabComponent,
    ContactTabWrapperComponent,
    SearchBarComponent
  },
  setup () {
    const contacts = ref([])
    const allTabText = 'All'
    const filteredContacts = ref([])
    const alphabeticTabTitles = ['c', 'b', 'a', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'].sort((a, b) => {
      if (a > b) return 1
      else return -1
    }).map(letter => letter.toUpperCase())

    const getfilteredContacts = (names) => {
      filteredContacts.value = names
    }
    const getContacsList = (letter) => {
      return filteredContacts.value.filter(contact => contact.name.first.startsWith(letter))
    }
    const fetchContacnts = async () => {
      try {
        filteredContacts.value = contacts.value = await getContacts()
      } catch (error) {
        console.log(error)
      }
    }
    onMounted(async () => {
      await fetchContacnts()
    })

    return {
      alphabeticTabTitles, contacts, getContacsList, allTabText, filteredContacts, getfilteredContacts
    }
  }
}
</script>

<style lang="scss">
.container {
  padding: 0 20px;
}
@media screen and (max-width: 580px) {
  .wrapper {
    padding: 0;
    overflow: hidden;
  }

  .wrapper-content {
    display: block;
  }
  .container {
    padding: 0 10px;
  }
}
</style>
