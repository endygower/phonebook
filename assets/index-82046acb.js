import{k as t,q as s,I as c,L as m,T as p,t as l}from"./index-6e5582ab.js";import{d,C as u}from"./ArrowBackIosNewRounded-96a965b8.js";import{A as f,T as h,d as b}from"./graphql-8ce48e23.js";function C(){return t(f,{position:"sticky",children:s(h,{children:[t(c,{component:m,to:"/","aria-label":"Go back to contact list",color:"inherit",children:t(d,{})}),t(p,{variant:"h1",children:"Add new contact"})]})})}const N={firstName:"",lastName:"",phones:[""]};function g(){const n=l(),[o]=b();async function e(a){const{data:i}=await o({variables:{first_name:a.firstName.trim(),last_name:a.lastName.trim(),phones:a.phones.map(r=>({number:r}))}});i&&n("/")}return t(u,{initialValues:N,onSubmit:e,header:t(C,{})})}export{g as Component};