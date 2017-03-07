/**
 * Created by rahulmagow on 11/02/17.
 */
function getTodos () {

    $.get('todos/get', function (data) {
        console.log(data);
        let list = "";


        for (todo of data) {
            list += "<li>"+
                "<input type='checkbox' id='" + todo.id + "' " +(todo.done?"checked ":"")+  "onchange='strikeThrough(this)'>" +
                "<span>"+todo.task+"</span>" +"<input type='checkbox' onclick='clearTodo(" + todo.id +")'>"+
                "</li>"

        }

        $('#todolist').html(list);
        for(todo of data) {
            if (todo.done === 1)
                $("#" + todo.id).next().css("text-decoration", "line-through")
            else
                $("#" + todo.id).next().css("text-decoration", "")
        }

    })

}

function strikeThrough(ele) {
   var x;
    if(ele.checked===true){
        x=1;
    }else{
        x=0;
    }
    console.log(ele);
    console.log(x);


    $.post('todos/done', {
        id: ele.id,
        val:x
        },
        function (data) {
        if(data=="success"){
            getTodos();

            // if(x==1){
            //     $("#"+todo.id).css("text-decoration", "line-through");
            //     }else{
            //         $().css("text-decoration", "");
            //     }

        }


    })

    
}

function clearTodo(id) {
  console.log("working")
   $.post('todos/clear',
       {
       id:id
   },function (data) {
      if(data=="success"){
          getTodos();
      }

       })
}



$(function () {

    getTodos();

    $("#addtodo").click(function () {

        $.post('todos/add',
            {
                task:$("#newtodo").val()

            },function (data) {
                if(data=="success"){
                    getTodos();
                }

            })
    })

    $("#clearit").click(function () {
        $.post('todos/clearall',
            {

        },function (data) {
            if(data=="success")
                getTodos();
            })
    })

});