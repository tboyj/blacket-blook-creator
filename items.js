const ITEMS = {
  body: [
    { id: 'body_blue', label: 'Blue Blook', src: 'body/Blue Blook.webp' },
    { id: 'body_red',  label: 'Red Blook',  src: 'body/Red Blook.webp'  },
  ],
  hat: [
    { id: 'none',        label: 'None' },
    { id: 'hat_seagull', label: 'Seagull', src: 'hat/Seagull_hat.webp' },
  ],
  clothes: [
    { id: 'none',            label: 'None' },
    { id: 'clothes_vampire', label: 'Vampire', src: 'clothes/Vampire_clothes.webp' },
  ],
  face: [
    { id: 'none',       label: 'None' },
    { id: 'face_panda', label: 'Panda', src: 'face/Panda_face.webp' },
  ],
  accessory: [
    { id: 'none', label: 'None' },
  ],
};

let state = {
  body:      'body_blue',
  hat:       'none',
  clothes:   'none',
  face:      'face_panda',
  accessory: 'none',
};

let currentCat = 'body';