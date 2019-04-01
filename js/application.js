const json = {
  "string": "This is a string",
  "test": {element:"random", fries: "potato"},
  "It's an array": [
    {
      "lol": "pwet",
      "banana": 4,
      "isFruit": true
    },
    {
      "otherElement": {
        "i am another element": "yup"
      },
      "expect": "nothing"
    }
    
  ]
};



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
                  aria-controls="contentIdForA11y1"
                  @click="node.isOpen = !node.isOpen">{{ node.isOpen? '-' : '+' }}</button>
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
                    isOpen: false,
                    children: [
                      {
                        label: "A cool sub-folder 1",
                        isOpen: false,
                        children: [
                          { label: "A cool sub-sub-folder 1",  isOpen: false, children : [{label: "test"}] },
                          { label: "A cool sub-sub-folder 2", children: "value", isError:true }
                        ]
                      },
                      { label: "This one is not that cool" }
                    ]
                  },
                tree2 : {}
            }
        },
        methods: {
          customTree(){
            this.tree2 = createJsonToArray(json, "results");
            return this.tree2;
          }
        }
    }

const app = new Vue(example)

app.$mount('#app')





function createJsonToArray(json, name){
  var element = {};

  element.label = name;
  element.children = convert_to_array_json(json);
  element.isOpen = false;

  return element;
}



function convert_to_array_json(json){

  
  var json_result = [];

  for(var item in json){

    var element = {};
    element.label = item;
    element.children = json[item];
    element.isOpen = false;

    if(Array.isArray(json[item])){

      element.children = [];

      for(var i=0; i< json[item].length; i++){
        var ele = {};
        ele.label = ""+i;
        ele.children = convert_to_array_json(json[item][i]);
        ele.isOpen = false;

        element.children.push(ele);
      }
      
    } else if(isNaN(element.children) && !(typeof element.children === 'boolean' || element.children instanceof Boolean) &&!(typeof element.children === 'string' || element.children instanceof String) ){
        element.children = convert_to_array_json(element.children);
  }
    

    json_result.push(element);
  }

  return json_result;
}

      
