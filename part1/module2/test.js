// var a = [];
// for(let i = 0;i<10;i++){
//     a[i]=function(){
//         console.log(i)
//     }
// }
// a[6]()
var a = 10;
var obj = {
    a:20,
    fn(){
        setTimeout(()=>{
            console.log(this)
        })
    }
}
obj.fn()