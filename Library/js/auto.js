$("#TeklifBaslik").autocomplete({


    source: function (request, response) {
        $.ajax({
            url: "https://www.etstur.com/etsmvc/complete?",
            data: { q: request.term },
            success: function (data) {
                var ShareInfoLength = data["suggestions"].length;
                var transformed = [];
                for (var i = 0; i < ShareInfoLength; i++) {
                    transformed.push(data["suggestions"][i].value);
                }
                response(transformed);
            },
            error: function () {
                response([]);
            }
        });
    }
})