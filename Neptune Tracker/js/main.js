var authToken;

$.ajax({
    type: "POST",
    url: 'https://neptunes-pride-api.herokuapp.com/login',
    data: "username=Trossachs&password=4dm1n123",
    dataType: 'json',
    success: function (data) {
        console.log(data);
        console.log("auth Token: " + data["auth-token"]);
        authToken = data["auth-token"];
        GetPlayerData(authToken);
    }
});

function GetPlayerData(authToken) {

    $.ajax({
        type: "GET",
        url: 'https://neptunes-pride-api.herokuapp.com/games/5120324403724288/players',
        headers: { 'X-Auth-Token': authToken },
        dataType: 'json',
        success: function (data) {
            console.log(data);
            for (var i = 0; i < data["result"].length; i++) {
                AppendtoElement("#players", data["result"][i]["name"],
                                            data["result"][i]["totalStars"],
                                            data["result"][i]["totalCarriers"],
                                            data["result"][i]["totalShips"],
                                            data["result"][i]["totalEconomy"],
                                            data["result"][i]["totalIndustry"],
                                            data["result"][i]["totalScience"],
                                            data["result"][i]["ready"]
                                            );

            }
        }
    });
   
}

function AppendtoElement(id, name, stars, carriers, ships,economy,industry,science,ready) {
    $(id).append(
           '<div class="container">'+
            '<div class="name ">'+name+'</div>'+
           '<ul class="left">'+
                '<li>Stars : '+ stars+'</li>'+
                '<li>Carriers :'+ carriers+'</li>'+
                '<li>Ships: '+ships+'</li>'+
            '</ul>'+
            '<ul class=left>'+
                '<li>Economy : '+economy+'</li>'+
                '<li>Industry : '+industry+'</li>'+
                '<li>Science : '+science+'</li>'+
            '</ul>'+
            '<div class="clearfix"></div>'+
            '<div class="'+ready+'"></div>'+
        '</div>'
    );

}
//curl -X POST https://neptunes-pride-api.herokuapp.com/login --data 'username=YOUR_USERNAME&password=YOUR_PASSWORD'
// https://neptunes-pride-api.herokuapp.com/games/5120324403724288/players