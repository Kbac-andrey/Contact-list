<template>
  <nav class="tabs" role="navigation">
    <ul class='tabs__header'>
      <li v-for="title in tabTitles" :key="title" @click="selectTitle = title" :class="{selected: title === selectTitle}">
        {{ title }}
      </li>
    </ul>
    <slot />
  </nav>
</template>

<script>
import { ref, provide } from 'vue'

export default {
  setup (props, { slots }) {
    const tabTitles = ref(slots.default().flatMap((tab) => {
      if (tab.props) {
        return tab.props.title
      } else {
        return tab.children.map(item => {
          return item.props.title
        })
      }
    }))
    const selectTitle = ref(tabTitles.value[0])

    provide('selectTitle', selectTitle)

    return {
      tabTitles, selectTitle
    }
  }
}

</script>

<style lang="scss">
  .tabs {
    margin: 0 auto;
    &__header {
      margin-bottom: 20px;
      display: flex;
      li {
        width: 100px;
        padding: 3px;
        text-align: center;
        background-color: rgba(221, 221, 221, 0.5137254902);
        border-radius: 10px;
        cursor: pointer;
        color: #ffffff;
        transition: 0.5s all ease-out;
      }
      li.selected {
        background-color: #0984e3;
        color: #ffffff;
      }
    }
  }
  @media screen and (max-width: 580px) {
    .tabs__header li {
      font-size: 9px;
      padding: 10px 2px;
    }
  }
</style>
