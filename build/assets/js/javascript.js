var budgetController=function(){var e=function(e){var t=0;r.allItems[e].forEach(function(e){t+=e.value}),r.totals[e]=t},r={allItems:{exp:[],inc:[]},totals:{exp:0,inc:0}};return{addItem:function(e,t,n){var i,o;return o=0<r.allItems[e].length?r.allItems[e][r.allItems[e].length-1].id+1:0,"exp"===e?i=new function(e,t,n){this.id=e,this.description=t,this.value=n}(o,t,n):"inc"===e&&(i=new function(e,t,n){this.id=e,this.description=t,this.value=n}(o,t,n)),r.allItems[e].push(i),i},deleteItem:function(e,t){var n;-1!==(n=r.allItems[e].map(function(e){return e.id}).indexOf(t))&&r.allItems[e].splice(n,1)},calculationBudget:function(){e("exp"),e("inc"),r.budget=r.totals.inc-r.totals.exp,0<r.totals.inc?r.percentage=Math.round(r.totals.exp/r.totals.inc*100):r.percentage=-1},getBudget:function(){return{budget:r.budget,totalInc:r.totals.inc,totalExp:r.totals.exp,percentage:r.percentage}},testing:function(){console.log(r)}}}(),UIController=function(){var r={inputType:".form_input--type",inputDescription:".form_input--description",inputValue:".form_input--value",inputButton:".form_button",incomeContainer:".history__container--income",expensesContainer:".history__container--expenses",budgetLabel:".main_budget",incomeLabel:".badge--income .badge__number",expensesLabel:".badge--expenses .badge__number",percentageLabel:".badge--expenses .badge__percentage",container:".history"};return{getInput:function(){return{type:document.querySelector(r.inputType).value,description:document.querySelector(r.inputDescription).value,value:parseFloat(document.querySelector(r.inputValue).value)}},addListItem:function(e,t){var n,i,o;"inc"===t?(o=r.incomeContainer,n='<div class="history__item" id="inc-%id%"><div class="history__item_title">%description%</div><div class="history__item_amount">%value%</div><div class="history__item_remove"></div></div>'):"exp"===t&&(o=r.expensesContainer,n='<div class="history__item" id="exp-%id%"><div class="history__item_title">%description%</div><div class="history__item_amount">%value%<span class="history__item_badge">20%</span></div><div class="history__item_remove"></div></div>'),i=(i=(i=n.replace("%id%",e.id)).replace("%description%",e.description)).replace("%value%",e.value),document.querySelector(o).insertAdjacentHTML("beforeend",i)},deleteListItem:function(e){var t=document.getElementById(e);t.parentNode.removeChild(t)},clearFields:function(){var e,t;e=document.querySelectorAll(r.inputDescription+","+r.inputValue),(t=Array.prototype.slice.call(e)).forEach(function(e,t,n){e.value=""}),t[0].focus()},displayBudget:function(e){document.querySelector(r.budgetLabel).textContent=e.budget,document.querySelector(r.incomeLabel).textContent=e.totalInc,document.querySelector(r.expensesLabel).textContent=e.totalExp,0<e.percentage?document.querySelector(r.percentageLabel).textContent=e.percentage+"%":document.querySelector(r.percentageLabel).textContent="---"},getDOMstrings:function(){return r}}}(),controller=function(r,a){var c=function(){r.calculationBudget();var e=r.getBudget();a.displayBudget(e)},t=function(){var e,t;""!==(e=a.getInput()).description&&!isNaN(e.value)&&0<e.value&&(t=r.addItem(e.type,e.description,e.value),a.addListItem(t,e.type),a.clearFields(),c())},n=function(e){var t,n,i,o;(t=e.target.parentNode.id)&&(i=(n=t.split("-"))[0],o=parseInt(n[1]),r.deleteItem(i,o),a.deleteListItem(t),c())};return{init:function(){var e;console.log("App is running"),a.displayBudget({budget:0,totalInc:0,totalExp:0,percentage:-1}),e=a.getDOMstrings(),document.querySelector(e.inputButton).addEventListener("click",t),document.addEventListener("keypress",function(e){13!==e.keyCode&&13!==e.which||t()}),document.querySelector(e.container).addEventListener("click",n)}}}(budgetController,UIController);controller.init();