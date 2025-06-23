import {Map2} from './dist/index.js'


const map2 = new Map2();

let value = 0;
map2.set('A', 'a', value++);
map2.set('A', 'b', value++);
map2.set('A', 'c', value++);
map2.set('B', 'a', value++);
map2.set('B', 'b', value++);
map2.set('B', 'c', value++);
map2.set('C', 'a', value++);
map2.set('D', 'a', value++);
map2.set('D', 'b', value++);
map2.set('D', 'c', value++);


for (const [k1, k2, v] of map2) {
	console.log(k1, k2, v);
}
