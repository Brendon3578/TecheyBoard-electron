/**
 * @typedef {import('../types/type.js').sidebarSectionType } sidebarSectionType
 * @typedef {import('..types/type.js').sidebarPageType} sidebarPageType
 */

import { iconSVGElements } from "../config/iconSVGElements.js";

/**
 * @type sidebarSectionType[]
 */
export const USER_PAGES_SIDEBAR_SECTIONS = [
  {
    label: "INÍCIO",
    pages: [
      {
        label: "Calendário",
        hrefName: "calendar",
        titleAttribute: "Acessar tela de Calendário",
        iconEl: iconSVGElements.calendarIcon,
      },
    ],
  },
  {
    label: "AÇÕES",
    pages: [
      {
        label: "Agendar Chave",
        hrefName: "schedule-key",
        titleAttribute: "Acessar tela de Agendar de Chave",
        iconEl: iconSVGElements.clockIcon,
      },
      {
        label: "Chaves Agendadas",
        hrefName: "keys-scheduled",
        titleAttribute: "Acessar tela de Chaves Agendadas",
        iconEl: iconSVGElements.listIcon,
      },
    ],
  },
  {
    label: "CONFIGURAÇÕES",
    pages: [
      {
        label: "Conta",
        hrefName: "user-account",
        titleAttribute: "Acessar configurações da conta",
        iconEl: iconSVGElements.accountIcon,
      },
      {
        label: "Sair",
        titleAttribute: "Sair da conta",
        iconEl: iconSVGElements.exitIcon,
        idAttribute: "sidebar-exit-btn",
      },
    ],
  },
];
