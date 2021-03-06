// $(document).ready() is deprecated.
$(function(){
    console.log("Page Ready");

    
    $("#ajax-list button").on("click", (event) => {
        event.preventDefault();

        /* List Students */
        $.get("./list", (data) => {
            updateListDiv(data);
        });
    });

    $("#ajax-search button").on("click", (event) => {
        event.preventDefault();
        
        /* Request search */
        const id = $("#search-id").val();
        $.post("./search", {
            id: id
        }, (data) => {
            if(data.found){
                $("#search-respond").html(`<h2>Hello, ${data.name}!</h2>`);   
            }
            else{
                $("#search-respond").html(`<h3>Sorry, ${id} doesn't exist.</h3>`);
            }
        });
    });

    $("#ajax-add button").on("click", (event) => {
        event.preventDefault();

        /* Request add */
        $.post("./add", {
            id: $("#add-id").val(),
            name: $("#add-name").val()
        }, (data) => {
            updateListDiv(data);
        });
    });

    $("#ajax-delete button").on("click", (event) => {
        event.preventDefault();

        /* Request delete */
        $.post("./delete", {
            id: $("#delete-id").val()
        }, (data) => {
            updateListDiv(data);
        });
    });
});

function updateListDiv(data){
    $("#list-respond").empty();
    $.each(JSON.parse(data), function(index, val){
        $("#list-respond").append(`${index}: ${val}<br>`);
    });
}