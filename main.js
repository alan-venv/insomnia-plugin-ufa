module.exports.templateTags = [
    {
        name: 'CPF',
        displayName: 'CPF',
        description: 'Generates a random valid CPF',
        args: [
            {
                displayName: 'Mask',
                description: 'Add mask',
                type: 'boolean',
                defaultValue: false
            }
        ],
        async run(context, mask) {
            const rnd = (n) => Math.round(Math.random() * n);
            const mod = (base, div) => Math.round(base - Math.floor(base / div) * div)
            const n = Array(9).fill('').map(() => rnd(9));
            let d1 = n.reduce((total, number, index) => (total + (number * (10 - index))), 0)
            d1 = 11 - mod(d1, 11);
            if (d1 >= 10) d1 = 0;
            let d2 = (d1 * 2) + n.reduce((total, number, index) => (total + (number * (11 - index))), 0)
            d2 = 11 - mod(d2, 11);
            if (d2 >= 10) d2 = 0;
            return (mask) ?
                `${n.slice(0, 3).join('')}.${n.slice(3, 6).join('')}.${n.slice(6, 9).join('')}-${d1}${d2}` :
                `${n.join('')}${d1}${d2}`
        }
    },
    {
        name: 'Timestamp',
        displayName: 'Timestamp as seconds',
        description: 'Generates a timestamp in seconds',
        async run() {
            const ms = Date.now()
            return Math.round(ms / 1000)
        }
    }
];
