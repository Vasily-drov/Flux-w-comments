const getState = ({ getStore, getActions, setStore }) => {



  function getFetch() {
    fetch("https://assets.breatheco.de/apis/fake/todos/user/steven12", { // Fetch from API on a server
      method: "GET", // Pick a method for request (Can be PUT POST DELETE GET)
      headers: { // Headen part of the request have to have content type header
        "Content-Type": "application/json", 
      },
    })
      .then((resp) => { // Wait for response once there is response
        //console.log(resp)
        //console.log(resp.ok); // console log atribute ok of the response 
        //console.log(resp.status); // console log atribute status of the response
        //console.log('FIRST PART IS DONE')
        return resp.json(); // return respons as JSON file
      })
      .then((data) => { //take response
        //console.log('DATA: ')
        //console.log(data)
        const tasks = data.map((item, index) => { //map throught it
          return item.label; //and return labels

        });
        setStore({ fetchTasks: [...tasks] }); // filling fetchTasks array in the store with result of map above
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return {
    store: {
      demo: [
        {
          title: "FIRST",
          background: "white",
          initial: "white",
        },
        {
          title: "SECOND",
          background: "white",
          initial: "white",
        },
      ],
      list: [],
      fetchTasks: [],
    },
    actions: {
      // Use getActions to call a function within a fuction
      exampleFunction: () => {
        getActions().changeColor(0, "green");
      },
      loadSomeData: () => { 
        // FETCH DATA

        getFetch()
        /**
					  fetch().then().then(data => setStore({ "foo": data.bar }))
				  */
      },
      changeColor: (index, color, todo) => {
        //get the store
        const store = getStore();

        //we have to loop the entire demo array to look for the respective index
        //and change its color
        const demo = store.demo.map((elm, i) => {
          if (i === index) elm.background = color;
          return elm;
        });
        //reset the global store
        setStore({ demo: demo });
      },

      todoList: (todo) => {
        const store = getStore();
        const appendList = {
          label: todo,
          done: false,
        };
        setStore({ list: [...store.list, appendList] });

        fetch("https://assets.breatheco.de/apis/fake/todos/user/steven12", {
          method: "PUT",
          body: JSON.stringify(store.list),
          headers: {
            "Content-Type": "application/json",
          },
        })
          .then((resp) => {
            console.log(resp.ok);
            console.log(resp.status);
            return resp.json();
          })
          .then((data) => {
            console.log(data);
            getFetch();
          })
          .catch((error) => {
            console.log(error);
          });
      },
      deleteTask: (id) => {
        const store = getStore();
        setStore({
          list: store.list.filter((item, index) => {
            return index != id;
          }),
        });
        setStore({
          fetchTasks: store.fetchTasks.filter((item, index) => {
            return index != id;
          }),
        });
      },
      deleteAllTasks: () => {
        const store = getStore();
        setStore({
          list: store.list.filter((item, index) => {
            return null;
          }),
        });
        setStore({
          fetchTasks: store.fetchTasks.filter((item, index) => {
            return null;
          }),
        });
      },
    },
  };
};

export default getState;
