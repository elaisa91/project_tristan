(this.webpackJsonpapp_prova=this.webpackJsonpapp_prova||[]).push([[0],{14:function(e,t,i){},15:function(e,t,i){},24:function(e,t,i){"use strict";i.r(t);var s=i(1),n=i.n(s),r=i(9),a=i.n(r),c=(i.p,i(14),i(15),i(7)),o=i(2),l=i(3),h=i(5),u=i(4),p=i(0),d=i(17),g=i(18),m=function(e){Object(h.a)(i,e);var t=Object(u.a)(i);function i(e){var s;return Object(o.a)(this,i),(s=t.call(this,e)).myRef=n.a.createRef(),s.image=null,s.propHeight=null,s.propWidth=null,s.lastItemSelected=null,s.isNothingSelected=null,s.isIn=null,s.isOut=null,s}return Object(l.a)(i,[{key:"clear",value:function(){var e=this.myRef.current;e.getContext("2d").clearRect(0,0,e.width,e.height),this.image.src="",this.image.id=""}},{key:"generatePolygon",value:function(e){if(""!==e){var t,i=e.split(" "),s=[],n=Object(c.a)(i);try{for(n.s();!(t=n.n()).done;){var r=t.value,a=parseInt(r.split(",")[0])/this.propWidth,o=parseInt(r.split(",")[1])/this.propHeight;s.push([a,o])}}catch(l){n.e(l)}finally{n.f()}return s}}},{key:"drawPoly",value:function(e,t,i){for(var s=this.myRef.current.getContext("2d"),n=new Path2D,r=0;r<e.length;r++){var a=e[r][0],c=e[r][1];n.lineTo(a,c)}s.strokeStyle=t,s.lineWidth=i,s.stroke(n)}},{key:"drawCanvas",value:function(e,t){var i=this.myRef.current,s=i.getContext("2d"),n=Math.ceil(this.image.height/this.propHeight),r=Math.ceil(this.image.width/this.propWidth);if(s.clearRect(0,0,i.width,i.height),s.drawImage(this.image,0,0,r,n),t.length>0)for(var a=0;a<t.length;a++)var c=t[a],o=Object.keys(c)[0],l=c[o];1===e.length&&(l=(c=e[0])[o=Object.keys(c)[0]],this.drawPoly(l,"rgb(255,51,51)","2"),this.isNothingSelected=!1,this.lastItemSelected=this.props.onItemSelected(o,this.lastItemSelected)),this.isNothingSelected&&(this.lastItemSelected=this.props.onItemDeselected(this.lastItemSelected))}},{key:"isPointInPoly",value:function(e,t,i){var s=e.polygons;this.isIn=[],this.isOut=[];var n,r=Object(c.a)(s);try{for(r.s();!(n=r.n()).done;){var a=n.value,o={},l="",h=a.points,u=a.id,p=a.subcategory,m=a.transcription;""!==p&&""!==m?l=p+" "+m:""!==p?l=p:""!==m?l=m:""!==u&&(l=u);var f=this.generatePolygon(h);o[l]=f,-1===g(f,[t,i])||0===g(f,[t,i])?this.isIn.push(o):this.isOut.push(o)}}catch(k){r.e(k)}finally{r.f()}if(this.isIn.length>1){for(var j=0,v=this.isIn[j],O=Object.keys(v)[0],b=v[O],y=v,_=1;_<this.isIn.length;_++){h=(o=this.isIn[_])[l=Object.keys(o)[0]];d(h)<d(b)||d(h)===d(b)?(y=o,this.isOut.push(v),j=_,b=(v=this.isIn[j])[O=Object.keys(v)[0]]):this.isOut.push(o)}this.isIn=[y]}}},{key:"componentDidMount",value:function(){var e=this;this.myRef.current.height=600,this.myRef.current.width=500,this.image=new Image,this.myRef.current.onmousemove=function(t){if(0!==Object.keys(e.props.selected_image).length){e.isNothingSelected=!0;var i=t.offsetX,s=t.offsetY;e.isPointInPoly(e.props.selected_image,i,s),e.drawCanvas(e.isIn,e.isOut)}},this.myRef.current.onmouseout=function(){0!==Object.keys(e.props.selected_image).length&&(e.isNothingSelected=!0,e.isPointInPoly(e.props.selected_image,-1,-1),e.drawCanvas(e.isIn,e.isOut))}}},{key:"componentDidUpdate",value:function(){var e=this;Object.keys(this.props.selected_image).length>0?this.props.selected_image.src!==this.image.src&&(this.image.src=this.props.selected_image.src,this.image.id=this.props.selected_image.id,this.image.onload=function(){e.propHeight=Math.ceil(e.image.height/e.myRef.current.height),e.propWidth=Math.ceil(e.image.width/e.myRef.current.width),e.isPointInPoly(e.props.selected_image,-1,-1),e.drawCanvas(e.isIn,e.isOut)}):this.clear()}},{key:"render",value:function(){return Object(p.jsx)("canvas",{class:"canvas",ref:this.myRef})}}]),i}(n.a.Component),f=function(e){Object(h.a)(i,e);var t=Object(u.a)(i);function i(){return Object(o.a)(this,i),t.apply(this,arguments)}return Object(l.a)(i,[{key:"render",value:function(){return Object(p.jsx)("div",{class:"selection",children:Object(p.jsx)("p",{children:this.props.selected_item})})}}]),i}(n.a.Component),j=function(e){Object(h.a)(i,e);var t=Object(u.a)(i);function i(){return Object(o.a)(this,i),t.apply(this,arguments)}return Object(l.a)(i,[{key:"render",value:function(){return Object(p.jsxs)("div",{class:"fac_img",children:[Object(p.jsx)("img",{id:this.props.id,src:this.props.src,alt:this.props.id,onClick:this.props.onClick}),Object(p.jsx)("p",{children:this.props.id})]})}}]),i}(n.a.Component),v=function(e){Object(h.a)(i,e);var t=Object(u.a)(i);function i(e){var s;return Object(o.a)(this,i),(s=t.call(this,e)).selectedOptionString=null,s}return Object(l.a)(i,[{key:"componentDidUpdate",value:function(){""!==this.props.selected_option&&(this.selectedOptionString=this.props.selected_option+" \xe8 presente nelle seguenti carte: ")}},{key:"renderFacImage",value:function(e){var t=this;return Object(p.jsx)(j,{src:this.props.result_images[e].src,id:this.props.result_images[e].id,onClick:function(){return t.props.onClick(e)}})}},{key:"render",value:function(){for(var e=this.props.result_images,t=[],i=0;i<e.length;i++)t.push(this.renderFacImage(i));return Object(p.jsxs)("div",{class:"slider",children:[Object(p.jsx)("p",{children:this.selectedOptionString}),t]})}}]),i}(n.a.Component),O=function(e){Object(h.a)(i,e);var t=Object(u.a)(i);function i(){return Object(o.a)(this,i),t.apply(this,arguments)}return Object(l.a)(i,[{key:"render",value:function(){return Object(p.jsx)("option",{id:this.props.value,children:this.props.value})}}]),i}(n.a.Component),b=function(e){Object(h.a)(i,e);var t=Object(u.a)(i);function i(){return Object(o.a)(this,i),t.apply(this,arguments)}return Object(l.a)(i,[{key:"render",value:function(){var e=this.props.options.map((function(e){return Object(p.jsx)(O,{value:e})}));return Object(p.jsx)("select",{name:"persons",id:"persons",value:this.props.selected_option,onChange:this.props.onChange,children:e})}}]),i}(n.a.Component),y=function(e){Object(h.a)(i,e);var t=Object(u.a)(i);function i(e){var s;return Object(o.a)(this,i),(s=t.call(this,e)).state={error:null,isLoaded:!1,options:[],selected_option:"",result_images:[],selected_image:{},selected_item:""},s}return Object(l.a)(i,[{key:"componentDidMount",value:function(){var e=this;fetch("http://localhost:8080/imgTags").then((function(e){return e.json()})).then((function(t){e.setState({isLoaded:!0,options:t,selected_option:t[0]})}),(function(t){e.setState({isLoaded:!0,error:t})}))}},{key:"handleItemDeselected",value:function(e){return null,this.setState({selected_item:""}),null}},{key:"handleItemSelected",value:function(e,t){return t!==e&&(t=e,this.setState({selected_item:e})),t}},{key:"handleClick",value:function(e){this.setState({selected_image:this.state.result_images[e]})}},{key:"handleChange",value:function(e){var t=this;this.setState({selected_option:e.target.value,selected_image:{}}),fetch("http://localhost:8080/imgResults/"+e.target.value).then((function(e){return e.json()})).then((function(e){t.setState({result_images:e})}),(function(e){t.setState({error:e})}))}},{key:"render",value:function(){var e=this;return Object(p.jsxs)("div",{class:"app",children:[Object(p.jsxs)("div",{class:"choise",children:["Seleziona un individuo:",Object(p.jsx)(b,{options:this.state.options,selected_option:this.state.selected_option,onChange:function(t){return e.handleChange(t)}})]}),Object(p.jsx)(v,{selected_option:this.state.selected_option,result_images:this.state.result_images,onClick:function(t){return e.handleClick(t)}}),Object(p.jsx)(m,{selected_image:this.state.selected_image,onItemSelected:function(t,i){return e.handleItemSelected(t,i)},onItemDeselected:function(t){return e.handleItemDeselected(t)}}),Object(p.jsx)(f,{selected_item:this.state.selected_item})]})}}]),i}(n.a.Component);a.a.render(Object(p.jsx)(n.a.StrictMode,{children:Object(p.jsx)(y,{})}),document.getElementById("root"))}},[[24,1,2]]]);
//# sourceMappingURL=main.e18ec33d.chunk.js.map