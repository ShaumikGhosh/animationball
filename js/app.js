var lotteryNumbers = []
var lotteryItems = []
var ticketItems=[]
var li = 0;
var totalItem = 80;

var pickedValue = [];

$(document).ready(function() {
    for (var i = 1; i <= totalItem; i++) {
        lotteryItems.push(i)
        $("#ball-element").append("<div class='ball' id='ball" + i + "'>" + i + "</div> ")
        if(i==totalItem){
            lotteryNumbers=getRanItems(lotteryItems,5)
        }
    }
    getTicketItems()
});

$('#buttonClick').click(function() {
    $(this).attr('disabled','true')
    doLottery()
});


function doLottery() {

    if(li<lotteryNumbers.length){
        x = $('#ball' + lotteryNumbers[li]).position().left;
        y = $('#ball' + lotteryNumbers[li]).position().top;
        x1 = $('#image1').position().left;
        y1 = $('#image1').position().top;
        $('#image1').addClass('animate show-ball');
      
        setTimeout(function() {
            $("#image1").animate({
                    left: x-95,
                    top: y-100
                })
           $('#image1').css('animation', 'second 1s linear forwards');      
        }, 800)
        setTimeout(function() {
            $('#image1').css('opacity', 0)
            $('#ball' + lotteryNumbers[li]).addClass('active');
            $('#ball' + lotteryNumbers[li]).addClass('scatter');
        }, 1200)
        setTimeout(function() {
            $('#ball2').removeClass('scatter')
            $('#image1').removeClass('animate show-ball')
            $('#image1').removeAttr('style')
            li++;
            doLottery()
        }, 1500)
    }else{
        window.location.href="./page-3.html"
    }
  
}

$('#resetClick').click(function() {
    window.location.reload();
});

function getRanItems(arr,count){
    for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), 
    x = arr[--i], arr[i] = arr[j], arr[j] = x);
    return arr.slice(0,count);
}


$('#quickPick').click(function() {
    if($(this).is(':checked')){
        let ranData=getRanItems(ticketItems,10)
        $('input[name="ticket_items[]"]').each(function() { 
            this.checked = false;
		});
        for (var i = 0; i <= ranData.length; i++) {
            $('input:checkbox[name="ticket_items[]"][value="'+ranData[i]+'"]').prop("checked", true)
        }
        localStorage.setItem('quick-picked', ranData);
        if(localStorage.getItem('picked-value')){
            localStorage.removeItem('picked-value');
        }
    }else{
        $('input[name="ticket_items[]"]').each(function() { 
			this.checked = false; 
		});
    }
   
});


function getTicketItems(){
    for (var i = 1; i <= totalItem; i++) {
        ticketItems.push(i)
        let item=i.toString().length>1?i:"0"+i.toString()
        $("#ticketBox").append(`
        <div class="ticket-box">
            <label class='ticket'>
                <input type="checkbox" name="ticket_items[]" value="${i}">
                <span>${item}</span>
            </label>
        </div>
    `)
    
    }
}
function goForDraw(){
    event.preventDefault()
    var how_many=$("input:radio[name='how_many']").is(":checked")
    var sports=$("input:radio[name='sports']").is(":checked")
    var money=$("input:radio[name='money']").is(":checked")
    var ticket_items = getSelectedTickets()

    if(how_many && sports && money && ticket_items.length){
        $('#error-message').html('')
        localStorage.setItem('picked-value',getSelectedTickets());
        if(localStorage.getItem('quick-picked')){
            localStorage.removeItem('quick-picked');
        }
        window.location.href="./page-2.html"
    }else{
      $('#error-message').html('  Unable to  procced next. Please select all sections')
    }
}

function getSelectedTickets(){
    var picked = $.map($('input[name="ticket_items[]"]:checked'), 
    function(c){return c.value; })
    return picked
}