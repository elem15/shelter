function generateRandomList(count) {
    const list = [];
    while (list.length < count) {
        const num = Math.floor(Math.random() * 8);
        if (!list.includes(num)) list.push(num);
    }
    return list;
}
function generateFullList(res) {
    let list = [];
    let length;
    const fullList = [];
    let count = 0;
    let arr = [];
    for (let i = 0; i < 6; i++) {
       list = [...list, ...generateRandomList(8)];
    }
    res === 'mobile' ? length = 3 : res === 'tablet' ? length = 6 : length = 8;    
    for (let i = 0; i < list.length; i++) {
        count += 1;
        arr.push(list[i]);
        if (count >= length) {        
            fullList.push(arr);
            count = 0;
            arr = [];
        }
    }

    return fullList;
}
