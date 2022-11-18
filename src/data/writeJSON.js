const fs = require("fs");
const path = require("path");

function writeJSON() {
  const contents = fs.readFileSync(
    path.resolve(__dirname, `./seeds.tsv`),
    "utf-8"
  );
  const contentsArr = contents.split(/\r\n/);
  const headers = contentsArr.splice(0, 1)[0].split("\t");

  const data = contentsArr.map((row) => {
    const items = row.split("\t");
    const product = {};
    headers.forEach((header, i) => {
      product[`${header}`] = items[i];
    });
    return {
      id: product.id,
      title: product.title,
      category: product.category,
      price: +product.price,
      salePrice: +product.salePrice || "",
      description: product.description,
      inStock: +product.inStock,
      details: {
        seedCount: +product.seedCount,
        daysToMaturity: +product.daysToMaturity,
      },
      reviews: {
        avg: +product.avgReview,
        num: +product.numReviews,
      },
    };
  });

  fs.writeFileSync(
    path.resolve(__dirname, `./seeds.json`),
    JSON.stringify(data)
  );
}

writeJSON();
