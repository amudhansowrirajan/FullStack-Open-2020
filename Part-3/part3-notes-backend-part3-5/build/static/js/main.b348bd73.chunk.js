(this.webpackJsonpignore2=this.webpackJsonpignore2||[]).push([[0],{20:function(e,t,n){e.exports=n(44)},26:function(e,t,n){},44:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(18),o=n.n(c),u=n(2),l=n.n(u),i=n(4),s=n(8),m=n(19),p=n(3),f=(n(26),function(e){var t=e.noteOf,n=e.toggleImportance,a=t.important?"make not important":"make important";return r.a.createElement("li",{className:"note"},t.content,r.a.createElement("button",{onClick:function(){return n(t.id)}},a))}),d=n(5),b=n.n(d),v=null,g={getAll:function(){var e=b.a.get("/api/notes"),t={content:"Not in Server",date:"2020-10-26T07:14:24.433Z",important:!1,id:1e4};return e.then((function(e){return e.data.concat(t)}))},create:function(){var e=Object(i.a)(l.a.mark((function e(t){var n,a;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n={headers:{Authorization:v}},e.next=3,b.a.post("/api/notes",t,n);case 3:return a=e.sent,e.abrupt("return",a.data);case 5:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),update:function(e,t){return b.a.put("".concat("/api/notes","/").concat(e),t).then((function(e){return e.data}))},setToken:function(e){v="bearer ".concat(e)}},E=function(e){var t=e.message,n=e.status;return null===t?null:r.a.createElement("div",{className:n},t)},h={login:function(){var e=Object(i.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,b.a.post("/api/login",t);case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()},O=function(){var e=Object(a.useState)([]),t=Object(p.a)(e,2),n=t[0],c=t[1],o=Object(a.useState)(""),u=Object(p.a)(o,2),d=u[0],b=u[1],v=Object(a.useState)(!0),O=Object(p.a)(v,2),j=O[0],S=O[1],w=Object(a.useState)(null),y=Object(p.a)(w,2),k=y[0],T=y[1],x=Object(a.useState)(""),C=Object(p.a)(x,2),A=C[0],I=C[1],N=Object(a.useState)(""),D=Object(p.a)(N,2),Z=D[0],J=D[1],P=Object(a.useState)(""),z=Object(p.a)(P,2),B=z[0],H=z[1],M=Object(a.useState)(null),G=Object(p.a)(M,2),L=G[0],U=G[1];Object(a.useEffect)((function(){g.getAll().then((function(e){c(Object(m.a)(e))}))}),[]);var q=function(e){e.preventDefault();var t={content:d,date:(new Date).toISOString(),important:Math.random()>=.5};console.log(t,"before post"),g.create(t).then((function(e){c(n.concat(e)),b(""),T("".concat(e.content," was successfully added")),I("success"),setTimeout((function(){T(null),I()}))}))},F=function(e){b(e.target.value)},K=function(e){console.log("importance of ".concat(e," needs to be toggled"));var t=n.find((function(t){return t.id===e})),a=Object(s.a)(Object(s.a)({},t),{},{important:!t.important});g.update(e,a).then((function(t){return c(n.map((function(n){return n.id===e?t:n})))})).catch((function(a){T("".concat(t.content," was already removed from the server")),setTimeout((function(){return T(null)}),3e3),c(n.filter((function(t){return t.id!==e})))}))},Q=j?n:n.filter((function(e){return e.important})),R=function(){return r.a.createElement("div",{style:{color:"green",fontStyle:"italic",fontSize:16}},r.a.createElement("br",null),r.a.createElement("em",null,"Note-App, Department of Computer Science, University of helsinki 2020"))},V=function(){var e=Object(i.a)(l.a.mark((function e(t){var n;return l.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.preventDefault(),e.prev=1,e.next=4,h.login({username:Z,password:B});case 4:n=e.sent,U(n),g.setToken(n.token),J(""),H(""),e.next=16;break;case 11:e.prev=11,e.t0=e.catch(1),T("wrong Credentials"),I("error"),setTimeout((function(){T(null),I("")}),2e3);case 16:case"end":return e.stop()}}),e,null,[[1,11]])})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",null,r.a.createElement("h1",null," Notes"),r.a.createElement(E,{message:k,status:A}),null===L?r.a.createElement("form",{onSubmit:V},r.a.createElement("div",null,r.a.createElement("label",null," username:"),r.a.createElement("input",{type:"text",value:Z,onChange:function(e){return J(e.target.value)},name:"username"})),r.a.createElement("div",null,r.a.createElement("label",null,"Password:"),r.a.createElement("input",{type:"password",value:B,onChange:function(e){H(e.target.value)},name:"password"})),r.a.createElement("button",{type:"submit"},"login")):r.a.createElement("div",null,r.a.createElement("p",null,L.name," is logged in"),r.a.createElement("form",{onSubmit:q},r.a.createElement("input",{type:"text",value:d,onChange:F}),r.a.createElement("button",{type:"submit"},"Save"))),r.a.createElement("div",null,r.a.createElement("button",{onClick:function(){return S(!j)}},j?"Important":"All")),r.a.createElement("ul",null,Q.map((function(e){return r.a.createElement(f,{key:e.id,noteOf:e,toggleImportance:K})}))),r.a.createElement(R,null))};o.a.render(r.a.createElement(O,{notes:[{id:1,content:"HTML is easy",date:"2019-05-30T17:30:31.098Z",important:!0},{id:2,content:"Browser can execute only Javascript",date:"2019-05-30T18:39:34.091Z",important:!1},{id:3,content:"GET and POST are the most important methods of HTTP protocol",date:"2019-05-30T19:20:14.298Z",important:!0}]}),document.getElementById("root"))}},[[20,1,2]]]);
//# sourceMappingURL=main.b348bd73.chunk.js.map