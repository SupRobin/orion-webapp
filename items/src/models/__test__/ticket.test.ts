import {Item} from "../items";

it('implements optimistic concurrency control', async () => {
    //Create instance of a Item
    const item = Item.build({
        title: 'concert',
        price: 5,
        userId: '123'
    });

    await item.save();

    //save the item to the database

    //fetch the item twice
    const {firstInstance} = await Item.findById(item.id)
    const {secondInstance} = await Item.findById(item.id)
    //make two separate changes to the item we fetched
    firstInstance!.set({price: 10});
    secondInstance!.set({price: 15});
    // save the first fetched item

    //save the second fetched item and expect an error
    await firstInstance!.save();
    try {
        await secondInstance!.save();
    } catch (err) {
        return;
    }
});


it('incremenets the version number on multiple saves', async () => {
    const item = Item.build({
        title: 'concert',
        price: 5,
        userId: '123'
    });

    await item.save();
    expect(item.version).toEqual(0);
    await item.save();
    expect(item.version).toEqual(1);
    await item.save();
    expect(item.version).toEqual(2);
});
