

function ChartView(data,parent){

  this.data = data;
  //spread operator niewydajny bo rozbija array na liste jego elementow - używa pętli for
  //this.max = Math.max(...this.data.map(obj => obj.units));
  //to poniżej też używa pętli for
  //this.max = Math.max.apply(null,this.data.map(obj => obj.units));
  /*this.max = this.data.reduce((a,b,index)=>{
    if(index==1){
      return Math.max(a.units,b.units);
    }else{
      return Math.max(a,b.units);
    }
  });*/
  this.max = this.data.map(obj => obj.units).reduce((a,b)=>Math.max(a,b));
  this.maxColumnHeightPixels = 450;
  this.structure = "regular";


//CREATE CHART DIV
  this.chart = document.createElement("div");
  this.chart.style.width = "600px";
  this.chart.style.display = "flex";
  this.chart.style.flexFlow = "row wrap";

//CREATE BACKGROUND
  this.background = document.createElement("div");
  this.background.style.height = "450px";
  this.background.style.width = "450px";
  this.background.style.display = "flex";
  this.background.style.flexFlow = "row nowrap";
  this.background.style.alignItems = "flex-end";

//CREATE DATE AXIS
  this.dateAxis = document.createElement("div");
  this.dateAxis.style.height = "20px";
  this.dateAxis.style.width = "451px";//+unit axis width
  this.dateAxis.style.display = "flex";
  this.dateAxis.style.flexFlow = "row nowrap";
  this.dateAxis.style.justifyContent = "flex-end";
  this.dateAxis.style.marginTop = "10px";

//CREATE UNIT AXIS
  this.unitAxis = document.createElement("div");
  this.unitAxis.style.display = "flex";
  this.unitAxis.style.flexFlow = "column-reverse nowrap";
  this.unitAxis.style.height = "450px";
  this.unitAxis.style.width = "1px";
  this.unitAxis.style.alignItems = "center";


//RENDERING
  this.createColumns(this.structure);
  this.createDateAxis(this.structure);
  this.createUnitsAxis(this.structure);
  this.appendOrder(this.structure);

  parent.appendChild(this.chart);

}

ChartView.prototype = {
  createColumns(structure){

      this.data.map(obj => this.maxColumnHeightPixels*obj.units/this.max).forEach((unit,index) =>{
        const column = document.createElement("div");
        const columnLabel = document.createTextNode(Math.floor(unit*this.max/this.maxColumnHeightPixels));

        column.appendChild(columnLabel);
      if(structure == "regular"){
        column.setAttribute("style",`height:${unit}px`);
        column.style.width = "60px";
        column.style.marginLeft = "15px";
        column.style.background = "red";
      }else{
        this.background.style.flexFlow = "column nowrap";
        column.setAttribute("style",`width:${unit}px`);
        column.style.height = "60px";
        column.style.marginTop = "15px";
        column.style.background = "red";
      }

        this.background.appendChild(column);
      });
  },
  createDateAxis(structure){
    this.data.forEach((obj,index) => {
      const el = document.createElement("div");
      const date = new Date(obj.date);
      const text = document.createTextNode(date.getDate() +"/"+(date.getMonth()+1)+"/"+date.getFullYear());
      el.style.marginLeft = "19px";
      if(structure !== "regular"){
        this.dateAxis.style.flexFlow = "column nowrap";
        this.dateAxis.style.height = "450px";
        this.dateAxis.style.width = "70px";
        el.style.marginLeft = "0";
        el.style.height = "60px";
        el.style.marginTop = "15px";
        this.dateAxis.style.marginTop = "0";
        this.dateAxis.style.alignItems = "center";
      }
      el.appendChild(text);


      this.dateAxis.appendChild(el);
    });
  },
  createUnitsAxis(structure){
    if(this.structure == "regular"){
    for(let i = 0; i<450;i+= 45){
      const el = document.createElement("div");
      el.style.width = "1px";
      el.style.background = "black";
      el.style.height = "44px";
      const checkPoint = document.createElement("div");
      checkPoint.style.width = "6px";
      checkPoint.style.background = "black";
      checkPoint.style.height = "1px";
      this.unitAxis.appendChild(el);
      this.unitAxis.appendChild(checkPoint);
    }
  }else{//Można zmienić żeby nie powtarzać
    this.unitAxis.style.display = "flex";
    this.unitAxis.style.flexFlow = "row-reverse nowrap";
    this.unitAxis.style.height = "1px";
    this.unitAxis.style.width = "450px";
    this.unitAxis.style.marginTop = "15px";
    this.unitAxis.style.marginLeft = "70px";
    for(let i = 0; i<450;i+= 45){
      const el = document.createElement("div");
      el.style.width = "44px";
      el.style.background = "black";
      el.style.height = "1px";
      const checkPoint = document.createElement("div");
      checkPoint.style.width = "1px";
      checkPoint.style.background = "black";
      checkPoint.style.height = "6px";
      this.unitAxis.appendChild(el);
      this.unitAxis.appendChild(checkPoint);
    }
  }
  },
  selfDestruction(){
    this.chart.parentNode.removeChild(this.chart);
  },
  changeColumnsAlignment(){
    if(this.background.style.alignItems == "flex-end"){
      this.background.style.alignItems = "flex-start";
    }else{
      this.background.style.alignItems = "flex-end";
    }
  },
  appendOrder(structure){
    if(structure == "regular"){
      this.chart.appendChild(this.unitAxis);
      this.chart.appendChild(this.background);
      this.chart.appendChild(this.dateAxis);
    }else{
      this.chart.appendChild(this.dateAxis);
      this.chart.appendChild(this.background);
      this.chart.appendChild(this.unitAxis);
    }
  }
}

function AppView(){
  this.chart;
  this.sort = "asc";

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


  this.button = document.createElement('button');
  const value = document.createTextNode("sortuj");
  this.button.appendChild(value);
  this.button.style.marginBottom = "30px";
  this.button.style.marginRight = "15px";
  document.body.appendChild(this.button);

  this.button.addEventListener('click',event=>{
    event.stopPropagation();
    event.preventDefault();
    const compareUpdated = this.compare("date");
    const sortWay = compareUpdated(this.sort);
    this.data.sort(sortWay);

    if(this.sort=="asc"){
      this.sort="desc";
    }else{
      this.sort="asc";
    }
    this.clearChart();
    this.render();
  });

  this.button2 = document.createElement('button');
  const value2 = document.createTextNode("dogoryNogami");
  this.button2.appendChild(value2);
  this.button2.style.marginRight = "15px";
  this.button2.style.marginBottom = "30px";
  document.body.appendChild(this.button2);

  this.button2 = addEventListener('click',event=>{
    event.stopPropagation();
    event.preventDefault();
    this.chart.changeColumnsAlignment();
  });

  /*this.button3 = document.createElement('button');
  const value3 = document.createTextNode("uklad");
  this.button3.appendChild(value3);
  this.button3.style.marginBottom = "30px";
  document.body.appendChild(this.button3);

  this.button3 = addEventListener('click',event=>{
    event.stopPropagation();
    event.preventDefault();
    if(this.chart.structure !== "regular"){
      this.chart.structure = "regular";
    }else{
      this.chart.structure = "horizontal";
    }
    this.clearChart();
    this.render();
  });*/

  this.render();
}

AppView.prototype = {
  render(){
    this.chart = new ChartView(this.data,document.body);
  },
//CREATED TO SORT BY UNITS IN THE FUTURE
  compare(property){
    return function(direction){
      const dir = direction;
      return function(a,b){
        if(a[property]<b[property]){
          return dir=="asc"?1:-1;
        }else if(a[property]>b[property]){
          return dir=="asc"?-1:1;
        }else{
          return 0;
        }
      }
    }
  },
  clearChart(){
    this.chart.selfDestruction();
  }
}

document.addEventListener("DOMContentLoaded",()=>{

  const app = new AppView();

});
