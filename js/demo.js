/**
 * Created by: Luojinghui/luojinghui424@gmail.com
 * Date: 16/8/25
 * Time: 下午6:36
 */
//function a() {
//    return 123;
//}
//
//var b = 'hijlmk';
//
//var a = `abcdeft ${b}`;
//
//console.log(a);
//var c = [1,3,5];
//
//var d = c.map(item => {
//    return item * 2;
//});
//
//console.log(d);
//
//
//var checkage = min => (max => max > min);
//
//var checkageNum = checkage(10);
//
//console.log(checkageNum(9));
//console.log(checkageNum(10));
//console.log(checkageNum(12));
//
//var compose = (f, g) => (x => f(g(x)));
//
//var calOne = x => x + 3;
//var calTwo = x => x * 2;
//
//console.log(compose(calOne, calTwo)(2));
//
//
//var toUpperCase = word => word.toUpperCase();
//var split = x => (str => str.split(x));
//var f = compose(split(' '), toUpperCase);
//console.log(f('abc efg'));

var Container = function(x) {
    this.value = x;
};

Container.of = x => new Container(x);

Container.prototype.map = function(f){
    return Container.of(f(this.value))
};

var c = Container.of(3).map(function (x) {
    return x + 3;
}).map(item => item + 1);
console.log(c);