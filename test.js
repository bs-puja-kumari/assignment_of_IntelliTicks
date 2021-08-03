
var dataController = (function(){
    var list = function(id, name, desc, size){
        this.id = id;
        this.name = name;
        this.desc = desc;
        this.size = size; 
    };

    var data = {
        allItems:{val: []}
    };
    var x;

    return {
        
        addItem: function(name, desc, size)  {
            var newItem, ID;
            if(data.allItems['val'].length > 0){
                ID = data.allItems['val'][data.allItems['val'].length - 1].id + 1;
            }else{
                ID = 0;
            }
            newItem = new list(ID, name, desc, size);

            data.allItems['val'].push(newItem);
            return newItem;
        },
        deleteItem: function(id) {
            var ids, index;
            ids = data.allItems['val'].map(function(current){
                return current.id;
            });
            index = ids.indexOf(id);
            if(index !== -1){
                data.allItems['val'].splice(index, 1);
            }
        }
    }; 
    

})();
var UIController = (function(){
    return{
        getInput: function(){
            return{
                name : document.getElementById("pro_name").value,
                desc: document.getElementById("pro_desc").value,
                size : document.getElementById("pro_size").value
            };  
        },
        addListItem: function(obj){
            var html, newhtml, element;
            element = document.querySelector(".list-view");
            html = '<div class="lists" id="%id%"><h3>%name%</h3><p>%desc%</p><p>%size%</p><button id="del" class="in-btn">X</button></div>';

            newhtml = html.replace('%id%', obj.id);
            newhtml = newhtml.replace('%name%', obj.name);
            newhtml = newhtml.replace('%desc%', obj.desc);
            newhtml = newhtml.replace('%size%', obj.size);

            element.insertAdjacentHTML('beforeend', newhtml);
        },
        deleteListItem: function(selectorID){
            var el = document.getElementById(selectorID);
            el.parentNode.removeChild(el);

        },
        clearFields: function() {
            document.getElementById("pro_name").value = "";
            document.getElementById("pro_desc").value = "";
            document.getElementById("pro_size").value = "";
            document.querySelector(".input-view").style.display = "none";  
        }
    };
})();

var controller = (function(dataController, UIController){
    var showBox = function(){
        document.getElementById("submit").style.display = "inline-block";
        document.querySelector(".input-view").style.display = "block";

    }
    var ctrlAddItem = function() {
        var input, newItem;
        // Get Input Data
        input = UIController.getInput();
        if(input.name.trim() !== "" && input.desc.trim() !== "" && input.size.trim() !== ""){
            //Add Item to dataController
            newItem = dataController.addItem(input.name, input.desc, input.size);

            //Add into UI
            UIController.addListItem(newItem);
            
            //Clear Input Field & Hide it
            UIController.clearFields();
        }else{
            document.querySelector(".req").style.display = "block";
            setTimeout(function(){
                document.querySelector(".req").style.display = "none";
            }, 3000);
        }
       
    };
    var ctrlProcess = function(event){
        var itemID;
        //Delete Process
        if(event.target.id === 'del'){
            itemID = parseInt(event.target.parentNode.id);
            x = itemID;
            if(itemID>=0){
                ctrlDeleteItem(itemID);
            }
        } 
           

    };
    var ctrlDeleteItem = function(itemID){
        //delete item from data
        dataController.deleteItem(itemID);
        //delete item from ui
        UIController.deleteListItem(itemID);

    };
    
    document.querySelector(".list-view").addEventListener('click', ctrlProcess);
    document.querySelector(".add_btn").addEventListener('click', showBox);   
    document.getElementById("submit").addEventListener('click', ctrlAddItem);


})(dataController, UIController);
