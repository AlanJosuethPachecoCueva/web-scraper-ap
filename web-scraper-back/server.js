const express = require("express");
const axios = require("axios");
const cheerio = require("cheerio");
const cors = require('cors');

const app = express();
const PORT = 3000; // Puedes cambiar el puerto si lo deseas

app.use(cors());

//función para quitar cualquier caracter que no sea un número
function extractNumbers(text) {
  return text.replace(/\D/g, '');
}

app.get("/api/scrape", async (req, res) => {
  // Obtener la URL del parámetro de consulta
  const { url } = req.query;

  // Validar que se haya proporcionado una URL
  if (!url) {
    return res.status(400).json({ error: 'Se requiere un parámetro "url"' });
  }

  try {
    // Hacer la solicitud a la URL proporcionada
    const { data } = await axios.get(url);
  
    const $ = cheerio.load(data);

    // Array para almacenar los datos
    const dataArray = [];

    //Para obtener los títulos y números del ranking en órden
    $("tbody").find("tr.athing").each(function(){
      let rank = extractNumbers($(this).find("td.title").find("span.rank").text());
      let title = $(this).find("td.title").find("span.titleline").find("a:first").text();
      dataArray.push({rank, title, score: "", comments: ""})
    });

    //Para los puntos y los comentarios en órden
    let counter = 0;
    $("tbody").find("tr").find("td.subtext").each(function(){
      let aux = $(this).children("span").attr("class");
      let score;
      let comments;
      if( aux == "subline"){
        score = extractNumbers($(this).find("span.subline").find("span.score").text());
        comments = extractNumbers($(this).find("span.subline").find("a:eq(3)").text());
      }else{
        score = "0";
        comments = "0";
      }

      dataArray[counter].score = score;
      dataArray[counter].comments = comments;

      counter += 1;
    });

    console.log("dataArray: ", dataArray)

    // Enviar los datos en formato JSON
    res.json(dataArray);
  } catch (e) {
    console.log("error: ", e );
    res.status(500).json({ error: e });
  }
});

// Iniciar el servidor
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
