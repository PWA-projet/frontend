import { Subject } from 'rxjs';

export const cacheBuster$ = new Subject<void>();
export const CACHE_MAX_AGE = 3600000; // 1 heure en millisecondes
