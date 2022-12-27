<template>
  <div class="tab" v-show="title == selectTitle">
    <div class="table">
      <div class="row header">
          <div class="cell">
            Name
          </div>
          <div class="cell">
            Registered
          </div>
          <div class="cell">
            Email
          </div>
          <div class="cell">
            Phone
          </div>
      </div>
      <div class="row" v-for="contact in contactList" :key=contact @click="selectContact(contact)">
        <div class="cell"  data-title="Name">
          {{ contact.name.first }} {{ contact.name.last }}
        </div>
        <div class="cell"  data-title="Registered">
          {{ contact.registered.age }}
        </div>
        <div class="cell"  data-title="Email">
          {{ contact.email }}
        </div>
        <div class="cell"  data-title="Phone">
          {{ contact.phone }}
        </div>
      </div>
    </div>
    <ModalComponent :contactDetails="contactDetailss" v-if="showModal" @closeModal="handlClose" />
  </div>
</template>

<script>
import ModalComponent from '@/components/ModalComponent.vue'
import { inject } from '@vue/runtime-core'
import { toRef, ref } from 'vue'

export default {
  components: {
    ModalComponent
  },
  props: {
    contacts: {
      type: Array,
      default: () => {
        return []
      },
      required: true
    },
    title: {
      type: String,
      required: true
    }
  },
  setup (props, context) {
    const selectTitle = inject('selectTitle')
    const showModal = ref(false)
    const contactList = toRef(props, 'contacts')
    const contactDetailss = ref({})

    const selectContact = (contact) => {
      contactDetailss.value = contact
      showModal.value = true
    }
    const handlClose = () => {
      showModal.value = false
    }

    return {
      selectTitle, contactList, showModal, contactDetailss, handlClose, selectContact
    }
  }
}
</script>

<style lang="scss">
.table {
  margin: 0 0 40px 0;
  width: 100%;
  box-shadow: 0 1px 3px rgba(0,0,0,0.2);
  display: table;
  .row.header {
    font-weight: 900;
    color: #ffffff;
    background: #2980b9;
  }
  .cell {
    padding: 6px 12px;
    display: table-cell;
  }
}
.row {
  display: table-row;
  background: #ffffff;
  &:nth-of-type(odd) {
    background: #e9e9e9
  }
}
@media screen and (max-width: 580px) {
  .table {
    display: block;
    .row.header {
      padding: 0;
      height: 6px;
    }
    .row.header {
      .cell {
        display: none;
      }
    }
    .row {
      padding: 14px 0 7px;
      display: block;
      .cell {
        margin-bottom: 10px;
      }
    }
    .cell {
    padding: 2px 16px;
    display: block;
      &:before {
      margin-bottom: 3px;
      content: attr(data-title);
      min-width: 98px;
      font-size: 10px;
      line-height: 10px;
      font-weight: bold;
      text-transform: uppercase;
      color: #969696;
      display: block;
      }
    }
  }
}
</style>
