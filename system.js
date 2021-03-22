// $(document).ready() is deprecated.
$(function(){
    console.log("Page Ready");

    
    $("#ajax-list button").on("click", (event) => {
        /* What is this? */
        event.preventDefault();

        /* List Students */
        $.post("./list", (data) => {
            $("#list-body").empty();
            $.each(JSON.parse(data), function(index, val){
                $("#list-body").append(`${index}: ${val}<br>`);
            });
        });
    });
});