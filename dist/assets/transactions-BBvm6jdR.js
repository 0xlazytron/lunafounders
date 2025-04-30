import{i as m,a as s}from"./index-BwoMNPU_.js";import{x as a}from"./lit-html-Bx_euVSL.js";import{c as p}from"./index-DHrlETog.js";import"./index-jPJ6R3xV.js";import"./index-KSLeK6lx.js";import"./index-CejKDg9m.js";import"./index-D_RDdoYI.js";import"./index-CNpvtWQK.js";import"./index-btGkulaY.js";import"./index-DhqnVWsn.js";const d=m`
  :host > wui-flex:first-child {
    height: 500px;
    overflow-y: auto;
    overflow-x: hidden;
    scrollbar-width: none;
  }

  :host > wui-flex:first-child::-webkit-scrollbar {
    display: none;
  }
`;var u=function(o,e,i,r){var n=arguments.length,t=n<3?e:r===null?r=Object.getOwnPropertyDescriptor(e,i):r,l;if(typeof Reflect=="object"&&typeof Reflect.decorate=="function")t=Reflect.decorate(o,e,i,r);else for(var c=o.length-1;c>=0;c--)(l=o[c])&&(t=(n<3?l(t):n>3?l(e,i,t):l(e,i))||t);return n>3&&t&&Object.defineProperty(e,i,t),t};let f=class extends s{render(){return a`
      <wui-flex flexDirection="column" .padding=${["0","m","m","m"]} gap="s">
        <w3m-activity-list page="activity"></w3m-activity-list>
      </wui-flex>
    `}};f.styles=d;f=u([p("w3m-transactions-view")],f);export{f as W3mTransactionsView};
