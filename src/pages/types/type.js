/**
 * @typedef { 'MORNING' | 'AFTERNOON' | 'NIGHT' } periodType
 *
 * @typedef {{
 *   id: number,
 *   status: 'SCHEDULED' | 'USING' | 'RETURNED',
 *   teacher: {
 *     name: string,
 *     id: string,
 *     registration: string
 *   },
 *   room: {
 *     id: number,
 *     name: string,
 *   },
 *   scheduledTime: {
 *     keyTakenHour: Date,
 *     keyReturnedHour: Date,
 *     classesAmount: number[],
 *     period: periodType,
 *   }
 * }} scheduling
 *
 * @typedef {{
 *  id:number,
 *  roomName: string,
 *  status: 'NORMAL' | 'MAINTENANCE'
 * }} room
 *
 * @typedef {{
 * id: string;
 * registration: string;
 * name: string;
 * email: string;
 * contact: string;
 * role: string;
 * }} user
 */

/**
 * @typedef {{
 * label: string,
 * titleAttribute: string,
 * hrefName?: string,
 * iconEl: string,
 * idAttribute?: string;
 * }} sidebarPageType
 *
 *
 * @typedef {{
 *  label:number,
 *  pages: sidebarPageType[]
 * }} sidebarSectionType
 */

// é necessário exportar alguma coisa para os tipos exportados funcionarem
export const types = null;
