<template>
  <div class="container">
    <vue-tree
      style="width: 100%; min-height: 600px;"
      :dataset="richMediaData"
      :config="treeConfig"
    >
      <template v-slot:node="{ node, collapsed }">
        <div
          class="rich-media-node"
          :style="{ border: collapsed ? '2px solid black' : '' }"
        >
          <span style="padding: 4px 0; font-weight: bold;"
            >{{ node.name }}</span
          >
          <span style="padding: 4px 0; font-weight: bold;"
            >{{ node.value }}</span
          >
        </div>
      </template>
    </vue-tree>
  </div>
</template>

<script>
export default {
  name: 'treemap',
  data() {
    return {
      richMediaData: {
        name: 'James',
        value: 800,
        children: [
          {
            name: 'Bob',
            value: 400,
            children: [
              {
                name: 'C1',
                value: 100
              },
              {
                name: 'C2',
                value: 300
              },
              {
                name: 'C3',
                value: 200
              }
            ]
          },
          {
            name: 'Smith',
            value: 200,
            children: [
              {
                name: 'S1',
                value: 230,
                children: [
                  {
                    name: 'C1',
                    value: 100
                  },
                  {
                    name: 'C2',
                    value: 300
                  },
                  {
                    name: 'C3',
                    value: 200
                  }
                ]
              }
            ]
          },
          {
            name: 'Jackson',
            value: 300
          }
        ]
      },
      treeConfig: { nodeWidth: 200, nodeHeight: 80, levelHeight: 200 }
    }
  }
}
</script>

<style scoped>
.rich-media-node {
  min-width: 120px;
  padding: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #000;
  background-color: #fff;
  border: 1px solid #000;
  border-radius: 4px;
}
</style>