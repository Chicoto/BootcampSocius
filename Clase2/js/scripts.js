

var peliculas = [];

function filtrarPorGenero(genero, filtro) {
    let html = ``;

    // Filtrar por género seleccionado y coincidencia en título
    let peliculasFiltro = peliculas.filter(pelicula => 
        (genero == "Todos" || genero == "" || pelicula.genre == genero) &&
        (filtro === undefined || filtro == "" || pelicula.title.toLowerCase().includes(filtro.toLowerCase()))
    );

    $.each(peliculasFiltro, function (i, pelicula) {
        html += `<div class="col mb-5">
                    <div class="card h-100">
                        <img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />
                        <div class="card-body p-4">
                            <div class="text-center">
                                <h5 class="fw-bolder">${pelicula.title}</h5>
                                ${pelicula.year}
                            </div>
                        </div>
                        <div class="card-footer p-4 pt-0 border-top-0 bg-transparent">
                            <div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">${pelicula.genre}</a></div>
                        </div>        
                    </div>
                </div>`;
    });

    $("#movieList").html(html);
}

function limpiarTodo() {
    document.getElementById('selectGenre').selectedIndex = 0;
    document.getElementById('filtroInput').value = '';

    var generoSeleccionado = $('#selectGenre').val().trim();
    var filtro = $('#filtroInput').val().trim();
    filtrarPorGenero(generoSeleccionado, filtro);
}


$(document).ready(function () {
    $('#listaPeliculas').select2({ theme: 'bootstrap-5' });
    $.ajax({
        type: 'GET',
        url: "https://www.codigo-alfa.cl/aglo/Tester/listasPeliculas",
        async: false,
        success: function (data) {

            peliculas = data.peliculas;
            const generos = [...new Set(peliculas.map(pelicula => pelicula.genre))];

            let htmlGeneros = `<option value="Todos">Todos</option>`;
            $.each(generos, function (i, genero) {
                htmlGeneros += `<option value="${genero}">${genero}</option>`;
            })
            $("#selectGenre").html(htmlGeneros);

           
        }
    })

    $('#selectGenre').on('change', function() {
        var generoSeleccionado = $(this).val().trim();
        var filtro = $('#filtroInput').val().trim();
        filtrarPorGenero(generoSeleccionado, filtro);
    });
    
   
    $('#filtroInput').on('input', function() {
        var generoSeleccionado = $('#selectGenre').val().trim();
        var filtro = $(this).val().trim();
        filtrarPorGenero(generoSeleccionado, filtro);
    });


    filtrarPorGenero('Todos','');
})