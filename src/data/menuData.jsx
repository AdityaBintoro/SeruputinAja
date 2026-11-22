import espressoImg from '../assets/img/menu/espresso.jpg';
import kopiSusuImg from '../assets/img/menu/kopi-susu-gula-aren.jpg';
import cappuccinoImg from '../assets/img/menu/cappuccino.jpg';

export const MENU_ITEMS = [
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Shot tunggal, pekat dan bersih.',
    price: 18000,
    image: espressoImg,
  },
  {
    id: 'kopi-susu-gula-aren',
    name: 'Kopi Susu Gula Aren',
    description: 'Espresso, susu segar, dan gula aren.',
    price: 24000,
    image: kopiSusuImg,
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Espresso, susu panas, dan busa tebal.',
    price: 26000,
    image: cappuccinoImg,
  },
];