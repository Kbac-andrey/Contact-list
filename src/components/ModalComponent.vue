<template>
  <transition name="modal-fade">
    <div class="modal-overlay" @click="closeModal">
      <div class="modal" @click.stop>
        <section class="contact-card">
          <div class="contact-card__aditional">
            <img :src="contact.picture.large" alt="Contact avatar icon" class="contact-card__aditional__image">
            <h2 class="contact-card__aditional__name">{{contact.name.title }} {{ contact.name.first }} {{ contact.name.last }}</h2>
          </div>
          <div class="contact-card__description">
              <p class="contact-preview-data">
                <img src="~/../assets/email.svg" alt="Contact email icon" class="contact-preview-data__icon" width="46" height="46">
                <span class="contact-preview-data__text">
                  {{ contact.email ? contact.email : absentInformation }}
                </span>
              </p>

              <p class="contact-preview-data">
                <img src="~/../assets/phone.svg" alt="Contact phnoe icon" class="contact-preview-data__icon" width="46" height="46">
                <span class="contact-preview-data__text">
                    {{ contact.phone ? contact.phone : absentInformation }}
                </span>
              </p>

              <p class="contact-preview-data">
                <img src="~/../assets/point.svg" alt="Contact location icon" class="contact-preview-data__icon" width="46" height="46">
                <span class="contact-preview-data__text">
                    {{ contact.location.country }}
                    {{ contact.location.city ? contact.location.city : absentInformation }}
                    {{ contact.location.postcode ? contact.location.postcode : absentInformation }}
                </span>
              </p>
          </div>
        </section>
      </div>
      <div class="close" @click="closeModal">
        <img class="close__img" src="~/../assets/close-icon.svg" alt="" />
      </div>
    </div>
  </transition>
</template>

<script>
import { toRef, onMounted, onUnmounted } from 'vue'

export default {
  props: {
    contactDetails: {
      type: Object,
      required: true
    }
  },
  emits: ['closeModal'],

  setup (props, { emit }) {
    const absentInformation = '-'
    const contact = toRef(props, 'contactDetails')

    const closeModal = () => {
      emit('closeModal')
    }
    const handleKeyup = (event) => {
      if (event.keyCode === 27) closeModal()
    }

    onMounted(() => document.addEventListener('keyup', handleKeyup))
    onUnmounted(() => document.addEventListener('keyup', handleKeyup))

    return { closeModal, contact, absentInformation }
  }
}
</script>

<style  lang="scss">
.modal-overlay {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  background-color: rgba(0, 0, 0, 0.5);
  .modal {
    text-align: center;
    background-color: #ffff;
    height: 550px;
    width: 550px;
    margin-top: 10%;
    padding: 60px 0;
    border-radius: 20px;
    background-color: #0072ce;
    box-shadow: 3px 10px 20px rgba(0, 0, 0, 0.2);
    .contact-card {
      padding: 40px 30px;
      &__aditional {
        &__image {
          width: 130px;
          height: 130px;
          margin-bottom: 20px;
          object-fit: cover;
          border-radius: 50%;
          border: 3px solid #fff
        }
        &__name  {
          color: #fff;
          font-size: 25px;
          margin-bottom: 20px;
          font-weight: 400;
        }
      }
      .contact-preview-data {
          display: flex;
          align-items: center;
          &:not(:last-child) {
            margin-bottom: 10px;
          }
          &__icon {
            margin-right: 10px;
            opacity: 0.75;
            width: 46px;
            height: 46PX;
          }
          &__text {
            color: #fff;
            font-size: 20px;
          }
      }
    }
  }
  .close {
    margin: 9% 0 0 0px;
    cursor: pointer;
    &__img {
      width: 25px;
    }
  }
}
.modal-fade-enter,
.modal-fade-leave-to {
  opacity: 0;
}
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.5s ease;
}
@media screen and (max-width: 580px) {
  .modal-overlay {
    .modal {
      height: 400px;
      width: 300px;
      margin-left: 10px;
      margin-top: 40px;
      .contact-card {
        &__aditional {
          &__image {
            width: 65px;
            height: 65px;
          }
          &__name {
            font-size: 20px;
          }
        }
        .contact-preview-data {
          &__icon {
            width: 23px;
            height: 23px;
          }
          &__text {
            font-size: 15px;
          }
        }
      }
    }
    .close {
      margin: 25px 0px 0 6px
    }
  }
}
</style>
