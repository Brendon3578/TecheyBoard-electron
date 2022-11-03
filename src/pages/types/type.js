/**
 * @typedef {{
 *   id: number,
 *   status: 'AGENDADO' | 'USANDO' | 'DEVOLVIDO',
 *   teacher: {
 *     name: string,
 *     id: string,
 *     rm: string
 *   },
 *   lab: {
 *     id: number,
 *     name: string,
 *   },
 *   scheduledTime: {
 *     keyTakenHour: Date,
 *     keyReturnedHour: Date,
 *     classesAmount: number[],
 *   }
 * }} scheduledKey
 *
 * @typedef {{
 *  id:number,
 *  labName: string,
 *  status: 'NORMAL' | 'MANUNTENCAO'
 * }} lab
 *
 * @typedef {{
 * id: string;
 * RM: string;
 * name: string;
 * }} user
 */

// é necessário exportar alguma coisa para os tipos exportados funcionarem
export const types = null;
