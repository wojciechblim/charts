

function ChartView(data,parent){
  this.background = document.createElement("div");
  this.background.style.position = "relative";

  this.data = data;
  this.max = Math.max(...this.data.map(obj => obj.units));
  this.maxColumnHeightPixels = 450;
  this.dates = document.createElement("div");

  this.createColumns();
  this.createDateAxis();
  parent.appendChild(this.background);
  parent.appendChild(this.dates);
}

ChartView.prototype = {
  createColumns(){
    this.data.map(obj => this.maxColumnHeightPixels*obj.units/this.max).forEach((unit,index) =>{
      const column = document.createElement("div");

      column.setAttribute("style",`height:${unit}px`);
      column.style.width = "60px";
      column.style.position = "absolute";
      column.style.left = `${index*80}px`;
      column.style.top = `${450-unit}px`;
      column.style.background = "red";
      column.style.margin = "10px";

      this.background.appendChild(column);
    });
  },
  createDateAxis(){
    this.data.forEach((obj,index) => {
      const el = document.createElement("div");
      const date = new Date(obj.date);
      const text = document.createTextNode(date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear());
      el.appendChild(text);
      el.style.position = "absolute";
      el.style.left = `${index*80}px`;
      el.style.top = "470px";
      el.style.marginLeft = "20px";

      this.dates.appendChild(el);
    });
  }
}

function AppView(){
  this.data = [
    {
      date: 1493922600000,
      units: 320
    },
    {
      date: 1494009000000,
      units: 552
    },
    {
      date: 1494095400000,
      units: 342
    },
    {
      date: 1494181800000,
      units: 431
    },
    {
      date: 1494268200000,
      units: 251
    },
    {
      date: 1494354600000,
      units: 445
    }
  ];

  const chart = new ChartView(this.data,document.body);
}


document.addEventListener("DOMContentLoaded",()=>{

  const app = new AppView();

});
