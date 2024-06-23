const input = document.querySelector("input");
const wrapper = document.querySelector(".data-wrapper");

const url = "https://dummyjson.com/products?category=beauty";

async function getData(url) {
  try {
    const res = await fetch(url);
    const data = await res.json();
    // console.log(data)
    return data;
  } catch (er) {
    console.log(er);
  }
}

function displayData(data) {
  wrapper.innerHTML = data.products
    .map(
      (el) => `
      <div>
        <h1>${el.title}</h1>
        <h2> category: ${el.category}</h2>
        <div>${el.description}</div>
        </div>
  `
    )
    .join("");
}

async function main() {
  let data;
  input.addEventListener("input", async (e) => {
    if (input) {
      const queryparameter = `${url}?title=${e.target.value}`;
      console.log(queryparameter);
      data = await getData(queryparameter);
    } else {
      data = await getData(url);
    }
    if (data) {
      displayData(data);
    }
  });
}
main();








let debouncer = (delay, cb) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(...args);
    }, delay);
  };
};

let getMousemove = (e) => {
  let x = e.clientX;
  let y = e.clientY;
  console.log(x, y);
};

const getDebouncer = debouncer(300, getMousemove);
document.body.addEventListener("mousemove", getDebouncer);
