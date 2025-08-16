function solution(D) {
    const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const result = { "Mon": 0, "Tue": 0, "Wed": 0, "Thu": 0, "Fri": 0, "Sat": 0, "Sun": 0 };
    const presentDays = new Set();

    // Step 1: Sum values for each day of week
    for (let dateStr in D) {
        const date = new Date(dateStr);
        const day = days[date.getDay()];
        result[day] += D[dateStr];
        presentDays.add(day);
    }

    // Step 2: Fill missing days with mean of prev & next available
    const order = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    for (let i = 0; i < order.length; i++) {
        let day = order[i];
        if (!presentDays.has(day)) {
            let prev = (i - 1 + 7) % 7;
            while (!presentDays.has(order[prev])) {
                prev = (prev - 1 + 7) % 7;
            }
            let next = (i + 1) % 7;
            while (!presentDays.has(order[next])) {
                next = (next + 1) % 7;
            }
            result[day] = Math.floor((result[order[prev]] + result[order[next]]) / 2);
        }
    }

    return result;
}

module.exports = solution;
