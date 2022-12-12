/**
 * @typedef {import('../types/type.js').sidebarSectionType } sidebarSectionType
 * @typedef {import('..types/type.js').sidebarPageType} sidebarPageType
 */

import { iconSVGElements } from "../config/iconSVGElements.js";

/**
 * @type sidebarSectionType[]
 */
export const ADMIN_PAGES_SIDEBAR_SECTIONS = [
  {
    label: "PAINEL DE CONTROLE",
    pages: [
      {
        label: "Painel de Controle",
        hrefName: "dashboard",
        titleAttribute: "Acessar Painel de Controle",
        iconEl: iconSVGElements.dashboardIcon,
      },
      {
        label: "Calendário de Controle",
        hrefName: "calendar-control",
        titleAttribute: "Acessar Calendário de Controle",
        iconEl: iconSVGElements.calendarIcon,
      },
    ],
  },
  {
    label: "AÇÕES",
    pages: [
      {
        label: "Cadastro de Usuários",
        hrefName: "users",
        titleAttribute: "Acessar tela de cadastro de usuários",
        iconEl: iconSVGElements.usersIcon,
      },
      {
        label: "Cadastro de Salas",
        hrefName: "rooms",
        titleAttribute: "Acessar tela de Cadastro de salas",
        iconEl: iconSVGElements.roomsIcon,
      },
    ],
  },
  {
    label: "CONFIGURAÇÕES",
    pages: [
      {
        label: "Conta",
        hrefName: "admin-account",
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
