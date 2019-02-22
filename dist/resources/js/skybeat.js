//Vanilla JS
var skyBeat = {};
const API_KEY = "433cdbe9bbb7d29f95d5aa696b691acb";

function numberWithCommas(x) {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}
//Document is ready and loaded
document.addEventListener("DOMContentLoaded", () => {
  var searchFilter = document.getElementById("selected").innerText;
  console.log(searchFilter);

  document.addEventListener(
    "click",
    function(event) {
      // If the clicked element doesn't have the right selector, bail
      if (!event.target.matches(".dropdown-menu a")) return;

      // Don't follow the link
      event.preventDefault();

      // Log the clicked element in the console
      document.getElementById("selected").innerText = event.target.innerText;
      searchFilter = document.getElementById("selected").innerText;
      console.log(searchFilter);
    },
    false
  );

  // Get the input field
  var input = document.querySelector("#search-input");

  // Execute a function when the user releases a key on the keyboard
  input.addEventListener("keyup", function(event) {
    // Number 13 is the "Enter" key on the keyboard
    if (event.keyCode === 13) {
      // Cancel the default action, if needed
      event.preventDefault();
      // Trigger the button element with a click

      document.querySelector("#search-button").click();
    }
  });

  document.querySelector("#search-button").addEventListener("click", () => {
    if (searchFilter == "Tracks") {
      skyBeat.searchTracksByTitle(input.value);
    } else if (searchFilter == "Artists") {
      skyBeat.searchArtists(input.value);
    } else if (searchFilter == "Albums") {
      skyBeat.searchAlbums(input.value);
    }
  });
});

skyBeat.renderResults = results => {
  var searchFilter = document.getElementById("selected").innerText;
  var attributesList = document.querySelector("#attributes-list");
  var resultsList = document.querySelector("#results-list");

  var htmlAttributesRow = document.createElement("div");
  htmlAttributesRow.className = "row attributes";

  //Empty resultsList and attribute list
  while (resultsList.firstChild) {
    resultsList.removeChild(resultsList.firstChild);
  }

  while (attributesList.firstChild) {
    attributesList.removeChild(attributesList.firstChild);
  }

  if (searchFilter == "Tracks") {
    htmlAttributesRow.innerHTML =
      '  <div class="col-xs-1 col-xs-offset-1 attribute">LastFM</div>' +
      ' <div class="col-xs-3 col-xs-offset-1 attribute">Song</div> ' +
      '  <div class="col-xs-2 attribute">Artist</div>  ' +
      '  <div class="col-xs-2 attribute">Album Art</div>   ' +
      '    <div class="col-xs-2 attribute">Listeners</div>';

    attributesList.appendChild(htmlAttributesRow);

    for (var trackIndex = 0; trackIndex < results.length; trackIndex++) {
      var track = results[trackIndex];
      var albumArtMedium = track.image[1]["#text"];
      var htmlTrackRow = document.createElement("div");
      htmlTrackRow.className = "row result";
      htmlTrackRow.innerHTML =
        '  <div class="col-xs-1 col-xs-offset-1 play-button">' +
        '    <a href="' +
        track.url +
        '" target="_blank">' +
        '      <i class="far fa-play-circle fa-2x"></i>' +
        "    </a>" +
        "  </div>" +
        '  <div class="col-xs-3 col-xs-offset-1">' +
        track.name +
        "</div>" +
        '  <div class="col-xs-2">' +
        track.artist +
        "</div>" +
        '  <div class="col-xs-2"><img src="' +
        albumArtMedium +
        '"/></div>' +
        '  <div class="col-xs-2">' +
        numberWithCommas(track.listeners);
      +"</div>";

      resultsList.appendChild(htmlTrackRow);
    }
  } else if (searchFilter == "Artists") {
    htmlAttributesRow.innerHTML =
      '  <div class="col-xs-1 col-xs-offset-1 attribute">LastFM</div>' +
      ' <div class="col-xs-3 col-xs-offset-1 attribute">Artist</div> ' +
      '  <div class="col-xs-2 col-xs-offset-1 attribute">Album Art</div>   ' +
      '    <div class="col-xs-2 col-xs-offset-1 attribute">Listeners</div>';

    attributesList.appendChild(htmlAttributesRow);

    for (var artistIndex = 0; artistIndex < results.length; artistIndex++) {
      var artist = results[artistIndex];
      var albumArtMedium = artist.image[1]["#text"];
      var htmlArtistRow = document.createElement("div");
      htmlArtistRow.className = "row result";
      htmlArtistRow.innerHTML =
        '  <div class="col-xs-1 col-xs-offset-1 play-button">' +
        '    <a href="' +
        artist.url +
        '" target="_blank">' +
        '      <i class="far fa-play-circle fa-2x"></i>' +
        "    </a>" +
        "  </div>" +
        '  <div class="col-xs-3 col-xs-offset-1">' +
        artist.name +
        "</div>" +
        '  <div class="col-xs-2 col-xs-offset-1"><img src="' +
        albumArtMedium +
        '"/></div>' +
        '  <div class="col-xs-2 col-xs-offset-1">' +
        numberWithCommas(artist.listeners);
      +"</div>";

      resultsList.appendChild(htmlArtistRow);
    }
  } else if (searchFilter == "Albums") {
    htmlAttributesRow.innerHTML =
      '  <div class="col-xs-1 col-xs-offset-1 attribute">LastFM</div>' +
      ' <div class="col-xs-3 col-xs-offset-1 attribute">Album</div> ' +
      '  <div class="col-xs-2 col-xs-offset-1 attribute">Artist</div>   ' +
      '    <div class="col-xs-2 col-xs-offset-1 attribute">Album Art</div>';

    attributesList.appendChild(htmlAttributesRow);

    for (var albumIndex = 0; albumIndex < results.length; albumIndex++) {
      var album = results[albumIndex];
      var albumArtMedium = album.image[1]["#text"];
      var htmlAlbumRow = document.createElement("div");
      htmlAlbumRow.className = "row result";
      htmlAlbumRow.innerHTML =
        '  <div class="col-xs-1 col-xs-offset-1 play-button">' +
        '    <a href="' +
        album.url +
        '" target="_blank">' +
        '      <i class="far fa-play-circle fa-2x"></i>' +
        "    </a>" +
        "  </div>" +
        '  <div class="col-xs-3 col-xs-offset-1">' +
        album.name +
        "</div>" +
        '  <div class="col-xs-2 col-xs-offset-1">' +
        album.artist +
        "</div>" +
        '  <div class="col-xs-2 col-xs-offset-1"><img src="' +
        albumArtMedium +
        '"/></div>';

      resultsList.appendChild(htmlAlbumRow);
    }
  }
};

skyBeat.searchTracksByTitle = title => {
  const url =
    "https://ws.audioscrobbler.com/2.0/?method=track.search&track=" +
    title +
    "&api_key=" +
    API_KEY +
    "&format=json";
  fetch(url)
    .then(response => response.json())
    .then(response => {
      skyBeat.renderResults(response.results.trackmatches.track);
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
    });
};

skyBeat.searchArtists = artist => {
  const url =
    "http://ws.audioscrobbler.com/2.0/?method=artist.search&artist=" +
    artist +
    "&api_key=" +
    API_KEY +
    "&format=json";
  fetch(url)
    .then(response => response.json())
    .then(response => {
      skyBeat.renderResults(response.results.artistmatches.artist);
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
    });
};

skyBeat.searchAlbums = album => {
  const url =
    "http://ws.audioscrobbler.com/2.0/?method=album.search&album=" +
    album +
    "&api_key=" +
    API_KEY +
    "&format=json";
  fetch(url)
    .then(response => response.json())
    .then(response => {
      skyBeat.renderResults(response.results.albummatches.album);
    })
    .catch(err => {
      console.log("Fetch Error :-S", err);
    });
};
