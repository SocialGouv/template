"use strict";(self.webpackChunk_socialgouv_template=self.webpackChunk_socialgouv_template||[]).push([[859],{"./src/components/StatTile.stories.tsx":(__unused_webpack_module,__webpack_exports__,__webpack_require__)=>{__webpack_require__.r(__webpack_exports__),__webpack_require__.d(__webpack_exports__,{Default:()=>Default,WithDescription:()=>WithDescription,__namedExportsOrder:()=>__namedExportsOrder,default:()=>StatTile_stories});var react=__webpack_require__("./node_modules/next/dist/compiled/react/index.js"),fr=__webpack_require__("./node_modules/@codegouvfr/react-dsfr/fr/index.js"),__jsx=react.createElement,StatTile=function StatTile(props){return __jsx("div",{className:fr.fr.cx("fr-col-12","fr-col-md-4")},__jsx("div",{className:fr.fr.cx("fr-card","fr-card--no-arrow")},__jsx("div",{className:fr.fr.cx("fr-card__body")},__jsx("strong",{className:fr.fr.cx("fr-display--md","fr-mt-5w"),style:{textAlign:"center"}},props.stats),__jsx("h2",{className:fr.fr.cx("fr-card__title","fr-mb-4w")},props.title),props.description&&__jsx("div",{className:fr.fr.cx("fr-card__desc")},__jsx("p",null,props.description)))))};StatTile.displayName="StatTile";try{StatTile.displayName="StatTile",StatTile.__docgenInfo={description:"",displayName:"StatTile",props:{title:{defaultValue:null,description:"",name:"title",required:!0,type:{name:"string"}},stats:{defaultValue:null,description:"",name:"stats",required:!0,type:{name:"string | number"}},description:{defaultValue:null,description:"",name:"description",required:!1,type:{name:"ReactNode"}}}},"undefined"!=typeof STORYBOOK_REACT_CLASSES&&(STORYBOOK_REACT_CLASSES["src/components/StatTile.tsx#StatTile"]={docgenInfo:StatTile.__docgenInfo,name:"StatTile",path:"src/components/StatTile.tsx#StatTile"})}catch(__react_docgen_typescript_loader_error){}var StatTile_stories_jsx=react.createElement;const StatTile_stories={title:"StatsTile",component:StatTile};var Template=function Template(args){return StatTile_stories_jsx(StatTile,args)};Template.displayName="Template";var Default=Template.bind({});Default.args={title:"Nombre de visites",stats:"1.000.000"};var WithDescription=Template.bind({});WithDescription.args={title:"Nombre de visites",stats:"1.000.000",description:"C'est le nombre d'utilisateur unique ayant visité le site"},Default.parameters={...Default.parameters,docs:{...Default.parameters?.docs,source:{originalSource:"args => <StatTile {...args} />",...Default.parameters?.docs?.source}}},WithDescription.parameters={...WithDescription.parameters,docs:{...WithDescription.parameters?.docs,source:{originalSource:"args => <StatTile {...args} />",...WithDescription.parameters?.docs?.source}}};const __namedExportsOrder=["Default","WithDescription"]}}]);