(this["webpackJsonptech-photo-form"]=this["webpackJsonptech-photo-form"]||[]).push([[0],{166:function(e,t,a){},256:function(e,t,a){},282:function(e,t,a){"use strict";a.r(t);var o=a(0),n=a.n(o),c=a(27),l=a.n(c),s=(a(166),a(158)),i=a(47),r=a(37),u=(a.p,a(143)),j=a.n(u).a.create({baseURL:"http://localhost:5000/"}),d=a(290),b=a(288),m=a(287),f=a(159),h=a(286),O=a(55),p=a(289),v=a(292),x=a(293),g=a(291),I=a(6),T=d.a.Title;d.a.Paragraph,d.a.Text,d.a.Link;function w(e){var t=e.photoData;return Object(I.jsxs)("div",{children:[Object(I.jsx)("img",{src:t.download_url,style:{maxWidth:"100%"}}),Object(I.jsxs)("p",{children:["Uploader: ",t.uploader," ",Object(I.jsx)("br",{}),"Attribution: ",t.attribution," ",Object(I.jsx)("br",{}),"Department: ",t.department," ",Object(I.jsx)("br",{}),"Date Taken: ",t.dt_taken," ",Object(I.jsx)("br",{}),"Caption: ",t.caption," ",Object(I.jsx)("br",{})]})]})}function P(e){var t=Object(o.useState)([]),a=Object(r.a)(t,2),n=a[0],c=a[1],l=Object(o.useState)([]),s=Object(r.a)(l,2),i=s[0],u=s[1],b=Object(o.useState)([]),m=Object(r.a)(b,2),h=m[0],P=m[1];if(Object(o.useEffect)((function(){c(!1),console.log("got default volume ".concat(e.defaultVolume," and issue ").concat(e.defaultIssue)),P({volume:e.defaultVolume,issue:e.defaultIssue})}),[]),Object(o.useEffect)((function(){n&&j.get("photos_by_issue",{params:{volume:h.volume,issue:h.issue}}).then((function(e){return u(e)}))}),[n,h]),!n)return Object(I.jsx)("div",{className:"main-container",children:Object(I.jsx)(p.a,{name:"viewer-password",onFinish:function(e){"techphoto"==e.password?c(!0):f.b.error("Incorrect Password")},children:Object(I.jsx)(p.a.Item,{label:"Password",name:"password",children:Object(I.jsx)(v.a.Password,{})})})});if(i.data&&i.data.length>0)var k=i.data.map((function(e){return Object(I.jsx)(w,{photoData:e})}));else k=Object(I.jsx)("p",{children:"No Photos"});return Object(I.jsxs)("div",{className:"main-container",children:[Object(I.jsx)(d.a,{children:Object(I.jsxs)(T,{children:["Photos for Volume ",h.volume," Issue"," ",h.issue]})}),Object(I.jsx)("h1",{}),Object(I.jsxs)(p.a,{name:"select_issue",onFinish:function(e){P({volume:e.volume?e.volume:h.volume,issue:e.issue?e.issue:h.issue})},children:[Object(I.jsx)("h2",{children:"Choose new issue"}),Object(I.jsxs)(x.b,{children:[Object(I.jsx)(p.a.Item,{label:"Volume",name:"volume",children:Object(I.jsx)(g.a,{defaultValue:h.volume})}),Object(I.jsx)(p.a.Item,{label:"Issue",name:"issue",children:Object(I.jsx)(g.a,{defaultValue:h.issue})}),Object(I.jsx)(p.a.Item,{children:Object(I.jsx)(O.a,{type:"primary",htmlType:"submit",children:"Go"})})]})]}),k]})}a(256);var k=a(103),V=a.n(k),S=a(154),y=(a(142),Object(S.b)(V.a)),D=a(156),C=(a(283),Object(D.a)(V.a),o.forwardRef((function(e,t){return Object(I.jsx)(y,Object(i.a)(Object(i.a)({},e),{},{picker:"time",mode:void 0,ref:t}))})));C.displayName="TimePicker";var N=a(115),_=a.n(N),F=a(104),E=a(116),L=d.a.Title,U=(d.a.Paragraph,d.a.Text,d.a.Link,E.a.Option);function R(e){var t=p.a.useForm(),a=Object(r.a)(t,1)[0],o=F(e.imgInfo.date);return console.log(o),console.log(F("2019-11-10T03:53:31-05:00")),Object(I.jsxs)("div",{className:"image-info-form-container",children:[Object(I.jsx)(h.a,{}),Object(I.jsxs)(L,{level:2,children:["Image ",e.itemNum,": ",e.file.name]}),Object(I.jsx)("img",{src:URL.createObjectURL(e.file),className:"image-preview"}),Object(I.jsxs)(p.a,{form:a,onFieldsChange:function(t,a){var n=function(t){return{event_name:t[0].value,department:t[1].value?t[1].value:"fto",volume:t[2].value?t[2].value:e.defaultVolume,issue:t[3].value?t[3].value:e.defaultIssue,dt_taken:t[4].value?t[4].value:o,caption:t[5].value,attribution:t[6].value}}(a);e.handleUpdate(n)},children:[Object(I.jsx)(p.a.Item,{label:"Event/Topic",name:"event",children:Object(I.jsx)(v.a,{placeholder:"Men's Soccer vs. WPI"})}),Object(I.jsxs)(x.b,{children:[Object(I.jsx)(p.a.Item,{label:"Department",name:"department",children:Object(I.jsxs)(E.a,{placeholder:"Select",defaultValue:"fto",children:[Object(I.jsx)(U,{value:"spo",children:"SPO"}),Object(I.jsx)(U,{value:"fto",children:"FTO"}),Object(I.jsx)(U,{value:"rtz",children:"RTZ"}),Object(I.jsx)(U,{value:"cl",children:"CL"})]})}),Object(I.jsx)(p.a.Item,{label:"Volume",name:"volume",children:Object(I.jsx)(g.a,{defaultValue:e.defaultVolume})}),Object(I.jsx)(p.a.Item,{label:"Issue",name:"issue",children:Object(I.jsx)(g.a,{defaultValue:e.defaultIssue})})]}),Object(I.jsx)(p.a.Item,{label:"Date/Time Taken (autofilled from EXIF if available)",name:"datetime",children:Object(I.jsx)(y,{defaultValue:o.isValid()?o:void 0,showTime:!0,disabled:o.isValid()},o)}),Object(I.jsx)(p.a.Item,{label:"Caption",name:"caption",children:Object(I.jsx)(v.a.TextArea,{placeholder:"See the wiki for how to write a good caption"})}),Object(I.jsx)(p.a.Item,{label:"Attribution (or your full name)",name:"attribution",children:Object(I.jsx)(v.a,{placeholder:"Photo Provided by Dance Troupe"})})]})]})}function J(e){var t=Object(o.useState)({}),a=Object(r.a)(t,2),n=(a[0],a[1],Object(o.useState)(null)),c=Object(r.a)(n,2),l=c[0],s=c[1];return Object(o.useEffect)((function(){_.a.getData(e.file,(function(){var e=_.a.getTag(this,"DateTimeOriginal");s(void 0!==e?function(e){var t=e.split(/\D/);return new Date(t[0],t[1]-1,t[2],t[3],t[4],t[5])}(e):null)}))}),[e.file]),Object(I.jsx)(R,Object(i.a)(Object(i.a)({},e),{},{imgInfo:{date:l}}))}var A=d.a.Title,K=d.a.Paragraph,z=(d.a.Text,d.a.Link,b.a.Dragger);function B(e){var t=Object(o.useState)([]),a=Object(r.a)(t,2),n=a[0],c=a[1],l=Object(o.useState)([]),u=Object(r.a)(l,2),b=u[0],m=u[1];var p=n.map((function(t,a){return Object(I.jsx)(J,{file:t.file,itemNum:a+1,defaultVolume:e.defaultVolume,defaultIssue:e.defaultIssue,handleUpdate:function(e){console.log("Saw update to form in item ".concat(a+1,": ").concat(JSON.stringify(e)));var t=Object(s.a)(n);t[a].info=e,c(t)}},a)}));return Object(I.jsxs)("div",{className:"photo-form",children:[Object(I.jsxs)(d.a,{children:[Object(I.jsx)(A,{children:"The Tech Photo Upload Form"}),Object(I.jsx)(K,{children:"This site is meant to make the process of uploading photos simpler."})]}),Object(I.jsx)(G,{addPhotos:function(e){var t=e.map((function(e){return{file:e,info:{}}}));c(n.concat(t))},handleKerbChange:function(e){m(e)}}),p,Object(I.jsx)(h.a,{}),Object(I.jsx)(O.a,{type:"primary",onClick:function(){console.log("submitted photo list to follow"),console.log(n);var e=n.map((function(e,t){return Object(i.a)(Object(i.a)({},e.info),{},{uploader:b,filename:e.file.name})}));console.log(e),e.forEach((function(e,t){var a="uploading_msg";f.b.loading({content:"Uploading Photo ".concat(t+1,"/").concat(n.length),msg_key:a}),j.post("create_photo",e).then((function(e){console.log("post result"),console.log(e);var o=new FormData;for(var l in e.data.upload_url.fields)o.append(l,e.data.upload_url.fields[l]);o.append("file",n[t].file),j.post(e.data.upload_url.url,o,{headers:{"Content-Type":"multipart/form-data"}}).then((function(e){console.log("upload result"),console.log(e),f.b.success({content:"Done uploading!",msg_key:a})})),c([])}))}))},children:"Submit ".concat(n.length," Photo").concat(1!=n.length?"s":"")})]})}function G(e){return Object(I.jsx)("div",{className:"photo-selector",children:Object(I.jsxs)(p.a,{children:[Object(I.jsx)(p.a.Item,{label:"Your Kerberos",children:Object(I.jsx)(v.a,{placeholder:"kerb",rules:[{required:!0}],onChange:function(t){e.handleKerbChange(t.target.value)}})}),Object(I.jsx)(p.a.Item,{children:Object(I.jsx)(z,{name:"file",accept:"image/png, image/jpeg",multiple:!0,showUploadList:!1,beforeUpload:function(t,a){return e.addPhotos(a),!1},children:"Drag or click to upload files. Please upload JPEG files."})})]})})}var M=function(){var e=Object(o.useState)([]),t=Object(r.a)(e,2),a=t[0],n=t[1];Object(o.useEffect)((function(){n("form")}),[]);var c=Object(o.useState)([]),l=Object(r.a)(c,2),s=l[0],i=l[1];return Object(o.useEffect)((function(){j.get("photos",{params:{skip:0,limit:1}}).then((function(e){0!=e.data.length?(console.log(e),i({volume:e.data[0].volume,issue:e.data[0].issue}),console.log("got most recent volume and issue"),console.log(e.data[0].volume),console.log(e.data[0].issue)):i({volume:void 0,issue:void 0})}))}),[]),"form"==a?Object(I.jsxs)("div",{className:"main-container",children:[Object(I.jsx)(B,{defaultVolume:s.volume,defaultIssue:s.issue}),Object(I.jsx)("br",{}),Object(I.jsx)("a",{style:{opacity:"25%"},onClick:function(){n("view"),console.log("clicked"),console.log(a)},children:"view all photos"})]}):"view"==a?Object(I.jsx)("div",{className:"main-container",children:Object(I.jsx)(P,{defaultVolume:s.volume,defaultIssue:s.issue})}):Object(I.jsx)("div",{className:"main-container",children:Object(I.jsx)(m.a,{size:"large"})})},W=function(e){e&&e instanceof Function&&a.e(3).then(a.bind(null,294)).then((function(t){var a=t.getCLS,o=t.getFID,n=t.getFCP,c=t.getLCP,l=t.getTTFB;a(e),o(e),n(e),c(e),l(e)}))};l.a.render(Object(I.jsx)(n.a.StrictMode,{children:Object(I.jsx)(M,{})}),document.getElementById("root")),W()}},[[282,1,2]]]);
//# sourceMappingURL=main.6ec42412.chunk.js.map