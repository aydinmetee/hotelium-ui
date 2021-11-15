import { animate, state, style, transition, trigger } from '@angular/animations';

export const fadeAndSlideUp = trigger('fadeAndSlideUp', [
  state('void', style({ opacity: 0, transform: 'translateY(25px)' })),
  transition('void <=> *', [animate('0.5s 0.1s ease-out')])
]);

export const fade = trigger('fade', [
  state('void', style({ opacity: 0 })),
  transition('void <=> *', [animate('0.5s ease-in-out')])
]);

export const delayFade = trigger('delayFade', [
  state('void', style({ opacity: 0 })),
  transition('void => *', [animate('0.2s 1s ease-in-out')]),
  transition('* => void', [animate('0.5s 0s ease-out')])
]);
