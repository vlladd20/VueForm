<template>
    <form @submit.prevent="handleSubmit">
      <div class="form_group" @input="v$.surnameData.$touch()">
        <label>Фамилия*: </label>
        <input type="text" placeholder="Введите фамилию" v-model="form.surnameData" id="surnameData" @input="filterStr()">
        <span class="error1" v-if="v$.surnameData.$dirty == false">Обязательное поле</span>
        <!-- <span v-if="v$.surnameData.$error">{{ v$.surnameData.$errors[0].$message }}</span> -->

        <!-- <span class="error1" v-if="v$.surnameData.$error <= 1"> Минимальное кол-во символов 3</span> -->
      </div>

      <div class="form_group" @input="v$.nameData.$touch()">
      <label>Имя*: </label>
        <input type="text" placeholder="Введите имя" v-model="form.nameData" @input="filterStr()">
        <span class="error1" v-if="v$.nameData.$dirty == false">Обязательное поле</span>

      </div>

      <div class="form_group" @input="v$.dadnameData.$touch()">
        <label>Отчество: </label>
        <input type="text" placeholder="Введите отчество" v-model="form.dadnameData" @input="filterStr()">
        <span class="error1" v-if="v$.dadnameData.$error">Error</span>

      </div>

      <div class="form_group" @input="v$.birthdayData.$touch()">
        <label>Дата рождения*: </label>
        <input type="date" v-model="form.birthdayData">
        <span class="error1" v-if="v$.birthdayData.$dirty == false">Выберите дату рожения(Обязательное поле)</span>
      </div>

      <div class="form_group" @input="v$.telData.$touch()">
        <label>Номер телефона*: </label>
        <input type="tel" placeholder="+7" v-model="form.telData" maxlength="12" @keydown="preventDeletion">
        <span class="error1" v-if="v$.telData.$dirty == false">Введите номер телефона(Обязательное поле)</span>
      </div>

      <div class="form_group">
        <label>Пол: </label>
        <label><input type="radio" class="gen" name="pol" value="М" v-model="form.gender">Мужской</label>
        <label><input type="radio" class="gen" name="pol" value="Ж" v-model="form.gender">Женский</label>
      </div>

      <div class="form_group" @input="v$.multiselectData.$touch()">
      <label>Выберите кто вы*:</label>
        <select multiple size="3" v-model="form.multiselectData" name="multiselectData" id="" :class="status(v$.multiselectData)">
        <option value="vip">VIP</option>
        <option value="problem">Проблемный</option>
        <option value="oms">ОМС</option>
      </select>
      <span class="error1" v-if="v$.multiselectData.$dirty == false">Выберите кто вы</span>
      </div>

      <div class="form_group">
      <label>Лечащий врач:</label>
        <select v-model="form.doctor">
        <option value="ivanov">Иванов</option>
        <option value="zaharov">Захаров</option>
        <option value="chernish">Чернышева</option>
      </select>
      </div>

      <div class="form_group">
      <label>Не отправлять СМС:</label>
      <input type="checkbox" v-model="form.noSms">
      </div>
      <br>
      <label>Адрес:</label>

      <div class="form_group" @input="v$.indexData.$touch()">
      <label>Введите индекс:</label>
      <input type="text" maxlength="6" placeholder="123456" v-model="form.indexData" @input="filterStr()">
      <span class="error1" v-if="v$.indexData.$error">Error</span>
      </div>

      <div class="form_group" @input="v$.countryData.$touch()">
      <label>Введите страну:</label>
      <input type="text" placeholder="Введите страну" v-model="form.countryData" @input="filterStr()">
      <span class="error1" v-if="v$.countryData.$error">Error</span>
      </div>

      <div class="form_group" @input="v$.oblData.$touch()">
      <label>Введите область:</label>
      <input type="text" placeholder="Введите область" v-model="form.oblData" @input="filterStr()">
      </div>
      
      <div class="form_group" @input="v$.cityData.$touch()">
      <label>Введите город*:</label>
      <input type="text" placeholder="Введите город" v-model="form.cityData" @input="filterStr()">
      <span class="error1" v-if="v$.cityData.$dirty == false">Введите город(Обязательное поле)</span>
      {{ cityData }}
      </div>

      <div class="form_group" @input="v$.streetData.$touch()">
      <label>Введите улицу:</label>
      <input type="text" placeholder="Введите улицу" v-model="form.streetData" @input="filterStr()">
      </div>

      <div class="form_group" @input="v$.homenumData.$touch()">
      <label>Введите дом:</label>
      <input type="text" placeholder="Введите дом" v-model="form.homenumData" @input="filterStr()">
      </div>

      <br>

      <label>Паспортные данные:</label>
      <br>


      <div class="form_group" @input="v$.typepassData.$touch()">
      <label>Тип документа*:</label>
        <select v-model="form.typepassData" name="typepassData" id="" :class="status(v$.typepassData)">
        <option value="pass">Паспорт</option>
        <option value="sved">Свидетельство о рождении</option>
        <option value="vod">Вод. удостоверение</option>
      </select>
      <span class="error1" v-if="v$.typepassData.$dirty == false">Выберите тип документа(Обязательное поле)</span>
      </div>

      <div class="form_group">
      <label>Серия:</label>
      <input type="text" placeholder="Введите серию" v-model="form.series">
      </div>

      <div class="form_group">
      <label>Номер:</label>
      <input type="text" placeholder="Введите номер" v-model="form.number">
      </div>


      <div class="form_group">
      <label>Кем выдан:</label>
      <input type="text" placeholder="Введите кем выдан" v-model="form.issueBy">
      </div>


      <div class="form_group" @input="v$.dateofissueData.$touch()">
      <label>Дата выдачи*:</label>
      <input type="date" v-model="form.dateofissueData" >
      <span class="error1" v-if="v$.dateofissueData.$dirty == false">Выберите дату выдачи документа(Обязательное поле)</span>
      </div>

      

      <button type="submit">Отправить</button>
    </form>
    
  </template>

<script setup>
import { reactive,computed } from 'vue';
import { useVuelidate } from '@vuelidate/core'
import { required, minLength, maxLength, numeric } from '@vuelidate/validators'

  const form = reactive({
    surnameData: '',
    nameData: '',
    err: '',
    dadnameData: '',
    indexData: '',
    countryData: '',
    oblData: '',
    cityData: '',
    streetData: '',
    homenumData: '',
    telData: '+7',
    initialText: '+7',
    birthdayData: '',
    dateofissueData: '',
    gender: '',
    doctor: '',
    noSms: '',
    series: '',
    number: '',
    issueBy: ''
})  

    const rules = computed(() => {
      return{
      surnameData: { required, minLength: minLength(2)},
      nameData: { required, minLength: minLength(2)},
      dadnameData: {  },
      indexData : { minLength: minLength(6)},
      countryData : { minLength: minLength(3)},
      oblData : {  },
      cityData : { required, minLength: minLength(3)},
      streetData : { minLength: minLength(3)},
      homenumData : {  minLength: minLength(3)},
      typepassData : { required},
      multiselectData : { required},
      telData: {required, minLength: minLength(12)},
      birthdayData: {required},
      dateofissueData: {required},
      gender: {},
      doctor: {},
      noSms:{},
      series:{},
      number:{},
      issueBy:{}
    }
  })

  const v$ = useVuelidate(rules, form)

  async function handleSubmit() {
  // Validate the form fields
  const result = await v$.value.$validate()
  if (!result) {
    // If there are errors in the form, show an alert indicating that the form is invalid
    alert('Заполните обязательные поля или проверьте правильно ли введины данные')
    return
  }
  // If the form is valid, perform some action with the form data
  alert('Пользователь зарегистрирован')
}

    function status(validation) {
        return {
        error: validation.$error,
        dirty: validation.$dirty
      }
    }

    function preventDeletion(event) {
      if ((event.code === 'Backspace' || event.code === 'Delete') && form.telData === form.initialText) {
        event.preventDefault();
      }
    }

    function filterStr() {
			form.surnameData = form.surnameData.replace(/[^a-zа-яё\s]/gi, "");
      form.nameData = form.nameData.replace(/[^a-zа-яё\s]/gi, "");
      form.dadnameData = form.dadnameData.replace(/[^a-zа-яё\s]/gi, "");
      form.countryData = form.countryData.replace(/[^a-zа-яё\s]/gi, "");
      form.oblData = form.oblData.replace(/[^a-zа-яё\s]/gi, "");
      form.cityData = form.cityData.replace(/[^a-zа-яё\s]/gi, "");
      form.streetData = form.streetData.replace(/[^a-zа-яё\s]/gi, "");
      form.homenumData = form.homenumData.replace(/[^a-zа-яё\s]/gi, "");
      form.telData = form.telData.replace(/[^0-9+]/g, '');
      
      if (!/^\d+$/.test(form.indexData)) {
				form.indexData = form.indexData.replace(/[^\d]/g, '');     
  }
  if (form.telData.startsWith('+')) {
    if (!/^\+\d*$/.test(form.telData)) {
      form.telData = form.telData.replace(/[^\+\d]/g, '');
    }
  } else {
    if (!/^\d*$/.test(form.telData)) {
      form.telData = form.telData.replace(/[^\d]/g, '');
    }
  }
}

</script>

<style scoped>
  

  
</style>