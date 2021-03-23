// $(document).ready() is deprecated.
$(function(){
    console.log("Page Ready");

    
    $("#ajax-list button").on("click", (event) => {
        /* What is this? */
        event.preventDefault();

        /* List Students */
        $.get("./list", (data) => {
            $("#list-body").empty();
            $.each(JSON.parse(data), function(index, val){
                $("#list-body").append(`${index}: ${val}<br>`);
            });
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
            id: ,
            name: 
        }, (data) => {
            // Refresh List? 
        });
    });
});