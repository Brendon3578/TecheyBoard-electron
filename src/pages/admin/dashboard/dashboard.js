/**
 * @typedef {import('../types/type').scheduling} scheduling
 */
import { formatDate } from "../../../scripts/utils.js";
import { SYSTEM_DATE } from "../../../scripts/behaviour.js";
import { buildSidebar } from "../../config/buildSidebar.js";
import { ADMIN_PAGES_SIDEBAR_SECTIONS } from "./../admin-page.config.js";
import { buildPageInformation } from "../../config/buildPageInformation.js";
import { iconSVGElements } from "../../config/iconSVGElements.js";

buildSidebar(ADMIN_PAGES_SIDEBAR_SECTIONS, "dashboard");
buildPageInformation("Painel de Controle", iconSVGElements.dashboardIcon);
