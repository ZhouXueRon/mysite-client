<template>
  <div class="test-container">
    <RightList :list="list" @select="handleSelect" />
  </div>
</template>

<script>
import RightList from "./";
export default {
  components: {
    RightList,
  },
  data() {
    return {
      list: [
        { name: "a", selected: false },
        {
          name: "b",
          selected: true,
          children: [
            { name: "b-1", selected: false },
            {
              name: "b-2",
              selected: false,
              children: [
                { name: "b-2-1", selected: false },
                { name: "b-2-2", selected: false },
                { name: "b-2-3", selected: false },
                { name: "b-2-4", selected: false },
              ],
            },
            { name: "b-3", selected: false },
            { name: "b-4", selected: false },
            { name: "b-5", selected: false },
          ],
        },
        { name: "c", selected: false },
        { name: "d", selected: false },
        { name: "e", selected: false },
      ],
    };
  },
  methods: {
    handleSelect(item) {
      console.log(item);
    },
  },
};
</script>

<style>
</style>