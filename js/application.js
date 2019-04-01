// ---------------- VIEW.JS -------------------
Vue.use(Buefy.default);

Vue.component('node-tree', {
    template: `
          <li class="node-tree">
            <b-field grouped v-if="(node.children && Array.isArray(node.children)) || !node.children">
              <p class="control">{{ node.label }}</p>
              <p class="control">
              <div v-if="node.children && Array.isArray(node.children)">
                <b-collapse :open="false" aria-id="contentIdForA11y1">
                  <button
                  class="button is-primary is-small"
                  slot="trigger"
                  aria-controls="contentIdForA11y1">+</button>
                    <ul v-if="node.children.length">
                        <node-tree v-for="child in node.children" :node="child"></node-tree>
                    </ul>
                </b-collapse>
            </div>
            </p>
            </b-field>
            <b-field v-else :class="(() => (node.isError? 'has-text-danger' : ''))()">
              {{ node.label }} : {{ node.children }}
            </b-field>
          </li>
   `
  , props:['node']})






  Vue.component('tree', {
    template: `
    <div class="tree">
      <ul class="tree-list">
        <node-tree :node="treeData"></node-tree>
      </ul>
    </div>
  `
  , props:['treeData']
  })




    const example = {
        data() {
            return {
                tree: {
                    label: "A cool folder",
                    children: [
                      {
                        label: "A cool sub-folder 1",
                        children: [
                          { label: "A cool sub-sub-folder 1", children : [{label: "test"}] },
                          { label: "A cool sub-sub-folder 2", children: "value", isError:true }
                        ]
                      },
                      { label: "This one is not that cool" }
                    ]
                  }
            }
        },
        methods: {
          
        }
    }

const app = new Vue(example)

app.$mount('#app')
            
