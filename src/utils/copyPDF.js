const pdfreader = require('pdfreader');

module.exports = async function copyPDF(path) {

    let fileContent = "";

    var rows = {};

    function printRow(y) {
      fileContent = fileContent + (rows[y] || []).join(''); // acumula o conteudo
    }
    
    function printRows() {
      Object.keys(rows)
        .sort((y1, y2) => parseFloat(y1) - parseFloat(y2))
        .forEach(printRow);
    }

    new pdfreader.PdfReader().parseFileItems(path, function(err, item){
      if (err)
        console.error(err);
      else if (!item || item.page) { // fim do arquivo ou pagina
        printRows();
        rows = {}; // limpa linhas para a proxima pagina
      }
      else if (item.text) {
        // acumula o conteudo nas linhas
        (rows[item.y] = rows[item.y] || []).push(item.text);
      }
    });

    return fileContent;
}
