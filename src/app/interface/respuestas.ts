import { users } from './user';

export interface Respuestas {
    errors?: String;
    response?: String;
    agendas?: users[];
    registro?: users;
}
