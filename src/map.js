module.exports = {
    map: [
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1]
    ],
    pieces: {
        L1: {
            initial: [
                [0, 0, 2],
                [2, 2, 2],
            ],
            c1: [
                [2, 0],
                [-1, 1],
                [0, 0],
                [1, -1]
            ],
            c2: [
                [0, -2],
                [1, 1],
                [0, 0],
                [-1, -1]
            ],
            c3: [
                [-2, 0],
                [1, -1],
                [0, 0],
                [-1, 1]
            ],
            c4: [
                [0, 2],
                [-1, -1],
                [0, 0],
                [1, 1],
            ],
        },
        L2: {
                initial: [
                    [2, 0, 0],
                    [2, 2, 2],
                ],
                c1: [
                    [0, 2],
                    [-1, 1],
                    [0, 0],
                    [1, -1]
                ],
                c2: [
                    [2, 0],
                    [1, 1],
                    [0, 0],
                    [-1, -1]
                ],
                c3: [
                    [0, -2],
                    [1, -1],
                    [0, 0],
                    [-1, 1]
                ],
                c4: [
                    [-2, 0],
                    [-1, -1],
                    [0, 0],
                    [1, 1],
                ],
        },
        I: {
            initial: [
                [2, 2, 2, 2],
            ],
            c1: [
                [-1, 2],
                [0, 1],
                [1, 0],
                [2, -1],
            ],
            c2: [
                [2, -2],
                [1, -1],
                [0, 0],
                [-1, 1],
            ],
            c3: [
                [-2, 1],
                [-1, 0],
                [0, -1],
                [1, -2],
            ],
            c4: [
                [1, -1],
                [0, 0],
                [-1, 1],
                [-2, 2],
            ],
        },
        Z1: {
            initial: [
                [0, 2, 2],
                [2, 2, 0],
                [0, 0, 0]
            ],
            c1: [
                [1, 1],
                [2, 0],
                [-1, 1],
                [0, 0]

            ],
            c2: [
                [1, -1],
                [0, -2],
                [1, 1],
                [0, 0],
            ],
            c3: [
                [-1, -1],
                [-2, 0],
                [1, -1],
                [0, 0],
            ],
            c4: [
                [-1, 1],
                [0, 2],
                [-1, -1],
                [0, 0],
            ]
        },
        Z2: {
            initial: [
                [2, 2, 0],
                [0, 2, 2],
                [0, 0, 0]
            ],
            c1: [
                [0, 2],
                [1, 1],
                [0, 0],
                [1, -1],
            ],
            c2: [
                [2, 0],
                [1, -1],
                [0, 0],
                [-1, -1],
            ],
            c3: [
                [0, -2],
                [-1, -1],
                [0, 0],
                [-1, 1],
            ],
            c4: [
                [-2, 0],
                [-1, 1],
                [0, 0],
                [1, 1],
            ],
        },
        Square: {
            initial: [
                [2, 2],
                [2, 2]
            ],
            c1: [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0]
            ],
            c2: [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0]
            ],
            c3: [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0]
            ],
            c4: [
                [0, 0],
                [0, 0],
                [0, 0],
                [0, 0]
            ],
        },
        t: {
            initial: [
                [0, 2, 0],
                [2, 2, 2],
                [0, 0, 0]
            ],
            c1: [
                [1, 1],
                [-1, 1],
                [0, 0],
                [1, -1],
            ],
            c2: [
                [1, -1],
                [1, 1],
                [0, 0],
                [-1, -1],
            ],
            c3: [
                [-1, -1],
                [1, -1],
                [0, 0],
                [-1, 1],
            ],
            c4: [
                [-1, 1],
                [-1, -1],
                [0, 0],
                [1, 1],
            ]
        },
    },
    next: [
        [1, 1, 1, 1, 1, 1, 1, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 0, 0, 1],
        [1, 1, 1, 1, 1, 1, 1, 1]
    ]
}