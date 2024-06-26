
var pelicula = [];

function ObtenerPelicula() {
  $.ajax({
    type: "GET",
    url: "https://www.codigo-alfa.cl/aglo/Tester/peliculaAleatoria",
    async: false,
    success: function (data) {
      pelicula = data.pelicula;
      html = ``;
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

      $("#panelPelicula").html(html);
    },
  });
}

function limpiarTodo() {
  $("#panelPelicula").html('<div class="col" style="width: 100%; text-align: center"><img width="30%" src="assets/regalo_sorpresa.jpg" alt=""></div>');
}

$(document).ready(function () {
  $("#btnObtener").on("click", function () {
    ObtenerPelicula();
  });
});