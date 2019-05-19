function packAndReport(orders) {

    let customerOrders = {};

    for (let order in orders) {

        let id = orders[order]["customerId"].toString();
        try {
            // assume there is no weight 0
            customerOrders[id][orders[order]["weight"] - 1].push(orders[order]);
        } catch {
            customerOrders[id] = [[], [], [], [], []];
            customerOrders[id][orders[order]["weight"] - 1].push(orders[order]);
        }
    }

    let vans = [];
    let leftovers = [[], [], [], [], []];
    let spreadVanIds = [];

    // trying to put the same customer orders in 1 van
    // combinations: 5, 1 and 4, 2 and 3, 1 and 2 2s, 2 and 3 1s, 3 and 2 1s, 5 1s.
    for (let customer in customerOrders) {
        let currentCustomerOrders = customerOrders[customer];
        let shouldStop = false;

        while (!shouldStop) {
            if (currentCustomerOrders[4].length !== 0) {
                vans.push({"orders": [currentCustomerOrders[4].pop()]});
            } else if (currentCustomerOrders[0].length !== 0 && currentCustomerOrders[3].length !== 0) {
                vans.push({"orders": [currentCustomerOrders[0].pop(), currentCustomerOrders[3].pop()]});
            } else if (currentCustomerOrders[1].length !== 0 && currentCustomerOrders[2].length !== 0) {
                vans.push({"orders": [currentCustomerOrders[1].pop(), currentCustomerOrders[2].pop()]});
            } else if (currentCustomerOrders[0].length !== 0 && currentCustomerOrders[1].length >= 2) {
                vans.push({"orders": [currentCustomerOrders[0].pop(), currentCustomerOrders[1].pop(), currentCustomerOrders[1].pop()]});
            } else if (currentCustomerOrders[0].length >= 3 && currentCustomerOrders[1].length !== 0) {
                vans.push({"orders": [currentCustomerOrders[0].pop(), currentCustomerOrders[0].pop(), currentCustomerOrders[0].pop(), currentCustomerOrders[1].pop()]})
            } else if (currentCustomerOrders[2].length !== 0 && currentCustomerOrders[0].length >= 2) {
                vans.push({"orders": [currentCustomerOrders[2].pop(), currentCustomerOrders[0].pop(), currentCustomerOrders[0].pop()]})
            } else if (currentCustomerOrders[0].length >= 5) {
                let myOrders = [];
                for (let i = 0; i < 5; i++) {
                    myOrders.push(currentCustomerOrders[0].pop());
                }
                vans.push({"orders": myOrders});
            } else {

                for (let index = 0; index < 5; index++) {
                    while (currentCustomerOrders[index].length !== 0) {
                        leftovers[index].push(currentCustomerOrders[index].pop());
                    }
                }
                shouldStop = true;
            }
        }
    }

    // tryimg to put all the leftover orders into the least number of vans
    // inefficient to hire more vans
    let shouldStop = false;
    while (!shouldStop) {
        if (leftovers[0].length !== 0 && leftovers[3].length !== 0) {
            vans.push({"orders": [leftovers[0].pop(), leftovers[3].pop()]});
        } else if (leftovers[1].length !== 0 && leftovers[2].length !== 0) {
            vans.push({"orders": [leftovers[1].pop(), leftovers[2].pop()]});
        } else if (leftovers[0].length !== 0 && leftovers[1].length >= 2) {
            vans.push({"orders": [leftovers[0].pop(), leftovers[1].pop(), leftovers[1].pop()]});
        } else if (leftovers[0].length >= 3 && leftovers[1].length !== 0) {
            vans.push({"orders": [leftovers[0].pop(), leftovers[0].pop(), leftovers[0].pop(), leftovers[1].pop()]})
        } else if (leftovers[2].length !== 0 && leftovers[0].length >= 2) {
            vans.push({"orders": [leftovers[2].pop(), leftovers[0].pop(), leftovers[0].pop()]})
        } else if (leftovers[0].length >= 5) {
            let myOrders = [];
            for (let i = 0; i < 5; i++) {
                myOrders.push(leftovers[0].pop());
            }
            vans.push({"orders": myOrders});
        } else {
            shouldStop = true;
        }
        if (!shouldStop) {
            spreadVanIds.push(vans.length - 1);
        }
    }

    // trying to squeeze in all the orders that could not be optimized for weight 5
    if (leftovers[0].length !== 0) {
        let myOrders = [];
        let leftoverLength = leftovers[0].length;
        for (let i = 0; i < leftoverLength; i++) {
            myOrders.push(leftovers[0].pop());
        }
        vans.push({"orders": myOrders});
        spreadVanIds.push(vans.length - 1);
    }
    if (leftovers[1].length !== 0) {
        let myOrders = [];
        let leftoverLength = Math.ceil(leftovers[1].length / 2);
        for (let i = 0; i < leftoverLength; i++) {
            myOrders.push(leftovers[1].pop());
            if (leftovers[1].length !== 0) {
                myOrders.push(leftovers[1].pop());
            }
        }
        vans.push({"orders": myOrders});
        spreadVanIds.push(vans.length - 1);
    }
    if (leftovers[2].length !== 0) {
        vans.push({"orders": leftovers[2].pop()});
        spreadVanIds.push(vans.length - 1);
    }
    if (leftovers[3].length !== 0) {
        vans.push({"orders": leftovers[3].pop()});
        spreadVanIds.push(vans.length - 1);
    }

    return {
        vans: vans,
        spreadVanIds: spreadVanIds
    };
}


const exampleOrders = [
    {
        customerId: 1,
        orderId: 'abc',
        weight: 2
    },
    {
        customerId: 2,
        orderId: "ghi",
        weight: 1
    },
    {
        customerId: 1,
        orderId: "def",
        weight: 4
    },
    {
        customerId: 1,
        orderId: "zzz",
        weight: 1
    }
];

const result = packAndReport(exampleOrders);
console.log(result);