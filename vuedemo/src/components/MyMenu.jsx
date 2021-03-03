import { createNamespacedHelpers} from 'vuex'
let {mapState} = createNamespacedHelpers('user')
export default {
	computed:{
		...mapState(['userInfo'])
	},
	data(){
		return{
			list:[]
		}
	},
	mounted() {
		//获取菜单列表
		this.list =this.getMenuList(this.userInfo.authList);
	},
	methods: {
		getMenuList(authList){
			let menu = [];
			let map = {}
			authList.forEach(m => {
				m.children = [];
				map[m.id] = m;
				if(m.pid == -1){
					menu.push(m);// 如果是根直接push
				}else{
					map[m.pid] && map[m.pid].children.push(m)
				}
			});
			return menu;
		},
		  //页面跳转
		handleRouter(routerName) {
				if (routerName) {
					this.$router.push({path: routerName});
				} else {
					this.$router.push({ path: "/home" });
				}
			},
	},
	render() {
		let renderChildren = (list) =>{
			return list.map(child =>{
				return child.children.length?
				<a-sub-menu  index={child._id}>
					<div slot="title"> {child.name}</div>
					{renderChildren(child.children)}
				</a-sub-menu>:
				<a-menu-item key={child.path} onClick={() => this.handleRouter(child.path)}>
					{child.name}
				</a-menu-item>
			})
		}
		return  <a-menu theme="dark" mode="inline" 
		default-selected-keys= {['1']} >
			{renderChildren(this.list)}
		</a-menu>
	}
}