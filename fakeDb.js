// fakeDb.js
let items = [];

function reset() {
    items = [];
}

function create(item) {
    items.push(item);
    return item;
}

function getAll() {
    return items;
}

function get(name) {
    return items.find(item => item.name === name);
}

function update(name, data) {
    let item = get(name);
    if (!item) return null;
    item.name = data.name || item.name;
    item.price = data.price || item.price;
    return item;
}

function remove(name) {
    const itemIndex = items.findIndex(item => item.name === name);
    if (itemIndex === -1) return null;
    const [item] = items.splice(itemIndex, 1);
    return item;
}

module.exports = { reset, create, getAll, get, update, remove };
