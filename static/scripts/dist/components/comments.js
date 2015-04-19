define(["vue","superagent","socket.io"],function(t,e,n){var o=t.extend({inherit:!0,template:"#comments_template",data:function(){return{pagerMode:"simple"}},computed:{simplePageButtons:function(){var t=[],e=this.currentPage-2;this.currentPage<=3?e=1:this.currentPage>=this.comments.getPages()-2&&(e=this.comments.getPages()-4),e>1&&t.push({text:"首",value:1});for(var n=e;e+4>=n;n++)if(!(1>n)){if(n>this.comments.getPages())break;t.push({text:n,value:n})}return e+4<this.comments.getPages()&&t.push({text:"尾",value:this.comments.getPages()}),t},fullPageButtons:function(){for(var t=[],e=1;e<=this.comments.getPages();e++)t.push({text:e,value:e});return t}},methods:{gotoPage:function(t,e){var n=this;"function"==typeof t&&(e=t,t=null),n.loadComments(t,function(){window.scrollBy(0,n.$el.parentNode.getBoundingClientRect().top),"function"==typeof e&&e()}),n.loadCommentsInfo()},togglePagerMode:function(){this.pagerMode="simple"===this.pagerMode?"full":"simple"}}}),s=t.extend({inherit:!0,template:"#form_comment_template",data:function(){return{content:""}},methods:{onkeydown:function(t){if(13===t.keyCode&&!t.target.innerHTML)return t.preventDefault();if(t.ctrlKey&&13===t.keyCode){var e=document.createEvent("HTMLEvents");e.initEvent("submit",!1,!0),this.$el.querySelector("form").dispatchEvent(e),t.preventDefault()}},sync:function(t){this.content=t.target.innerHTML},send:function(t){var e=this.$el.querySelector(".textarea-content"),n={tempId:(new Date).getTime()+Math.random(),content:e.innerHTML};return n.content?(this.socket.emit("comment",{method:"send",body:{postId:this.post.id,content:this.content,tempId:n.tempId}}),t.preventDefault(),this.comments.insert(n),void(e.innerHTML=this.content="")):void t.preventDefault()}}}),i=t.extend({inherit:!0,template:"#comments_wrapper_template",data:function(){return{socket:n(),comments:{list:[],pagesize:15,count:null,getPages:function(){return Math.ceil(this.count/this.pagesize)},insert:function(t){this.list.unshift(t),this.list.length>this.pagesize&&(this.list.pop(),this.count++)}},currentPage:1,joined:!1,socketioHandlers:{comment:{sendEnd:function(t){var e=t.err,n=t.body.postId,o=t.body.tempId,s=t.body.comment;if(n===this.post.id){var i;for(i=0;i<this.comments.list.length&&this.comments.list[i].tempId!==o;i++);if(e)throw s=this.comments.list[0],s.err=e,this.comments.list.$set(i,s),e;this.comments.list.$set(i,s)}},joinend:function(t){this.joined=!0},receive:function(t){var e=t.body.postId,n=t.body.comment;e===this.post.id&&1===this.currentPage&&this.comments.insert(n)}}},load:!1}},events:{load:function(){var t=this;t.loadCommentsInfo(function(){t.comments.count>0&&t.loadComments()}),t.socket.on("comment",function(e){t.socketioHandlers.comment[e.method].call(t,e)}),t.socket.emit("comment",{method:"join",body:{postId:t.post.id}}),t.load=!0}},methods:{loadCommentsInfo:function(t){var n=this;e.get("/p/comments/"+n.post.id,{pagesize:n.comments.pagesize},function(e,o){if(e)throw e;n.comments.count=o.body.count,"function"==typeof t&&t()})},loadComments:function(t,n){var o=this;t=t||1,e.get("/p/comments/"+o.post.id+"/"+t,{pagesize:o.comments.pagesize},function(e,s){if(e)throw e;o.comments.list=s.body,o.currentPage=t,"function"==typeof n&&n()})}},components:{list:o,form:s}});return i});