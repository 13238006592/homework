<template>
  <div id="app">
    <div v-for="(item, index) in open" :key="item.FID" class="typeOneContener">
      <p class="title">{{ index + "." + item.FTitle }}</p>
      <div v-for="(el, i) in item.FOption.split(';')" :key="i">
        <input
          :label="el"
          placeholder="introduction"
          type="textarea"
          rows="1"
          v-model="item['FAnswer'][i]"
        />
      </div>
      <button @click="click">log</button>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      open: [],
    };
  },
  mounted() {
    this.open = [
      {
        FID: 1,
        FTitle: "食堂饭菜很好吃",
        FOption: "同意;非常同意",
        FAnswer:[]
      },
    ];
  },
  methods:{
    click(){
      console.log(this.open)
    }
  }
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
