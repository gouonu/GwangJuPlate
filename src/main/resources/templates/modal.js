// "use strict";
// $(()=>{
//     new Modal();
//
// })
//
// export class Modal {
//     constructor() {
//         console.log('join')
//         this.eventBindgin();
//     }
//
//
//     locEvent(key){
//         let locTmpl = require("/templates/modal.html")
//
//
//         axios.post('/templates/modal.html').then((result)=>{
//             console.log(result);
//             result.data.title = key.key === 'loc' ? '자기지역' : '배우자 희망지역';
//             //console.log(locTmpl(result));
//
//
//             $('.Modal').removeClass('hidden');
//
//
//
//         })
//     }
//
//     eventBindgin() {
//
//
//
//         $('.btn_modal').on('click', (e) => {
//
//             this.locEvent($(e.currentTarget).data());
//
//         })
//
//
//     }
// }