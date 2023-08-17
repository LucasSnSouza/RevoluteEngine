/*
    This is considere JSON file
*/
let default_scene = 
[
    {
        name: 'static_terrain',
        playable: false,
        px: 0,
        py: 400,
        dx: 400,
        dy: 300,
        color: "green",
        physic: null,
        behavior: null,
    },
    {
        name: 'static_terrain',
        playable: false,
        px: 550,
        py: 400,
        dx: 400,
        dy: 300,
        color: "gray",
        physic: null,
        behavior: null,
    },
    {
        name: 'action_player',
        playable: true,
        px: 15,
        py: 15,
        dx: 32,
        dy: 32,
        color: "red",
        physic: "dinamic",
        behavior: null,
    },
];