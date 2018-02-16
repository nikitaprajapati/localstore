
// Initialize your app
var myApp = new Framework7({
    modalTitle: 'My App',
 
    // If it is webapp, we can enable hash navigation:
    pushState: true,
    material:true,
    popover: {
    closeByBackdropClick: true,
  },

    // Hide and show indicator during ajax requests
    onAjaxStart: function (xhr) {
        myApp.showIndicator();
    },
    onAjaxComplete: function (xhr) {
        myApp.hideIndicator();
    }

});


// Export selectors engine
var $$ = Dom7;

// Add view
var mainView = myApp.addView('.view-main', {
    // Because we use fixed-through navbar we can enable dynamic navbar
   // dynamicNavbar: true,
    domCache: false // write by Nikita
});

$( document ).ready(function() {  
    check_connection_save();
 });
 




function localsave_fun(){
    alert('call');
    var si_username= window.localStorage.getItem("local_data");
    var form = $(".localsave").serialize()+ '&' +si_username;
    var base_url='http://starprojects.in/myci/welcome/';
    //var arr=[];
    //alert($(".total_crates").html());
   // var si_username= window.localStorage.getItem("local_data");
    
   var networkState = navigator.connection.type;
    //alert(networkState);
   // arr.push(form);
 //arr.push(JSON.stringify(form));
     
    if(networkState!='none')
    {  
         // window.localStorage.setItem("local_data", form); 
          $$.ajax({
             type: 'POST',
             url  : base_url+'localsave_fun',
             data: form,
             cache: false,
             success: function(res) {
                
                   
                    //                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  ('success');
                    $('input').val();
                    mainView.loadPage("index.html");
                    
                 
                 
              }
            });

    }else{
        //alert('Save In Local');
        window.localStorage.setItem("local_data", form);
        $('input').val();
        mainView.loadPage("index.html");
    }
    //var si_username = window.localStorage.getItem("local_data");
    //alert(si_username);
}


function check_connection_save(){
    var networkState = navigator.connection.type;
    var base_url='http://starprojects.in/myci/welcome/';
    var si_data= window.localStorage.getItem("local_data");
    if(si_data!=null)
    { 
       
        if(networkState!='none'){
        //alert("session"+si_data);
        $$.ajax({
             type: 'POST',
             url  : base_url+'localsave_fun',
             data: si_data,
             cache: false,
             success: function(res) {
                
                if(res!=""){
                 //  alert('save');
                  //  console.log(res);
                  window.localStorage.removeItem("local_data");
                    $('.localdb').html('Local Data Save In DB');
                    mainView.loadPage("index.html");
                 }
                 
              }
            });
    }

    }else{
         $('.localdb').html('');
    }
}


window.setInterval(function(){
check_connection_save();
},5000);
